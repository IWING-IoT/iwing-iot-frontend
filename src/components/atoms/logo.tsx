import Image from "next/image";
import Link from "next/link";
import { LogoIcon } from "./logo-icon";

export function Logo() {
  return (
    <Link href={"/home"} className="flex items-center gap-3">
      <LogoIcon className="text-primary" width={32} height={32} />
      <span className="text-lg font-bold">IWING IoT</span>
    </Link>
  );
}
