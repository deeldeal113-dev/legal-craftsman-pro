import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/posts")({
  head: () => ({ meta: [{ title: "Posts — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Posts" subtitle="Draft and publish articles." />,
});
