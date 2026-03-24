import Image from "next/image";

const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <Image
    src="/logo_small.png"
    alt="Alexandrie"
    width={160}
    height={160}
    className={`object-contain object-left ${className}`}
    priority
  />
);

export default Logo;
