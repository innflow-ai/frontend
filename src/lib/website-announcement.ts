import { unstable_cache } from "next/cache";
import { normalizeAnnouncement } from "@/config/website-announcement";
import { sanityClient } from "./sanity";
export const getWebsiteAnnouncement = unstable_cache(
  async () => {
    try {
      const value = await sanityClient.fetch(
        `*[_type == "websiteAnnouncement" && _id == "website-announcement"][0]{enabled,"id":campaignId,supportingCopy,offer,modelRelease{id,name,"iconSrc":icon.asset->url,action}}`,
      );
      return normalizeAnnouncement(value);
    } catch {
      console.error("Website announcement unavailable");
      return null;
    }
  },
  ["website-announcement"],
  { revalidate: 60, tags: ["website-announcement"] },
);
