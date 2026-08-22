import { REPAIR_GROUPS, priceLabel, timeLabel } from "@/lib/repairs";

/**
 * 가격표.
 *
 * 수선 종류와 같은 목록을 표 형태로 한 번 더 보여 줍니다.
 * "얼마예요?" 전화 문의를 줄이는 것이 목적이라, 스크롤 없이 훑을 수 있게
 * 간단한 표로만 둡니다.
 */
export default function PricesSection() {
  return (
    <section id="prices" className="bg-cream px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="rv text-[14px] font-bold tracking-[0.18em] text-tan">
          PRICE
        </p>
        <h2 className="rv rv-d1 font-serif-kr mt-4 text-[28px] font-bold leading-snug text-ink md:text-[38px]">
          가격 안내
        </h2>
        <p className="rv rv-d2 mt-5 text-[16px] leading-[1.9] text-muted">
          신발 상태와 부속 종류에 따라 달라질 수 있어, 아래는 기준 가격입니다.
          정확한 금액은 신발을 보고 말씀드립니다.
        </p>

        <div className="rv rv-d2 mt-12 overflow-hidden rounded-2xl border border-line bg-white">
          {REPAIR_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="bg-cream-deep px-6 py-3.5">
                <h3 className="text-[15px] font-bold tracking-wide text-leather">
                  {group.title}
                </h3>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-4 border-b border-line/70 px-6 py-4 last:border-b-0"
                  >
                    <span className="text-[15.5px] font-medium text-ink">
                      {item.name}
                    </span>
                    <span className="flex shrink-0 items-baseline gap-3 text-right">
                      {timeLabel(item.time) && (
                        <span className="text-[13px] text-faint">
                          {timeLabel(item.time)}
                        </span>
                      )}
                      <span className="text-[15.5px] font-bold text-leather">
                        {priceLabel(item.price)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="rv mt-6 text-[14px] leading-[1.8] text-faint">
          ㆍ&apos;문의&apos; 로 표시된 항목은 신발 상태에 따라 편차가 커서
          미리 정해두지 않았습니다.
          <br />
          ㆍ가격은 사정에 따라 변경될 수 있습니다.
        </p>
      </div>
    </section>
  );
}
