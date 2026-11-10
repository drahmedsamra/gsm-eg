import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Check if request is coming through verify subdomain
  // e.g. verify.gsm-eg.com or verify.localhost:3000
  const isVerifySubdomain =
    hostname.startsWith("verify.") ||
    hostname === "verify.gsm-eg.com";

  if (isVerifySubdomain) {
    const pathname = url.pathname;

    // Skip API, static files, and internal next assets
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    if (pathname === "/" || pathname === "") {
      url.pathname = "/verify";
      return NextResponse.rewrite(url);
    }

    // If a direct code was visited e.g. verify.gsm-eg.com/20263435227
    const code = pathname.replace(/^\//, "").trim();
    if (code && !code.startsWith("verify")) {
      url.pathname = "/verify";
      url.searchParams.set("code", code);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};

export default proxy;

