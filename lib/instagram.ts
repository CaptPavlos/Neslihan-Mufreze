const DEFAULT_FEED_URL = "https://feeds.behold.so/794Co8DTgnS2jsJLJ0jL";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramPost {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  permalink: string;
  caption: string;
  mediaType: InstagramMediaType;
  timestamp: string;
  width: number;
  height: number;
}

interface BeholdSize {
  mediaUrl: string;
  width: number;
  height: number;
}

interface BeholdPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  sizes?: {
    small?: BeholdSize;
    medium?: BeholdSize;
    large?: BeholdSize;
    full?: BeholdSize;
  };
  children?: BeholdPost[];
}

interface BeholdResponse {
  posts?: BeholdPost[];
}

function normalizeMediaType(raw: string): InstagramMediaType {
  const upper = raw.toUpperCase();
  if (upper === "VIDEO") return "VIDEO";
  if (upper === "CAROUSEL_ALBUM") return "CAROUSEL_ALBUM";
  return "IMAGE";
}

function pickImage(post: BeholdPost): { url: string; width: number; height: number } | null {
  const mediaType = normalizeMediaType(post.mediaType);
  const carouselFirstImage =
    mediaType === "CAROUSEL_ALBUM" ? post.children?.[0]?.sizes?.large : undefined;
  const size =
    post.sizes?.large ??
    post.sizes?.medium ??
    post.sizes?.full ??
    post.sizes?.small ??
    carouselFirstImage;

  if (size?.mediaUrl) {
    return { url: size.mediaUrl, width: size.width, height: size.height };
  }

  if (mediaType === "VIDEO" && post.thumbnailUrl) {
    return { url: post.thumbnailUrl, width: 1080, height: 1080 };
  }
  if (mediaType === "IMAGE" && post.mediaUrl) {
    return { url: post.mediaUrl, width: 1080, height: 1080 };
  }
  return null;
}

export async function getInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  const feedUrl = process.env.NEXT_PUBLIC_BEHOLD_FEED_URL ?? DEFAULT_FEED_URL;

  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[instagram] Behold fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = (await res.json()) as BeholdResponse | BeholdPost[];
    const raw = Array.isArray(data) ? data : data.posts ?? [];

    const posts: InstagramPost[] = [];
    for (const post of raw) {
      const image = pickImage(post);
      if (!image) continue;
      posts.push({
        id: post.id,
        imageUrl: image.url,
        thumbnailUrl: post.thumbnailUrl ?? image.url,
        permalink: post.permalink,
        caption: post.prunedCaption ?? post.caption ?? "",
        mediaType: normalizeMediaType(post.mediaType),
        timestamp: post.timestamp,
        width: image.width,
        height: image.height,
      });
      if (posts.length >= limit) break;
    }
    return posts;
  } catch (error) {
    console.error("[instagram] Behold fetch error:", error);
    return [];
  }
}
