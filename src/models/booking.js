const mongoose = require('mongoose')
import { BOOKING_MODEL_NAME, EVENT_MODEL_NAME, USER_MODEL_NAME } from '../constants'


const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL_NAME
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: EVENT_MODEL_NAME
    },
    cancelled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const BookingModel = mongoose.model(BOOKING_MODEL_NAME, bookingSchema)