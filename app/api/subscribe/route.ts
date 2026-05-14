import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId  = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Beehiiv error:", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
