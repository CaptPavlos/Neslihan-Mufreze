export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  likeCount: number;
}

const PLACEHOLDER_POSTS: InstagramPost[] = [
  {
    id: "1",
    caption: "Another sunrise from the bridge. Never gets old.",
    mediaUrl: "/images/instagram/placeholder-1.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-12-15T08:00:00Z",
    likeCount: 2847,
  },
  {
    id: "2",
    caption: "DP station keeping — precision is everything.",
    mediaUrl: "/images/instagram/placeholder-2.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-12-10T14:30:00Z",
    likeCount: 1923,
  },
  {
    id: "3",
    caption: "Golden hour hits different at sea.",
    mediaUrl: "/images/instagram/placeholder-3.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-12-05T17:00:00Z",
    likeCount: 3156,
  },
  {
    id: "4",
    caption: "Morning briefing — safety first, always.",
    mediaUrl: "/images/instagram/placeholder-4.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-11-28T06:00:00Z",
    likeCount: 1482,
  },
  {
    id: "5",
    caption: "Crew change day. See you in 28 days.",
    mediaUrl: "/images/instagram/placeholder-5.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-11-20T10:00:00Z",
    likeCount: 2291,
  },
  {
    id: "6",
    caption: "My office view for the next rotation.",
    mediaUrl: "/images/instagram/placeholder-6.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-11-15T12:00:00Z",
    likeCount: 3574,
  },
  {
    id: "7",
    caption: "Book launch day — dreams do come true.",
    mediaUrl: "/images/instagram/placeholder-7.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-11-10T18:00:00Z",
    likeCount: 4102,
  },
  {
    id: "8",
    caption: "Peace on the open water.",
    mediaUrl: "/images/instagram/placeholder-8.jpg",
    permalink: "https://instagram.com/neslihanmufreze",
    timestamp: "2025-11-05T07:00:00Z",
    likeCount: 2638,
  },
];

/**
 * Fetch Instagram posts. Uses placeholder data until INSTAGRAM_ACCESS_TOKEN is configured.
 * When ready, swap the implementation to use the Instagram Graph API.
 */
export async function fetchInstagramPosts(
  limit = 8
): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return PLACEHOLDER_POSTS.slice(0, limit);
  }

  // Real API implementation — swap in when token is available
  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,like_count&limit=${limit}&access_token=${token}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error("[Instagram] API error, falling back to placeholders");
    return PLACEHOLDER_POSTS.slice(0, limit);
  }

  const data = await res.json();
  return data.data.map(
    (post: {
      id: string;
      caption?: string;
      media_url: string;
      permalink: string;
      timestamp: string;
      like_count?: number;
    }) => ({
      id: post.id,
      caption: post.caption ?? "",
      mediaUrl: post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      likeCount: post.like_count ?? 0,
    })
  );
}
