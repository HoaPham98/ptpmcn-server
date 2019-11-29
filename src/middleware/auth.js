const jwt = require('jsonwebtoken')
const User = require('../models/User')

const jwt_key = process.env.JWT_KEY || "WinterIsComingGOT2019"

const auth = function(roles) {
    return async function(req, res, next) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, jwt_key)
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token

            if (roles != null) {
                if (!roles.includes(user.role)) {
                    throw new Error()
                }
            }
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }

    }
}
module.exports = auth