import Joi from "joi";

export default {
    create: {
        body: {
            schema: Joi.object({
                appointmentDate: Joi.string().required(),
                note: Joi.string().required()
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
                appointmentId: Joi.string().required()
            })
        }
    }
}