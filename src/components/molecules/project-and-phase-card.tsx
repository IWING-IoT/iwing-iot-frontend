import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

type ProjectAndPhaseCardProps = {
  href: string;
  title: string;
  owner: string;
  location?: string;
  startedAt: string;
  endedAt?: string;
  isActive?: boolean;
};

export default function ProjectAndPhaseCard({
  href,
  title,
  owner,
  location,
  startedAt,
  endedAt,
  isActive,
}: ProjectAndPhaseCardProps) {
  return (
    <Link href={href ?? ""}>
      <Card className="hover:shadow-md">
        <CardHeader className="flex-row gap-2">
          <CardTitle className="truncate text-xl hover:underline">
            {title}
          </CardTitle>
          {isActive && <Badge variant={"success"}>Active</Badge>}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-muted-foreground">
            <div className="flex gap-2">
              <User />
              <span>{owner}</span>
            </div>
            {location && (
              <div className="flex gap-2">
                <MapPin />
                <span>{location}</span>
              </div>
            )}
            <div className="flex gap-2">
              <Calendar />
              <span>
                {endedAt ? `${startedAt} - ${endedAt}` : `${startedAt}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
