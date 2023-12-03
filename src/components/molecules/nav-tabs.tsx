"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavTabsProps = {
  tabs: {
    label: string;
    href: string;
  }[];
};

export const NavTabs = ({ tabs }: NavTabsProps) => {
  const pathname = usePathname().split("/").at(-1);

  return (
    <div className="flex gap-3">
      {tabs.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex cursor-pointer flex-col gap-3"
        >
          <p
            className={`px-1 font-medium ${
              pathname === item.href ? "text-tabs-active" : "text-tabs"
            }`}
          >
            {item.label}
          </p>
          {pathname === item.href && (
            <motion.div
              className="bg-tabs-active h-[2px] rounded-full"
              layoutId="underline"
            />
          )}
        </Link>
      ))}
    </div>
  );
};
