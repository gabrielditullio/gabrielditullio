import { useEffect } from "react";
import briefingHtml from "../content/mentoriamvp-launch-pago.html?raw";

const CACHE_BUST = "20260427-progress-yellow";
const scriptSrc = `/mentoriamvp_launch_pago/script.js?v=${CACHE_BUST}`;
const styleHref = `/mentoriamvp_launch_pago/styles.css?v=${CACHE_BUST}`;

const MentoriaMvpLaunchPago = () => {
  useEffect(() => {
    document.body.classList.add("briefing-v2");
    const previousTitle = document.title;
    document.title =
      "Briefing — Lançamento Mentoria MVP · Workshop MVP de Junho/2026 · v2";

    // Load the static stylesheet via <link> so it matches the static page exactly
    let link = document.querySelector<HTMLLinkElement>(
      'link[data-mentoria-pago="1"]'
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleHref;
      link.dataset.mentoriaPago = "1";
      document.head.appendChild(link);
    }

    // Remove any prior rails/scripts (StrictMode double-invoke or stale mount)
    document.querySelectorAll(".section-rail").forEach((rail) => rail.remove());
    document
      .querySelectorAll('script[data-mentoria-pago="1"]')
      .forEach((s) => s.remove());

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.dataset.mentoriaPago = "1";
    document.body.appendChild(script);

    // Force-correct the rail's active highlight on click — the
    // IntersectionObserver in script.js sometimes mis-detects the
    // section after a hash jump (especially the very first one),
    // leaving the wrong rail item highlighted.
    const onRailClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest(".section-rail .rail-link") as
        | HTMLAnchorElement
        | null;
      if (!link) return;
      const rail = link.closest(".section-rail");
      if (!rail) return;
      const setActive = () => {
        rail
          .querySelectorAll(".rail-link")
          .forEach((l) => l.classList.toggle("is-active", l === link));
        const id = link.getAttribute("href")?.slice(1);
        if (id) {
          document
            .querySelectorAll("section")
            .forEach((s) => s.classList.toggle("is-current", s.id === id));
        }
      };
      // Run after the browser's hash-jump scroll settles, then again
      // shortly after to override any IntersectionObserver callback.
      requestAnimationFrame(setActive);
      setTimeout(setActive, 120);
      setTimeout(setActive, 360);
    };
    document.addEventListener("click", onRailClick, true);

    return () => {
      document.body.classList.remove("briefing-v2", "is-focus");
      document.querySelectorAll(".section-rail").forEach((rail) => rail.remove());
      document
        .querySelectorAll('script[data-mentoria-pago="1"]')
        .forEach((s) => s.remove());
      document
        .querySelectorAll('link[data-mentoria-pago="1"]')
        .forEach((l) => l.remove());
      document.removeEventListener("click", onRailClick, true);
      document.title = previousTitle;
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: briefingHtml }} />;
};

export default MentoriaMvpLaunchPago;
