import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); /* criação de usuario */
routes.post('/sessions', SessionController.store); /* criação de sessão */

routes.use(authMiddleware); /* autenticação */

routes.put('/users', UserController.update); /* update de usuário */

export default routes;
