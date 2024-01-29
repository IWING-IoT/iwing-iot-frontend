import { cn } from "@/lib/utils";
import { Chart } from "../atoms/chart";
import { FeatureIcon } from "../atoms/feature-icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type MetricCardProps =
  | {
      type: "simple";
      heading: string;
      metric: string | number;
      icon?: React.ReactNode;
      chartType?: never;
      button?: React.ReactNode;
    }
  | {
      type: "chart";
      heading: string;
      metric: string | number;
      icon?: React.ReactNode;
      chartType: "tinyLineChart";
      button?: React.ReactNode;
    };

export function MetricCard({
  type,
  heading,
  metric,
  icon,
  chartType,
  button,
}: MetricCardProps) {
  return (
    <Card>
      {icon ? (
        <CardHeader>
          <FeatureIcon className="mb-4" variant="modern" icon={icon} />
          <CardTitle className="text-sm font-medium text-muted-foreground first-letter:uppercase">
            {heading}
          </CardTitle>
          <div
            className={cn(
              "text-3xl font-semibold leading-tight",
              typeof metric === "number" ? "tabular-nums" : "",
            )}
          >
            {metric}
          </div>
        </CardHeader>
      ) : (
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground first-letter:uppercase">
            {heading}
          </CardTitle>
          <div className="text-3xl font-semibold leading-tight">{metric}</div>
        </CardHeader>
      )}
      {/* {type === "chart" && (
        <CardContent>
          <Chart type={chartType} />
        </CardContent>
      )} */}
      {button && (
        <CardFooter className="justify-end border-t px-4 py-3">
          {button}
        </CardFooter>
      )}
    </Card>
  );
}
