import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/service/$slug")({
  head: () => ({
    meta: [
      { title: "Service — LexOffice" },
      { name: "description", content: "Details for a specific legal service." },
      { property: "og:title", content: "Service — LexOffice" },
      { property: "og:description", content: "Service details on LexOffice." },
    ],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  return <PageStub title={slug} subtitle="Service details." />;
}
