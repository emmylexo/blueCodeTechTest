import { model, Schema } from "mongoose";
import { STATUS } from "../../utils/constants";

function omitPrivate(doc, ret, options) {
    delete ret.__v;
    delete ret._id;
    return ret;
}

const AppointmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    appointmentDate: {
        type: String,
        required: true
    },

    note: {
        type: String
    },

    status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.PENDING,
        required: true
    }
}, { toJSON: { virtuals: true, transform: omitPrivate } });

AppointmentSchema.virtual('id').get(function () {
    return this._id;
});

AppointmentSchema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})


const Appointment = model('appointments', AppointmentSchema);

export default Appointment;
