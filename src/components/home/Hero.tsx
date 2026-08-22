import { SHOP } from "@/lib/site";
import { EXTERNAL } from "@/lib/nav";
import Fill, { isPending } from "@/components/Fill";

/**
 * 첫 화면.
 *
 * 손님이 3초 안에 "여기가 어디이고, 뭘 해주는 곳인지" 알 수 있어야 합니다.
 * 그래서 상호 · 한 줄 소개 · 위치 · 문의 버튼만 크게 둡니다.
 */
export default function Hero() {
  const facts = SHOP.keyFacts.filter((f) => !isPending(f));

  return (
    <section className="relative overflow-hidden bg-[#2a1c12] px-5 pb-20 pt-[120px] text-[#f3e9da] md:pb-28 md:pt-[168px]">
      {/* 배경 질감 — 가죽 결을 흉내 낸 은은한 무늬 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #a9713d 0, transparent 45%), radial-gradient(circle at 80% 70%, #c08a3e 0, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-[14px] font-bold tracking-[0.2em] text-brass">
          신발수선 · 칼갈이
        </p>

        <h1 className="font-serif-kr mt-5 text-[34px] font-bold leading-[1.28] sm:text-[44px] md:text-[56px]">
          <Fill>{SHOP.tagline}</Fill>
        </h1>

        <p className="mt-6 max-w-xl text-[16px] leading-[1.85] text-[#cdbfae] md:text-[17px]">
          <Fill>{SHOP.description}</Fill>
        </p>

        {facts.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-white/20 px-4 py-2 text-[14px] text-[#e2d5c4]"
              >
                {fact}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={EXTERNAL.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-kakao px-7 py-4 text-center text-[16px] font-bold text-[#3c1e1e] transition-transform hover:scale-[1.03]"
          >
            카카오톡으로 견적 문의
          </a>
          <a
            href="#repairs"
            className="rounded-xl border border-white/25 px-7 py-4 text-center text-[16px] font-bold text-[#f3e9da] transition-colors hover:bg-white/10"
          >
            어떤 수선을 하나요?
          </a>
        </div>

        {/* 주소가 없으니 '위치는 카톡으로' 안내가 그 자리를 대신합니다 */}
        <p className="mt-6 text-[14px] leading-relaxed text-[#a2937f]">
          전화{" "}
          <a href={EXTERNAL.tel} className="text-[#e2d5c4] hover:underline">
            {SHOP.telephoneDisplay}
          </a>
          {!SHOP.address.hasAddress ? (
            <>
              {" · "}
              <a
                href={EXTERNAL.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e2d5c4] underline underline-offset-4"
              >
                위치는 카카오톡으로 문의
              </a>
            </>
          ) : (
            <>
              {" · "}
              <Fill>{SHOP.address.full}</Fill>
            </>
          )}
        </p>

        {/* 날씨 안내 — 헛걸음을 막는 것이 가장 중요해서 첫 화면에 둡니다 */}
        <div className="mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-brass/35 bg-black/25 px-5 py-4">
          <span aria-hidden className="text-[18px] leading-none">
            ☔
          </span>
          <p className="text-[14.5px] leading-[1.75] text-[#e2d5c4]">
            <strong className="text-brass">{SHOP.weatherNotice.title}</strong>
            <br />
            {SHOP.weatherNotice.body}
          </p>
        </div>
      </div>
    </section>
  );
}
