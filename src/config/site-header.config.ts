import type { NavigationBarProps } from "@/components/blocks/navigation-bar";

export const siteHeaderConfig: NavigationBarProps = {
  logo: {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "blocks for shadcn/ui",
    title: "Shadcnblocks.com",
  },
  menu: [
    {
      title: "Home",
      url: "https://www.shadcnblocks.com",
    },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          url: "/blog",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          url: "/company",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          url: "/careers",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          url: "/support",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          url: "/help",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          url: "/contact",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          url: "/status",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          url: "/terms",
        },
      ],
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "Blog",
      url: "/blog",
    },
  ],
  mobileExtraLinks: [
    { name: "Press", url: "/press" },
    { name: "Contact", url: "/contact" },
    { name: "Imprint", url: "/imprint" },
    { name: "Sitemap", url: "/sitemap" },
  ],
  auth: {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/signup" },
  },
};
