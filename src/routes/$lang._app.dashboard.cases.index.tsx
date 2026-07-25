import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/cases/")({
  head: () => ({ meta: [{ title: "Cases — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Cases" subtitle="All matters in your organization." />,
});
