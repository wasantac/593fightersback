var mongoose = require("mongoose");
const tonreoSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    premio: String,
    participantes:[],
    juego: String,
    fecha: Date,
    max: Number,
},{timestamps:true})

module.exports = mongoose.model('torneos',tonreoSchema);