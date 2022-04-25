import Joi from "joi";


export default {
    createUser: {
        body: {
            schema: Joi.object({
                fullname: Joi.string().regex(/^[a-zA-Z ]+$/).required()
                    .messages({
                        'string.pattern.base': `Only name required for fullname`,
                        'any.required': `Fullname is required`,
                        'string.empty': `Fullname cannot be empty`
                    }),
                email: Joi.string().email().required(),
                phoneNumber: Joi.string().length(11).regex(/^[0-9]{11}$/)
                    .messages({
                        'string.pattern.base': `Invalid phone number entered`,
                        'any.required': `Please enter a valid phone number`,
                        'string.length': `Phone number must be atleast 11 characters`
                    }).required(),
                password: Joi.string().required()
                    .messages({
                        'string.empty': `Password must not be empty`
                    })
            })
        }
    },

    login: {
        body: {
            schema: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
                    .messages({
                        'string.empty': `Password must not be empty`
                    })
            })
        }
    },

    list: {
        query: {
            schema: Joi.object({
                limit: Joi.number().integer().default(10),
                page: Joi.number().integer().default(1)
            })
        }
    },

    remove: {
        params: {
            schema: Joi.object({
                userId: Joi.string().required()
            })
        }
    }
}