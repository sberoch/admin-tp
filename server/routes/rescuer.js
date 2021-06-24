var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const RescuerService = require('../services/rescuer')

router.get('/', async (req, res, next) => {
  const rescuers = await RescuerService.findAll(req.query)
  res.status(200).json(rescuers)
});

router.get('/:id', async (req, res, next) => {
  const rescuerId = req.params.id;
  const rescuer = await RescuerService.find(rescuerId)
  res.status(200).json(rescuer)
});

router.post('/', async (req, res, next) => {
  const rescuerDTO = req.body
  try {
    const rescuer = await RescuerService.create(rescuerDTO)
    res.status(201).json(rescuer)
  } catch(err) {
    next(createError(400, err.message))
  }
});

module.exports = router;