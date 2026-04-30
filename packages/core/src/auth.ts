import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

/**
 * 權限等級定義 (依照憲法)
 */
export enum Role {
  CS_AGENT = "CS_AGENT",
  SUPERVISOR = "SUPERVISOR"
}

/**
 * 角色導向配置 (依照釐清決策)
 */
export const ROLE_HOME_REDIRECT: Record<Role, string> = {
  [Role.CS_AGENT]: "/records",
  [Role.SUPERVISOR]: "/dashboard"
};

/**
 * 密碼雜湊實作 (使用 argon2)
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

/**
 * 簡易權限檢查中介軟體
 */
export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 取得自定義 Header (開發期測試用)
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
