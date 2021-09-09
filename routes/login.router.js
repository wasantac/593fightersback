var express = require('express');
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userController = require('../controllers/user.controller');

/* GET users listing. */

router.post('/',async(req, res,next)=> {
  passport.authenticate('login', async (err,user,info) =>{
    
    try{
      if(err || !user){
        return next(new Error(err))
      }
      req.login(user,{session:false},async (err) => {
        if(err) return next(err)
        const body = {_id: user._id}
        const token = jwt.sign({user: body},process.env.SECRET);
        return res.json({token})
      })
    }
    catch(e){
      return next(e)
    }
  })(req,res,next)
  });
router.post('/registro',userController.create);

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next) =>{
  res.json({
    user: req.user,
    token: req.query.token
  })
})

module.exports = router;
