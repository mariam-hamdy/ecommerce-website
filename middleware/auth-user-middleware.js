const UnauthenticatedError = require('../errors/unauthenticat')
const jwt = require('jsonwebtoken')

const AuthUserMiddleware = async(req,res, next) => {
    const authHeader = req.headers.authorization //req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('no auth header is provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const {userId, username, isAdmin} = payload
        if(!isAdmin) {
            req.user = {userId, username}
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('user is not authenticated')
    }
}

module.exports = AuthUserMiddleware