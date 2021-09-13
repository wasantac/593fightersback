var mongoose = require("mongoose");
const calendarioSchema = new mongoose.Schema({
    lunes: String,
    martes: String,
    miercoles: String,
    jueves: String,
    viernes: String,
    sabado: String,
    domingo: String,
},{timestamps:true})

module.exports = mongoose.model('calendario',calendarioSchema);