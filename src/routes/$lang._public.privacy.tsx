import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — LexOffice" },
      { name: "description", content: "How LexOffice collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — LexOffice" },
      { property: "og:description", content: "Our privacy practices and data protections." },
    ],
  }),
  component: () => <PageStub title="Privacy policy" subtitle="How we handle your data." />,
});
