"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

function appendInlineScript(id: string, source: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.textContent = source;
  document.head.appendChild(script);
}

export function ConsentManagedTags() {
  useEffect(() => {
    const { apolloAppId, googleTagManagerId, termlyResourceBlockerId } =
      siteConfig.analytics;
    const blockerId = "innflow-termly-resource-blocker";
    // The root layout owns these scripts for the document lifetime. Retaining
    // them also prevents duplicate loading during React's development replay.
    if (document.getElementById(blockerId)) return;

    const blocker = document.createElement("script");
    blocker.id = blockerId;
    blocker.src = `https://app.termly.io/resource-blocker/${termlyResourceBlockerId}?autoBlock=on`;
    blocker.async = true;
    // No optional tracking script is inserted if the blocker fails to load.
    blocker.onload = () => {
      appendInlineScript(
        "innflow-google-tag-manager",
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`,
      );
      appendInlineScript(
        "innflow-apollo-tracker",
        `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"${apolloAppId}"})},
document.head.appendChild(o)}initApollo();`,
      );
    };
    document.head.appendChild(blocker);
  }, []);

  return null;
}
