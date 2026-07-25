import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/services")({
  head: () => ({ meta: [{ title: "Services — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Services" subtitle="Manage the services your office offers." />,
});
