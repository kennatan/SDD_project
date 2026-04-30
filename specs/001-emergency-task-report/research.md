# 技術研究報告：緊急任務報修紀錄系統

## 1. 測試框架決策 (Test Framework)
- **Decision**: 採用 **Vitest** 作為全案測試引擎。
- **Rationale**: Vitest 與 Vite 原生整合，支援 Monorepo 且啟動速度極快。相較於之前初步選用的 Jest，Vitest 能更流暢地處理 TypeScript 與 ESM 模組引用。
- **Alternatives**: Jest (已拒絕：配置 Monorepo 與 ESM 的複雜度較高)。

## 2. 智慧記憶同步策略 (Smart Recall Sync)
- **Decision**: 採用「樂觀更新 (Optimistic Update)」與資料庫同步。
- **Rationale**: 客服人員錄入成功時，後端 `User.lastUsedExtension` 同步更新。前端在登入後將此數值載入 Redux/Context 狀態中，確保跨裝置一致性。
- **Alternatives**: LocalStorage (已拒絕：無法實現跨座位/裝置同步)。

## 3. 量能警示閾值存儲 (Alert Thresholds)
- **Decision**: 在 `Category` 模型中新增 `alertThreshold` 欄位。
- **Rationale**: 符合「主管手動針對特定類別設定」之決策，且存取效率高，方便在聚合查詢時直接進行 `HAVING` 比較。

## 4. 跨模組引用規範 (Internal Dependency)
- **Decision**: 採用 **npm workspaces** 搭配封裝前綴 `@sdd/`。
- **Rationale**: 確保 `apps/api` 引用 `packages/core` 時路徑清晰且符合生產環境標準。
