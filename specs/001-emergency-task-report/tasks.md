---
description: "緊急任務報修紀錄系統實作任務清單"
---

# 任務清單：緊急任務報修紀錄系統 (001-emergency-task-report)

**輸入**: `specs/001-emergency-task-report/` 目錄下的設計文件 (v1.3.3)
**先決條件**: 已核准之 plan.md, spec.md, data-model.md, contracts/api.md

**組織方式**: 任務按使用者故事 (User Story) 分組，以支援獨立實作與測試。

## 格式規範：`[ID] [P?] [Story] 說明與檔案路徑`

---

## Phase 1: Setup (基礎開發環境優化)

**目的**: 配置全域測試與規範工具。

- [x] T001 [P] 在根目錄配置 Vitest 全域環境與 Monorepo 測試腳本 於 `vitest.config.ts`
- [x] T002 [P] 優化 `package.json` 的 npm workspaces 引用，加入 `@sdd/` 命名空間
- [x] T003 配置 Husky 或 Git Hooks，強制在提交前執行 `lint`
- [x] T004 提交基礎配置變更並同步至 GitHub (憲法：v1.2.1 規範)

---

## Phase 2: Foundational (核心基礎設施擴充)

**目的**: 建立符合最新規格的資料模型與權限底層。

- [x] T005 修改 `packages/database/prisma/schema.prisma`，加入 `Category.alertThreshold` 欄位
- [x] T006 [P] 更新 `packages/core/src/auth.ts`，整合 `argon2` 雜湊邏輯與雙角色導引常量
- [x] T007 執行 Prisma Migrate (或 Generate) 並同步更新 @prisma/client
- [x] T008 提交基礎設施變更並同步至 GitHub

---

## Phase 3: User Story 1 - 客服人員快速紀錄任務 (Priority: P1) 🎯 MVP

**目標**: 實作智慧記憶、防抖與極速錄入流程。

### 測試先行 (TDD) ⚠️
- [x] T009 [P] [US1] 撰寫報修提交 API 的單元測試 (Vitest) 於 `packages/core/tests/records.test.ts`
- [x] T010 [P] [US1] 撰寫 3 秒防抖邏輯之測試案例 於 `packages/core/tests/idempotency.test.ts`
- [x] T011 [US1] 執行測試確認紅燈，並提交至 GitHub

### 功能實作
- [x] T012 [P] [US1] 在 `packages/core/src/services/recordService.ts` 實作資料庫驅動的智慧記憶寫入邏輯
- [x] T013 [US1] 實作後端防抖中介軟體 (Idempotency Key) 於 `apps/api/src/middleware/idempotency.ts`
- [x] T014 [US1] 實作報修提交 API 並對接智慧記憶更新 於 `apps/api/src/routes/records.ts`
- [x] T015 [P] [US1] 完善 `apps/web/src/pages/CSDashboard.tsx`，加入即時驗證與 0.5s 綠勾動畫
- [x] T016 [US1] 驗證測試通過並修正為綠燈
- [x] T017 [US1] 提交 US1 完整實作並同步至 GitHub

---

## Phase 4: User Story 2 - 主管管理報修分類 (Priority: P2)

**目標**: 實作分類維護與主管自訂預警閾值。

- [x] T018 [P] [US2] 在 `packages/core/src/services/categoryService.ts` 加入 `alertThreshold` 更新邏輯
- [x] T019 [US2] 實作分類管理 API 端點 於 `apps/api/src/routes/categories.ts`
- [x] T020 [P] [US2] 建構主管管理 UI，支援設定閾值與軟刪除 於 `apps/web/src/pages/admin/Categories.tsx`
- [x] T021 [US2] 驗證分類連動：新增分類後 CS 選單即時出現
- [x] T022 [US2] 提交 US2 實作並同步至 GitHub

---

## Phase 5: User Story 3 - 主管儀表板與數據匯出 (Priority: P2)

**目標**: 實作視覺化看板與 Excel 相容匯出。

- [x] T023 [P] [US3] 實作主管設定之「量能激增」警示計算邏輯 於 `packages/core/src/services/statsService.ts`
- [x] T024 [US3] 實作 CSV 匯出串流，處理 UTF-8 BOM 於 `packages/core/src/utils/csvExporter.ts`
- [x] T025 [US3] 實作統計與匯出 API 於 `apps/api/src/routes/stats.ts`
- [x] T026 [P] [US3] 建構主管儀表板 UI (Chart.js) 於 `apps/web/src/pages/admin/Dashboard.tsx`
- [x] T027 [US3] 實作具分頁功能的報修清單表格 於 `apps/web/src/components/RecordTable.tsx`
- [x] T028 [US3] 提交 US3 實作並同步至 GitHub

---

## Phase N: Polish & Security (收尾與資安強化)

**目的**: 完善審計、去識別化與跨端驗證。

- [x] T029 實作全域操作審計日誌中介軟體 於 `packages/core/src/middleware/audit.ts`
- [x] T030 [P] 實作資料去識別化政策之 Job 於 `packages/core/src/jobs/cleanup.ts`
- [x] T031 [P] 實作資安遮蔽邏輯 (針對 12 個月前數據) 於核心工具類
- [x] T032 更新全案註解，確保符合正體中文憲法
- [ ] T033 執行全系統流程 E2E 測試 (Playwright)
- [ ] T034 提交最終優化變更並同步至 GitHub

---

## 依賴關係與實作策略

1. **依賴關係**: Phase 1 -> Phase 2 -> Phase 3 (MVP) -> Phase 4/5.
2. **MVP 策略**: 已完成 Phase 1-3，客服已可紀錄任務。

---

## 備註
- 所有任務完成後必須立即 `git push` (憲法 v1.2.1)。
- 嚴禁在未通過測試的情況下勾選任務。
