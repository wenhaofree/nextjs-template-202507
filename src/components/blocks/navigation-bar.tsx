import React from "react";
import { Menu } from "lucide-react";
import { AuthStatus } from "@/components/auth/auth-status";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Link } from "@/i18n/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface NavigationBarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const NavigationBar = ({
  logo = {
    url: "#",
    src: "/logo.svg",
    alt: "logo",
    title: "Your App",
  },
  menu = [
    { title: "Home", url: "#" },
    { title: "About", url: "#" },
    { title: "Contact", url: "#" },
  ],
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: NavigationBarProps) => {
  return (
    <section className="sticky top-0 py-3 relative z-50 glass border-b backdrop-blur-md bg-background/95 supports-[backdrop-filter]:bg-background/80 transition-all duration-200">
      <div className="container-wide">
        <nav className="hidden justify-between lg:flex items-center">
          <div className="flex items-center gap-8">
            <Link href={logo.url} className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group">
              <img src={logo.src} className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200" alt={logo.alt} />
              <span className="text-lg font-bold text-foreground dark:text-white tracking-tight">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <AuthStatus />
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-3 hover:opacity-80 transition-all duration-200">
              <img src={logo.src} className="w-8 h-8 object-contain" alt={logo.alt} />
              <span className="text-lg font-bold text-foreground dark:text-white tracking-tight">{logo.title}</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button aria-label="Open menu" variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted transition-all duration-200">
                    <Menu className="size-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold text-foreground dark:text-white">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start gap-1">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Language</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Theme</span>
                      <ThemeSwitcher />
                    </div>
                    <div className="pt-2">
                      <AuthStatus />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium text-foreground transition-colors">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <Link href={subItem.url} legacyBehavior passHref>
                  <NavigationMenuLink className="flex select-none gap-4 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-muted hover:text-accent-foreground hover:shadow-sm">
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </NavigationMenuLink>
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link href={item.url} legacyBehavior passHref>
        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted hover:text-foreground hover:shadow-sm">
          {item.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline text-foreground">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-lg p-3 leading-none outline-none transition-all duration-200 hover:bg-muted hover:text-accent-foreground"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="font-semibold text-foreground hover:text-foreground/80 transition-colors">
      {item.title}
    </Link>
  );
};

export { NavigationBar };
