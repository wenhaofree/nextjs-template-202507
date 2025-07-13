"use client"

import { NavigationBar } from "@/components/blocks/navigation-bar";
import { useTranslations } from 'next-intl';
import type { NavigationBarProps } from "@/components/blocks/navigation-bar";

/**
 * Site Header Component
 *
 * Main navigation header for the application.
 * Uses the NavigationBar component with internationalized configuration.
 */
const SiteHeader = () => {
  const t = useTranslations('SiteHeader');

  const siteHeaderConfig: NavigationBarProps = {
    logo: {
      url: "/",
      src: "/logo.png",
      alt: t('logo.alt'),
      title: t('logo.title'),
    },
    menu: [
      {
        title: t('menu.home'),
        url: "/",
      },
      {
        title: t('menu.aiTools'),
        url: "#",
        items: [
          {
            title: t('menu.aiChat'),
            description: t('menuDescriptions.aiChat'),
            url: "/chat",
          },
          {
            title: t('menu.imageGeneration'),
            description: t('menuDescriptions.imageGeneration'),
            url: "/image-generation",
          },
        ],
      },
      {
        title: t('menu.products'),
        url: "#",
        items: [
          {
            title: t('menu.blog'),
            description: t('menuDescriptions.blog'),
            url: "/blog",
          },
          {
            title: t('menu.company'),
            description: t('menuDescriptions.company'),
            url: "/company",
          },
          {
            title: t('menu.careers'),
            description: t('menuDescriptions.careers'),
            url: "/careers",
          },
          {
            title: t('menu.support'),
            description: t('menuDescriptions.support'),
            url: "/support",
          },
        ],
      },
      {
        title: t('menu.resources'),
        url: "#",
        items: [
          {
            title: t('menu.helpCenter'),
            description: t('menuDescriptions.helpCenter'),
            url: "/help",
          },
          {
            title: t('menu.contactUs'),
            description: t('menuDescriptions.contactUs'),
            url: "/contact",
          },
          {
            title: t('menu.status'),
            description: t('menuDescriptions.status'),
            url: "/status",
          },
          {
            title: t('menu.termsOfService'),
            description: t('menuDescriptions.termsOfService'),
            url: "/terms",
          },
        ],
      },
      {
        title: t('menu.pricing'),
        url: "/pricing",
      },
      {
        title: t('menu.blog'),
        url: "/blog",
      },
      {
        title: t('menu.dashboard'),
        url: "/dashboard",
      },
    ],
    mobileExtraLinks: [
      { name: t('mobileExtraLinks.press'), url: "/press" },
      { name: t('mobileExtraLinks.contact'), url: "/contact" },
      { name: t('mobileExtraLinks.imprint'), url: "/imprint" },
      { name: t('mobileExtraLinks.sitemap'), url: "/sitemap" },
    ],
    auth: {
      login: { text: t('auth.login'), url: "/login" },
      signup: { text: t('auth.signup'), url: "/signup" },
    },
  };

  return <NavigationBar {...siteHeaderConfig} />;
};

export { SiteHeader };
