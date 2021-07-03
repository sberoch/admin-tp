const { Rescuer } = require('../models');
const { buildQuery } = require('./queries/rescuer');

function handleError(err) {
  console.log(err);
}

class RescuerService {
  async findAll(filter) {
    const query = buildQuery(filter)
    try {
      const rescuers = await Rescuer.find(query)
        .select('-pets');
      return rescuers;
    } catch (err) {
      console.log(err)
    }
  }

  async findFirst(query) {
    try {
      const rescuer = await Rescuer.findOne(query);
      return rescuer;
    } catch (err) {
      handleError(err);
    }
  }

  async findByEmail(email) {
    try {
      const rescuer = await Rescuer.findOne({ email: email })
      return rescuer
    } catch (err) {
      handleError(err);
    }
  }

  async find(rescuerId) {
    try {
      const rescuer = await Rescuer.findById(rescuerId)
      return rescuer
    } catch (err) {
      console.log(err)
    }
  }

  async create(rescuerDTO) {
    try {
      const rescuer = await Rescuer.create(rescuerDTO);
      return rescuer;
    } catch (err) {
      console.log(err);
    }
  }
}

const rescuerService = new RescuerService()
module.exports = rescuerService;