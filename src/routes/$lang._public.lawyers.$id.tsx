import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/lawyers/$id")({
  head: () => ({
    meta: [
      { title: "Lawyer profile — LexOffice" },
      { name: "description", content: "Lawyer profile, practice areas, and experience." },
      { property: "og:title", content: "Lawyer profile — LexOffice" },
      { property: "og:description", content: "Lawyer profile page." },
    ],
  }),
  component: LawyerDetail,
});

function LawyerDetail() {
  const { id } = Route.useParams();
  return <PageStub title={`Lawyer #${id}`} subtitle="Profile, practice areas, and cases." />;
}
