import { ExistsError, NotFoundError, paginate, ValidationError } from "iyasunday";
import Appointment from "./model";

export const bookAppointment = async ({ user, body }) => {
    try {
        if (new Date().getTime() >= new Date(body.appointmentDate).getTime()) throw new ValidationError("Appointment date cannot be in the past");
        if (new Date().getDate() == new Date(body.appointmentDate).getDate()) throw new ValidationError("Appointment date cannot be today, Please schedule a date ahead of today");

        let bookedAppointment = await Appointment.findOne({
            userId: user._id, appointmentDate: body.appointmentDate
        }).lean();

        if (bookedAppointment) throw new ExistsError(`Appointment already booked for this date`);

        await Appointment.create({ ...body, userId: user._id });

        return {
            success: true,
            message: `Appointment created successfully`,
            data: []
        }
    } catch (error) {
        throw error;
    }
}

export const list = async (query) => {
    const { limit, page } = query;

    const appointmentCount = await Appointment.count();

    const { offset, pageCount } = paginate(appointmentCount, page, limit);

    const appointments = await Appointment.find().populate({
        path: 'user',
        select: 'fullname email phoneNumber'
    }).limit(limit).skip(offset);

    return {
        success: true,
        message: `Appointment fetched successfully`,
        data: {
            appointments,
            page,
            pageCount,
            limit
        }
    }

}

export const myAppointments = async (user, query) => {
    const { limit, page } = query;

    const appointmentCount = await Appointment.find({ userId: user._id }).count();

    const { offset, pageCount } = paginate(appointmentCount, page, limit);

    const appointments = await Appointment.find({ userId: user._id }).populate({
        path: 'user',
        select: 'fullname email phoneNumber'
    }).limit(limit).skip(offset);

    return {
        success: true,
        message: `Appointment fetched successfully`,
        data: {
            appointments,
            page,
            pageCount,
            limit
        }
    }

}

export const remove = async (appointmentId) => {
    try {
        const appointment = await Appointment.findById(appointmentId).lean();
        if (!appointment) throw new NotFoundError(`Appointment not found`);

        await Appointment.findByIdAndDelete(appointmentId);

        return {
            success: true,
            message: `Appointment deleted successfully`,
            data: []
        }
    } catch (error) {
        throw error;
    }
}