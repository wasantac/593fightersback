var mongoose = require("mongoose");
var Torneo = require("../collections/torneos.model");
const { countDocuments } = require("../collections/user.model");
var User = require("../collections/user.model");
exports.findAll = (req,res) => {
    Torneo.find({}).sort('-fecha').exec((err,docs) =>{
        res.send(docs)
    })
}
exports.find3 = (req, res) =>{
    Torneo.find({},'titulo premio fecha').sort('-fecha').limit(3).exec((err,docs) =>{
        res.send(docs)
    })
}
exports.findId = (req,res) => {
    Torneo.findById(req.params.id,(err,docs) =>{
        res.send(docs)
    })
}
exports.create = (req,res) => {
    const nuevo = new Torneo({
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        participantes : [],
        juego : req.body.juego,
        fecha: req.body.fecha,
        premio: req.body.premio,
        max: req.body.max,
    });
    nuevo.save()
    res.send(req.body)
}
exports.actualizarTorneo = (req,res) => {
    Torneo.findByIdAndUpdate(req.body.id,{
        titulo : req.body.titulo,
        descripcion: req.body.descripcion,
        juego : req.body.juego,
        fecha : req.body.fecha,
        premio: req.body.premio,
        max: req.body.max
    },(err,docs) => {
        res.send(docs)
    })
}
exports.deleteID = (req,res) => {
    console.log(req.body)
    Torneo.findByIdAndDelete(req.params.id,(err,docs) => {
        res.send(docs)
    })
}
exports.updateParticipante = (req,res) => {
    let participante = {
        nombre: req.body.nombre,
        nick: req.body.nick,
        correo: req.body.correo,
        whats: req.body.whats,
    }
    Torneo.findOne({"participantes.nick":participante.nick,_id:req.params.id},(err,docs) =>{
        if(docs){
            res.send(false)
        }else{
            Torneo.findByIdAndUpdate(req.params.id,{
                "$push":{"participantes": participante}
            },(err,docs) => {
                res.send(docs)
            })
        }

    })

}
exports.findParticipante = (req,res) => {
    User.findById(req.user._id,(err,docsUser) => {
        Torneo.findOne({"participantes.nick":docsUser.nick,_id:req.params.id},(err,docs) =>{
            if(docs){
                res.send(false)
            }else{
                res.send(true)
            }
    
        })
    })
}
exports.tamano = (req,res) => {
    User.count({},function(err,count){
        Torneo.count({},(err,countT) => {
            res.json({
                user: count,
                torneo : countT
            })
        })
    })
}
