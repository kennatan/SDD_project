import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// 強制重新引入最新路由
import categoryRoutes from './routes/categories.js';
import recordRoutes from './routes/records.js';
import statRoutes from './routes/stats.js';

const app = express();
const PORT = 3005;

// 配置 CORS 允許所有常見方法
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(bodyParser.json());

// 基礎路徑日誌
app.use((req, res, next) => {
  console.log(`📡 [LOG] ${req.method} ${req.url}`);
  next();
});

// 掛載路由
app.use('/categories', categoryRoutes);
app.use('/records', recordRoutes);
app.use('/stats', statRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: 'MOCK_DISPLAY_ACTIVE' });
});

app.listen(PORT, () => {
  console.log('🚀 [API] 模擬展示伺服器已全速啟動');
  console.log('📡 監聽連接埠：' + PORT);
  console.log('✅ POST/DELETE 路由已正式啟用。');
});

export default app;
