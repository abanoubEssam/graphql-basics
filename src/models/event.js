const mongoose  =  require('mongoose') 
import { EVENT_MODEL_NAME, USER_MODEL_NAME } from '../constants'


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL_NAME
    }
})

export const EventModel =  mongoose.model(EVENT_MODEL_NAME , eventSchema)