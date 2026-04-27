import { useEffect } from "react";
import briefingHtml from "../content/mentoriamvp-launch-pago.html?raw";

const CACHE_BUST = "20260427-sync-v2ext";
const scriptSrc = `/mentoriamvp_launch_pago/script.js?v=${CACHE_BUST}`;
const styleHref = `/mentoriamvp_launch_pago/styles.css?v=${CACHE_BUST}`;

const MentoriaMvpLaunchPago = () => {
  useEffect(() => {
    document.body.classList.add("briefing-v2");

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

    // If the URL already has a hash, scroll to it once the DOM is laid out
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }

    return () => {
      document.body.classList.remove("briefing-v2", "is-focus");
      document.querySelectorAll(".section-rail").forEach((rail) => rail.remove());
      document
        .querySelectorAll('script[data-mentoria-pago="1"]')
        .forEach((s) => s.remove());
      document
        .querySelectorAll('link[data-mentoria-pago="1"]')
        .forEach((l) => l.remove());
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: briefingHtml }} />;
};

export default MentoriaMvpLaunchPago;
