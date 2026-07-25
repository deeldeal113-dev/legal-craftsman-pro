import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Analytics" subtitle="Practice metrics and trends." />,
});
