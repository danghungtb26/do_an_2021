import mongoose, { Types } from 'mongoose'
import { SeedSchema, UserSchema, userType } from '../Schemas'
import table from '../tableName'

const UserModel = mongoose.model<userType>(table.user, UserSchema)
const SeedModel = mongoose.model(table.seed, SeedSchema)

const seed_1603425419322: () => void = () => {
  const seed = 1603425419322

  SeedModel.findOne({ body: seed }).then((res) => {
    if (!res) {
      const newSeed = new SeedModel({ body: seed })
      newSeed.save()
      const newUser = new UserModel({
        email: 'admin@gmail.com',
        password: 'admin',
        role: new mongoose.Types.ObjectId('5f92514f5769c320e3bcf508'),
      })
      newUser.generate().then(() => {
        newUser.save()
      })
    }
  })
}

const run_seeds = () => {
  seed_1603425419322()
}

run_seeds()
