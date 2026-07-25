import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";

export const Route = createFileRoute("/$lang/_app/dashboard/calendar")({
  head: () => ({ meta: [{ title: "Calendar — Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: () => <PageStub title="Calendar" subtitle="Hearings, meetings, and reminders." />,
});
