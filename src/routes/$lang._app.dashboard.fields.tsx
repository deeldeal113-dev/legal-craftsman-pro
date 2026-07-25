import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/fields")({
  head: () => ({ meta: [{ title: "Fields — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Practice fields" subtitle="Manage practice areas." />,
});
