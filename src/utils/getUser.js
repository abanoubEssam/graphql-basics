import { JWT_SECRET_KEY } from "../constants";
import * as jwt from 'jsonwebtoken'

export const getUser = (request) => {
    const headers = request.request.headers.authorization;
    if (!headers) {
        throw new Error("Not Allowed")
    }
    const token = headers.replace('Bearer', ''); // Authorization => Bearer asdasdasd
    let decodedToken
    try {
        decodedToken = jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        throw new Error(error)
    }

    return decodedToken
}