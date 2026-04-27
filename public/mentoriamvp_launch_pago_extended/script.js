/* ====================================================================
   BRIEFING MVP — v2 OVERDRIVE · runtime
   Spring-feel reveals · count-up · TOC scrollspy w/ View Transitions ·
   table cursor trail · hero canvas drift · gracefully degrades.
   ==================================================================== */

(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1 · Progress bar (JS fallback only when scroll-driven CSS unsupported)
     ========================================================= */
  const progress = document.getElementById('progressBar');
  const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()');
  if (progress && !supportsScrollTimeline) {
    let raf = null;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + '%';
      raf = null;
    };
    window.addEventListener('scroll', () => {
      if (raf == null) raf = requestAnimationFrame(updateProgress);
    }, { passive: true });
    updateProgress();
  }

  /* =========================================================
     2 · Nav scrolled state
     ========================================================= */
  const nav = document.querySelector('.nav');
  if (nav) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if ((y > 60) !== (last > 60)) nav.classList.toggle('scrolled', y > 60);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
     3 · Hero title — split into chars + spring stagger
     ========================================================= */
  const heroTitle = document.querySelector('.hero-title');
  const canSplitHeroTitle = false;
  if (heroTitle && !reduce && canSplitHeroTitle) {
    // Walk text nodes, wrap each non-space char in a span. Preserve <em>.
    const wrap = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          [...n.textContent].forEach((ch, idx) => {
            if (ch === ' ' || ch === ' ') {
              frag.appendChild(document.createTextNode(ch));
            } else {
              const s = document.createElement('span');
              s.className = 'char';
              s.textContent = ch;
              frag.appendChild(s);
            }
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === Node.ELEMENT_NODE && n.tagName !== 'BR') {
          wrap(n);
        }
      });
    };
    wrap(heroTitle);
    // Set --i index for stagger delay
    [...heroTitle.querySelectorAll('.char')].forEach((c, i) => {
      c.style.setProperty('--i', i);
    });
    // Trigger after first paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => heroTitle.classList.add('visible'));
    });
  } else if (heroTitle) {
    heroTitle.classList.add('visible');
  }

  /* =========================================================
     4 · Reveal-on-scroll · IntersectionObserver
     ========================================================= */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        // For .reveal-stagger, set --i on direct children
        if (e.target.classList.contains('reveal-stagger')) {
          [...e.target.children].forEach((c, i) => c.style.setProperty('--i', i));
        }
        e.target.classList.add('visible');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  /* =========================================================
     5 · Section in-view (drives the .section-tag::before scaleX)
     ========================================================= */
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => sectionIO.observe(s));
  }

  /* =========================================================
     6 · Count-up numbers · easeOutQuint, 720ms
     ========================================================= */
  const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

  // Parse a value like "93%", "R$ 1,28M", "~120", "2.000+" into { prefix, num, suffix, decimals }
  // Brazilian convention: comma = decimal separator, period = thousands separator.
  const parseValue = (raw) => {
    const m = raw.match(/^(\D*?)(-?[\d.,]+)(.*)$/s);
    if (!m) return null;
    const [, prefix, numStr, suffix] = m;
    const cleaned = numStr.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    if (!Number.isFinite(num)) return null;
    const decimals = numStr.includes(',') ? (numStr.split(',')[1] || '').length : 0;
    return { prefix, num, suffix, decimals, raw: numStr };
  };

  const formatNumber = (num, decimals) => {
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const isCountable = (raw) => {
    if (raw.includes('\n')) return false;
    if (raw.length > 14) return false;
    // En-dash or em-dash signals a range like "80–120" or "R$ 1,28M – 1,92M"
    if (/[–—]/.test(raw)) return false;
    return true;
  };

  const animateCountTo = (el, parsed) => {
    const target = parsed.num;
    const duration = 780;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const k = easeOutQuint(t);
      el.textContent = parsed.prefix + formatNumber(target * k, parsed.decimals) + parsed.suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = parsed.prefix + formatNumber(target, parsed.decimals) + parsed.suffix;
    };
    requestAnimationFrame(tick);
  };

  // Phase 1 — pre-zero all valid candidates synchronously so user never sees real value first
  const candidates = [];
  if (!reduce) {
    document.querySelectorAll('.stat-value, .stat-value-mono').forEach((el) => {
      const raw = el.textContent.trim();
      if (!isCountable(raw)) return;
      const parsed = parseValue(raw);
      if (!parsed) return;
      // Skip if suffix has more digits (compound number)
      if (/\d/.test(parsed.suffix)) return;
      if (Math.abs(parsed.num) < 1) return;
      candidates.push({ el, parsed });
      el.textContent = parsed.prefix + formatNumber(0, parsed.decimals) + parsed.suffix;
      el.setAttribute('data-count-target', String(parsed.num));
    });
  }

  // Phase 2 — observe and animate when each enters view
  if (candidates.length) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const c = candidates.find((x) => x.el === e.target);
        if (c) animateCountTo(c.el, c.parsed);
        countIO.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    candidates.forEach(({ el }) => countIO.observe(el));
  }

  /* =========================================================
     7 · Bar charts · spring-decay cascade
     ========================================================= */
  const barCharts = document.querySelectorAll('.bar-chart');
  if (barCharts.length) {
    const barIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const fills = e.target.querySelectorAll('.bar-fill');
        fills.forEach((bar, i) => {
          const target = bar.dataset.width || bar.style.width || '0%';
          bar.style.width = '0%';
          // Slight stagger so the cascade is felt
          setTimeout(() => { bar.style.width = target; }, 100 + i * 70);
        });
        barIO.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    barCharts.forEach((c) => barIO.observe(c));
  }

  /* =========================================================
     8 · TOC scrollspy · CSS spring on .active::before width gives the morph
     ========================================================= */
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    const targets = [];
    const linkByTarget = new Map();
    tocLinks.forEach((a) => {
      const id = a.getAttribute('href');
      const t = id ? document.querySelector(id) : null;
      if (t) {
        targets.push(t);
        linkByTarget.set(t, a);
      }
    });

    const setActive = (link) => {
      if (!link || link.classList.contains('active')) return;
      tocLinks.forEach((a) => a.classList.remove('active'));
      link.classList.add('active');
    };

    if (targets.length) {
      const tocIO = new IntersectionObserver((entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(linkByTarget.get(visible[0].target));
      }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });
      targets.forEach((t) => tocIO.observe(t));
    }

    tocLinks.forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const t = id ? document.querySelector(id) : null;
        if (!t) return;
        e.preventDefault();
        setActive(a);
        t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  /* =========================================================
     9 · Table row cursor-trail · sets --row-trail-x in %
     ========================================================= */
  if (!reduce) {
    document.querySelectorAll('.table-wrap').forEach((wrap) => {
      const tbody = wrap.querySelector('tbody');
      if (!tbody) return;
      let activeRow = null;
      let rafId = null;
      let pendingX = 50;

      const onMove = (e) => {
        const tr = e.target.closest('tr');
        if (!tr || tr.parentElement !== tbody) return;
        const rect = tr.getBoundingClientRect();
        pendingX = ((e.clientX - rect.left) / rect.width) * 100;
        if (rafId == null) {
          rafId = requestAnimationFrame(() => {
            if (activeRow) activeRow.style.setProperty('--row-trail-x', pendingX + '%');
            rafId = null;
          });
        }
        if (activeRow !== tr) {
          if (activeRow) activeRow.style.removeProperty('--row-trail-x');
          activeRow = tr;
        }
      };

      const onLeave = () => {
        if (activeRow) activeRow.style.removeProperty('--row-trail-x');
        activeRow = null;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      };

      tbody.addEventListener('mousemove', onMove, { passive: true });
      tbody.addEventListener('mouseleave', onLeave, { passive: true });
    });
  }

  /* =========================================================
     10 · Hero canvas · slow drift parchment particles
     ========================================================= */
  const heroCanvas = document.querySelector('.hero-canvas');
  if (heroCanvas && !reduce) {
    const ctx = heroCanvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let mouseX = 0.5;
    let mouseY = 0.5;
    let running = true;

    const resize = () => {
      const w = heroCanvas.clientWidth;
      const h = heroCanvas.clientHeight;
      heroCanvas.width = Math.floor(w * dpr);
      heroCanvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Particle density tuned to area, capped to keep mid-range devices smooth
      const count = Math.min(140, Math.max(36, Math.floor((w * h) * 0.00010)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        r: 0.5 + Math.random() * 1.4,
        a: 0.06 + Math.random() * 0.16,
      }));
    };

    const tick = () => {
      if (!running) return;
      const w = heroCanvas.clientWidth;
      const h = heroCanvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      // Paint glyph-grade tinted dots — antique brass
      ctx.fillStyle = 'oklch(76% 0.110 78)';
      // Slow cursor parallax — particles drift toward inverse of mouse offset
      const offX = (mouseX - 0.5) * 24;
      const offY = (mouseY - 0.5) * 16;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap
        if (p.x < -2) p.x = w + 2;
        if (p.x > w + 2) p.x = -2;
        if (p.y < -2) p.y = h + 2;
        if (p.y > h + 2) p.y = -2;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x - offX, p.y - offY, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    };

    const onMouse = (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    // Pause when hero leaves viewport
    const heroEl = heroCanvas.parentElement;
    const visIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !running) {
          running = true;
          requestAnimationFrame(tick);
        } else if (!e.isIntersecting) {
          running = false;
        }
      });
    }, { threshold: 0 });
    visIO.observe(heroEl);

    resize();
    window.addEventListener('resize', () => {
      resize();
    }, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    requestAnimationFrame(tick);
  }

  /* =========================================================
     11 · Subtle cursor (pointer:fine only, motion enabled)
     ========================================================= */
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    let cx = -100, cy = -100, tx = -100, ty = -100;
    let visible = false;

    const setVisible = (v) => {
      if (v === visible) return;
      visible = v;
      cursor.classList.toggle('visible', v);
    };

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      const tag = e.target?.tagName;
      const isLink = e.target?.closest('a, button, .toc a');
      const isData = e.target?.closest('td, .stat, .summary-card, .bar-row');
      cursor.classList.toggle('over-link', !!isLink);
      cursor.classList.toggle('over-data', !!isData && !isLink);
    });

    document.addEventListener('mouseleave', () => setVisible(false));

    // Animate at 60fps with light easing
    const animate = () => {
      cx += (tx - cx) * 0.28;
      cy += (ty - cy) * 0.28;
      cursor.style.setProperty('--cx', cx + 'px');
      cursor.style.setProperty('--cy', cy + 'px');
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  /* =========================================================
     12 · Anchor links — smooth scroll + view transitions
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.closest('.toc')) return; // already handled
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    a.addEventListener('click', (e) => {
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });

})();
