import type { ReactNode } from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Section({
  tone = "light",
  className = "",
  children,
  id,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const base =
    tone === "dark"
      ? "bg-press text-fog"
      : "bg-fog text-press";

  return (
    <section id={id} className={`${base} ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">{children}</div>
    </section>
  );
}
