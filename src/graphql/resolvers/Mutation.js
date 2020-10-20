import { BookingModel } from "../../models/booking";
import { EventModel } from "../../models/event"
import { UserModel } from "../../models/user"
import { getUser } from "../../utils/getUser";
const bcrypt = require('bcryptjs');

export const Mutation = {
    async createEvent(parent, { input }, { request }, info) {
        let {
            userId,
            email,
            iat,
            exp
        } = getUser(request)


        const user = await UserModel.findById(input.creator)
        if (!user) {
            throw new Error("User Does not Exists")
        }
        console.log("createEvent -> user._id", user._id)
        console.log("createEvent -> userId", userId)
        if (user._id != userId) {
            throw new Error("Not allowed !")
        }
        const event = await EventModel.create({
            title: input.title,
            description: input.description,
            price: +input.price,
            date: new Date(+input.date),
            creator: input.creator
        })
        await UserModel.findOneAndUpdate({ _id: input.creator }, { $push: { createdEvents: event._id } }, { new: true })
        return event
    },
    async createUser(parent, { input }, ctx, info) {
        const checkMail = await UserModel.findOne({ email: input.email })
        if (checkMail) {
            throw new Error("email taken")
        }
        const hashedPassword = await bcrypt.hash(input.password, 12)
        return UserModel.create({
            email: input.email,
            password: hashedPassword
        })
    },
    async bookEvent(parent, { input }, ctx, info) {
        const event = await EventModel.findById(input.eventId)
        if (!event) {
            throw new Error('event not found')
        }
        const user = await UserModel.findById(input.userId)
        if (!user) {
            throw new Error('user not found')
        }
        return await BookingModel.create({ user: input.userId, event: input.eventId })
    },
    async cancelBooking(parent, { bookingId }, ctx, info) {
        const booking = await BookingModel.findById(bookingId)
        if (!booking) {
            throw new Error("Booking Not Found")
        }
        return await BookingModel.findByIdAndUpdate(bookingId, { cancelled: true }, { new: true })

    }
}