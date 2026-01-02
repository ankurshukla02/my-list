import { Router } from 'express';
import { MyListController } from '../controllers/myList.controller';
import { mockAuth } from '../middlewares/mockAuth.middleware';

const router = Router();

router.use(mockAuth);

router.post('/', MyListController.addItem);
router.delete('/', MyListController.removeItem);
router.get('/', MyListController.listItems);

export default router;
