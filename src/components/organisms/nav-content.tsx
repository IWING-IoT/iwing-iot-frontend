import {
  ArchiveIcon,
  FileCode,
  Home,
  Router,
  Settings,
  Users,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { getServerAuthSession } from "@/lib/auth";
import { Logo } from "../atoms/logo";
import { NavItem } from "../molecules/nav-item";
import { NavProfile } from "./nav-profile";
import { NavProjectList } from "./nav-project-list";
import { fetchData } from "@/lib/data-fetching";

const topItems = [
  {
    label: "Home",
    href: "/home",
    icon: <Home />,
    permit: ["admin", "user"],
  },
  {
    label: "Devices",
    href: "/devices/standalone",
    icon: <Router />,
    permit: ["admin", "user"],
  },
  {
    label: "Firmware",
    href: "/firmware/source",
    icon: <FileCode />,
    permit: ["admin", "user"],
  },
];

const bottomItems = [
  {
    label: "Account management",
    href: "/account-management",
    icon: <Users />,
    permit: ["admin"],
  },
  {
    label: "Archived projects",
    href: "/archived-projects",
    icon: <ArchiveIcon />,
    permit: ["admin", "user"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings />,
    permit: ["admin", "user"],
  },
];

export default async function NavContent() {
  const session = await getServerAuthSession();
  const { data: projectData } = await fetchData("/project", [
    { key: "sortBy", value: "ascending" },
  ]);
  // console.log(session);
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6">
      <div className="pl-6 pr-6">
        <Logo />
      </div>
      <div className="flex h-full flex-1 flex-col gap-6 overflow-hidden">
        <div className="flex flex-col gap-1 pl-4 pr-4">
          {topItems.map(
            (item) =>
              item.permit.includes(session?.user.role ?? "user") && (
                <NavItem
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  key={item.label}
                />
              ),
          )}
        </div>
        <Separator />
        <NavProjectList projectItems={projectData} />
      </div>
      <Separator />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 self-stretch pl-4 pr-4">
          {bottomItems.map(
            (item) =>
              item.permit.includes(session?.user.role ?? "user") && (
                <NavItem
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  key={item.label}
                />
              ),
          )}
        </div>
        <Separator />
        {session?.user && <NavProfile user={session.user} />}
      </div>
    </div>
  );
}
