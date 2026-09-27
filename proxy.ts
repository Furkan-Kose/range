import { NextResponse, type NextRequest } from "next/server";

// TR varsayılan dil: URL'de prefix yok (/about), içeride /tr/about'a rewrite edilir.
// EN: /en/about. /tr/... ile gelen istekler prefixsiz adrese yönlendirilir.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/tr" || pathname.startsWith("/tr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/tr/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  const url = request.nextUrl.clone();
  url.pathname = `/tr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // _next, api, statik dosyalar (uzantılı yollar) hariç
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
