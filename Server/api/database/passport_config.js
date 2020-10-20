import { Strategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'
import { secretkey } from './config'
import table from './tableName'
import { UserSchema } from './Schemas'

const UserModel = mongoose.model(table.user, UserSchema)

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretkey,
}

const setup = passport => {
  passport.use(
    new Strategy(options, (payload, callback) => {
      UserModel.findOne({ _id: payload.id })
        .then(r => {
          if (typeof callback === 'function') callback(null, r)
        })
        .catch(e => {
          if (typeof callback === 'function') callback(e)
        })
    })
  )
}

export default setup
