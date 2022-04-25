import { model, Schema } from "mongoose";
import { ROLES } from "../../utils/constants";

function omitPrivate(doc, ret, options) {
    delete ret.__v;
    delete ret._id;
    return ret;
}

const UserSchema = new Schema({
    fullname: {
        type: String
    },

    email: {
        type: String,
        default: null
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String
    },

    tokenRef: {
        type: String
    },

    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER,
        required: true
    },

    lastLogin: {
        type: String
    }
}, { toJSON: { virtuals: true, transform: omitPrivate } });

UserSchema.virtual('id').get(function () {
    return this._id;
});


const User = model('users', UserSchema);

export default User;
