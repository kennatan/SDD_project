# 實作計畫：緊急任務報修紀錄系統 (001-emergency-task-report)

**分支**: `001-emergency-task-report` | **日期**: 2026-04-29 | **規格**: [spec.md](./spec.md) v1.3.3
**輸入**: 快速報修介面與主管稽核儀表板。

## 摘要
本功能將建構一個基於 React 與 Node.js 的 Web 應用程式，採用 Monorepo 結構。重點在於落實 Vitest 測試驅動開發、Database-based 智慧記憶以及由主管手動設定的量能警示閾值。

## 技術背景

**語言/版本**: TypeScript (Node.js v18+)
**主要依賴**: React, Tailwind CSS, Express, Chart.js, Prisma (ORM)
**測試**: **Vitest** (Unit/Integration), Playwright (E2E)
**存取控制**: 採用 argon2 進行密碼雜湊，實作 RBAC 中介軟體。

## 憲法檢查 (Constitution Check)

1. **迭代持久化**: 每一項任務完成後必須 Git Commit 並 Push。 **[YES]**
2. **Library-First**: 核心邏輯封裝於 `@sdd/core`。 **[YES]**
3. **測試先行**: 強制在實作前完成 Vitest 腳本。 **[YES]**
4. **語言規範**: 全程使用正體中文。 **[YES]**
5. **遠端同步**: 憲法 v1.2.1 要求的 GitHub 同步規範。 **[YES]**

## 專案結構 (Monorepo)

```text
apps/
  └── web/               # React 前端 (Vite + Tailwind)
  └── api/               # Express API 伺服器
packages/
  └── core/              # @sdd/core: 驗證、服務、加密邏輯
  └── database/          # @sdd/database: Prisma Schema & Migrations
```

## 實作階段

### Phase 1: Setup
- 初始化 Monorepo 目錄與 npm workspaces。
- 配置全域 Vitest 與 ESLint。

### Phase 2: Foundational
- 實作資料模型 (Prisma) 含 `alertThreshold`。
- 實作基礎驗證器與權限檢查邏輯。

### Phase 3: CS Reporting (US1)
- 實作 3秒防抖與資料庫驅動的智慧記憶功能。
- 完善成功反饋動畫。

### Phase 4 & 5: Management & BI (US2 & US3)
- 實作分類管理與圓餅圖分析。
- 實作主管設定之量能警示邏輯。

## 複雜度追蹤
- N/A
