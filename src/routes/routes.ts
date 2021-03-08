import { Request, Response, Router } from 'express';
import AddressController from '../controllers/AddressController';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import autMiddleware from '../shared/middlewares/authMiddleware';

const router = Router()

//CRUD de usuários

router.get('/users', UserController.index);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// CRUD de endereços

router.get('/address', AddressController.index);
router.post('/address', AddressController.create);
router.put('/address/:id', AddressController.update);
router.delete('/address/:id', AddressController.delete);

//Rota de sessão

router.post('/auth', AuthController.execute);
router.get('/login', autMiddleware, (req: Request, res: Response) => {
  // Rota privada que só poderar ser acessada se
  // fornecido um token válido
  res.json({ message: 'You loggedIn'})
})

export default router;
