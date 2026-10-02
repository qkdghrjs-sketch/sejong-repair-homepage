/**
 * 세종수선방아저씨 홈페이지 공통 정보.
 *
 * ★ 이 파일 한 곳만 고치면 홈 화면·푸터·문의 버튼·검색 정보가 전부 바뀝니다.
 *
 * 대괄호 [ ] 로 감싼 값은 아직 채우지 않은 자리입니다.
 * 화면에 노랗게 표시되고, 검색 정보와 llms.txt 에서는 자동으로 빠집니다.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const MAIN_SITE_URL = SITE_URL;

/** 안내 내용을 마지막으로 손본 날짜 (내용을 실제로 고쳤을 때만 바꾸세요) */
export const CONTENT_UPDATED = "2026-08-22";

/** 사이트를 처음 공개한 날 */
export const SITE_PUBLISHED = "2026-08-22";

export const SHOP = {
  name: "세종수선방아저씨",
  shortName: "세종수선방",

  /** 한 줄 소개 — 검색결과와 카톡 공유에 그대로 보입니다 */
  tagline: "신발 수선부터 칼갈이까지, 손으로 되살립니다",

  /** 검색엔진·AI에 전달되는 설명 */
  description:
    "세종수선방아저씨입니다. 굽갈이를 비롯한 신발 수선과 칼갈이를 합니다. 오늘 계신 위치와 수선 문의는 카카오톡 채널로 편하게 물어보세요.",

  telephone: "+82-10-4352-9055",
  telephoneDisplay: "010-4352-9055",

  /** 카카오톡 채널 (플러스친구) — 문의 버튼이 전부 여기로 연결됩니다 */
  kakaoChannel: "https://pf.kakao.com/_wYMiX",

  logo: "/logo.png",

  /**
   * 주소.
   *
   * hasAddress 가 false 이면 주소가 들어가던 자리에 아래 locationNote 와
   * 카카오톡 문의 버튼이 대신 나옵니다. (지도도 함께 감춰집니다)
   * 나중에 고정된 가게 주소가 생기면 true 로 바꾸고 full 을 채우세요.
   */
  address: {
    hasAddress: false as boolean,
    full: "",
    detail: "",
    street: "",
    locality: "",
    region: "",
    postalCode: "",
    country: "KR",
  },

  /** 주소 대신 보여드리는 안내 */
  locationNote:
    "찾아오시는 위치는 카카오톡 채널로 안내해 드립니다. 편하게 물어봐 주세요.",

  /** 가까운 역·정류장에서 오는 길 (주소가 생기면 채우세요) */
  directions: [] as string[],

  parking: "",

  email: "",
  businessNumber: "",

  geo: { latitude: 0, longitude: 0 },

  /** 사장님 성함 (아직 안 정하셨으면 그대로 두세요) */
  owner: "[사장님 성함 — 넣으실지 알려주세요]",

  /** 경력 소개 — 알려주시면 채웁니다 */
  ownerCareer: ["[경력 몇 년 · 배우신 곳 등]"] as string[],

  /** 검색·AI가 인용하기 좋은 핵심 사실 (확인된 것만) */
  keyFacts: [
    "굽갈이 1만원부터",
    "신발 수선 5천원부터",
    "칼갈이도 함께 합니다",
  ] as string[],

  /** 실제로 손님이 찾아오시는 지역 */
  areaServed: ["[주로 오시는 지역 — 예: 세종시 ○○동]"] as string[],

  /**
   * 영업시간.
   *
   * 휴무일은 아직 정해진 걸 못 들어서 비워 두었습니다.
   * days 는 검색엔진에 알려줄 요일입니다. 확실해지면 채워 주세요.
   * (예: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"])
   */
  openingHours: [
    {
      label: "영업시간",
      value: "오전 9:00 ~ 오후 6:30",
      badge: null,
      days: null as string[] | null,
    },
    {
      label: "휴무일",
      value: "[쉬는 날 — 알려주시면 넣겠습니다]",
      badge: null,
      days: null as string[] | null,
    },
  ],

  /**
   * 날씨 안내.
   *
   * 바깥 일이라 날씨 영향을 크게 받으므로, 첫 화면과 영업시간 옆에
   * 눈에 띄게 한 번씩 보여 줍니다. 문구를 고치시려면 여기만 고치세요.
   */
  weatherNotice: {
    title: "비 오는 날·궂은 날은 꼭 전화 먼저 주세요",
    body: "바깥에서 하는 일이라 날씨 영향을 많이 받습니다. 헛걸음하지 않으시도록, 오시기 전에 전화 한 통만 부탁드립니다.",
  },

  /** 그 밖의 안내 문구 */
  notices: [
    "ㆍ수선 물량에 따라 소요 시간이 달라질 수 있습니다.",
  ] as string[],

  /** 네이버 플레이스·인스타그램 등 (생기면 추가) */
  sameAs: [] as string[],
} as const;

/**
 * 택배 수선 안내.
 *
 * 아직 받는 주소가 정해지지 않아, 주소 대신 카카오톡으로 안내받도록 해 두었습니다.
 * 택배를 아예 안 받으시면 enabled 를 false 로 바꾸세요. 이 구역과 메뉴가 함께 사라집니다.
 */
export const DELIVERY = {
  enabled: true,
  /** 빈 값이면 "카카오톡으로 안내" 로 표시됩니다 */
  address: "",
  recipient: "",
  shippingCost: "[택배비 — 누가 부담하는지 알려주세요]",
  payment: "[결제 방법 — 계좌이체 등]",
  turnaround: "[걸리는 기간 — 예: 3~5일]",
  steps: [
    "카카오톡 채널로 신발(또는 칼) 사진과 손볼 곳을 보내 주세요.",
    "가능 여부와 대략적인 비용, 걸리는 기간을 알려 드립니다.",
    "안내드리는 주소로 보내 주세요. 연락처를 함께 넣어 주시면 좋습니다.",
    "다 되면 사진으로 보여 드린 뒤 보내 드립니다.",
  ] as string[],
} as const;

/**
 * 카카오(다음) 약도 설정.
 * 고정 주소가 생기면 https://map.kakao.com 의 '지도 퍼가기' 값을 넣어 주세요.
 */
export const KAKAO_ROUGHMAP = {
  timestamp: "",
  key: "",
} as const;

/** 검색 정보(JSON-LD)에서 가게 자체를 가리키는 고정 주소 */
export const SHOP_ID = `${MAIN_SITE_URL}/#shop`;
