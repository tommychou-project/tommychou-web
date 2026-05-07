import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, message } = body;

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: firstName },
          { name: "lastname", value: lastName },
          { name: "email", value: email },
          { name: "message", value: message },
        ],
        context: {
          pageUri: "https://tommychou.com/contact",
          pageName: "Contact",
        },
      }),
    }
  );

  if (res.ok) {
    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}