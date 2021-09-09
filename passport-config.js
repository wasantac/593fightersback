
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
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
            
            return done(null,false,{message: "No se encontro al usuario."})
        })

    }
    passport.use('login',new LocalStrategy(authenticadedUser));
    passport.use('jwt',new JWTStrategy({
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
    },async (token,done) =>{
        try{
            return done(null,token.user)
        }catch(e){
            done(e)
        }
    }))
}