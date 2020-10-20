import { BookingModel } from "../../models/booking"
import { EventModel } from "../../models/event"
import { UserModel } from "../../models/user"
import * as jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../../constants";
const bcrypt = require('bcryptjs');


export const Query = {
    events() {
        return EventModel.find().populate("creator")
    },
    users() {
        return UserModel.find().populate("createdEvents")
    },
    bookings() {
        return BookingModel.find().populate('user').populate('event')
    },
    async login(parent, args, ctx, info) {
        const user = await UserModel.findOne({ email: args.email });
        if (!user) {
            throw new Error('user not found')
        }
        const isValidPassword = await bcrypt.compare(args.password, user.password)
        if (!isValidPassword) {
            throw new Error('invalid password')
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
        return { user, token, tokenExpiration: 10 }
    }
}