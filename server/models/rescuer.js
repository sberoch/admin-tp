const mongoose = require('mongoose');

const rescuerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Se requiere un nombre para el rescatista'],
  },
  birthdate: {
    type: Date,
    required: [true, 'Se requiere una fecha de nacimiento para el rescatista'],
  },
  email: {
    type: String,
    required: [true, 'Se requiere un email para el rescatista'],
  },
  country: {
    type: String,
    required: [true, 'Se requiere un pais para el rescatista'],
  },
  address: {
    type: String,
    required: [true, 'Se requiere una direccion para el rescatista'],
  },
},
{ timestamps: true });

const Rescuer = mongoose.model('Rescuer', rescuerSchema)

module.exports = Rescuer;