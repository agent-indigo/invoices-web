import 'dotenv/config'
import jwt from 'jsonwebtoken'
const createToken = (response, pk) => {
    const MODE = process.env.NODE_ENV || 'production'
    const token = jwt.sign(
        {pk},
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
    response.cookie('token', token, {
        httpOnly: true,
        secure: MODE === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return token
}
export default createToken