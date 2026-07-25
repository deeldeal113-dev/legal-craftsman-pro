import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/clients")({
  head: () => ({ meta: [{ title: "Clients — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Clients" subtitle="Individuals and organizations." />,
});
