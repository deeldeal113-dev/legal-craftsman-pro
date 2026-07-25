import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/service/")({
  head: () => ({
    meta: [
      { title: "Services — LexOffice" },
      { name: "description", content: "Explore the legal services available through LexOffice." },
      { property: "og:title", content: "Services — LexOffice" },
      { property: "og:description", content: "Legal services offered on LexOffice." },
    ],
  }),
  component: () => <PageStub title="Services" subtitle="What we offer." />,
});
