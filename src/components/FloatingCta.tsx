import { EXTERNAL } from "@/lib/nav";

/**
 * 화면 아래에 늘 붙어 있는 문의 버튼 (휴대폰 전용).
 *
 * 손님이 어디를 보고 있든 한 번에 연락할 수 있어야 문의가 늘어납니다.
 * 넓은 화면에서는 위쪽 메뉴의 버튼이 그 역할을 하므로 감춥니다.
 */
export default function FloatingCta() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-cream/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur md:hidden">
      <a
        href={EXTERNAL.tel}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-leather/25 bg-white py-3.5 text-[16px] font-bold text-leather"
      >
        전화 문의
      </a>
      <a
        href={EXTERNAL.kakao}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-[1.4] items-center justify-center gap-2 rounded-xl bg-kakao py-3.5 text-[16px] font-bold text-[#3c1e1e]"
      >
        카톡으로 견적 문의
      </a>
    </div>
  );
}
