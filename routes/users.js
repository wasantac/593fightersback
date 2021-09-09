var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');
const passport = require("passport");
/* GET users listing. */
router.get('/', passport.authenticate('local'),userController.findAll);
router.post('/',userController.create);
router.delete('/:id',userController.deleteID);
router.get('/:id',userController.findID);

module.exports = router;
