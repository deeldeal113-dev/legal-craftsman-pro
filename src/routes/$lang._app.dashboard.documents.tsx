import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/documents")({
  head: () => ({ meta: [{ title: "Documents — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Documents" subtitle="Files, versions, and e-signatures." />,
});
