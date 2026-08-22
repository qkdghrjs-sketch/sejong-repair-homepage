import { SHOP, CONTENT_UPDATED } from "@/lib/site";
import { EXTERNAL, NAV } from "@/lib/nav";
import Fill, { isPending } from "@/components/Fill";

/** 맨 아래 가게 정보. 검색엔진이 가게를 확인하는 자리이기도 합니다. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-[#2a1c12] px-5 pb-28 pt-14 text-[#e7ddd0] md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-md">
            <p className="font-serif-kr text-xl font-bold text-[#f3e9da]">
              <Fill>{SHOP.name}</Fill>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#c4b6a4]">
              <Fill>{SHOP.tagline}</Fill>
            </p>

            <dl className="mt-6 space-y-2 text-[14px] leading-relaxed">
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-[#a2937f]">위치</dt>
                <dd>
                  {SHOP.address.hasAddress ? (
                    <>
                      <Fill>{SHOP.address.full}</Fill>
                      {!isPending(SHOP.address.detail) && (
                        <span className="block text-[#c4b6a4]">
                          {SHOP.address.detail}
                        </span>
                      )}
                    </>
                  ) : (
                    /* 고정 주소가 없어, 누르면 카카오톡 채널로 이동합니다 */
                    <a
                      href={EXTERNAL.kakao}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-white"
                    >
                      카카오톡으로 위치 문의하기 →
                    </a>
                  )}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-[#a2937f]">전화</dt>
                <dd>
                  <a href={EXTERNAL.tel} className="hover:underline">
                    <Fill>{SHOP.telephoneDisplay}</Fill>
                  </a>
                </dd>
              </div>
              {!isPending(SHOP.businessNumber) && (
                <div className="flex gap-3">
                  <dt className="w-14 shrink-0 text-[#a2937f]">사업자</dt>
                  <dd>{SHOP.businessNumber}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav>
              <p className="mb-3 text-[13px] font-bold tracking-wide text-[#a2937f]">
                둘러보기
              </p>
              <ul className="space-y-2 text-[15px]">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-3 text-[13px] font-bold tracking-wide text-[#a2937f]">
                문의
              </p>
              <a
                href={EXTERNAL.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-kakao px-4 py-2.5 text-[14px] font-bold text-[#3c1e1e]"
              >
                카카오톡 채널
              </a>
              <a
                href={EXTERNAL.tel}
                className="mt-3 block text-[15px] hover:underline"
              >
                전화 걸기 →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-[13px] text-[#8d7f6d]">
          <p>
            © {new Date().getFullYear()} <Fill>{SHOP.name}</Fill>. 안내 내용
            최종 확인 {CONTENT_UPDATED}.
          </p>
        </div>
      </div>
    </footer>
  );
}
