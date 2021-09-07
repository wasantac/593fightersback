var mongoose = require("mongoose");
var Torneo = require("../collections/torneos.model");

exports.findAll = (req,res) => {
    Torneo.find({},'titulo descripcion fecha').sort('-fecha').exec((err,docs) =>{
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
    });
    nuevo.save()
    res.send(req.body)
}
exports.updateParticipante = (req,res) => {
    let participante = {
        nombre: req.body.nombre,
        nick: req.body.nick,
        correo: req.body.correo,
        whats: req.body.whats,
    }
    Torneo.findByIdAndUpdate(req.params.id,{
        "$push":{"participantes": participante}
    },(err,docs) => {
        res.send(docs)
    })
}