import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/team")({
  head: () => ({ meta: [{ title: "Team — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Team" subtitle="Lawyers, trainees, and staff." />,
});
