import { Chart } from "@/components/atoms/chart";
import { MetricCard } from "@/components/molecules/metric-card";
import { CardGrid } from "@/components/templates/card-grid";

export default function Overview() {
  return (
    <CardGrid>
      <MetricCard
        type="chart"
        heading="Battery"
        metric="50%"
        chartType="tinyLineChart"
      />
      <MetricCard
        type="chart"
        heading="Battery"
        metric="50%"
        chartType="tinyLineChart"
      />
      <MetricCard
        type="chart"
        heading="Battery"
        metric="50%"
        chartType="tinyLineChart"
      />
    </CardGrid>
  );
}
