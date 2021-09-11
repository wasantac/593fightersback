var mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    nick: String,
    nombre: String,
    correo: String,
    whats: String,
    admin: Boolean,

},{timestamps:true})

module.exports = mongoose.model('user',userSchema);