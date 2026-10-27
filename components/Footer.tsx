import Image from "next/image";
import Link from "next/link";
import React from "react";

const alexandrieOrigin = "https://alexandrie.app";

const monthYearFr = (): string => {
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date());
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const footerLinkClass =
  "inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white no-underline";

const Footer: React.FC = () => {
  const copyrightLine = `© Alexandrie – Tous droits réservés – ${monthYearFr()}.`;

  return (
    <footer className="bg-teal px-4 pb-10 pt-14 sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href={alexandrieOrigin}
              className="inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo_full.png"
                alt="Alexandrie"
                width={140}
                height={32}
                className="h-7 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              L&apos;outil de gestion pensé pour les libraires indépendants.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Produits
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href="https://alexandrie.app/"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Librairie
                </a>
              </li>
              <li>
                <a
                  href="https://nouveautes.alexandrie.app/"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nouveautés
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Ressources
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/" className={footerLinkClass}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href="mailto:jordan@alexandrie.app"
                  className={footerLinkClass}
                >
                  <MailIcon />
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Nous suivre
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href="https://www.instagram.com/alexandrieapp/"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/alexandrie-app"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-8 text-xs text-white/40 sm:gap-12">
          <div className="flex items-center gap-3">
            <span>Soutenu par le</span>
            <Image
              src="/logo_cnl.avif"
              alt="CNL"
              width={80}
              height={36}
              className="h-10 w-auto brightness-0 invert opacity-60"
            />
          </div>
          <div className="flex items-center gap-3">
            <span>Partenaire de</span>
            <Image
              src="/logo_dilicom.svg"
              alt="Dilicom"
              width={80}
              height={24}
              className="h-6 w-auto brightness-0 invert opacity-60"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>{copyrightLine}</p>
          <div className="flex gap-5">
            <a
              href={`${alexandrieOrigin}/legal/privacy`}
              className="transition-colors hover:text-white/60 no-underline text-white/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              Confidentialité
            </a>
            <a
              href={`${alexandrieOrigin}/legal/terms`}
              className="transition-colors hover:text-white/60 no-underline text-white/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
    aria-hidden
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
    aria-hidden
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
