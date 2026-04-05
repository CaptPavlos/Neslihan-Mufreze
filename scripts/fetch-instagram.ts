/**
 * Build-time Instagram feed scraper.
 *
 * This script fetches recent Instagram posts via the Instagram Basic Display API
 * and writes them to `public/instagram.json` for use as static data at build time.
 *
 * Prerequisites:
 *   - Set INSTAGRAM_ACCESS_TOKEN in your environment
 *   - The token must have `user_media` and `user_profile` permissions
 *
 * Usage:
 *   npx tsx scripts/fetch-instagram.ts
 *
 * Until an API token is available, this script exits gracefully and the site
 * uses the placeholder data defined in components/instagram-feed.tsx.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const INSTAGRAM_API = "https://graph.instagram.com";
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const OUTPUT_PATH = join(process.cwd(), "public", "instagram.json");
const POST_COUNT = 6;

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
}

interface InstagramResponse {
  data: InstagramMedia[];
}

async function fetchInstagramPosts(): Promise<InstagramMedia[]> {
  const url = new URL(`${INSTAGRAM_API}/me/media`);
  url.searchParams.set("fields", "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url");
  url.searchParams.set("limit", String(POST_COUNT));
  url.searchParams.set("access_token", TOKEN!);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as InstagramResponse;
  return json.data;
}

async function main() {
  if (!TOKEN) {
    console.log("[instagram] No INSTAGRAM_ACCESS_TOKEN set — skipping fetch.");
    console.log("[instagram] The site will use placeholder data from components/instagram-feed.tsx.");
    process.exit(0);
  }

  console.log(`[instagram] Fetching latest ${POST_COUNT} posts...`);

  const posts = await fetchInstagramPosts();

  const output = posts.map((post) => ({
    id: post.id,
    caption: post.caption ?? "",
    mediaUrl: post.media_type === "VIDEO" ? post.thumbnail_url ?? post.media_url : post.media_url,
    permalink: post.permalink,
    timestamp: post.timestamp,
  }));

  mkdirSync(join(process.cwd(), "public"), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`[instagram] Wrote ${output.length} posts to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("[instagram] Failed to fetch posts:", error);
  process.exit(1);
});
