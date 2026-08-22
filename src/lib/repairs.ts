/**
 * 수선 항목과 가격.
 *
 * ★ 지금은 확인된 세 가지만 올려 두었습니다.
 *   (굽갈이 1만원~ / 신발 수선 5천원~ / 칼갈이)
 *
 *   실제로 하시는 작업이 더 있으면 아래와 같은 모양으로 줄을 추가하세요.
 *   price 를 빈 문자열("")로 두면 화면에 "문의" 라고 나옵니다.
 *   (지어낸 가격이 손님에게 보이는 일은 없습니다.)
 *
 *   추가할 때 참고할 만한 흔한 항목:
 *   창갈이, 밑창 보강, 미끄럼 방지, 가죽 염색, 지퍼 교체,
 *   깔창 교체, 신발 늘리기, 박음질 보수, 가방·벨트 수선, 가위갈이
 */

export type RepairItem = {
  name: string;
  desc: string;
  /** 가격 (예: "10,000원~") · 비워두면 "문의" */
  price: string;
  /** 걸리는 시간 (예: "당일") · 비워두면 표시 안 함 */
  time: string;
  featured?: boolean;
};

export type RepairGroup = {
  id: string;
  title: string;
  lead: string;
  items: RepairItem[];
};

export const REPAIR_GROUPS: RepairGroup[] = [
  {
    id: "shoes",
    title: "신발 수선",
    lead: "굽이 닳았다고 버리기엔 아까운 신발, 먼저 보여 주세요.",
    items: [
      {
        name: "굽갈이",
        desc: "닳은 뒷굽을 새것으로 갈아 드립니다. 구두·부츠 모두 됩니다.",
        price: "10,000원~",
        time: "",
        featured: true,
      },
      {
        name: "신발 수선",
        desc: "터진 실밥, 떨어진 밑창처럼 손볼 곳을 보고 맞춰 고쳐 드립니다.",
        price: "5,000원~",
        time: "",
        featured: true,
      },
    ],
  },
  {
    id: "knife",
    title: "칼갈이",
    lead: "무뎌진 칼은 오히려 손을 다치게 합니다.",
    items: [
      {
        name: "칼갈이",
        desc: "집에서 쓰시는 부엌칼을 잘 드는 상태로 다시 잡아 드립니다.",
        price: "",
        time: "",
        featured: true,
      },
    ],
  },
];

/** 홈 화면 위쪽에 크게 보여줄 대표 작업 */
export const FEATURED_REPAIRS = REPAIR_GROUPS.flatMap((group) =>
  group.items.filter((item) => item.featured),
);

/** 가격이 비어 있으면 "문의" 로 표시합니다 */
export function priceLabel(price: string) {
  return price.trim() === "" ? "문의" : price;
}

/** 소요 시간이 비어 있으면 표시하지 않습니다 */
export function timeLabel(time: string) {
  return time.trim();
}
