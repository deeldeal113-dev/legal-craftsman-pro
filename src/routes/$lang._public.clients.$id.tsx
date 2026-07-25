import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/clients/$id")({
  head: () => ({
    meta: [
      { title: "Client — LexOffice" },
      { name: "description", content: "Profile page for a client organization." },
      { property: "og:title", content: "Client — LexOffice" },
      { property: "og:description", content: "Client profile." },
    ],
  }),
  component: ClientDetail,
});

function ClientDetail() {
  const { id } = Route.useParams();
  return <PageStub title={`Client #${id}`} subtitle="Client profile and matters." />;
}
