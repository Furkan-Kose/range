import { ui } from "@/content/navigation";
import { t } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

// not-found params almaz; varsayılan dil (TR) + EN birlikte gösterilir.
export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-[var(--nav-h)]">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="text-h1 mt-6 max-w-2xl">{t(ui.notFoundTitle, "tr")}</h1>
        <p className="text-body mt-3 text-muted">{t(ui.notFoundTitle, "en")}</p>
        <Button href="/" className="mt-10">
          {t(ui.backHome, "tr")}
        </Button>
      </Container>
    </section>
  );
}
