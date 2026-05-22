import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SubscribeSchema = z.object({
  email: z.string().email("invalid email").max(200),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = SubscribeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const apiKey = process.env.BEEHIIV_API_KEY;
    const pubId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !pubId) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: "Subscription failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe API]", err);
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 }
    );
  }
}
