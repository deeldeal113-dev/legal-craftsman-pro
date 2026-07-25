import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/lawyers/")({
  head: () => ({
    meta: [
      { title: "Lawyers — LexOffice" },
      { name: "description", content: "Directory of lawyers available on the LexOffice platform." },
      { property: "og:title", content: "Lawyers — LexOffice" },
      { property: "og:description", content: "Lawyer directory." },
    ],
  }),
  component: () => <PageStub title="Lawyers" subtitle="Find a lawyer for your case." />,
});
