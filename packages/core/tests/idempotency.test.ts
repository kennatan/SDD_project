import { describe, it, expect, vi, beforeEach } from "vitest";

// 模擬防抖邏輯 (待實作於 middleware)
const cache = new Set<string>();
const preventDuplicateMock = (key: string) => {
  if (cache.has(key)) return false;
  cache.add(key);
  setTimeout(() => cache.delete(key), 3000);
  return true;
};

describe("防抖 (Idempotency) 邏輯測試", () => {
  beforeEach(() => {
    cache.clear();
    vi.useFakeTimers();
  });

  it("在 3 秒內重複提交應被拒絕", () => {
    const key = "USER1-CARD123";
    expect(preventDuplicateMock(key)).toBe(true); // 第一次成功
    expect(preventDuplicateMock(key)).toBe(false); // 立即重複失敗
  });

  it("超過 3 秒後應可再次提交", () => {
    const key = "USER1-CARD123";
    preventDuplicateMock(key);
    vi.advanceTimersByTime(3001);
    expect(preventDuplicateMock(key)).toBe(true); // 冷卻後成功
  });
});
