const { Adopter } = require('../models')

function handleError(err) {
  console.log(err);
}

class AdopterService {
  async findAll() {
    try {
      const adopters = await Adopter.find({});
      return adopters;
    } catch (err) {
      handleError(err);
    }
  }

  async findFirst(query) {
    try {
      const adopter = await Adopter.findOne(query);
      return adopter;
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
      const adopter = await Adopter.create(adopterDTO);
      return adopter;
    } catch (err) {
      handleError(err);
    }
  }
}

const adopterService = new AdopterService()
module.exports = adopterService;