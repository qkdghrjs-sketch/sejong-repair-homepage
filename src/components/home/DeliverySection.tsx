import { DELIVERY } from "@/lib/site";
import { EXTERNAL } from "@/lib/nav";
import Fill from "@/components/Fill";

/**
 * 택배 수선 안내.
 *
 * src/lib/site.ts 의 DELIVERY.enabled 를 false 로 바꾸면 이 구역 전체와
 * 메뉴 항목이 함께 사라집니다.
 */
export default function DeliverySection() {
  if (!DELIVERY.enabled) return null;

  /**
   * 받는 주소가 아직 없어, 주소 자리는 카카오톡 안내로 대신합니다.
   * site.ts 의 DELIVERY.address 를 채우면 주소가 그대로 나옵니다.
   */
  const addressRow = DELIVERY.address.trim()
    ? { label: "보내실 주소", value: DELIVERY.address }
    : {
        label: "보내실 주소",
        value: "카카오톡 채널로 문의 주시면 보내실 주소를 알려 드립니다.",
      };

  const rows = [
    addressRow,
    ...(DELIVERY.recipient.trim()
      ? [{ label: "받는 사람", value: DELIVERY.recipient }]
      : []),
    { label: "택배비", value: DELIVERY.shippingCost },
    { label: "결제", value: DELIVERY.payment },
    { label: "소요 기간", value: DELIVERY.turnaround },
  ];

  return (
    <section
      id="delivery"
      className="bg-[#2a1c12] px-5 py-20 text-[#f3e9da] md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="rv text-[14px] font-bold tracking-[0.18em] text-brass">
          DELIVERY
        </p>
        <h2 className="rv rv-d1 font-serif-kr mt-4 text-[28px] font-bold leading-snug md:text-[38px]">
          멀리 계셔도 괜찮습니다
          <br />
          택배로 보내 주세요
        </h2>
        <p className="rv rv-d2 mt-5 max-w-xl text-[16px] leading-[1.9] text-[#cdbfae]">
          전국 어디서나 택배로 수선을 맡기실 수 있습니다. 보내시기 전에
          카카오톡으로 사진을 먼저 보내 주시면 헛걸음이 없습니다.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* 진행 순서 */}
          <ol className="rv space-y-6">
            {DELIVERY.steps.map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="font-serif-kr flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/50 text-[15px] font-bold text-brass">
                  {index + 1}
                </span>
                <p className="pt-1.5 text-[15.5px] leading-[1.8] text-[#e2d5c4]">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          {/* 보내실 곳 */}
          <div className="rv rv-d2 rounded-2xl bg-white/[0.06] p-7 md:p-8">
            <dl className="space-y-5">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[13px] font-bold tracking-wide text-[#a2937f]">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5 text-[15.5px] leading-[1.75] text-[#f3e9da]">
                    <Fill>{row.value}</Fill>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 rounded-lg bg-black/20 px-4 py-3 text-[13.5px] leading-[1.7] text-[#c4b6a4]">
              보내실 때 <strong className="text-[#f3e9da]">연락처와 손볼 곳</strong>
              을 적은 쪽지를 함께 넣어 주시면 훨씬 정확하게 봐 드릴 수 있습니다.
            </p>

            <a
              href={EXTERNAL.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-xl bg-kakao py-3.5 text-center text-[16px] font-bold text-[#3c1e1e] transition-transform hover:scale-[1.02]"
            >
              택배 수선 문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
