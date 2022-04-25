'use strict';

import { AuthenticationError, encodeJwt, ExistsError, NotFoundError, paginate } from "iyasunday";
import User from "./model"
import { uuid } from "../../utils/uuid";
import { setRedis } from '../../utils/redis';
import { comparePassword, hashPassword } from "../../utils";

const setUser = async (userId) => {
    const user = await User.findById(userId).lean();
    if (!user) throw NotFoundError(`User not found`);
    const tokenRef = uuid.get();

    delete user.pin;
    await setRedis(tokenRef, user);

    user.token = await encodeJwt({
        data: { tokenRef, createdAt: new Date() },
        secreteKey: process.env.APP_KEY,
        duration: process.env.JWT_TOKEN_DURATION
    })

    return user;
}

export const registerUser = async (body) => {
    let user = await User.findOne({
        email: body.email
    }).lean();
    if (user) throw new ExistsError(`User with this email already exist`);

    body.password = await hashPassword(body.password);

    await User.create({ ...body })
    const createdUser = await User.findOne({ email: body.email }).lean()

    return {
        success: true,
        message: `Account created successfully`,
        data: await setUser(createdUser._id)
    }
}

export const login = async (body) => {
    let user = await User.findOne({
        email: body.email
    }).lean();

    if (!user) throw new NotFoundError(`User with credential not found`);


    if (!(await comparePassword(body.password, user.password))) throw new AuthenticationError('You have entered a wrong password, Please try again');
    user = await setUser(user._id);

    if (user.password) delete user.password;
    return {
        success: true,
        message: `User logged in successfully`,
        data: user
    }
}

export const list = async (query) => {
    const { limit, page } = query;

    const usersCount = await User.count();

    const { offset, pageCount } = paginate(usersCount, page, limit);

    const users = await User.find().skip(offset).limit(limit);

    return {
        success: true,
        message: `Users fetched successfully`,
        data: {
            users,
            pageCount,
            limit,
            page
        }
    }
}

export const remove = async (userId) => {
    try {
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError(`User not found`);

        await User.findByIdAndDelete(userId);

        return {
            success: true,
            message: `User deleted successfully`,
            data: []
        }
    } catch (error) {
        throw error;
    }
}