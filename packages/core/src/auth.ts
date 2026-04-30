import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

/**
 * 角色導向配置
 */
export enum Role {
  CS_AGENT = "CS_AGENT",
  SUPERVISOR = "SUPERVISOR"
}

/**
 * [資安-3] 密碼雜湊實作 (使用 argon2id 並配置安全基準參數)
 * 基準：Memory: 64MB, Iterations: 3, Parallelism: 4
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536, // 64MB
    timeCost: 3,
    parallelism: 4
  });
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers["x-user-role"] as Role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: "權限不足" });
    }
    next();
  };
};
