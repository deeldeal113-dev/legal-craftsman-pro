import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/tasks")({
  head: () => ({ meta: [{ title: "Tasks — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Tasks" subtitle="Assignments, deadlines, and follow-ups." />,
});
