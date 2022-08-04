import { Router } from 'express';
import importController from '../controllers/Logs/ImportController';
import exportController from '../controllers/Logs/ExportController';

const router = new Router();

router.post('/import', importController.import);
router.post('/export', exportController.export);

export default router;
