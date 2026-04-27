(() => {
  const doc = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const progress = document.getElementById('progressBar');
  const sections = [...document.querySelectorAll('section')];
  const focusToggle = document.querySelector('.focus-toggle');

  sections.forEach((section, index) => {
    section.dataset.sectionIndex = String(index).padStart(2, '0');
    if (!section.id) section.id = 'section-' + index;
  });

  const rail = document.createElement('aside');
  rail.className = 'section-rail';
  rail.setAttribute('aria-label', 'Índice do briefing');
  sections.slice(0, 18).forEach((section, index) => {
    const title = section.querySelector('h2, h3')?.textContent?.trim() || 'Seção ' + String(index).padStart(2, '0');
    const link = document.createElement('a');
    link.className = 'rail-link';
    link.href = '#' + section.id;
    link.innerHTML = '<span class="rail-index">' + String(index).padStart(2, '0') + '</span><span class="rail-title">' + title + '</span>';
    rail.appendChild(link);
  });
  document.body.appendChild(rail);
  const railLinks = [...rail.querySelectorAll('.rail-link')];

  const updateProgress = () => {
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    if (progress) progress.style.width = pct + '%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sections.forEach((section) => section.classList.toggle('is-current', section === visible.target));
    railLinks.forEach((link) => link.classList.toggle('is-active', link.hash === '#' + visible.target.id));
  }, { threshold: [0.18, 0.32, 0.52], rootMargin: '-18% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.bar-fill').forEach((bar) => {
        const target = bar.dataset.width || bar.style.width || '0%';
        bar.style.width = '0%';
        requestAnimationFrame(() => { bar.style.width = target; });
      });
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.bar-chart').forEach((chart) => barObserver.observe(chart));

  focusToggle?.addEventListener('click', () => {
    const active = body.classList.toggle('is-focus');
    focusToggle.setAttribute('aria-pressed', String(active));
    focusToggle.textContent = active ? 'Ver painel' : 'Modo foco';
  });

  const magnets = [...document.querySelectorAll('.summary-card, .card, .stat, .hero-meta-item')];
  magnets.forEach((el) => {
    el.classList.add('magnet');
    el.addEventListener('pointermove', (event) => {
      if (reduceMotion.matches || window.innerWidth < 900) return;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      el.style.transform = 'translateY(-4px) rotateX(' + y.toFixed(2) + 'deg) rotateY(' + x.toFixed(2) + 'deg)';
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  const canvas = document.getElementById('atmosphere');
  const ctx = canvas?.getContext('2d', { alpha: true });
  let animationFrame = 0;
  let pointerX = 0.62;
  let pointerY = 0.28;
  const lines = Array.from({ length: 26 }, (_, index) => ({
    seed: index * 97.31,
    speed: 0.22 + (index % 5) * 0.035,
    offset: Math.random()
  }));

  const resizeCanvas = () => {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time) => {
    if (!canvas || !ctx || reduceMotion.matches || document.hidden) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'screen';
    lines.forEach((line, index) => {
      const phase = time * 0.00008 * line.speed + line.offset;
      const y = ((index / lines.length) * h + Math.sin(phase + line.seed) * 34 + pointerY * 18) % h;
      const x = Math.sin(phase * 1.6 + line.seed) * 28 + pointerX * 34;
      const length = 150 + (index % 6) * 38;
      const alpha = 0.04 + (index % 4) * 0.012;
      ctx.strokeStyle = index % 3 === 0 ? 'rgba(222, 155, 80,' + alpha + ')' : 'rgba(114, 171, 196,' + alpha + ')';
      ctx.lineWidth = index % 5 === 0 ? 1.4 : 0.8;
      ctx.beginPath();
      ctx.moveTo(x - 60, y);
      ctx.lineTo(x + length, y - length * 0.18);
      ctx.stroke();
    });
    ctx.globalCompositeOperation = 'source-over';
    animationFrame = requestAnimationFrame(draw);
  };

  const startCanvas = () => {
    if (!canvas || !ctx || reduceMotion.matches) return;
    cancelAnimationFrame(animationFrame);
    resizeCanvas();
    animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX / Math.max(window.innerWidth, 1);
    pointerY = event.clientY / Math.max(window.innerHeight, 1);
  }, { passive: true });
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationFrame);
    else startCanvas();
  });
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) cancelAnimationFrame(animationFrame);
    else startCanvas();
  });
  startCanvas();
})();
