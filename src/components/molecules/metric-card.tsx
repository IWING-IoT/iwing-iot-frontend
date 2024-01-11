import { Chart } from "../atoms/chart";
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
      metric: string;
      chartType?: never;
      button?: React.ReactNode;
    }
  | {
      type: "chart";
      heading: string;
      metric: string;
      chartType: "tinyLineChart";
      button?: React.ReactNode;
    };

export function MetricCard({
  type,
  heading,
  metric,
  chartType,
  button,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {heading}
        </CardTitle>
        <p className="text-3xl font-semibold leading-tight">{metric}</p>
      </CardHeader>
      {type === "chart" && (
        <CardContent>
          <Chart type={chartType} />
        </CardContent>
      )}
      {button && (
        <CardFooter className="justify-end border-t px-4 py-3">
          {button}
        </CardFooter>
      )}
    </Card>
  );
}
