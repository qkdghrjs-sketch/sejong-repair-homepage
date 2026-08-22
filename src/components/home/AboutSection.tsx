import { SHOP } from "@/lib/site";
import Fill, { isPending } from "@/components/Fill";

/**
 * 가게 · 사장님 소개.
 *
 * 사진은 public/img/ 폴더에 넣고 아래 IMAGE 경로만 바꾸면 됩니다.
 * 사진이 없으면 사진 자리는 통째로 감춰집니다.
 */

/** 작업하시는 모습 사진 (없으면 빈 문자열로 두세요) */
const IMAGE = "";
const IMAGE_ALT = "작업 중인 모습";

export default function AboutSection() {
  const career = SHOP.ownerCareer.filter((line) => !isPending(line));

  return (
    <section id="about" className="bg-cream-deep px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="rv text-[14px] font-bold tracking-[0.18em] text-tan">
            ABOUT
          </p>
          <h2 className="rv rv-d1 font-serif-kr mt-4 text-[28px] font-bold leading-snug text-ink md:text-[38px]">
            <Fill>{SHOP.name}</Fill>
          </h2>

          {!isPending(SHOP.owner) && (
            <p className="rv rv-d1 mt-3 text-[17px] font-medium text-leather">
              <Fill>{SHOP.owner}</Fill>
            </p>
          )}

          <p className="rv rv-d2 mt-6 text-[16px] leading-[1.9] text-muted">
            <Fill>{SHOP.description}</Fill>
          </p>

          {career.length > 0 && (
            <ul className="rv rv-d3 mt-8 space-y-3 border-t border-line pt-8">
              {career.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[15px] leading-[1.8] text-ink"
                >
                  <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-brass" />
                  <span>
                    <Fill>{line}</Fill>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {IMAGE ? (
          <div className="rv rv-d2 overflow-hidden rounded-2xl">
            {/* 사진 비율이 제각각이라 잘라내지 않고 그대로 보여 줍니다 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGE}
              alt={IMAGE_ALT}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="rv rv-d2 flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-tan/50 bg-white/60 p-8 text-center">
            <p className="text-[15px] leading-relaxed text-faint">
              작업하시는 사진이 들어갈 자리입니다.
              <br />
              <span className="text-[13px]">
                사진을 <code>public/img/</code> 에 넣고
                <br />
                AboutSection.tsx 의 IMAGE 값만 바꾸면 됩니다.
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
