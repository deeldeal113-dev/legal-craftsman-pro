import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_public/posts/$slug")({
  head: () => ({
    meta: [
      { title: "Article — LexOffice" },
      { name: "description", content: "Read an article from the LexOffice legal insights hub." },
      { property: "og:title", content: "Article — LexOffice" },
      { property: "og:description", content: "Legal article on LexOffice." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: PostDetail,
});

function PostDetail() {
  const { slug } = Route.useParams();
  return <PageStub title={slug} subtitle="Article body." />;
}
