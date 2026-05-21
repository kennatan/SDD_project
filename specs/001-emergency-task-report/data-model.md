# 資料模型：緊急任務報修紀錄系統

## 1. 核心實體 (Core Entities)

### TaskRecord (報修紀錄)
*   `id`: UUID (Primary Key)
*   `cardNumber`: String (最長 6 碼數字)
*   `extension`: String (最長 10 碼數字)
*   `categoryId`: UUID (Foreign Key to Category)
*   `problemDescription`: Text (Nullable, 選填)
*   `createdAt`: Timestamp (預設現在)
*   `creatorId`: UUID (Foreign Key to User)
*   `externalRefId`: UUID (Nullable, 預留未來資料庫連動)
*   `isAnonymized`: Boolean (預設 false)

### Category (報修分類)
*   `id`: UUID (Primary Key)
*   `name`: String (唯一值)
*   `status`: Enum (ACTIVE, INACTIVE, DELETED)
*   `alertThreshold`: Integer (預設 0，代表不啟動警示；若 > 0 則為一小時內報修件數閾值)
*   `createdAt`: Timestamp

### User (使用者)
*   `id`: UUID (Primary Key)
*   `username`: String (唯一值)
*   `passwordHash`: String
*   `role`: Enum (CS_AGENT, SUPERVISOR)
*   `lastUsedExtension`: String (Nullable, 紀錄上次成功提交的分機)

### AuditLog (操作審計日誌)
*   `id`: UUID
*   `userId`: UUID
*   `action`: String (e.g., CSV_EXPORT, VIEW_HISTORY)
*   `metadata`: JSON (紀錄操作參數)
*   `ipAddress`: String
*   `createdAt`: Timestamp

## 2. 驗證規則
*   `cardNumber`: 正則表達式 `/^\d{1,6}$/`
*   `extension`: 正則表達式 `/^\d{1,10}$/`
*   `category`: 必須存在且狀態為 ACTIVE。

## 3. 狀態轉換
*   **Category**: 刪除操作時轉變為 `DELETED` (軟刪除)，不再出現於 CS 介面，但保留數據關聯。
