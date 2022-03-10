
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
var User = require("./collections/user.model");
exports.initialize = (passport) => {
    authenticatedUser = async (user,password,done) => {
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
    authenticatedAdmin = async(user,password,done) => {
        User.findOne({user},async (err,docs) => {
            if(err) {return done(err)}
            if(!docs){
                return done(null,false,{message: "No se encontro al usuario."})
            }
            if(await bcrypt.compare(password,docs.password)){
                if(docs.admin){
                    return done(null,docs);
                }
            }
            
            return done(null,false,{message: "No se encontro al usuario."})
        })
    }
    passport.use('login',new LocalStrategy(authenticatedUser));
    passport.use('admin',new LocalStrategy(authenticatedAdmin));
    passport.use('jwt-admin',new JWTStrategy({
        secretOrKey: process.env.SECRET_ADMIN,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
    }, async (token,done) => {
        try{
            return done(null,token.user)
        }catch(e){
            done(e)
        }
    }))
    passport.use('jwt-admin-body',new JWTStrategy({
        secretOrKey: process.env.SECRET_ADMIN,
        jwtFromRequest: ExtractJWT.fromBodyField('token')
    }, async (token,done) => {
        try{
            return done(null,token.user)
        }catch(e){
            done(e)
        }
    }))
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