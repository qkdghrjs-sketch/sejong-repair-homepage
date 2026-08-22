import { SHOP } from "@/lib/site";
import { EXTERNAL } from "@/lib/nav";
import KakaoRoughMap from "@/components/KakaoRoughMap";
import Fill, { isPending } from "@/components/Fill";

/**
 * 영업시간 · 위치 문의.
 *
 * 고정된 가게 주소가 없으므로(site.ts 의 address.hasAddress = false),
 * 지도 자리에 "카카오톡으로 위치 문의" 안내가 들어갑니다.
 * 나중에 주소가 생겨 hasAddress 를 true 로 바꾸면 지도와 주소가 다시 나옵니다.
 */
export default function LocationSection() {
  const hasAddress = SHOP.address.hasAddress;
  const directions = SHOP.directions.filter((line) => !isPending(line));
  const notices = SHOP.notices.filter(
    (line) => !line.includes("[") || !line.includes("]"),
  );

  return (
    <section id="location" className="bg-white px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="rv text-[14px] font-bold tracking-[0.18em] text-tan">
          {hasAddress ? "LOCATION" : "HOURS & CONTACT"}
        </p>
        <h2 className="rv rv-d1 font-serif-kr mt-4 text-[28px] font-bold leading-snug text-ink md:text-[38px]">
          {hasAddress ? "오시는 길" : "영업시간 · 문의"}
        </h2>

        {/* 날씨 안내 — 이 가게에서 가장 중요한 안내라 크게 둡니다 */}
        <div className="rv rv-d1 mt-8 flex flex-col gap-4 rounded-2xl border-2 border-brass/40 bg-[#fdf6e8] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span aria-hidden className="text-[26px] leading-none">
              ☔
            </span>
            <div>
              <p className="text-[17px] font-bold leading-snug text-leather md:text-[19px]">
                {SHOP.weatherNotice.title}
              </p>
              <p className="mt-2 text-[15px] leading-[1.8] text-muted">
                {SHOP.weatherNotice.body}
              </p>
            </div>
          </div>
          <a
            href={EXTERNAL.tel}
            className="shrink-0 rounded-xl bg-leather px-6 py-3.5 text-center text-[16px] font-bold text-cream transition-colors hover:bg-tan"
          >
            {SHOP.telephoneDisplay} 전화
          </a>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          {/* 왼쪽 — 지도 또는 위치 문의 안내 */}
          {hasAddress ? (
            <div className="rv overflow-hidden rounded-2xl border border-line">
              <KakaoRoughMap />
            </div>
          ) : (
            <div className="rv flex flex-col justify-center rounded-2xl border border-line bg-cream p-8 md:p-10">
              <p className="text-[13px] font-bold tracking-wide text-tan">
                위치
              </p>
              <p className="mt-3 text-[17px] font-medium leading-[1.75] text-ink">
                {SHOP.locationNote}
              </p>
              <a
                href={EXTERNAL.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-xl bg-kakao py-4 text-center text-[16px] font-bold text-[#3c1e1e] transition-transform hover:scale-[1.02]"
              >
                카카오톡으로 위치 물어보기
              </a>
              <a
                href={EXTERNAL.tel}
                className="mt-3 block rounded-xl border border-leather/25 bg-white py-4 text-center text-[16px] font-bold text-leather"
              >
                전화로 물어보기 · {SHOP.telephoneDisplay}
              </a>
            </div>
          )}

          {/* 오른쪽 — 영업시간 */}
          <div className="rv rv-d2">
            <div className="overflow-hidden rounded-2xl border border-line">
              <div className="bg-cream-deep px-6 py-4">
                <h3 className="text-[16px] font-bold text-leather">영업시간</h3>
              </div>
              <ul className="bg-cream">
                {SHOP.openingHours.map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line/70 px-6 py-4 last:border-b-0"
                  >
                    <span className="text-[15.5px] font-medium text-ink">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-3">
                      {row.badge && (
                        <span className="rounded-full bg-brass/15 px-2.5 py-1 text-[12px] font-bold text-leather">
                          {row.badge}
                        </span>
                      )}
                      <span className="text-[15.5px] text-muted">
                        <Fill>{row.value}</Fill>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line bg-white px-6 py-5">
                <p className="text-[14px] leading-[1.8] text-faint">
                  ㆍ날씨에 따라 자리를 비울 수 있어, 영업시간이 그대로
                  지켜지지 않을 수 있습니다.
                </p>
                {notices.map((line) => (
                  <p key={line} className="text-[14px] leading-[1.8] text-faint">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {directions.length > 0 && (
              <div className="mt-6">
                <p className="text-[13px] font-bold tracking-wide text-tan">
                  찾아오시는 방법
                </p>
                <div className="mt-2 space-y-1.5">
                  {directions.map((line) => (
                    <p
                      key={line}
                      className="text-[15.5px] leading-[1.75] text-muted"
                    >
                      <Fill>{line}</Fill>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {hasAddress && (
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={EXTERNAL.naverMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-line px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-tan hover:text-leather"
                >
                  네이버 지도에서 보기
                </a>
                <a
                  href={EXTERNAL.kakaoMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-line px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-tan hover:text-leather"
                >
                  카카오맵에서 보기
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
