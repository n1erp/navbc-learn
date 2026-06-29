export const siteConfig = {
  name: "NAVBC Learn",
  description:
    "The premium learning platform for Microsoft Dynamics 365 Business Central and NAV developers. Master AL development, extensions, and ERP customization.",
  url: "https://learn.navbc.com",
  ogImage: "/og-image.png",
  twitter: "@navbc",
  keywords: [
    "Business Central",
    "Dynamics 365",
    "AL development",
    "NAV development",
    "ERP development",
    "Microsoft Dynamics",
    "AL language",
    "BC extensions",
  ],
  author: {
    name: "NAVBC",
    url: "https://navbc.com",
  },
  links: {
    github: "https://github.com/navbc",
    twitter: "https://twitter.com/navbc",
    discord: "https://discord.gg/navbc",
  },
  nav: [
    { title: "Courses", href: "/courses" },
    { title: "Learning Paths", href: "/learning-paths" },
    { title: "Projects", href: "/projects" },
    { title: "Tutorials", href: "/tutorials" },
  ],
} as const;
