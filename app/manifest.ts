import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.seo.title.tr,
    short_name: site.name,
    description: site.seo.description.tr,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#108a6e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
