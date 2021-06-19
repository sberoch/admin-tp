const mongoose = require('mongoose');
const SPECIES = require('./species');

const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Se requiere un nombre para esta mascota'],
  },
  species: {
    type: String,
    enum: SPECIES,
    required: [true, 'Se require una especie de animal para esta mascota']
  },
  description: {
    type: String, 
    required: [false]
  }
},
{ timestamps: true });

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;
