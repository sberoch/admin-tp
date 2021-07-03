const { Pet } = require('../models');
const { buildQuery } = require('./queries/pet');

function handleError(err) {
  console.log(err);
}

class PetService {
  async findAll(filter) {
    const query = buildQuery(filter)
    try {
      const pets = await Pet.find(query)
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
      console.log(err);
    }
  }
}

const petService = new PetService()
module.exports = petService;