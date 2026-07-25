import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/setting")({
  head: () => ({ meta: [{ title: "Settings — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Settings" subtitle="Organization, billing, and preferences." />,
});
