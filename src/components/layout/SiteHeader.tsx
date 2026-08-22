"use client";

import { useEffect, useState } from "react";
import { NAV, EXTERNAL } from "@/lib/nav";
import { SHOP } from "@/lib/site";
import Fill from "@/components/Fill";

/**
 * 위쪽 고정 메뉴.
 *
 * 한 페이지 스크롤형이라 메뉴를 누르면 해당 구역으로 내려갑니다.
 * 화면이 좁으면(휴대폰) 메뉴가 접히고, 대신 전화 버튼이 바로 보입니다.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 메뉴가 열린 동안에는 뒤 배경이 스크롤되지 않게 합니다 */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* 배경이 밝아진 상태 — 글자색을 어둡게 바꿔야 읽힙니다 */
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-cream/95 backdrop-blur border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className={`font-serif-kr text-lg font-bold transition-colors sm:text-xl ${
            solid ? "text-leather" : "text-[#f3e9da]"
          }`}
        >
          <Fill>{SHOP.name}</Fill>
        </a>

        {/* 넓은 화면 메뉴 */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[15px] font-medium transition-colors ${
                solid
                  ? "text-muted hover:text-leather"
                  : "text-[#d8cab8] hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={EXTERNAL.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-kakao px-4 py-2 text-[14px] font-bold text-[#3c1e1e] transition-transform hover:scale-105"
          >
            카톡 문의
          </a>
        </nav>

        {/* 좁은 화면 — 전화 + 메뉴 버튼 */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={EXTERNAL.tel}
            className={`rounded-full border px-3 py-2 text-[14px] font-bold transition-colors ${
              solid
                ? "border-leather/30 text-leather"
                : "border-white/30 text-[#f3e9da]"
            }`}
          >
            전화
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block h-[2px] w-6 transition-transform ${solid ? "bg-ink" : "bg-[#f3e9da]"} ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 transition-opacity ${solid ? "bg-ink" : "bg-[#f3e9da]"} ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 transition-transform ${solid ? "bg-ink" : "bg-[#f3e9da]"} ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 좁은 화면에서 펼쳐지는 메뉴 */}
      {open && (
        <nav className="border-t border-line bg-cream px-5 pb-8 pt-4 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/70 py-4 text-[17px] font-medium text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={EXTERNAL.kakao}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-xl bg-kakao py-4 text-center text-[16px] font-bold text-[#3c1e1e]"
          >
            카카오톡으로 문의하기
          </a>
        </nav>
      )}
    </header>
  );
}
