import { NavigationBar } from "@/components/blocks/navigation-bar";
import { siteHeaderConfig } from "@/config/site-header.config";

/**
 * Site Header Component
 * 
 * Main navigation header for the application.
 * Uses the NavigationBar component with site-specific configuration.
 */
const SiteHeader = () => {
  return <NavigationBar {...siteHeaderConfig} />;
};

export { SiteHeader };
