"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BaseCheckbox } from "@/components/reuseable/base-checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardPopover } from "../_components/dashboard-popover";

export default function TodaysTasks() {
  return (
    <div className="col-span-2 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-bold text-grey-900 leading-[160%]">Task Today</p>

        <Button
          asChild
          variant="ghost"
          className="flex items-center gap-1 text-sm font-medium text-grey-500 leading-[160%] tracking-[0.2px] hover:bg-primary-50"
        >
          <Link href="/dashboard">
            <span>See all</span>
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>

      <TaskListItem />
      <TaskListItem />
    </div>
  );
}

function TaskListItem() {
  return (
    <div className="flex items-center justify-between px-4 py-[17px] rouded-xl bg-white rounded-xl">
      <div className="flex items-center gap-3">
        <BaseCheckbox id="task" />
        <p className="text-sm font-semibold leading-[160%] tracking-[0.2px] text-grey-900">
          Create userflow for Hisphonic Application Design
        </p>
      </div>

      <div className="flex items-center gap-6">
        <BadgeWrapper status="pending" />
        <DashboardPopover href="#" action={() => console.log("Hello world")} />
      </div>
    </div>
  );
}

function BadgeWrapper({
  status,
}: {
  status: "pending" | "in review" | "completed";
}) {
  return (
    <Badge
      className={cn(
        "px-3 py-2 rounded-full text-[10px] font-medium leading-[160%] capitalize",
        {
          "text-green-500 bg-green-50": status === "completed",
          "text-amber-500 bg-amber-50":
            status === "pending" || status === "in review",
        }
      )}
    >
      {status}
    </Badge>
  );
}
