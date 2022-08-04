import { Router } from 'express';
import requestController from '../controllers/RequestController';

const router = new Router();

router.post('/import', requestController.import);
router.post('/export', requestController.export);

export default router;
