var User = require("../collections/user.model");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
exports.findAll= (req,res) => {
    User.find({},(err,docs) => {
        res.send(docs);
    })
}
exports.create = async (req,res) => {
    try{
    const hash = await bcrypt.hash(req.body.password,10)
    
    const nuevo = new User({
        user: req.body.user,
        password: hash,
        nombre : req.body.nombre,
        nick : req.body.nick,
        whats : req.body.whats,
        correo: req.body.correo,
        
    });
    nuevo.save()
    res.send(req.body)
    }catch(err){
        res.send(err)
    }
}

exports.deleteID = (req,res) => {
    User.findByIdAndDelete(req.params.id,(err,docs) => {
        res.send(docs)
    })
}
exports.findID = (req,res) => {
    User.findById(req.user._id,(err,docs) =>{
        res.send(docs)
    })
}
exports.findIDandUpdate = (req,res) => {
    let participante = {
        nombre: req.body.nombre,
        nick: req.body.nick,
        correo: req.body.correo,
        whats: req.body.whats,
    }
    User.findByIdAndUpdate(req.user._id,participante,(err,docs) =>{
        res.send(docs)
    })
    
}

exports.recoverPassword = async (req,res) => {
    try{
    console.log(req.body.id)
    const hash = await bcrypt.hash(req.body.password,10)
    User.findByIdAndUpdate(req.body.id,{password: hash}).exec((err,docs) => {
        res.send("Password Updated")
    })
    }catch(err){
        res.send(err)
    }
}
exports.recoverAdmin = (req, res) =>{
    User.findById(req.body.id,(err,docs) =>{
        const payload = {
            user: docs.user,
            id: docs._id,
        }
        const secret = process.env.SECRET_RECOVERY + docs.password;
        const token = jwt.sign(payload,secret,{expiresIn: '30m'})
        res.send(token);
    })
}
exports.recoverFront = (req,res) => {
    User.findById(req.params.id,(err,docs) => {
        try{
            const secret = process.env.SECRET_RECOVERY + docs.password;
            jwt.verify(req.params.token,secret,(err,verify) =>{
                if(err){
                    res.send(false)
                }else{
                    res.send(verify)
                }
            })
        }catch(err){
            res.send(false)
        }
    })
}
