import { useEffect } from "react";
import "../../public/mentoriamvp_launch_pago/styles.css";
import briefingHtml from "../content/mentoriamvp-launch-pago.html?raw";

const scriptSrc = "/mentoriamvp_launch_pago/script.js?v=20260427-clean-url";

const MentoriaMvpLaunchPago = () => {
  useEffect(() => {
    document.body.classList.add("briefing-v2");

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.classList.remove("briefing-v2", "is-focus");
      document.querySelectorAll(".section-rail").forEach((rail) => rail.remove());
      script.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: briefingHtml }} />;
};

export default MentoriaMvpLaunchPago;
