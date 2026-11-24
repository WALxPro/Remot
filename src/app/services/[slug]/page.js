
import { notFound } from "next/navigation";

import {
  getServiceBySlug,
  getServiceSlugs,
} from "@/config/service-detail";

import { ServiceDetailPage } from "@/components/sections/service-detail/ServiceDetailPage";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
