import Router from 'express';
import { joiValidator } from 'iyasunday';
import { guard, adminGuard } from '../../utils/middleware';
import * as controller from './controller';
import validation from './validation';

const route = Router();

route.post(
    '/appointment',
    guard,
    joiValidator(validation.create),
    controller.create
)

route.get(
    '/appointments',
    adminGuard,
    joiValidator(validation.list),
    controller.list
)

route.get(
    '/user/appointments',
    guard,
    joiValidator(validation.list),
    controller.myAppointments
);

route.delete(
    '/appointment/:appointmentId',
    adminGuard,
    joiValidator(validation.remove),
    controller.remove
)
export default route;