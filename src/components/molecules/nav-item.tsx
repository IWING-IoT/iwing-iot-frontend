import Link from "next/link";
import { Button } from "../ui/button";

type NavItemProps = {
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
};

export default function NavItem({ label, icon, href, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className="flex flex-1 items-center justify-start gap-2 rounded-md px-3 py-2 text-muted-foreground"
      onClick={onClick}
      asChild
    >
      <Link
        href={href}
        className="flex flex-1 items-center justify-start gap-3"
      >
        {icon}
        <div className="text-base font-medium">{label}</div>
      </Link>
    </Button>
  );
}
