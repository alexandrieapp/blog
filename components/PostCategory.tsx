import React from "react";

// Teintes claires du design system Alexandrie (sky-light, yellow-light,
// pink-light, neutre n-75) avec le texte « ink » correspondant.
const categoryToStyle = {
  Guide: "text-[#07435f] bg-[#d4f2ff]",
  Articles: "text-[#6e4e0b] bg-[#fff6d5]",
  "User Stories": "text-[#7a2848] bg-[#fadadf]",
};

export const PostCategory: React.FC<{
  category: string;
  className?: string;
}> = ({ category, className }) => {
  return (
    <div
      className={`${
        categoryToStyle[category] ?? "text-[#4b4844] bg-[#f0ede6]"
      } font-bold px-1.5 py-1 rounded max-w-max text-xs uppercase ${className}`}
    >
      {category}
    </div>
  );
};
