import { validateCardNumber, validateExtension } from '../src/validators';

describe('Validators 測試', () => {
  test('卡號驗證：應通過 1-6 碼數字', () => {
    expect(validateCardNumber('123456')).toBe(true);
    expect(validateCardNumber('1')).toBe(true);
  });

  test('卡號驗證：應拒絕超過 6 碼或非數字', () => {
    expect(validateCardNumber('1234567')).toBe(false);
    expect(validateCardNumber('abc')).toBe(false);
  });

  test('分機驗證：應通過 1-10 碼數字', () => {
    expect(validateExtension('1234567890')).toBe(true);
  });

  test('分機驗證：應拒絕超過 10 碼', () => {
    expect(validateExtension('12345678901')).toBe(false);
  });
});
