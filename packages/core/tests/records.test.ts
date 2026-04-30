import { describe, it, expect } from "vitest";
import { validateCardNumber, validateExtension } from "../src/validators";

describe("TaskRecord 驗證器測試", () => {
  it("應通過正確格式的卡號 (1-6碼)", () => {
    expect(validateCardNumber("123456")).toBe(true);
    expect(validateCardNumber("1")).toBe(true);
  });

  it("應拒絕超過 6 碼或含有非數字的卡號", () => {
    expect(validateCardNumber("1234567")).toBe(false);
    expect(validateCardNumber("ABC12")).toBe(false);
  });

  it("應通過正確格式的分機 (1-10碼)", () => {
    expect(validateExtension("1234567890")).toBe(true);
    expect(validateExtension("123")).toBe(true);
  });

  it("應拒絕超過 10 碼的分機", () => {
    expect(validateExtension("12345678901")).toBe(false);
  });
});
