"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavTabsProps = {
  tabs: {
    label: string;
    href: string;
  }[];
  layoutId: string;
};

export const NavTabs = ({ tabs, layoutId }: NavTabsProps) => {
  const pathname = usePathname().split("/").at(-1);

  return (
    <div className="mb-[-1px] flex gap-3 overflow-x-auto whitespace-nowrap">
      {tabs.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex cursor-pointer flex-col gap-3"
        >
          <p
            className={`px-1 font-medium ${
              pathname === item.href
                ? "text-primary dark:text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {item.label}
          </p>
          {pathname === item.href && (
            <motion.div
              className="h-[3px] rounded-full bg-primary"
              layoutId={layoutId}
            />
          )}
        </Link>
      ))}
    </div>
  );
};
