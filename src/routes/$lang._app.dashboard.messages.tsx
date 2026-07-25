import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/messages")({
  head: () => ({ meta: [{ title: "Messages — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Messages" subtitle="Conversations with team and clients." />,
});
