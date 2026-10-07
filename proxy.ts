import { NextResponse, type NextRequest } from "next/server";
import { segmentAliases } from "@/lib/i18n";

// Dil yönlendirme:
// - TR varsayılan dil: URL'de prefix yok ve adresler Türkçe (/hizmetler) → içeride /tr/services'e rewrite.
// - TR'de eski İngilizce adresler (/services, /references/...) → Türkçe adrese 308 (eski linkler kırılmasın).
// - EN: /en/services. EN'de Türkçe segment (/en/hizmetler) → /en/services'e 308.
// - /tr/... ile gelen istekler öneksiz adrese 308.
// Eşleme tablosu: lib/i18n.ts → segmentAliases
const trAlias = segmentAliases.tr; // services → hizmetler
const trInternal = Object.fromEntries(Object.entries(trAlias).map(([k, v]) => [v, k])); // hizmetler → services

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/tr" || pathname.startsWith("/tr/")) {
    return redirect(request, pathname.replace(/^\/tr/, "") || "/");
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const [, , first = "", ...rest] = pathname.split("/");
    if (trInternal[first]) return redirect(request, ["", "en", trInternal[first], ...rest].join("/"));
    return;
  }

  const [, first = "", ...rest] = pathname.split("/");
  // Eski İngilizce TR adresi → Türkçe adres
  if (trAlias[first]) return redirect(request, ["", trAlias[first], ...rest].join("/"));
  // Türkçe adres → içerideki İngilizce klasör
  const internal = trInternal[first] ? ["", trInternal[first], ...rest].join("/") : pathname;

  const url = request.nextUrl.clone();
  url.pathname = `/tr${internal === "/" ? "" : internal}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // _next, api, statik dosyalar (uzantılı yollar) hariç
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
