var express = require('express');
var router = express.Router();

const PetService = require('../services/pet')
const createError = require('http-errors');

router.get('/', async (req, res, next) => {
  const pets = await PetService.findAll(req.query)
  res.status(200).json(pets)
});

router.get('/:id', async (req, res, next) => {
  const petId = req.params.id;
  const pet = await PetService.find(petId)
  res.status(200).json(pet)
});

router.post('/', async (req, res, next) => {
  const petDTO = req.body
  try {
    const pet = await PetService.create(petDTO)
    res.status(201).json(pet)
  } catch(err) {
    next(createError(400, err.message))
  }
});

module.exports = router;