const { Pet } = require('../models')

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
      console.log(err)
    }
  }
}

const petService = new PetService()
module.exports = petService;