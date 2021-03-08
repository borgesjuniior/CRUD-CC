import { Router } from 'express';
import AddressController from '../controllers/AddressController';
import UserController from '../controllers/UserController';

const router = Router()

router.get('/users', UserController.index);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Rota de endereços

router.get('/address', AddressController.index);
router.post('/address', AddressController.create);
router.put('/address/:id', AddressController.update);
router.delete('/address/:id', AddressController.delete);

export default router;
