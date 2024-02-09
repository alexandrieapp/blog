import Link from "@components/Link";
import Logo from "@components/Logo";
import React from "react";

const alexandrieUrl = (page: string): string =>
  `https://alexandrie.app/${page}`;

const Footer: React.FC = () => {
  return (
    <footer className="px-5 md:px-8 py-12 border-t border-gray-100">
      <div className="grid grid-cols-2 sm:grid-cols-12 gap-8 sm:gap-4 lg:gap-16 max-w-6xl mx-auto">
        <div className="hidden sm:flex col-span-3 lg:col-span-4 flex-col justify-between">
          <Link
            href={alexandrieUrl("")}
            className="flex items-center space-x-2"
          >
            <Logo />
            <span className="text-xl font-bold">Alexandrie</span>
          </Link>

          <Copyright />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="text-xs font-bold uppercase text-gray-500 mb-4">
            Produit
          </p>
          <ul className="text-gray-500 space-y-4">
            <FooterListLink href={alexandrieUrl("pricing")}>
              Tarifs
            </FooterListLink>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="text-xs font-bold uppercase text-gray-500 mb-4">
            Entreprise
          </p>
          <ul className="text-gray-500 space-y-4">
            <FooterListLink href={alexandrieUrl("about")}>
              A propos
            </FooterListLink>
            <FooterListLink href={"/"}>Blog</FooterListLink>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="text-xs font-bold uppercase text-gray-500 mb-4">
            Contact
          </p>
          <ul className="text-gray-500 space-y-4">
            <FooterListLink href={"https://github.com/alexandrieapp"}>
              GitHub
            </FooterListLink>
            <FooterListLink href={"mailto:jordan@alexandrie.app"}>
              Email
            </FooterListLink>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="text-xs font-bold uppercase text-gray-500 mb-4">
            Legal
          </p>
          <ul className="text-gray-500 space-y-4">
            <FooterListLink href={alexandrieUrl("legal/privacy")}>
              Politique de confidentialité
            </FooterListLink>
            <FooterListLink href={alexandrieUrl("legal/terms")}>
              Conditions d'utilisation
            </FooterListLink>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterListLink: React.FC<{
  href: string;
  children?: React.ReactNode;
}> = ({ children, href }) => (
  <li>
    <Link href={href} className="hover:text-foreground">
      {children}
    </Link>
  </li>
);

const Copyright: React.FC = () => (
  <div className="text-xs text-gray-500 w-full">
    Copyright © {new Date().getFullYear()} Alexandrie. <br />
    Tous droits réservés.
  </div>
);
