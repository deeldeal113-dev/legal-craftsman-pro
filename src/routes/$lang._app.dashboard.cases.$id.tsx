import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/cases/$id")({
  head: () => ({ meta: [{ title: "Case — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: CaseDetail,
});

function CaseDetail() {
  const { id } = Route.useParams();
  return <PageStub title={`Case #${id}`} subtitle="Case file, parties, hearings, and documents." />;
}
