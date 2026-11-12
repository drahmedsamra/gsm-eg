import { NextResponse } from "next/server";
import crypto from "crypto";

const rateLimitMap = new Map<string, { attempts: number; resetAt: number }>();

function checkPinRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { attempts: 1, resetAt: now + 5 * 60 * 1000 }); // 5 minutes window
    return true;
  }

  if (record.attempts >= 7) {
    return false;
  }

  record.attempts += 1;
  return true;
}

function getSecret(): string {
  return process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PIN || "gsm-pin-secret-key-2026";
}

function createToken(): string {
  const payload = {
    role: "admin",
    created: Date.now(),
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [data, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
    if (signature !== expectedSig) return false;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (Date.now() > payload.expires) return false;
    return true;
  } catch {
    return false;
  }
}

// GET: Check if current token is valid
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "") || "";

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const isValid = verifyToken(token);
  return NextResponse.json({ authenticated: isValid }, { status: isValid ? 200 : 401 });
}

// POST: Verify PIN code and issue token
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!checkPinRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "تم حظر المحاولات مؤقتاً بسبب كثرة الإدخال الخاطئ. يرجى المحاولة بعد 5 دقائق.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const pin = String(body.pin || "").trim();

    const expectedPin = (process.env.ADMIN_PIN || "2026").trim();

    if (!pin) {
      return NextResponse.json(
        { success: false, error: "يرجى إدخال الرمز السري" },
        { status: 400 }
      );
    }

    if (pin !== expectedPin) {
      return NextResponse.json(
        { success: false, error: "الرمز السري غير صحيح، يرجى المحاولة مرة أخرى" },
        { status: 401 }
      );
    }

    // Success: Generate admin session token
    const token = createToken();
    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع أثناء التحقق" },
      { status: 500 }
    );
  }
}
