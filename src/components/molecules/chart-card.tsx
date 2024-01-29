import { ChevronDown } from "lucide-react";
import { Chart } from "../atoms/chart";
import { SearchParamsDropdown } from "../organisms/dropdowns/search-params-dropdown";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  SectionHeader,
  SectionHeaderTextContent,
  SectionHeaderTitle,
  SectionHeaderAction,
} from "./section-header";

type ChartCardProps = {
  heading: string;
  searchParamsName: string;
  searchParamsOptions: { label: string; value: string }[];
  searchParamsValue: string;
  xAxisDataKey: string;
  yAxisDataKey: string;
  yDomain?: [number, number];
  data: { [x: string]: number | string }[] | undefined;
};

export function ChartCard({
  heading,
  searchParamsName,
  searchParamsOptions,
  searchParamsValue,
  xAxisDataKey,
  yAxisDataKey,
  yDomain,
  data,
}: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <SectionHeader>
          <SectionHeaderTextContent>
            <SectionHeaderTitle>{heading}</SectionHeaderTitle>
          </SectionHeaderTextContent>
          <SectionHeaderAction>
            <SearchParamsDropdown
              type="radio"
              paramsName={searchParamsName}
              options={searchParamsOptions}
              triggerButton={
                <Button variant="outline">
                  {
                    searchParamsOptions.find(
                      (option) => option.value === searchParamsValue,
                    )?.label
                  }
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              }
            />
          </SectionHeaderAction>
        </SectionHeader>
      </CardHeader>
      <CardContent>
        {data ? (
          <Chart
            type="simpleLineChart"
            data={data}
            xAxisDataKey={xAxisDataKey}
            yAxisDataKey={yAxisDataKey}
            yDomain={yDomain}
          />
        ) : (
          <div className="flex min-h-60 flex-1 items-center justify-center">
            <p className="text-muted-foreground">Data is not enough</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
