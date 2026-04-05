import { NextResponse } from "next/server";
import { fetchInstagramPosts } from "@/lib/instagram";

export async function GET() {
  try {
    const posts = await fetchInstagramPosts(8);
    return NextResponse.json({ posts });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch Instagram posts";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
