
import { mobileAppDevelopment } from "./mobile-app-development";
import { graphicDesignBranding } from "./graphic-design-branding";

const serviceDetails = {
  [mobileAppDevelopment.slug]: mobileAppDevelopment,
  [graphicDesignBranding.slug]: graphicDesignBranding,
  
};

export function getServiceBySlug(slug) {
  return Object.hasOwn(serviceDetails, slug)
    ? serviceDetails[slug]
    : null;
}

export function getServiceSlugs() {
  return Object.keys(serviceDetails);
}
