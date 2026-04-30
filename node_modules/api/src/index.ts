import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3005; // 統一使用我們之前測試成功的 3005

app.use(cors());
app.use(bodyParser.json());

// 基礎健康檢查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('🚀 [API] 緊急任務報修系統伺服器已啟動');
  console.log('📡 監聽連接埠：' + PORT);
});

export default app;
