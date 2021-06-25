var express = require('express');
var router = express.Router();

const AdopterService = require('../services/adopter')
const RescuerService = require('../services/rescuer');

router.get('/', async (req, res, next) => {
  const adopter = await AdopterService.findFirst(req.query);
  const rescuer = await RescuerService.findFirst(req.query);

  let user = null;
  if (adopter != null) user = {...adopter, role: 'Adopter'};
  if (rescuer != null) user = {...rescuer, role: 'Rescuer'};
  
  // todo -> ver caso que llega null; 404
  return res.status(200).json(user);
});


module.exports = router;