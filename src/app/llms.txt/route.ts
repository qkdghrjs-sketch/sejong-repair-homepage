import { SHOP, DELIVERY, SITE_URL, CONTENT_UPDATED } from "@/lib/site";
import { REPAIR_GROUPS, priceLabel } from "@/lib/repairs";

/**
 * /llms.txt — AI 모델용 가게 요약 (llmstxt.org 제안 형식).
 *
 * 챗GPT·Claude·제미나이 같은 AI가 "○○동 신발수선 어디가 있어?" 같은 질문에
 * 답할 때 이 파일 하나만 읽어도 우리 가게를 정확히 소개할 수 있게 정리한
 * 문서입니다. 사람에게는 보이지 않습니다.
 */

export const revalidate = 600;

/** 아직 안 채운 [대괄호] 값은 AI에게 알려주지 않습니다 */
function ok(value: string) {
  const v = value?.trim() ?? "";
  if (!v) return null;
  if (v.startsWith("[") && v.endsWith("]")) return null;
  return v;
}

export function GET() {
  const lines: string[] = [];
  const push = (line = "") => lines.push(line);

  push(`# ${ok(SHOP.name) ?? "신발수선"}`);
  push();
  if (ok(SHOP.description)) {
    push(`> ${SHOP.description}`);
    push();
  }

  push("## 기본 정보");
  push();
  if (ok(SHOP.name)) push(`- 상호: ${SHOP.name}`);
  if (SHOP.address.hasAddress && ok(SHOP.address.full)) {
    push(`- 주소: ${SHOP.address.full}`);
  } else {
    push(`- 위치: 고정된 가게 주소 없음. ${SHOP.locationNote}`);
  }
  if (ok(SHOP.telephoneDisplay)) push(`- 전화: ${SHOP.telephoneDisplay}`);
  if (ok(SHOP.owner)) push(`- 대표: ${SHOP.owner}`);
  if (ok(SHOP.businessNumber))
    push(`- 사업자등록번호: ${SHOP.businessNumber}`);
  push(`- 홈페이지: ${SITE_URL}`);
  push(`- 카카오톡 문의: ${SHOP.kakaoChannel}`);
  push();

  const directions = SHOP.directions.filter(ok);
  if (directions.length > 0) {
    push("## 찾아오시는 길");
    push();
    for (const line of directions) push(`- ${line}`);
    if (ok(SHOP.parking)) push(`- 주차: ${SHOP.parking}`);
    push();
  }

  const hours = SHOP.openingHours.filter((row) => ok(row.value));
  if (hours.length > 0) {
    push("## 영업시간");
    push();
    for (const row of hours) push(`- ${row.label}: ${row.value}`);
    push(
      `- ${SHOP.weatherNotice.title} — ${SHOP.weatherNotice.body} (전화 ${SHOP.telephoneDisplay})`,
    );
    push();
  }

  const career = SHOP.ownerCareer.filter(ok);
  const facts = SHOP.keyFacts.filter(ok);
  if (career.length > 0 || facts.length > 0) {
    push("## 이 가게의 특징");
    push();
    for (const line of [...facts, ...career]) push(`- ${line}`);
    push();
  }

  push("## 수선 항목");
  push();
  for (const group of REPAIR_GROUPS) {
    push(`### ${group.title}`);
    push();
    for (const item of group.items) {
      const price = priceLabel(item.price);
      const time = item.time.trim();
      const meta = [price, time].filter(Boolean).join(" · ");
      push(`- ${item.name} (${meta}): ${item.desc}`);
    }
    push();
  }

  if (DELIVERY.enabled) {
    push("## 택배 수선");
    push();
    push("- 전국 어디서나 택배로 수선을 맡길 수 있습니다.");
    if (ok(DELIVERY.address)) push(`- 보내실 주소: ${DELIVERY.address}`);
    if (ok(DELIVERY.shippingCost)) push(`- 택배비: ${DELIVERY.shippingCost}`);
    if (ok(DELIVERY.payment)) push(`- 결제: ${DELIVERY.payment}`);
    if (ok(DELIVERY.turnaround)) push(`- 소요 기간: ${DELIVERY.turnaround}`);
    push(
      "- 진행 순서: " + DELIVERY.steps.map((s, i) => `${i + 1}) ${s}`).join(" "),
    );
    push();
  }

  const areas = SHOP.areaServed.filter(ok);
  if (areas.length > 0) {
    push("## 주로 찾아주시는 지역");
    push();
    push(`- ${areas.join(", ")}`);
    push();
  }

  push("---");
  push(`안내 내용 최종 확인: ${CONTENT_UPDATED}`);
  push();

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
