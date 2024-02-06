import React from "react";
import { cn } from "../utils";
import Link from "./Link";

export const BottomCTA: React.FC = () => {
  return (
    <div
      className={cn(
        "bg-bottomCta my-16 p-16 text-white rounded-xl flex flex-col items-center justify-center"
      )}
    >
      <h3 className={cn("text-[40px] mb-4 font-bold")}>
        Tournez la page! Changez de logiciel de gestion.
      </h3>
      <p className={cn("text-xl text-center max-w-xl text-opacity-90")}>
        "Au début, on a un peu peur. Ensuite on se demande comment on faisait
        avant." Charles-Henri, gérant de la Librairie Théâtrale.
      </p>
      <Link
        href="https://712y368h9br.typeform.com/to/ZAcMQFzO?typeform-source=blog.alexandrie.app"
        className={cn(
          "no-underline bg-white text-pink-500 py-3 px-5 rounded-lg mt-8 font-semibold text-xl"
        )}
      >
        Prendre RDV
      </Link>
    </div>
  );
};
