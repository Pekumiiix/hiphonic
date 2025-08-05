import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectColumn({ name, children }: IProjectProps) {
	return (
		<div className="min-w-[246px] w-[246px] flex flex-col gap-6">
			<div className="flex w-full items-center justify-between py-1">
				<p
					className="font-bold leading-[160%]"
					style={{ color: RenderColumnNameColor(name) }}
				>
					{name}
				</p>

				{name === "To Do" && (
					<Button variant="ghost" size="icon" className="size-6 text-grey-400">
						<Plus size={14} />
					</Button>
				)}
			</div>

			<div className="w-full flex flex-col gap-4">{children}</div>
		</div>
	);
}

function RenderColumnNameColor(name: IProjectProps["name"]) {
	if (name === "In Progress") {
		return "#2563EB";
	}
	if (name === "In Review") {
		return "#F6A723";
	}
	if (name === "Done") {
		return "#24d164";
	}
	return "#0f172a";
}

interface IProjectProps {
	name: "To Do" | "In Progress" | "In Review" | "Done";
	children: React.ReactNode;
}
