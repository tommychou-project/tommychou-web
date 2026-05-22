import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  firstName: z.string().min(1, "firstName required").max(50),
  lastName: z.string().min(1, "lastName required").max(50),
  email: z.string().email("invalid email").max(200),
  message: z.string().min(1, "message required").max(3000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "invalid input" },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, message } = result.data;

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
  } catch (err) {
    console.error("[contact API]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
