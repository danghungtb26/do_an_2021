import mongoose from 'mongoose'
import models from '../Models'
import { SeedSchema } from '../Schemas'
import table from '../tableName'

const seed_1603425419322: () => void = () => {
  const seed = 1603425419322

  const SeedModel = mongoose.model(table.seed, SeedSchema)
  SeedModel.findOne({ body: seed }).then((res) => {
    if (!res) {
      const newSeed = new SeedModel({ body: seed })
      newSeed.save()
      const newUser = new models.UserModel({
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'admin',
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
