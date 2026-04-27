---
description: "緊急任務報修紀錄系統實作任務清單"
---

# 任務清單：緊急任務報修紀錄系統 (001-emergency-task-report)

**輸入**: `specs/001-emergency-task-report/` 目錄下的設計文件
**先決條件**: 已核准之 plan.md, spec.md, data-model.md, contracts/api.md

**組織方式**: 任務按使用者故事 (User Story) 分組，以支援獨立實作與測試。

## 格式規範：`[ID] [P?] [Story] 說明與檔案路徑`

---

## Phase 1: Setup (專案初始化與 Monorepo 設置)

**目的**: 建立 Monorepo 結構與基礎開發環境。

- [ ] T001 初始化 Monorepo 結構 (apps/web, packages/core, packages/database)
- [ ] T002 [P] 於 packages/database 初始化 Prisma 並設定 PostgreSQL 連線路徑
- [ ] T003 [P] 配置全域 Linting (ESLint) 與格式化 (Prettier) 工具
- [ ] T004 於 apps/web 初始化 React + Tailwind CSS 環境
- [ ] T005 提交初始化變更至 Git (憲法：迭代持久化)

---

## Phase 2: Foundational (核心基礎設施)

**目的**: 建立所有使用者故事依賴的資料模型與核心邏輯。
**⚠️ 關鍵**: 此階段必須完成才能開始任何 User Story 開發。

- [ ] T006 實作資料模型於 packages/database/prisma/schema.prisma (TaskRecord, Category, User, AuditLog)
- [ ] T007 執行 Prisma Migration 並生成 Client 代碼
- [ ] T008 [P] 實作核心驗證邏輯 (正則表達式) 於 packages/core/src/validators.ts
- [ ] T009 [P] 實作基礎 API 路由架構於 apps/api/src/index.ts (Express)
- [ ] T010 實作基礎權限中介軟體 (CS_AGENT vs SUPERVISOR) 於 packages/core/src/auth.ts
- [ ] T011 提交基礎設施變更至 Git (憲法：迭代持久化)

---

## Phase 3: User Story 1 - 客服人員快速紀錄任務 (Priority: P1) 🎯 MVP

**目標**: 讓客服人員能以最快速度、無負擔地完成報修登記。
**獨立測試**: 登入 CS 帳號後，填寫卡號/分機並成功儲存，且分機具備智慧記憶功能。

### 測試與設計 (MANDATORY) ⚠️
- [ ] T012 [P] [US1] 撰寫報修提交 API 的單元測試於 packages/core/tests/records.test.ts (驗證 6碼/10碼限制)
- [ ] T013 [P] [US1] 撰寫防抖 (Idempotency) 邏輯測試於 packages/core/tests/idempotency.test.ts
- [ ] T014 [US1] 提交失敗測試案例至 Git (憲法：測試先行)

### 功能實作
- [ ] T015 [P] [US1] 實作報修紀錄服務 (TaskRecord Service) 於 packages/core/src/services/recordService.ts
- [ ] T016 [US1] 實作 3 秒後端防抖檢查邏輯於 apps/api/src/middleware/idempotency.ts
- [ ] T017 [US1] 實作報修提交 API 端點於 apps/api/src/routes/records.ts
- [ ] T018 [P] [US1] 建構 CS 報修頁面 UI (含即時驗證) 於 apps/web/src/pages/CSDashboard.tsx
- [ ] T019 [US1] 實作「分機智慧記憶」邏輯 (Database-based)：提交成功時更新 User 欄位，並在頁面載入時預填。
- [ ] T020 [US1] 整合提交成功之視覺動畫 (0.5s 綠勾) 與自動聚焦功能
- [ ] T021 [US1] 驗證測試通過 (Red-Green-Refactor)
- [ ] T022 [US1] 提交 US1 實作至 Git (憲法：迭代持久化)

**查驗點**: 至此，客服報修核心流程應可獨立運作並通過測試。

---

## Phase 4: User Story 2 - 主管管理報修分類 (Priority: P2)

**目標**: 主管能彈性增刪分類，且刪除採軟刪除機制。
**獨立測試**: 主管新增分類後，CS 頁面選單立即更新；刪除已使用的分類後，舊紀錄不受影響。

- [ ] T023 [P] [US2] 實作分類管理服務 (Category Service) 於 packages/core/src/services/categoryService.ts
- [ ] T024 [US2] 實作「軟刪除 (Soft Delete)」邏輯，確保僅標記 status 為 DELETED
- [ ] T025 [US2] 實作分類管理 API 端點 (POST/DELETE) 於 apps/api/src/routes/categories.ts
- [ ] T026 [P] [US2] 建構主管分類管理介面於 apps/web/src/pages/admin/Categories.tsx
- [ ] T027 [US2] 驗證分類連動測試：新增分類後 CS 端的 API 回傳值正確更新
- [ ] T028 [US2] 提交 US2 實作至 Git (憲法：迭代持久化)

---

## Phase 5: User Story 3 - 主管查看統計儀表板與匯出 (Priority: P2)

**目標**: 主管透過圖表掌握趨勢，並能篩選、查閱與匯出 CSV。
**獨立測試**: 切換時間區間，圖表與下方列表同步更新；點擊匯出能下載包含所有篩選數據的 CSV。

- [ ] T029 [P] [US3] 實作統計數據聚合邏輯 (按日/週/月) 於 packages/core/src/services/statsService.ts
- [ ] T030 [US3] 實作 CSV 串流生成器於 packages/core/src/utils/csvExporter.ts (含 UTF-8 BOM)
- [ ] T031 [US3] 實作儀表板統計與匯出 API 端點於 apps/api/src/routes/stats.ts
- [ ] T032 [P] [US3] 建構主管儀表板 UI (Chart.js) 於 apps/web/src/pages/admin/Dashboard.tsx
- [ ] T033 [P] [US3] 實作報修細項表格 (一頁 15 則) 於 apps/web/src/components/RecordTable.tsx
- [ ] T034 [US3] 整合「量能激增」警示視覺與時間區間篩選器
- [ ] T035 [US3] 提交 US3 實作至 Git (憲法：迭代持久化)

---

## Phase N: Polish & Security (細節優化與資安強化)

**目的**: 強化系統穩健性與資安合規。

- [ ] T036 實作「操作審計日誌」中介軟體，紀錄匯出與查詢行為於 packages/core/src/middleware/audit.ts
- [ ] T037 實作「資料保留政策 Job」：每月執行一次去識別化與冷存儲移轉於 packages/core/src/jobs/cleanup.ts
- [ ] T038 [P] 實作資安遮蔽邏輯 (遮蔽卡號中間 3 位) 於歷史數據 API
- [ ] T039 [P] 更新所有文件註解，確保符合正體中文規範
- [ ] T040 執行全案 E2E 測試 (Playwright) 驗證雙角色流程
- [ ] T041 提交最終優化變更至 Git (憲法：迭代持久化)

---

## 依賴關係與執行順序

1.  **Phase 1 & 2** (Setup + Foundational): **強制先決條件**，必須完全完成。
2.  **Phase 3** (US1): **MVP 核心**，建議優先開發。
3.  **Phase 4 & 5** (US2 & US3): 在 Phase 2 完成後可平行開發，但建議依序執行以確保分類數據基礎。
4.  **Phase N**: 專案收尾，確保資安合規。

## 平行開發示例 (User Story 1)

```bash
# 同時進行後端服務與前端介面開發：
開發者 A: T015 (Service) -> T017 (API Route)
開發者 B: T018 (UI Component) -> T019 (Recall Hook)
```

## 實作策略

### MVP 第一優先 (User Story 1 Only)
1.  完成環境設置與資料庫模型。
2.  完成客服報修功能 (含 3秒防抖與智慧記憶)。
3.  **停止並驗證**: 確保客服人員能順暢紀錄緊急任務。
4.  部署 MVP 版本以供初步測試。

---

## 備註
- 所有任務 ID 必須嚴格遵循 TNNN 格式。
- 每一個 User Story 階段完成後，必須進行獨立的功能驗證。
- 嚴格遵守憲法：代碼註解、UI 文字、任務說明一律使用正體中文。
