const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Se requiere un nombre para esta mascota'],
  },
},
{ timestamps: true });

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;