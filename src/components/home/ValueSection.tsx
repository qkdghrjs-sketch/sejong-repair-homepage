/**
 * "왜 고쳐 신는가" — 수선의 가치.
 *
 * 이 부분은 가게 정보가 아니라 일반적인 이야기라서 미리 채워 두었습니다.
 * 문구가 마음에 안 드시면 여기 글만 고치시면 됩니다.
 */

const VALUES = [
  {
    no: "01",
    title: "새로 사는 값의 몇 분의 일",
    body: "굽 하나, 밑창 하나 갈면 다시 몇 년을 신습니다. 멀쩡한 신발을 굽이 닳았다는 이유로 버리는 건 가장 아까운 일입니다.",
  },
  {
    no: "02",
    title: "길든 신발은 대체가 안 됩니다",
    body: "발에 맞춰 길든 신발은 새 신발이 흉내 낼 수 없습니다. 발이 편한 신발 한 켤레가 하루의 피로를 바꿉니다.",
  },
  {
    no: "03",
    title: "고쳐 쓰는 것이 가장 확실한 절약",
    body: "신발 한 켤레를 더 오래 신는 것은 지갑에도, 버려지는 쓰레기에도 도움이 됩니다. 가장 손쉬운 실천입니다.",
  },
  {
    no: "04",
    title: "기계가 아니라 손이 하는 일",
    body: "신발은 한 켤레마다 닳은 모양이 다릅니다. 수선은 눈으로 보고 손으로 맞추는 일이라, 사람의 경력이 그대로 결과가 됩니다.",
  },
];

export default function ValueSection() {
  return (
    <section className="bg-cream px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="rv text-[14px] font-bold tracking-[0.18em] text-tan">
          WHY REPAIR
        </p>
        <h2 className="rv rv-d1 font-serif-kr mt-4 text-[28px] font-bold leading-snug text-ink md:text-[38px]">
          버리기 전에,
          <br />
          한 번 보여 주세요
        </h2>
        <p className="rv rv-d2 mt-5 max-w-xl text-[16px] leading-[1.9] text-muted">
          못 신게 됐다고 생각한 신발의 상당수는 손을 보면 다시 신을 수 있습니다.
          고칠 수 있는지 없는지부터 솔직하게 말씀드립니다.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {VALUES.map((value, index) => (
            <div
              key={value.no}
              className={`rv rv-d${(index % 3) + 1} bg-white p-7 md:p-9`}
            >
              <span className="font-serif-kr text-[15px] font-bold text-brass">
                {value.no}
              </span>
              <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink md:text-[21px]">
                {value.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.85] text-muted">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
