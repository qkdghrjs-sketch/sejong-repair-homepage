import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** 안내 내용이 바뀌면 반영되도록 짧게 캐시합니다. */
export const revalidate = 3600;

/**
 * 한 페이지 스크롤형이라 실제 주소는 첫 화면 하나뿐입니다.
 * (# 로 이동하는 구역은 검색엔진이 따로 된 페이지로 세지 않습니다.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
