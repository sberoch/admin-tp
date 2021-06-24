var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const AdopterService = require('../services/adopter')

router.get('/', async (req, res, next) => {
  const adopters = await AdopterService.findAll(req.query)
  res.status(200).json(adopters)
});

router.get('/:id', async (req, res, next) => {
  const adopterId = req.params.id;
  const adopter = await AdopterService.find(adopterId)
  res.status(200).json(adopter)
});

router.post('/', async (req, res, next) => {
  const adopterDTO = req.body
  try {
    const adopter = await AdopterService.create(adopterDTO)
    res.status(201).json(adopter)
  } catch(err) {
    next(createError(400, err.message))
  }
});

module.exports = router;