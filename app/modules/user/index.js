import Router from 'express';
import { joiValidator } from 'iyasunday';
import { adminGuard } from '../../utils/middleware';
import * as controller from './controller';
import validation from './validation';

const route = Router();

route.post(
    "/register",
    joiValidator(validation.createUser),
    controller.registerUser
);

route.post(
    "/login",
    joiValidator(validation.login),
    controller.login
)

route.get(
    "/users",
    adminGuard,
    joiValidator(validation.list),
    controller.list
)

route.delete(
    '/user/:userId',
    adminGuard,
    joiValidator(validation.remove),
    controller.remove
)

export default route;