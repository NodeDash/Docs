import React, { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Redirect({ to }) {
  const location = useLocation();
  const baseUrl = useBaseUrl("");

  useEffect(() => {
    const targetUrl = baseUrl + to + location.search + location.hash;
    window.location.replace(targetUrl);
  }, [to, location, baseUrl]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
