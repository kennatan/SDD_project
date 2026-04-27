# 技術研究報告：緊急任務報修紀錄系統

**日期**: 2026-04-18  
**特性**: 001-emergency-task-report

## 決策 1：核心技術棧選擇 (Core Tech Stack)

*   **決策**: 前端採用 **React + Tailwind CSS**，後端採用 **Node.js (Express) + TypeScript**。
*   **理由**: 
    1.  React 的狀態管理極其適合實作規格書要求的「即時驗證 (Inline Validation)」與「智慧記憶 (Smart Recall)」。
    2.  Tailwind CSS 能快速建構客服頁面與主管儀表板的視覺差異 (Color Coding)。
    3.  Node.js 生態系對 **Keycloak SSO** 有成熟的整合方案，符合預留架構的需求。
*   **考慮過的替代方案**: Python (FastAPI) + Vue.js。雖然效能優異，但團隊目前對 React 生態系較熟悉，能更快達成 MVP。

## 決策 2：資料儲存與去識別化 (Storage & Anonymization)

*   **決策**: 使用 **PostgreSQL**。針對超過一年的歷史資料，採行 **「視圖遮蔽 (View Masking)」** 與 **「排程去識別化指令 (Anonymization Job)」**。
*   **理由**: 
    1.  符合 `security-auditor-react` 的資安建議：在線資料與歷史資料分層處理。
    2.  支援複雜的時間區間篩選（日/週/月/自訂），效能穩定。
*   **實作細節**: 
    *   建立一個 `ArchiveTaskRecord` 表進行冷存儲。
    *   每個月執行一次 Job，將 12 個月前的資料搬移至冷存儲，並遮蔽卡號中間 3 位。

## 決策 3：前端互動與防抖 (UX & Idempotency)

*   **決策**: 前端按鈕實作 **Loading 狀態鎖定**，後端實作 **Redis-based 或 Database-level 的唯一序號檢查**。
*   **理由**: 
    1.  符合 `ux-skill-agent` 的即時反饋需求。
    2.  3 秒防抖 (Idempotency) 能有效避免緊急狀況下的重複紀錄。

## 決策 4：專案結構設計 (Library-First)

*   **決策**: 採行 **Monorepo** 結構，將核心邏輯封裝在 `packages/core` (獨立 Library)，介面放在 `apps/web`。
*   **理由**: 
    1.  符合憲法「Library-First Architecture」原則。
    2.  核心報修邏輯可獨立測試且具備高度可重用性。
