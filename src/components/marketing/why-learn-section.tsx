import { Code2, Layers, Rocket, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "AL-First Curriculum",
    description:
      "Learn the Application Language from fundamentals to advanced patterns used in production extensions.",
  },
  {
    icon: Layers,
    title: "Real-World Projects",
    description:
      "Build tables, pages, codeunits, and reports that mirror actual Business Central development workflows.",
  },
  {
    icon: Rocket,
    title: "Modern Dev Environment",
    description:
      "Master VS Code, Docker containers, AL-Go, and the complete BC development toolchain.",
  },
  {
    icon: Users,
    title: "Developer Community",
    description:
      "Join a growing community of NAV and Business Central developers sharing knowledge and best practices.",
  },
  {
    icon: Zap,
    title: "Always Up to Date",
    description:
      "Content updated for the latest Business Central releases, APIs, and Microsoft best practices.",
  },
  {
    icon: Shield,
    title: "Production Patterns",
    description:
      "Learn event subscribers, permission sets, AppSource compliance, and enterprise-grade architecture.",
  },
];

export function WhyLearnSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why Learn with NAVBC</h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Built by BC consultants and developers who ship extensions to
            production every day
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
