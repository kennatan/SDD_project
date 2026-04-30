/**
 * 卡號遮蔽工具 (去識別化)
 * 規則：遮蔽中間 3 位數 (例如 123456 -> 12***6)
 */
export const maskCardNumber = (cardNumber: string): string => {
  if (cardNumber.length < 6) return cardNumber;
  return `${cardNumber.slice(0, 2)}***${cardNumber.slice(5)}`;
};

/**
 * 檢查是否超過保留期限 (12個月)
 */
export const isPastRetentionPeriod = (createdAt: Date): boolean => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  return createdAt < twelveMonthsAgo;
};
