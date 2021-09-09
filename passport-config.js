
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
var User = require("./collections/user.model");
exports.initialize = (passport) => {
    authenticadedUser = async (user,password,done) => {
        User.findOne({user},async (err,docs) => {
            if(err) {return done(err)}
            if(!docs){
                return done(null,false,{message: "No se encontro al usuario."})
            }
            if(await bcrypt.compare(password,docs.password)){
                return done(null,docs)
            }
            
            return done(null,docs)
        })

    }
    passport.use(new LocalStrategy(authenticadedUser));
    passport.serializeUser((user,done) =>{done(null,user._id)});
    passport.deserializeUser((id,done) =>{
        User.findById(id,(err,docs) => {
            done(err,docs)
        })
    });
}