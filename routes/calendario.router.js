var express = require("express");
var router = express.Router();
const calendarioController = require('../controllers/calendario.controller');
const passport = require("passport");

router.get('/',calendarioController.findUltimo);
router.post('/',passport.authenticate('jwt-admin-body',{session:false}),calendarioController.actualizarCalendario);
router.delete('/:id',passport.authenticate('jwt-admin',{session:false}),calendarioController.deleteID);


module.exports = router;