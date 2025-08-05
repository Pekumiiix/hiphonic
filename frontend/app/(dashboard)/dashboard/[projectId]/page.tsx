import { notFound } from "next/navigation";
import { projects } from "@/mock-data/projects";
import DashboardNav from "../sections/dashboard-nav";
import ProjectColumn from "./sections/project-column";
import ProjectNav from "./sections/project-nav";
import TaskCard from "./sections/task-card";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;

	const project = projects.find((project) => project.id === projectId);

	if (!project) {
		return notFound();
	}

	return (
		<>
			<ProjectNav />

			<DashboardNav variant="mobile" />

			<section className="w-full h-fit flex flex-col gap-6">
				<div className="flex flex-row gap-6 p-8 overflow-x-scroll scrollbar-none">
					<ProjectColumn name="To Do">
						<TaskCard
							title="Implement Login"
							category="design"
							description="Add Forgot password option when login & send email to reset password..."
							comment={2}
							due_date="Nov 30"
						/>
					</ProjectColumn>
					<ProjectColumn name="In Progress">
						<TaskCard
							title="Implement Login"
							category="design"
							description="Add Forgot password option when login & send email to reset password..."
							comment={2}
							due_date="Nov 30"
						/>
					</ProjectColumn>
					<ProjectColumn name="In Review">
						<TaskCard
							title="Implement Login"
							category="design"
							description="Add Forgot password option when login & send email to reset password..."
							comment={2}
							due_date="Nov 30"
						/>
					</ProjectColumn>
					<ProjectColumn name="Done">
						<TaskCard
							title="Implement Login"
							category="design"
							description="Add Forgot password option when login & send email to reset password..."
							comment={2}
							due_date="Nov 30"
						/>
					</ProjectColumn>
				</div>
			</section>
		</>
	);
}
