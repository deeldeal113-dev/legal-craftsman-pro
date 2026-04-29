import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12",
        align === "center" ? "mx-auto text-center" : ""
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {lead && <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{lead}</p>}
    </div>
  );
}
