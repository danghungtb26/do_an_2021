import mongoose from 'mongoose'
import { roles_list } from '../../constants'
import { RoleSchema, RoleType, SeedSchema } from '../Schemas'
import table from '../tableName'

const RoleModel = mongoose.model<RoleType>(table.role, RoleSchema)
const SeedModel = mongoose.model(table.seed, SeedSchema)

const seed_1603179342533: () => void = () => {
  const seed = 1603179342533
  SeedModel.findOne({ body: seed }).then(res => {
    if (!res) {
      const newSeed = new SeedModel({ body: seed })
      newSeed.save()
      roles_list.forEach(role => {
        const newRole = new RoleModel({ name: role, description: '' })
        newRole.save()
      })
    }
  })
}

const run_seeds = () => {
  seed_1603179342533()
}

run_seeds()
