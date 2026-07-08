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
    github: "https://github.com/taher-el-mehdi/navbc-learn",
    twitter: "https://twitter.com/navbc",
    discord: "https://discord.gg/navbc",
  },
  github: {
    repo: "taher-el-mehdi/navbc-learn",
    branch: "main",
    discussionsEnabled: true,
  },
  nav: [
    { title: "Learning Path", href: "/learning-paths" },
    { title: "Courses", href: "/courses" },
    { title: "Tutorials", href: "/tutorials" },
    { title: "Projects", href: "/projects" },
    { title: "Contribute", href: "/contribute" },
  ],
} as const;
