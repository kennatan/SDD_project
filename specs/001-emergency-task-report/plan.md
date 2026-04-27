# 實作計畫：緊急任務報修紀錄系統 (001-emergency-task-report)

**分支**: `001-emergency-task-report` | **日期**: 2026-04-18 | **規格**: [spec.md](./spec.md)
**輸入**: 快速報修介面與主管稽核儀表板。

## 摘要
本功能將建構一個基於 React 與 Node.js 的 Web 應用程式，專注於極簡的報修流程（無負擔紀錄）與符合資安規範的統計分析（資料分層保留）。

## 技術背景

**語言/版本**: TypeScript (Node.js v18+)  
**主要依賴**: React, Tailwind CSS, Express, Chart.js, Prisma (ORM)  
**儲存**: PostgreSQL  
**測試**: Vitest (Unit/Integration), Playwright (E2E)  
**目標平台**: Web / Docker  
**專案類型**: Web Application (Monorepo)

## 憲法檢查 (Constitution Check)

*門檻：Phase 0 研究前必須通過。Phase 1 設計後需再次驗證。*

1. **迭代持久化**: 計畫是否包含明確的 Git 提交檢查點？ **[YES]** (詳見 Tasks)
2. **Library-First**: 功能是否結構化為可獨立測試的程式庫？ **[YES]** (封裝於 core package)
3. **測試先行**: 是否在實作前定義了自動化測試？ **[YES]** (強制於 Phase 2/3)
4. **CLI 與自動化**: 功能是否暴露為清潔的 CLI/腳本介面？ **[YES]** (Prisma CLI & Custom Scripts)
5. **可觀察性**: 設計是否包含結構化日誌與錯誤處理？ **[YES]** (包含審計日誌與操作追蹤)
6. **高品質與可測試性**: 是否符合生產標準且具備測試覆蓋？ **[YES]**
7. **MVP 與防止過度設計**: 是否優先交付核心價值並拒絕冗餘架構？ **[YES]** (排除本階段 SSO 整合)
8. **語言規範**: 是否全程使用正體中文？ **[YES]**
9. **專業代理人審查**: 是否通過 UX 與資安代理人閘門？ **[YES]** (已整合研究建議)

## 專案結構

### 說明文件 (此功能)

```text
specs/001-emergency-task-report/
├── plan.md              # 此檔案
├── research.md          # 技術研究報告
├── data-model.md        # 資料模型定義
├── quickstart.md        # 快速上手指南
├── contracts/           # API 契約 (api.md)
└── tasks.md             # 任務清單 (Phase 2 生成)
```

### 源代碼結構 (Repository Root)

```text
apps/
  └── web/               # React 前端 (CSS, Pages, Components)
packages/
  └── core/              # 核心業務邏輯 (Services, Models, Validators)
  └── database/          # Prisma Schema & Migrations
tests/
  └── e2e/               # 跨端測試
```

**結構決策**: 採 Monorepo 結構以符合憲法之 Library-First 原則。

## 複雜度追蹤

> **僅當憲法檢查有違規且必須辯護時填寫**
> *無違規事項。*

| 違規項目 | 為什麼需要 | 已拒絕的更簡單替代方案及其理由 |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
