import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/fields/")({
  head: () => ({
    meta: [
      { title: "Practice fields — LexOffice" },
      { name: "description", content: "Legal fields and specializations covered on LexOffice." },
      { property: "og:title", content: "Practice fields — LexOffice" },
      { property: "og:description", content: "Legal practice areas." },
    ],
  }),
  component: () => <PageStub title="Practice fields" subtitle="Specializations we cover." />,
});
