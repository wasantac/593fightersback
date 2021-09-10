var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');
const passport = require("passport");
/* GET users listing. */
router.get('/',userController.findAll);
router.post('/',userController.create);
router.delete('/:id',userController.deleteID);
router.get('/id',passport.authenticate('jwt',{session:false}),userController.findID);
router.put('/',passport.authenticate('jwt',{session:false}),userController.findIDandUpdate)

module.exports = router;
