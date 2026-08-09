import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Innflow",
    short_name: "Innflow",
    description: "Connected operational workflows with visible human control.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf7",
    theme_color: "#1760a8",
    icons: [
      {
        src: "/brand/innflow-logo-primary.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
