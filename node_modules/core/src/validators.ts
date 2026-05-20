/**
 * 驗證卡號格式 (最長 6 碼數字)
 */
export const validateCardNumber = (cardNumber: string): boolean => {
  const regex = /^\d{1,6}$/;
  return regex.test(cardNumber);
};

/**
 * 驗證分機格式 (最長 10 碼數字)
 */
export const validateExtension = (extension: string): boolean => {
  const regex = /^\d{1,10}$/;
  return regex.test(extension);
};

