var express = require('express');
var router = express.Router();
const passport = require("passport");
/* GET users listing. */

router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    res.send(req.user);
  });
router.get('/logout',function(req, res){
  if (req.user) {
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    return res.json({ msg: 'logging you out' })
  } else {
    return res.json({ msg: 'no user to log out!' })
  }
  });

router.get('/',function(req, res){
  res.set('Content-Type', 'text/plain');
  if(req.user){
    res.status(200).json({data:true});
  }
  else{
    res.status(200).json({data:false});
  }
  
})

module.exports = router;
