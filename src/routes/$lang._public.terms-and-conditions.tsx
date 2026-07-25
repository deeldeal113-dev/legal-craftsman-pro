import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — LexOffice" },
      { name: "description", content: "The terms governing the use of the LexOffice platform." },
      { property: "og:title", content: "Terms & Conditions — LexOffice" },
      { property: "og:description", content: "Terms of service for LexOffice." },
    ],
  }),
  component: () => <PageStub title="Terms & conditions" subtitle="Rules for using the platform." />,
});
