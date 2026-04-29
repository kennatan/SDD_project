/**
 * 卡號遮蔽邏輯 (遮蔽中間 3 位)
 */
export const maskCardNumber = (cardNumber: string): string => {
  if (cardNumber.length < 6) return '***';
  return cardNumber.substring(0, 2) + '***' + cardNumber.substring(5);
};
