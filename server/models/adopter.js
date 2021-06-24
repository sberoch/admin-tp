const mongoose = require('mongoose');

const adopterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Se requiere un nombre para el adoptante'],
  },
  birthdate: {
    type: Date,
    required: [true, 'Se requiere una fecha de nacimiento para el adoptante'],
  },
  email: {
    type: String,
    required: [true, 'Se requiere un email para el adoptante'],
  },
  country: {
    type: String,
    required: [true, 'Se requiere un pais para el adoptante'],
  },
  address: {
    type: String,
    required: [true, 'Se requiere una direccion para el adoptante'],
  },
},
{ timestamps: true });

const adopter = mongoose.model('Adopter', adopterSchema)

module.exports = adopter;