var Calendario = require("../collections/calendario.model")

exports.findUltimo = (req,res) => {
    Calendario.findOne({}).sort('-createdAt').exec((err,docs) => {
        res.send(docs)
    })
}

exports.actualizarCalendario = (req,res) => {
    const nuevo = new Calendario({
        lunes: req.body.lunes,
        martes: req.body.martes,
        miercoles: req.body.miercoles,
        jueves: req.body.jueves,
        viernes: req.body.viernes,
        sabado: req.body.sabado,
        domingo: req.body.domingo,
    })
    nuevo.save();
    res.send(req.body)
}

exports.deleteID = (req,res) => {
    console.log(req.body)
    Calendario.findByIdAndDelete(req.params.id,(err,docs) => {
        res.send(docs)
    })
}