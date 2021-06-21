const { Pet } = require('../models')

function handleError(err) {
  console.log(err);
}

class PetService {
  async findAll() {
    try {
      const pets = await Pet.find({})
      return pets
    } catch (err) {
      console.log(err)
    }
  }

  async find(petId) {
    try {
      const pet = await Pet.findById(petId)
      return pet
    } catch (err) {
      console.log(err)
    }
  }

  async create(petDTO) {
    try {
      const pet = await Pet.create(petDTO);
      return pet;
    } catch (err) {
<<<<<<< HEAD
      console.log(err)
=======
      console.log(err);
>>>>>>> 9206c0b1a41a81c62f7783f4077e0347e444c46d
    }
  }
}

const petService = new PetService()
module.exports = petService;