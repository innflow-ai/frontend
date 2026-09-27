import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { artworkAssets } from "@/components/product-artwork/inventory";
import { ProductArtwork } from "@/components/product-artwork/product-artwork";
import { productArtworkScenes } from "@/content/product-artwork-scenes";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
export const metadata: Metadata = {
  title: "Product artwork library",
  robots: { index: false, follow: false },
};
export default function ArtworkLibrary() {
  return (
    <main
      className={geist.variable}
      style={{
        padding: "120px 24px 48px",
        background: "#fcfbf8",
        color: "#071a31",
      }}
    >
      <h1>Product artwork library</h1>
      <p>113 illustrative components. Full-size artwork and compact crop.</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: 32,
        }}
      >
        {Object.keys(productArtworkScenes).map((id) => (
          <article key={id} data-preview-asset={id}>
            <h2 style={{ fontSize: 18, margin: "20px 0" }}>
              {id} · {artworkAssets[id].name}
            </h2>
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 32,
                overflow: "hidden",
                background:
                  "linear-gradient(155deg,#092945,#5b9edf 33%,#f2c5c5 63%,#b49bff)",
              }}
            >
              <ProductArtwork assetId={id} />
            </div>
            <div
              style={{
                width: 260,
                aspectRatio: "1.2",
                marginTop: 20,
                borderRadius: 24,
                overflow: "hidden",
                background:
                  "linear-gradient(170deg,#c2dcfa 22%,#eef8fc 45%,#5dd9c5 64%,#153d45 96%)",
              }}
            >
              <ProductArtwork assetId={id} density="compact" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
