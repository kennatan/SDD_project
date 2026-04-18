<!-- 
Sync Impact Report
- Version change: 1.1.1 → 1.2.0 (Minor Update)
- List of modified principles:
  - Added: IX. 專業代理人協作與審查 (Expert Agent Collaboration & Review)
- Added sections: N/A (Expanded Core Principles & Workflow Gates)
- Removed sections: N/A
- Templates requiring updates: N/A
- Follow-up TODOs: 確保在執行 /speckit.plan 與 /speckit.implement 時主動召喚對應 Agent。
-->

# SDD Project Constitution

## Core Principles

### I. Iterative Persistence (Iteration-First)
每一次具意義的變更、任務完成或執行 Spec Kit 指令，都必須以 Git commit 作為結尾。確保專案開發歷程透明、可追蹤且可回溯。

### II. Library-First Architecture
每一項功能開發必須先以獨立程式庫 (Standalone Library) 的形式開始。程式庫必須自成一體、可獨立測試並具備完整文件。拒絕僅具組織性質的程式庫，每一項開發都必須有明確的功能目的。

### III. Test-First Development (NON-NEGOTIABLE)
測試驅動開發 (TDD) 是強制性的。在實作之前，必須先編寫測試並獲得核准。嚴格執行「紅燈-綠燈-重構」循環，並記錄於任務完成中。

### IV. CLI & Automation Driven
所有核心功能必須可透過 CLI 或自動化腳本存取。介面應支援標準 I/O (stdin/args → stdout)，並同時提供易於人類閱讀與機器讀取 (JSON) 的輸出格式。

### V. Observability & Transparency
系統行為必須是可除錯且透明的。所有自動化程序皆需具備結構化日誌。代碼優先考慮簡單性，遵循 YAGNI (You Ain't Gonna Need It) 原則，避免不必要的複雜性。

### VI. 高品質與可測試性 (Quality & Testability)
交付的代碼必須符合生產環境的高品質標準。每一行功能代碼都必須是「可測試的 (Testable)」，且具備對應的自動化測試覆蓋，確保系統的長期穩定。

### VII. MVP 與簡約設計 (MVP & No Overdesign)
開發應專注於「最小可行性產品 (Minimum Viable Product)」，優先交付核心價值。嚴禁過度設計 (Overdesign)，拒絕在現階段引入未來「可能」需要但目前無明確需求的複雜架構或功能。

### VIII. 語言規範：正體中文 (Mandatory Traditional Chinese)
本專案的所有產出物——包含規格書 (Spec)、計畫 (Plan)、任務 (Tasks)、檢核表 (Checklist)、文件註解及對話通訊內容——一律強制使用**正體中文 (Traditional Chinese)**。確保團隊溝通的一致性、精確性與專業度。

### IX. 專業代理人協作與審查 (Expert Agent Review)
專案開發必須整合專業 AI 代理人進行多維度品質控管：
- **UX 審查 (`ux-skill-agent`)**：於計畫與設計階段執行，確保流程符合「無負擔紀錄」原則與 MVP 核心價值。
- **資安審查 (`security-auditor-react`)**：於實作與驗證階段執行，主動偵測 SQL 注入、硬編碼憑證等漏洞。

## Technical Constraints

本專案採用 Spec Kit 驅動的 SDD (Specification Driven Development) 流程。所有實作必須符合已核准的規格書 (Spec) 與實作計畫 (Plan)。一旦計畫獲准，所定義的技術棧與架構模式即具備強制性。

## Development Workflow Gates

1. **規格審查 (Specification Review)**：未經核准的 Spec 不得進入計畫階段。
2. **計畫審查 (Plan Review)**：必須通過 **UX 審查**，確保實作路徑符合 MVP 與使用者體驗。
3. **驗證門檻 (Verification Gate)**：所有實作任務必須通過自動化測試驗證行為正確性。
4. **資安掃描 (Security Audit)**：所有新功能代碼必須通過 **資安審查員** 的漏洞掃描。
5. **持久化門檻 (Persistence Gate)**：所有變更必須提交至 Git (透過自動提交掛鉤強制執行)。

## Governance
本憲法高於所有其他非正式實務。原則的修訂需要明確的文件紀錄、版本遞增及遷移計畫。所有 PR 審核與 AI 驅動任務皆須驗證是否符合本憲法原則。

**Version**: 1.2.0 | **Ratified**: 2026-04-18 | **Last Amended**: 2026-04-18
