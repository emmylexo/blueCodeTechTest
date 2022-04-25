'use strict';

import { AuthenticationError, decodeJwt, errorMessage, InvalidTokenError, TokenExpiredError } from "iyasunday";
import { ROLES } from "./constants";
import { getRedis } from "./redis";

export const guard = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) throw new InvalidTokenError("Kindly provide valid authentication token")
        token = token.split(' ').pop();

        const { tokenRef = undefined } = await decodeJwt(token);
        if (!tokenRef) throw new InvalidTokenError('Supplied token not valid');
        const user = await getRedis(tokenRef, true);
        if (!user) throw new TokenExpiredError('Session expired');

        req.user = user;
        return next();
    } catch (err) {
        return res
            .status(err.httpStatusCode || 500)
            .json(errorMessage(err));
    }
}

export const adminGuard = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) throw new InvalidTokenError("Kindly provide valid authentication token")
        token = token.split(' ').pop();

        const { tokenRef = undefined } = await decodeJwt(token);
        if (!tokenRef) throw new InvalidTokenError('Supplied token not valid');
        const user = await getRedis(tokenRef, true);
        if (!user) throw new TokenExpiredError('Session expired');

        if (user.role != ROLES.ADMIN) throw new AuthenticationError(`You are not authorized to view this page`);
        req.user = user;
        return next();
    } catch (err) {
        return res
            .status(err.httpStatusCode || 500)
            .json(errorMessage(err));
    }
}