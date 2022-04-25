import * as services from './services';

export const create = async (req, res, next) => {
    try {
        res.status(201).json(await services.bookAppointment({ user: req.user, body: req.body }));
    } catch (error) {
        next(error);
    }
}

export const list = async (req, res, next) => {
    try {
        res.status(200).json(await services.list(req.query));
    } catch (error) {
        next(error);
    }
}

export const myAppointments = async (req, res, next) => {
    try {
        res.status(200).json(await services.myAppointments(req.user, req.query));
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
    try {
        res.status(200).json(await services.remove(req.params.appointmentId));
    } catch (error) {
        next(error);
    }
}