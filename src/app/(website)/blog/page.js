import { BlogArticles } from "@/components/sections/blog/BlogArticles";
import { BlogHero } from "@/components/sections/blog/BlogHero";

export default function PricingPage() {
  return (
    <div className="pricing-background">
      <BlogHero />
      <BlogArticles/>
    </div>
  );
}
