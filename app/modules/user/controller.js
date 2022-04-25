import * as services from './services';

export async function registerUser(req, res, next) {
    try {
        res.status(200).json(await services.registerUser(req.body));
    } catch (err) {
        next(err);
    }
};

export async function login(req, res, next) {
    try {
        res.status(200).json(await services.login(req.body));
    } catch (err) {
        next(err);
    }
};

export async function list(req, res, next) {
    try {
        res.status(200).json(await services.list(req.query));
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        res.status(200).json(await services.remove(req.params.userId));
    } catch (error) {
        next(error);
    }
}