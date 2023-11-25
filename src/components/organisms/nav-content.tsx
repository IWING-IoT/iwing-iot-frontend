import Logo from "@/components/atoms/logo";
import {
  ArchiveIcon,
  FileCode,
  Home,
  Router,
  Settings,
  Users,
} from "lucide-react";
import { Separator } from "../ui/separator";
import NavItem from "../molecules/nav-item";
import NavProjectList from "./nav-project-list";
import { fetchProject } from "@/lib/data-fetching";
import NavProfile from "./nav-profile";
import { getServerAuthSession } from "@/lib/auth";

const topItems = [
  { label: "Home", href: "/home", icon: <Home /> },
  { label: "Devices", href: "/devices", icon: <Router /> },
  { label: "Firmware", href: "firmware", icon: <FileCode /> },
];

const bottomItems = [
  {
    label: "Account management",
    href: "account-management",
    icon: <Users />,
  },
  {
    label: "Archived projects",
    href: "archived-projects",
    icon: <ArchiveIcon />,
  },
  { label: "Settings", href: "settings", icon: <Settings /> },
];

export default async function NavContent() {
  const { data: projectData } = await fetchProject();
  const session = await getServerAuthSession();
  // console.log(session);
  return (
    <div className="flex h-full flex-1 flex-col gap-6">
      <div className="pl-6 pr-6">
        <Logo />
      </div>
      <div className="flex h-full flex-1 flex-col gap-6 overflow-hidden">
        <div className="flex flex-col gap-1 pl-4 pr-4">
          {topItems.map((item) => (
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              key={item.label}
            />
          ))}
        </div>
        <Separator />
        <NavProjectList projectItems={projectData} />
      </div>
      <Separator />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 self-stretch pl-4 pr-4">
          {bottomItems.map((item) => (
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              key={item.label}
            />
          ))}
        </div>
        <Separator />
        {session?.user && <NavProfile user={session.user} />}
      </div>
    </div>
  );
}
