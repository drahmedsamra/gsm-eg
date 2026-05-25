"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GsmLogo } from "@/components/ui/GsmLogo";

import { siteConfig } from "@/data/site";

import { navItems, navLabels } from "@/lib/i18n/messages";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, t } = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-2" : "bg-transparent py-3",
      )}
    >
      <Container>
        <nav
          className="flex min-h-11 items-center justify-between gap-6"
          aria-label={t("navLabel")}
        >
          {/* Logo + Title */}
          <Link
            href="#hero"
            className={cn(
              "group flex items-center gap-2 sm:gap-3 -ms-1 shrink-0 rounded-lg py-1 ps-1 pe-2",
              "transition-opacity duration-200 hover:opacity-[0.88]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsm-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            )}
            onClick={() => setMenuOpen(false)}
            aria-label="GSM Academy — الرئيسية"
          >
            <GsmLogo
              height={scrolled ? 34 : 40}
              priority
            />

            <div className="flex flex-col items-center text-center leading-none">
              <p
                className={cn(
                  "font-bold text-gsm-navy transition-all duration-300",
                  scrolled
                    ? "text-sm sm:text-base"
                    : "text-base sm:text-lg",
                )}
              >
                {locale === "ar"
                  ? "أكاديمية جي إس إم"
                  : "GSM ACADEMY"}
              </p>

              <p
                className={cn(
                  "mt-1 w-full text-center text-gsm-muted transition-all duration-300",
                  scrolled
                    ? "text-[9px] sm:text-[11px]"
                    : "text-[10px] sm:text-xs",
                )}
              >
                {locale === "ar"
                  ? "للإلكترونيات والبرمجيات"
                  : "Electronics & Programming"}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gsm-blue",
                    scrolled
                      ? "text-gsm-navy/80"
                      : "text-gsm-navy/90",
                  )}
                >
                  {pick(locale, navLabels[link.key])}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />

            <Button
              href={siteConfig.whatsapp.href(locale)}
              variant="primary"
              size="sm"
            >
              {t("bookNow")}
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />

            <button
              type="button"
              className={cn(
                "relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl",
                scrolled
                  ? "bg-gsm-navy/5"
                  : "bg-white/60 backdrop-blur-sm",
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={
                menuOpen ? t("closeMenu") : t("openMenu")
              }
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={cn(
                  "block h-0.5 w-5 bg-gsm-navy transition-all",
                  menuOpen && "translate-y-2 rotate-45",
                )}
              />

              <span
                className={cn(
                  "block h-0.5 w-5 bg-gsm-navy transition-all",
                  menuOpen && "opacity-0",
                )}
              />

              <span
                className={cn(
                  "block h-0.5 w-5 bg-gsm-navy transition-all",
                  menuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </Container>

      {/* Backdrop */}
      <div
        id="mobile-menu-backdrop"
        className={cn(
          "fixed inset-0 z-40 bg-gsm-navy/20 backdrop-blur-sm transition-opacity lg:hidden",
          menuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-[85vw] max-w-[20rem] bg-white shadow-2xl transition-transform duration-300 lg:hidden",
          menuOpen
            ? "translate-x-0"
            : "-translate-x-[110%]",
        )}
      >
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-6 pt-24">
          <ul className="flex flex-col gap-4">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-lg font-medium text-gsm-navy hover:text-gsm-blue"
                  onClick={() => setMenuOpen(false)}
                >
                  {pick(locale, navLabels[link.key])}
                </Link>
              </li>
            ))}
          </ul>

          <Button
            href={siteConfig.whatsapp.href(locale)}
            variant="primary"
            className="w-full"
            onClick={() => setMenuOpen(false)}
          >
            {t("bookNow")}
          </Button>
        </div>
      </div>
    </header>
  );
}