import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/about")({
  head: () => ({
    meta: [
      { title: "About — LexOffice" },
      { name: "description", content: "Learn about LexOffice, our mission, and the team behind the legal practice management platform." },
      { property: "og:title", content: "About — LexOffice" },
      { property: "og:description", content: "The team and mission behind LexOffice." },
    ],
  }),
  component: () => <PageStub title="About us" subtitle="Who we are and what we build." />,
});
