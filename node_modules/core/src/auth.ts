import { Request, Response, NextFunction } from "express";

/**
 * 權限等級定義 (依照憲法)
 */
export enum Role {
  CS_AGENT = "CS_AGENT",
  SUPERVISOR = "SUPERVISOR"
}

/**
 * 簡易權限檢查中介軟體
 */
export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 此處為基礎架構預留，未來將對接真實 Auth Session/JWT
    const userRole = req.headers["x-user-role"] as Role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ 
        error: "權限不足", 
        message: "您的帳號無權執行此操作。" 
      });
    }
    next();
  };
};

