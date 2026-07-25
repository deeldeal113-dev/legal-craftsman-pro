import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/clients/")({
  head: () => ({
    meta: [
      { title: "Clients — LexOffice" },
      { name: "description", content: "Browse client organizations served on the LexOffice platform." },
      { property: "og:title", content: "Clients — LexOffice" },
      { property: "og:description", content: "Client organizations on LexOffice." },
    ],
  }),
  component: () => <PageStub title="Clients" subtitle="Organizations we work with." />,
});
