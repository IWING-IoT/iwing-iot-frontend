import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/home"} className="flex grow items-center gap-3">
      <Image src={"/logo.svg"} width={32} height={32} alt="logo" />
      <span className="text-lg font-bold">IWING IoT</span>
    </Link>
  );
}
