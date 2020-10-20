import { BookingModel } from "../../models/booking"
import { EventModel } from "../../models/event"
import { UserModel } from "../../models/user"

export const Query = {
    events() {
        return EventModel.find().populate("creator")
    },
    users() {
        return UserModel.find().populate("createdEvents")
    },
    bookings(){
        return BookingModel.find().populate('user').populate('event')
    }
}