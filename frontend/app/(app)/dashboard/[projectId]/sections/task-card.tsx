import { Calendar1, type LucideIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { OverlappingPfps } from "@/components/shared/overlapping-pfps";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ITaskCardProps } from "@/types";
import { truncateSentence } from "@/utils/truncate";
import { CategoryBlock } from "../component/category-block";

export function GridTaskCard({
  image,
  title,
  category,
  description,
  comment,
  due_date,
}: ITaskCardProps) {
  return (
    <div className="w-full py-[18px] px-4 flex flex-col gap-4 rounded-xl bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {image && (
            <Image
              src={image}
              alt={title}
              width={232}
              height={125}
              className="rounded-xl"
            />
          )}

          <TaskTitle title={title} category={category} />
        </div>

        {!image && <TaskDescription description={description} />}
      </div>

      <Separator className="w-full border-grey-100" />

      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2">
          <TaskDetailsContainer Icon={Calendar1} value={due_date} />
          <TaskDetailsContainer Icon={MessageCircleMore} value={comment} />
        </div>

        <OverlappingPfps
          className="size-8 !w-8"
          margin="-ml-3"
          maxVisible={2}
          avatars={[
            { username: "OU", src: "https://github.com/shadcn.png" },
            { username: "TU", src: "https://github.com/shadcn.png" },
            { username: "RU", src: "https://github.com/shadcn.png" },
            { username: "YU", src: "https://github.com/shadcn.png" },
            { username: "UU", src: "https://github.com/shadcn.png" },
            { username: "PU", src: "https://github.com/shadcn.png" },
          ]}
        />
      </div>
    </div>
  );
}

export function ListTaskCard({
  title,
  category,
  description,
  due_date,
  comment,
}: Omit<ITaskCardProps, "image">) {
  return (
    <div className="flex flex-col max-md:gap-3 md:flex-row md:items-center justify-between p-4 bg-white rounded-xl">
      <TaskTitle title={title} category={category} />

      <TaskDescription
        className="md:hidden lg:flex max-w-[232px]"
        description={description}
      />

      <Separator className="w-full border-grey-100 md:hidden" />

      <div className="flex items-center max-md:justify-between md:gap-[60px] lg:gap-16">
        <div className="flex gap-2">
          <TaskDetailsContainer Icon={Calendar1} value={due_date} />
          <TaskDetailsContainer Icon={MessageCircleMore} value={comment} />
        </div>

        <OverlappingPfps
          className="size-8 !w-8"
          margin="-ml-3"
          maxVisible={2}
          avatars={[
            { username: "OU", src: "https://github.com/shadcn.png" },
            { username: "TU", src: "https://github.com/shadcn.png" },
            { username: "RU", src: "https://github.com/shadcn.png" },
            { username: "YU", src: "https://github.com/shadcn.png" },
            { username: "UU", src: "https://github.com/shadcn.png" },
            { username: "PU", src: "https://github.com/shadcn.png" },
          ]}
        />
      </div>
    </div>
  );
}

function TaskTitle({
  title,
  category,
}: Pick<ITaskCardProps, "title" | "category">) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-grey-900 leading-[150%]">{title}</p>

      <CategoryBlock category={category} />
    </div>
  );
}

function TaskDescription({
  description,
  className,
}: Pick<ITaskCardProps, "description"> & { className?: string }) {
  return (
    <p className={cn("text-xs text-grey-500", className)}>
      {truncateSentence(description, 66)}
    </p>
  );
}

function TaskDetailsContainer({
  Icon,
  value,
  variant = "default",
}: ITaskDetailsContainer) {
  return (
    <div
      className={cn("w-fit h-8 flex gap-1 p-2 rounded-[8px]", {
        "bg-grey-50 text-grey-500": variant === "default",
        "bg-glamour-pink-50 text-grey-500": variant === "almost-due",
      })}
    >
      <Icon size={16} className="text-inherit" />
      <p className="text-xs font-medium">
        {variant === "almost-due" ? `${value} days left` : value}
      </p>
    </div>
  );
}

interface ITaskDetailsContainer {
  Icon: LucideIcon;
  value: string | number;
  variant?: "default" | "almost-due";
}
