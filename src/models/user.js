const mongoose = require('mongoose')
import { EVENT_MODEL_NAME, USER_MODEL_NAME } from '../constants'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: EVENT_MODEL_NAME
        }
    ]
})

export const UserModel = mongoose.model(USER_MODEL_NAME, userSchema)