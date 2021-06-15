const { Rescuer } = require('../models')

class RescuerService {
  async findAll() {
    try {
      const rescuers = await Rescuer.find({})
      return rescuers
    } catch (err) {
      console.log(err)
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
      handleError(err)
    }
  }
}

const rescuerService = new RescuerService()
module.exports = rescuerService;