import mongoose from 'mongoose'

const { Schema, SchemaTypes } = mongoose

const Seed = new Schema({
  body: SchemaTypes.Number,
})

export default Seed
