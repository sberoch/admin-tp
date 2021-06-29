const mongoose = require('mongoose');
const SPECIES = require('./species');

const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Se requiere un nombre para esta mascota'],
  },
  age: {
    type: Number,
    required: [true, 'Se requiere una edad para esta mascota'],
  },
  image_url: {
    type: String,
    required: [true, 'Se requiere una url para la imagen para esta mascota'],
  },
  species: {
    type: String,
    enum: SPECIES,
    required: [true, 'Se require una especie de animal para esta mascota']
  },
  description: {
    type: String,
  }
},
  { timestamps: true });

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;
