"use client";

import { useEffect, useRef } from "react";
import { SHOP, KAKAO_ROUGHMAP } from "@/lib/site";
import { EXTERNAL } from "@/lib/nav";

/**
 * 카카오(다음) 약도.
 *
 * 지도 값(timestamp·key)은 src/lib/site.ts 의 KAKAO_ROUGHMAP 에서 관리합니다.
 * 아직 발급 전이면 지도 대신 안내 문구와 지도 앱 링크를 보여 줍니다.
 *
 * 로더 스크립트가 `daumRoughmapContainer{timestamp}` 라는 id를 직접 찾아가므로
 * 컨테이너 id는 임의로 바꿀 수 없습니다. 한 페이지에 하나만 사용하세요.
 *
 * 주의 — 카카오가 안내하는 설치 스크립트(roughmapLoader.js)는 내부에서
 * document.write 로 실제 지도 스크립트(roughmapLander.js)를 불러옵니다.
 * 그런데 document.write 는 페이지가 다 그려진 뒤에는 동작하지 않습니다.
 * (리액트는 화면을 그린 뒤에 스크립트를 붙이므로 여기에 해당합니다.)
 * 그래서 아래에서는 로더가 부르려던 주소를 가로채어
 * 지도 스크립트를 정상적인 방법으로 직접 붙여 줍니다.
 */

const LOADER_SRC = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";

type RoughmapConfig = {
  phase?: string;
  cdn?: string;
  url_protocal?: string;
  Lander?: new (options: {
    timestamp: string;
    key: string;
    mapWidth: string;
    mapHeight: string;
  }) => { render: () => void };
};

declare global {
  interface Window {
    daum?: { roughmap?: RoughmapConfig };
  }
}

/** 이미 붙어 있으면 다시 붙이지 않고, 로드가 끝나면 알려 줍니다. */
function appendScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "1") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.charset = "UTF-8";
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

/**
 * 설치 스크립트를 실행하되, 그 안의 document.write 를 잠시 가로채
 * 지도 스크립트 주소만 받아 옵니다.
 */
async function loadLander(): Promise<void> {
  if (window.daum?.roughmap?.Lander) return;

  let captured = "";
  const originalWrite = document.write;
  const originalWriteln = document.writeln;
  const capture = (markup: string) => {
    const matched = /src="([^"]+)"/.exec(markup);
    if (matched) captured = matched[1];
  };

  try {
    document.write = capture as typeof document.write;
    document.writeln = capture as typeof document.writeln;
    await appendScript(LOADER_SRC);
  } finally {
    document.write = originalWrite;
    document.writeln = originalWriteln;
  }

  // 설치 스크립트가 이미 한 번 실행된 경우에는 document.write 를 호출하지
  // 않으므로, 남아 있는 설정값으로 주소를 직접 만들어 씁니다.
  if (!captured) {
    const config = window.daum?.roughmap;
    if (config?.cdn && config.phase) {
      const protocol = config.url_protocal ?? "https:";
      captured = `${protocol}//t1.kakaocdn.net/kakaomapweb/roughmap/place/${config.phase}/${config.cdn}/roughmapLander.js`;
    }
  }

  if (!captured) throw new Error("지도 스크립트 주소를 찾지 못했습니다.");

  const src = captured.startsWith("//") ? `https:${captured}` : captured;
  await appendScript(src);
}

export default function KakaoRoughMap() {
  const rendered = useRef(false);
  const enabled = Boolean(KAKAO_ROUGHMAP.timestamp && KAKAO_ROUGHMAP.key);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || rendered.current) return;
      const container = document.getElementById(
        `daumRoughmapContainer${KAKAO_ROUGHMAP.timestamp}`,
      );
      const Lander = window.daum?.roughmap?.Lander;
      if (!container || !Lander) return;

      container.innerHTML = "";
      try {
        new Lander({
          timestamp: KAKAO_ROUGHMAP.timestamp,
          key: KAKAO_ROUGHMAP.key,
          mapWidth: "100%",
          mapHeight: "100%",
        }).render();
        rendered.current = true;
        // 약도가 컨테이너 크기를 다시 계산하도록 신호를 보냅니다.
        setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
        setTimeout(() => window.dispatchEvent(new Event("resize")), 1200);
      } catch {
        /* 지도 표시 실패는 페이지 전체에 영향을 주지 않습니다. */
      }
    };

    loadLander()
      .then(() => {
        render();
        // 지도 스크립트가 내부 준비를 마칠 시간을 조금 더 줍니다.
        setTimeout(render, 300);
        setTimeout(render, 1000);
      })
      .catch(() => {
        /* 스크립트 로드 실패 시 지도 영역은 빈 상태로 남습니다. */
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  /* 지도 값이 아직 없을 때 — 빈 회색 박스 대신 안내와 링크를 보여 줍니다. */
  if (!enabled) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center bg-cream-deep p-8 md:min-h-[380px]">
        <div className="text-center">
          <strong className="block text-[17px] font-bold text-ink">
            {SHOP.name}
          </strong>
          <span className="mt-2 block text-[15px] text-muted">
            {SHOP.address.full}
          </span>
          <a
            href={EXTERNAL.naverMap}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[15px] font-medium text-leather underline underline-offset-4"
          >
            네이버 지도에서 위치 보기 →
          </a>
          <span className="mt-5 block text-[13px] leading-relaxed text-faint">
            지도를 넣으려면 카카오맵 &apos;지도 퍼가기&apos; 값을
            <br />
            src/lib/site.ts 의 KAKAO_ROUGHMAP 에 넣어 주세요.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[300px] w-full md:min-h-[380px] [&_.root_daum_roughmap]:!w-full [&_.wrap_map]:!h-[300px] md:[&_.wrap_map]:!h-[380px]">
      <div
        id={`daumRoughmapContainer${KAKAO_ROUGHMAP.timestamp}`}
        className="root_daum_roughmap root_daum_roughmap_landing"
      />
    </div>
  );
}
