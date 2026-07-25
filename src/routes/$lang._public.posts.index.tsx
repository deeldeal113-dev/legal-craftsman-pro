import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/posts/")({
  head: () => ({
    meta: [
      { title: "Posts — LexOffice" },
      { name: "description", content: "Articles and insights from the LexOffice legal community." },
      { property: "og:title", content: "Posts — LexOffice" },
      { property: "og:description", content: "Legal insights and articles." },
    ],
  }),
  component: () => <PageStub title="Posts" subtitle="Articles and legal insights." />,
});
