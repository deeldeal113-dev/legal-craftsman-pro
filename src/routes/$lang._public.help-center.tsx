import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center — LexOffice" },
      { name: "description", content: "Guides, tutorials, and answers to common questions about using LexOffice." },
      { property: "og:title", content: "Help Center — LexOffice" },
      { property: "og:description", content: "Guides and answers for LexOffice users." },
    ],
  }),
  component: () => <PageStub title="Help center" subtitle="Guides, FAQs, and product docs." />,
});
