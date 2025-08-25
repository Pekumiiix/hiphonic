"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function ActivitySummary() {
  return (
    <div className="col-span-2 xl:col-span-1 h-fit flex flex-col gap-5 p-5 rounded-xl bg-white">
      <p className="font-bold text-grey-900 leading-[150%]">Activity</p>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: -15,
          }}
        >
          <CartesianGrid
            strokeDasharray="none"
            stroke="#f1f5f9"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="activity"
            type="monotone"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "white",
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

const chartData = [
  { day: "Sun", activity: 45 },
  { day: "Mon", activity: 35 },
  { day: "Tue", activity: 55 },
  { day: "Wed", activity: 70 },
  { day: "Thu", activity: 5 },
  { day: "Fri", activity: 50 },
  { day: "Sat", activity: 45 },
];

const chartConfig = {
  activity: {
    label: "Activity",
    color: "#3b82f6",
  },
} satisfies ChartConfig;
