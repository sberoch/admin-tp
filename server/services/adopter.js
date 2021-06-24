const { Rescuer } = require('../models')

function handleError(err) {
  console.log(err);
}

class RescuerService {
  async findAll() {
    try {
      const adopters = await Adopter.find({})
      return adopters
    } catch (err) {
      handleError(err);
    }
  }

  async find(adopterId) {
    try {
      const adopter = await Adopter.findById(adopterId)
      return adopter
    } catch (err) {
      handleError(err);
    }
  }

  async create(adopterDTO) {
    try {
      const adopter = await Adopter.create(rescuerDTO);
      return adopter;
    } catch (err) {
      handleError(err);
    }
  }
}

const rescuerService = new RescuerService()
module.exports = rescuerService;