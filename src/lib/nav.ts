import { SHOP, DELIVERY } from "./site";

/**
 * 위쪽 메뉴.
 *
 * 한 페이지 스크롤형이라 메뉴를 누르면 그 자리로 부드럽게 내려갑니다.
 * href 의 # 뒤 이름은 홈 화면 각 구역의 id 와 짝을 이룹니다. 바꾸지 마세요.
 */
export const NAV = [
  { label: "소개", href: "#about" },
  { label: "수선 종류", href: "#repairs" },
  { label: "가격", href: "#prices" },
  ...(DELIVERY.enabled ? [{ label: "택배 수선", href: "#delivery" }] : []),
  {
    /* 고정 주소가 없으면 '오시는 길' 대신 '영업시간·문의' 로 보여 줍니다 */
    label: SHOP.address.hasAddress ? "오시는 길" : "영업시간 · 문의",
    href: "#location",
  },
] as const;

/** 외부 링크 모음 */
export const EXTERNAL = {
  kakao: SHOP.kakaoChannel,
  tel: `tel:${SHOP.telephone}`,
  /** 주소가 있을 때만 쓰는 지도 링크 */
  naverMap: SHOP.address.hasAddress
    ? `https://map.naver.com/v5/search/${encodeURIComponent(
        `${SHOP.name} ${SHOP.address.full}`,
      )}`
    : "",
  kakaoMap: SHOP.address.hasAddress
    ? `https://map.kakao.com/?q=${encodeURIComponent(SHOP.address.full)}`
    : "",
} as const;
