# API 契約：緊急任務報修紀錄系統

## 1. 客服人員介面 (CS Endpoints)

### `POST /api/v1/records` (提交報修)
*   **Request**:
    ```json
    {
      "cardNumber": "123456",
      "extension": "9999",
      "categoryId": "uuid",
      "problemDescription": "網路斷線"
    }
    ```
*   **Response**: `201 Created`
*   **Constraints**: 3秒防抖檢查 (Idempotency Key: `cardNumber + creatorId + timeWindow`)

### `GET /api/v1/categories` (取得可用分類)
*   **Response**: `200 OK` (僅傳回狀態為 ACTIVE 的分類)

## 2. 主管介面 (Supervisor Endpoints)

### `GET /api/v1/dashboard/stats` (儀表板統計)
*   **Query Params**: `range` (day|week|month|custom), `start`, `end`
*   **Response**: 包含佔比 (Pie Chart Data) 與趨勢 (Line Chart Data)。

### `GET /api/v1/records` (取得詳細清單)
*   **Query Params**: `page=1`, `limit=15`, `range`
*   **Response**: `200 OK` (含分頁資訊)

### `GET /api/v1/records/export` (匯出 CSV)
*   **Query Params**: `range`
*   **Response**: `text/csv` 串流。
*   **Audit**: 強制紀錄存取日誌。

## 3. 認證介面 (Auth Endpoints)
*   `POST /api/v1/auth/login`: 專案現有帳密系統登入。
*   預留 Keycloak SSO Redirect URL 支援。
