import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/transaction")({
  head: () => ({ meta: [{ title: "Transactions — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Transactions" subtitle="Invoices, payments, and retainers." />,
});
