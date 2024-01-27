"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartProps = {
  type: "simpleLineChart";
  xAxisDataKey: string;
  yAxisDataKey: string;
  yDomain?: [number, number];
  data: { [x: string]: number | string }[];
};

export function Chart({
  type,
  xAxisDataKey,
  yAxisDataKey,
  yDomain,
  data,
}: ChartProps) {
  // if (type === "tinyLineChart") {
  //   return (
  //     <ResponsiveContainer width="100%" height="100%" minHeight={80}>
  //       <LineChart width={300} height={100} data={data}>
  //         <Line
  //           type="monotone"
  //           dataKey="pv"
  //           stroke="hsl(var(--primary))"
  //           strokeWidth={2}
  //         />
  //       </LineChart>
  //     </ResponsiveContainer>
  //   );
  // }
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={240}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis domain={yDomain} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={yAxisDataKey}
          stroke="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
