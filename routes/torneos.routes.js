var express = require("express");
var router = express.Router();
const torneoController = require('../controllers/torneos.controller');

router.get('/',torneoController.findAll);
router.post('/',torneoController.create);
router.put('/:id',torneoController.updateParticipante);
router.get('/:id',torneoController.findId);
router.delete('/:id',torneoController.deleteID);
module.exports = router;