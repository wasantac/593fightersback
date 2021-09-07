var mongoose = require("mongoose");
const tonreoSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    participantes:[],
    juego: String
},{timestamps:true})

module.exports = mongoose.model('torneos',tonreoSchema);