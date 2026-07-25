import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";

export const Route = createFileRoute("/$lang/_public")({
  component: PublicShell,
});
