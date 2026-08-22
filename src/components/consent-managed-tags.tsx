import { siteConfig } from "@/config/site";

export function ConsentManagedTags() {
  const { apolloAppId, googleTagManagerId, termlyResourceBlockerId } =
    siteConfig.analytics;

  return (
    <>
      <script
        id="innflow-termly-resource-blocker"
        src={`https://app.termly.io/resource-blocker/${termlyResourceBlockerId}?autoBlock=on`}
      />
      <script
        id="innflow-google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`,
        }}
      />
      <script
        id="innflow-apollo-tracker"
        dangerouslySetInnerHTML={{
          __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"${apolloAppId}"})},
document.head.appendChild(o)}initApollo();`,
        }}
      />
    </>
  );
}
