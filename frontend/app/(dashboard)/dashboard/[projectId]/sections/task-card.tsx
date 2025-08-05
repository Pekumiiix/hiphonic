import { Calendar1, type LucideIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { OverlappingPfps } from "@/components/custom/overlapping-pfps";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TCategory } from "@/types";
import { truncateSentence } from "@/utils/truncate";

export default function TaskCard({
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

					<div className="flex flex-col gap-1">
						<p className="font-semibold text-grey-900 leading-[150%]">
							{title}
						</p>

						<div className="flex items-center gap-1">
							<span
								className="size-[6px] rounded-full"
								style={{ background: RenderCategoryColor(category) }}
							/>
							<p
								className="text-xs font-medium text-inherit capitalize"
								style={{ color: RenderCategoryColor(category) }}
							>
								{category}
							</p>
						</div>
					</div>
				</div>

				{!image && (
					<p className="text-xs text-grey-500">
						{truncateSentence(description, 66)}
					</p>
				)}
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

function RenderCategoryColor(category: TCategory) {
	if (category === "development") return "#38BDF8";

	if (category === "design") {
		return "#2563EB";
	}

	return "#34D399";
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

interface ITaskCardProps {
	image?: string;
	category: TCategory;
	title: string;
	description: string;
	comment: number;
	due_date: string;
}
