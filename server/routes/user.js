var express = require('express');
var router = express.Router();

const AdopterService = require('../services/adopter')
const RescuerService = require('../services/rescuer');

router.get('/', async (req, res, next) => {
  const adopter = await AdopterService.findFirst(req.query);
  const rescuer = await RescuerService.findFirst(req.query);

  let user = null;
  if (adopter != null) user = { ...adopter.toJSON(), role: 'Adopter' };
  if (rescuer != null) user = { ...rescuer.toJSON(), role: 'Rescuer' };

  // todo -> ver caso que llega null; 404
  return res.status(200).json(user);
});

router.get('/:email', async (req, res, next) => {
  const adopter = await AdopterService.findByEmail(req.params.email)
  const rescuer = await RescuerService.findByEmail(req.params.email)

  if (adopter !== null) {
    return res.status(200).json({ id: adopter._id })
  }
  if (rescuer !== null) {
    return res.status(200).json({ id: rescuer._id })
  }
  return res.status(400).json({ message: 'No se encontro el usuario' })
});


module.exports = router;