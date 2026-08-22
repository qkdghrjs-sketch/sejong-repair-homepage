import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import Hero from "@/components/home/Hero";
import ValueSection from "@/components/home/ValueSection";
import AboutSection from "@/components/home/AboutSection";
import RepairsSection from "@/components/home/RepairsSection";
import PricesSection from "@/components/home/PricesSection";
import DeliverySection from "@/components/home/DeliverySection";
import LocationSection from "@/components/home/LocationSection";
import JsonLd from "@/components/JsonLd";
import { SHOP, SHOP_ID, SITE_URL, CONTENT_UPDATED, SITE_PUBLISHED } from "@/lib/site";

const TITLE = `${SHOP.name} | ${SHOP.tagline}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: SHOP.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: SHOP.description,
    url: "/",
    type: "website",
  },
};

/** 이 페이지가 무엇인지 AI·검색엔진에 알려 주는 정보 */
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  name: TITLE,
  description: SHOP.description,
  url: `${SITE_URL}/`,
  inLanguage: "ko-KR",
  isPartOf: { "@id": SHOP_ID },
  about: { "@id": SHOP_ID },
  datePublished: SITE_PUBLISHED,
  dateModified: CONTENT_UPDATED,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <Hero />
      {/* 스크롤 등장 효과는 .rv 클래스를 가진 요소에만 적용됩니다 */}
      <Reveal selector=".rv">
        <ValueSection />
        <AboutSection />
        <RepairsSection />
        <PricesSection />
        <DeliverySection />
        <LocationSection />
      </Reveal>
    </>
  );
}
