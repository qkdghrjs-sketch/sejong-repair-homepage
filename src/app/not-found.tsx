import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-28 pt-[160px] text-center">
      <p className="text-[13px] font-bold tracking-[0.18em] text-tan">
        404 NOT FOUND
      </p>
      <h1 className="font-serif-kr mt-4 text-[30px] font-bold text-ink">
        찾으시는 페이지가 없습니다
      </h1>
      <p className="mt-4 text-[15px] leading-[1.85] text-muted">
        주소가 바뀌었거나 없어진 페이지일 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-leather px-8 text-[15px] font-bold text-cream transition-colors hover:bg-tan"
      >
        첫 화면으로
      </Link>
    </div>
  );
}
