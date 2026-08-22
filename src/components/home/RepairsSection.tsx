import { REPAIR_GROUPS, priceLabel, timeLabel } from "@/lib/repairs";
import { EXTERNAL } from "@/lib/nav";

/**
 * 수선 종류.
 *
 * 목록은 src/lib/repairs.ts 에서 관리합니다.
 * 항목을 지우거나 더하면 이 화면과 가격표, 검색 정보가 함께 바뀝니다.
 */
export default function RepairsSection() {
  return (
    <section id="repairs" className="bg-white px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="rv text-[14px] font-bold tracking-[0.18em] text-tan">
          REPAIR MENU
        </p>
        <h2 className="rv rv-d1 font-serif-kr mt-4 text-[28px] font-bold leading-snug text-ink md:text-[38px]">
          어떤 수선을 하나요
        </h2>
        <p className="rv rv-d2 mt-5 max-w-xl text-[16px] leading-[1.9] text-muted">
          아래에 없는 작업도 사진을 보내 주시면 가능한지 먼저 알려 드립니다.
        </p>

        <div className="mt-14 space-y-14">
          {REPAIR_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="rv flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line pb-4">
                <h3 className="font-serif-kr text-[22px] font-bold text-leather md:text-[26px]">
                  {group.title}
                </h3>
                {group.lead && (
                  <p className="text-[15px] text-faint">{group.lead}</p>
                )}
              </div>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <li
                    key={item.name}
                    className={`rv rv-d${(index % 3) + 1} rounded-xl border border-line bg-cream p-6 transition-shadow hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[17px] font-bold leading-snug text-ink">
                        {item.name}
                      </h4>
                      {item.featured && (
                        <span className="shrink-0 rounded-full bg-brass/15 px-2.5 py-1 text-[12px] font-bold text-leather">
                          대표
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 text-[14.5px] leading-[1.8] text-muted">
                      {item.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-line pt-3 text-[14px]">
                      <span className="font-bold text-leather">
                        {priceLabel(item.price)}
                      </span>
                      {timeLabel(item.time) && (
                        <>
                          <span className="text-line">|</span>
                          <span className="text-faint">
                            {timeLabel(item.time)}
                          </span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rv mt-14 rounded-2xl bg-cream-deep p-8 text-center md:p-10">
          <p className="text-[17px] font-bold text-ink md:text-[19px]">
            이것도 고칠 수 있을까요?
          </p>
          <p className="mt-3 text-[15px] leading-[1.85] text-muted">
            사진 한 장이면 됩니다. 손볼 곳을 찍어 보내 주시면
            <br className="hidden sm:block" /> 가능한지, 얼마나 드는지 먼저
            알려 드립니다.
          </p>
          <a
            href={EXTERNAL.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-kakao px-7 py-3.5 text-[16px] font-bold text-[#3c1e1e] transition-transform hover:scale-[1.03]"
          >
            사진 보내고 물어보기
          </a>
        </div>
      </div>
    </section>
  );
}
