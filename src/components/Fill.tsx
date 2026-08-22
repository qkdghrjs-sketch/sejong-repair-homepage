/**
 * 아직 채우지 않은 값을 노랗게 표시해 주는 도우미.
 *
 * src/lib/site.ts 에서 대괄호 [ ] 로 남겨둔 자리를 화면에서 눈에 띄게 보여 줍니다.
 * 실제 정보로 바꾸면 표시가 저절로 사라집니다.
 */
export default function Fill({ children }: { children: string }) {
  const value = children?.trim() ?? "";
  const pending = value.startsWith("[") && value.endsWith("]");

  if (!pending) return <>{value}</>;
  return <span className="todo">{value}</span>;
}

/** 값이 아직 안 채워졌는지 확인 (조건부로 감출 때 사용) */
export function isPending(value: string) {
  const v = value?.trim() ?? "";
  return v === "" || (v.startsWith("[") && v.endsWith("]"));
}
