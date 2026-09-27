import { notFound } from "next/navigation";

// Eşleşmeyen tüm adresler [locale]/not-found.tsx sayfasına düşer.
export default function CatchAll() {
  notFound();
}
