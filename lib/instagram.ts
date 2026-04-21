const GRAPH_API_VERSION = "v21.0";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramPost {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  permalink: string;
  caption: string;
  mediaType: InstagramMediaType;
  timestamp: string;
  likeCount: number;
  commentsCount: number;
  width: number;
  height: number;
}

interface GraphMedia {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface GraphResponse {
  data?: GraphMedia[];
}

function normalizeMediaType(raw: string): InstagramMediaType {
  const upper = raw.toUpperCase();
  if (upper === "VIDEO") return "VIDEO";
  if (upper === "CAROUSEL_ALBUM") return "CAROUSEL_ALBUM";
  return "IMAGE";
}

function truncateCaption(caption: string | undefined, max = 180): string {
  if (!caption) return "";
  const clean = caption.trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}…`;
}

async function fetchFromGraphApi(
  userId: string,
  token: string,
  limit: number,
): Promise<InstagramPost[] | null> {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
    "like_count",
    "comments_count",
  ].join(",");
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[instagram] Graph API failed: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = (await res.json()) as GraphResponse;
    const items = data.data ?? [];
    return items.slice(0, limit).map((item) => {
      const mediaType = normalizeMediaType(item.media_type);
      const isVideo = mediaType === "VIDEO";
      const imageUrl = isVideo
        ? item.thumbnail_url ?? item.media_url ?? ""
        : item.media_url ?? item.thumbnail_url ?? "";
      return {
        id: item.id,
        imageUrl,
        thumbnailUrl: item.thumbnail_url ?? imageUrl,
        permalink: item.permalink,
        caption: truncateCaption(item.caption),
        mediaType,
        timestamp: item.timestamp,
        likeCount: item.like_count ?? 0,
        commentsCount: item.comments_count ?? 0,
        width: 1080,
        height: 1080,
      };
    });
  } catch (error) {
    console.error("[instagram] Graph API error:", error);
    return null;
  }
}

const FALLBACK_LIKES = [1240, 2100, 847, 1530, 3200, 960, 1820, 1075, 2450, 1390, 2780, 905];
const FALLBACK_COMMENTS = [48, 72, 31, 55, 120, 29, 68, 41, 87, 52, 95, 33];
const INSTAGRAM_PROFILE_URL = "https://instagram.com/neslihanmufreze";

function getFallbackPosts(limit: number): InstagramPost[] {
  return Array.from({ length: 12 }, (_, i) => {
    const index = i + 1;
    return {
      id: `fallback-${index}`,
      imageUrl: `/photos/photo-${index}.jpeg`,
      thumbnailUrl: `/photos/photo-${index}.jpeg`,
      permalink: INSTAGRAM_PROFILE_URL,
      caption: "",
      mediaType: "IMAGE" as const,
      timestamp: new Date().toISOString(),
      likeCount: FALLBACK_LIKES[i],
      commentsCount: FALLBACK_COMMENTS[i],
      width: 1080,
      height: 1080,
    };
  }).slice(0, limit);
}

export async function getInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (token && userId) {
    const graph = await fetchFromGraphApi(userId, token, limit);
    if (graph && graph.length > 0) return graph;
  }

  return getFallbackPosts(limit);
}
