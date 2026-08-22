import { SHOP, SHOP_ID, MAIN_SITE_URL, DELIVERY } from "./site";
import { REPAIR_GROUPS } from "./repairs";

/**
 * 구조화 데이터(JSON-LD).
 *
 * 사람 눈에는 안 보이지만, 네이버·구글·챗GPT 같은 AI가 이 가게를
 * "무슨 가게이고, 언제 열고, 뭘 해주는지" 정확히 알아보게 하는 정보입니다.
 * src/lib/site.ts 를 고치면 여기도 자동으로 따라 바뀝니다.
 *
 * 신발만이 아니라 칼갈이도 하시므로 유형은 ShoeStore 가 아니라
 * 일반 동네 가게(LocalBusiness)로 두었습니다.
 */

/** 대괄호만 들어 있거나 비어 있는 값은 검색 정보에서 빼 줍니다. */
function filled(value: string) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return undefined;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return undefined;
  return trimmed;
}

function filledList(values: readonly string[]) {
  return values.map(filled).filter((v): v is string => Boolean(v));
}

/** "오전 9:00 ~ 오후 6:30" 을 검색엔진용 24시간 표기로 바꿉니다 */
function toSchemaTime(value: string): { opens: string; closes: string } | null {
  const times = [...value.matchAll(/(오전|오후)?\s*(\d{1,2}):(\d{2})/g)];
  if (times.length < 2) return null;

  const parse = (match: RegExpMatchArray) => {
    const meridiem = match[1];
    let hour = Number(match[2]);
    const minute = match[3];
    if (meridiem === "오후" && hour < 12) hour += 12;
    if (meridiem === "오전" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${minute}`;
  };

  return { opens: parse(times[0]), closes: parse(times[1]) };
}

/**
 * 요일(days)이 정해진 줄만 검색엔진에 내보냅니다.
 * 쉬는 날을 아직 모르는 상태에서 "매일 연다"고 알리면 잘못된 정보가 됩니다.
 */
function openingHoursSpecification() {
  const spec = [];
  for (const row of SHOP.openingHours) {
    if (!row.days || row.days.length === 0) continue;
    const time = toSchemaTime(row.value);
    if (!time) continue;
    spec.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: time.opens,
      closes: time.closes,
    });
  }
  return spec.length > 0 ? spec : undefined;
}

/** 수선 항목 전체를 '제공 서비스 목록'으로 내보냅니다 */
function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "수선 항목",
    itemListElement: REPAIR_GROUPS.map((group) => ({
      "@type": "OfferCatalog",
      name: group.title,
      itemListElement: group.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.desc,
        },
        ...(filled(item.price) ? { priceSpecification: {
          "@type": "PriceSpecification",
          description: item.price,
          priceCurrency: "KRW",
        } } : {}),
      })),
    })),
  };
}

export const shopSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SHOP_ID,
  name: SHOP.name,
  alternateName: SHOP.shortName,
  description: SHOP.description,
  slogan: SHOP.tagline,
  url: `${MAIN_SITE_URL}/`,
  image: `${MAIN_SITE_URL}${SHOP.logo}`,
  logo: `${MAIN_SITE_URL}${SHOP.logo}`,
  telephone: SHOP.telephone,
  /** 카카오톡 채널이 사실상의 대표 연락 창구입니다 */
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: SHOP.telephone,
    url: SHOP.kakaoChannel,
    availableLanguage: "ko",
  },
  ...(SHOP.address.hasAddress && filled(SHOP.address.full)
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: filled(SHOP.address.street) ?? SHOP.address.full,
          addressLocality: filled(SHOP.address.locality),
          addressRegion: filled(SHOP.address.region),
          postalCode: filled(SHOP.address.postalCode),
          addressCountry: "KR",
        },
      }
    : {}),
  ...(SHOP.geo.latitude && SHOP.geo.longitude
    ? {
        geo: {
          "@type": "GeoCoordinates",
          latitude: SHOP.geo.latitude,
          longitude: SHOP.geo.longitude,
        },
      }
    : {}),
  ...(openingHoursSpecification()
    ? { openingHoursSpecification: openingHoursSpecification() }
    : {}),
  ...(filledList(SHOP.areaServed).length > 0
    ? { areaServed: filledList(SHOP.areaServed) }
    : {}),
  ...(filled(SHOP.owner)
    ? { founder: { "@type": "Person", name: SHOP.owner } }
    : {}),
  ...(SHOP.sameAs.length > 0 ? { sameAs: SHOP.sameAs } : {}),
  hasOfferCatalog: offerCatalog(),
  ...(DELIVERY.enabled
    ? { serviceArea: { "@type": "Country", name: "대한민국" } }
    : {}),
  currenciesAccepted: "KRW",
  priceRange: "₩",
} as const;
