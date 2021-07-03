const { Adopter } = require('../models');
const { buildQuery } = require('./queries/adopter');

function handleError(err) {
  console.log(err);
}

class AdopterService {
  async findAll(filter) {
    const query = buildQuery(filter)
    try {
      const adopters = await Adopter.find(query);
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

  async findByEmail(email) {
    try {
      const adopter = await Adopter.findOne({ email: email })
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