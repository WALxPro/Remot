
import { mobileAppDevelopment } from "./mobile-app-development";

const serviceDetails = {
  [mobileAppDevelopment.slug]: mobileAppDevelopment,
};

export function getServiceBySlug(slug) {
  return serviceDetails[slug] ?? null;
}

export function getServiceSlugs() {
  return Object.keys(serviceDetails);
}
