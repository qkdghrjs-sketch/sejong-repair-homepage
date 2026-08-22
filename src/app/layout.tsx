import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import JsonLd from "@/components/JsonLd";
import { shopSchema } from "@/lib/schema";
import { SHOP, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SHOP.name} | ${SHOP.tagline}`,
    template: `%s | ${SHOP.name}`,
  },
  description: SHOP.description,
  applicationName: SHOP.name,
  creator: SHOP.name,
  publisher: SHOP.name,
  /**
   * 검색 키워드.
   * 지역명 + 하는 일 조합이 실제 검색어와 가장 가깝습니다.
   * site.ts 의 주소·지역을 채우신 뒤 여기도 실제 지역명으로 바꿔 주세요.
   */
  keywords: [
    "세종수선방아저씨",
    "신발수선",
    "구두수선",
    "굽갈이",
    "구두 굽 교체",
    "칼갈이",
    "부엌칼 갈이",
    "신발수선 택배",
    "수선방",
  ],
  formatDetection: { telephone: true, address: true, email: false },
  openGraph: {
    type: "website",
    siteName: SHOP.name,
    locale: "ko_KR",
    url: SITE_URL,
    title: `${SHOP.name} | ${SHOP.tagline}`,
    description: SHOP.description,
    images: [{ url: SHOP.logo, alt: SHOP.name }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/*
          자바스크립트가 켜져 있을 때만 <html> 에 .js 를 붙입니다.
          스크롤 등장 효과의 '숨김'은 이 클래스가 있을 때만 걸리므로,
          자바스크립트를 실행하지 않는 AI 크롤러에게도 글이 그대로 보입니다.
          (화면이 그려지기 전에 실행돼야 해서 인라인으로 둡니다)
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <JsonLd data={shopSchema} />
        <SiteHeader />
        <main id="top">{children}</main>
        <SiteFooter />
        <FloatingCta />
      </body>
    </html>
  );
}
