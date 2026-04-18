<!-- 
Sync Impact Report
- Version change: 1.0.0 → 1.1.0 (Minor Update)
- List of modified principles:
  - Added: VI. 高品質與可測試性 (High Quality & Testable)
  - Added: VII. MVP 與簡約設計 (MVP & No Overdesign)
  - Added: VIII. 語言規範 (Traditional Chinese Standard)
- Added sections: N/A (Expanded Core Principles)
- Removed sections: N/A
- Templates requiring updates: 
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ updated)
- Follow-up TODOs: None
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

### VIII. 語言規範：正體中文 (Language Standard)
本專案的所有文件、註解、任務描述及通訊內容，一律使用**正體中文 (Traditional Chinese)**。確保團隊溝通的一致性與精確性。

## Technical Constraints

本專案採用 Spec Kit 驅動的 SDD (Specification Driven Development) 流程。所有實作必須符合已核准的規格書 (Spec) 與實作計畫 (Plan)。一旦計畫獲准，所定義的技術棧與架構模式即具備強制性。

## Development Workflow Gates

1. **規格審查 (Specification Review)**：未經核准的 Spec 不得進入計畫階段。
2. **計畫審查 (Plan Review)**：未經核准的 Plan 與 Tasks 不得開始實作。
3. **驗證門檻 (Verification Gate)**：所有實作任務必須通過自動化測試驗證行為正確性，否則視為未完成。
4. **持久化門檻 (Persistence Gate)**：所有變更必須提交至 Git (透過自動提交掛鉤強制執行)。

## Governance
本憲法高於所有其他非正式實務。原則的修訂需要明確的文件紀錄、版本遞增及遷移計畫。所有 PR 審核與 AI 驅動任務皆須驗證是否符合本憲法原則。

**Version**: 1.1.0 | **Ratified**: 2026-04-18 | **Last Amended**: 2026-04-18
