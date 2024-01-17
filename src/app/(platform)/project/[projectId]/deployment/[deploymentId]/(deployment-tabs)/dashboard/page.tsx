import { MetricCard } from "@/components/molecules/metric-card";
import { CardGrid } from "@/components/templates/card-grid";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { cardContent } from "@/lib/mock";

export default function Dashboard() {
  return (
    <MainContainer>
      <CardGrid>
        {cardContent.map((card, index) => (
          <MetricCard
            key={index}
            type="chart"
            heading={card.heading}
            metric={card.metric}
            chartType="tinyLineChart"
          />
        ))}
      </CardGrid>
    </MainContainer>
  );
}
