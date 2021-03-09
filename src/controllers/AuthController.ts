import { Request, Response } from 'express';
import AuthUserService from '../services/AuthUserService';
class AuthController {
  async execute(req: Request, res: Response) {
    const { email } = req.body;
    const { user, token } = await AuthUserService.authUser(email);

    return res.json({
      user,
      token
    })

  }
}

export default new AuthController;
