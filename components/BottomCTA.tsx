import React from "react";
import { cn } from "../utils";
import Link from "./Link";

const ArrowIcon = () => (
  <span
    aria-hidden="true"
    className="absolute left-3 top-1/2 -translate-y-1/2 flex opacity-0 transition-opacity duration-200 group-hover:opacity-100"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

// L'icône flèche apparaît au survol à gauche du libellé, comme sur le site commercial.
const buttonBase =
  "group relative inline-flex h-11 w-[184px] items-center justify-center rounded-[10px] text-base font-medium no-underline transition-[border-radius] duration-200 hover:rounded-none";

export const BottomCTA: React.FC = () => {
  return (
    <div
      className={cn(
        "bg-[#81deff] text-[#0f0f0f] my-16 px-6 py-12 sm:p-16 rounded-[10px] flex flex-col items-center justify-center text-center"
      )}
    >
      <h3
        className={cn(
          "text-[clamp(36px,5vw,48px)] font-bold leading-[1.1] tracking-[-0.025em] mb-4"
        )}
      >
        Tournez la page !
      </h3>
      <p className={cn("text-xl font-medium max-w-xl")}>
        Alexandrie veut construire le meilleur logiciel de gestion de librairie,
        adapté aux usages de demain.
      </p>
      <div className={cn("mt-8 flex flex-wrap justify-center gap-3")}>
        <Link
          href="https://calendly.com/jordan-alexandrie/demo-alexandrie"
          className={cn(buttonBase, "bg-[#0f0f0f] text-white hover:text-white")}
        >
          <ArrowIcon />
          <span className="whitespace-nowrap">Prendre RDV</span>
        </Link>
        <Link
          href="https://comptes.alexandrie.app"
          className={cn(
            buttonBase,
            "border border-[#0f0f0f] bg-transparent text-[#0f0f0f] hover:text-[#0f0f0f]"
          )}
        >
          <ArrowIcon />
          <span className="whitespace-nowrap">Essayer l&apos;app</span>
        </Link>
      </div>
    </div>
  );
};
