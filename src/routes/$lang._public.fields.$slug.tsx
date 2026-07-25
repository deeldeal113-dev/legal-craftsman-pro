import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/fields/$slug")({
  head: () => ({
    meta: [
      { title: "Field — LexOffice" },
      { name: "description", content: "A legal practice field on LexOffice." },
      { property: "og:title", content: "Field — LexOffice" },
      { property: "og:description", content: "Legal practice field details." },
    ],
  }),
  component: FieldDetail,
});

function FieldDetail() {
  const { slug } = Route.useParams();
  return <PageStub title={slug} subtitle="Field details and related lawyers." />;
}
