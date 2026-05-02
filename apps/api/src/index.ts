import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import categoryRoutes from './routes/categories.js';
import recordRoutes from './routes/records.js';
import statRoutes from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

app.use('/categories', categoryRoutes);
app.use('/records', recordRoutes);
app.use('/stats', statRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log('🚀 [API] 緊急任務報修系統伺服器已啟動');
  console.log('📡 監聽連接埠：' + PORT);
});

export default app;
