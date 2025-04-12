import { useEffect } from "react";
import { api } from "../services/api";

const useTrackVisit = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");

    if (source || medium || campaign) {
      api
        .post("/analytics/trackdata", {
          source,
          medium,
          campaign,
          path: window.location.pathname,
        })
        .catch((err) => {
          console.error("Tracking failed:", err.message);
        });
    }
  }, []);
};

export default useTrackVisit;
