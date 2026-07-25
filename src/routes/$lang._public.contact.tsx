import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LexOffice" },
      { name: "description", content: "Get in touch with the LexOffice team for sales, partnerships, or support." },
      { property: "og:title", content: "Contact — LexOffice" },
      { property: "og:description", content: "Reach the LexOffice team." },
    ],
  }),
  component: () => <PageStub title="Contact" subtitle="We'd love to hear from you." />,
});
