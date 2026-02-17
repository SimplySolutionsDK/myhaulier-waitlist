import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/db";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, company } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const result = await addToWaitlist(
      email.toLowerCase().trim(),
      name?.trim(),
      company?.trim(),
      ip
    );

    if (result.alreadyExists) {
      return NextResponse.json(
        { error: "You're already on the waitlist! We'll be in touch." },
        { status: 409 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're on the list! We'll notify you at launch." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
