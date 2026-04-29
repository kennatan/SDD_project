import { Router } from 'express';
import { createRecord } from 'core/src/services/recordService';
import { preventDuplicate } from '../middleware/idempotency';

const router = Router();

router.post('/', preventDuplicate, async (req, res) => {
  try {
    const record = await createRecord(req.body);
    res.status(201).json(record);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
