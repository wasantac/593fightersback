var User = require("../collections/user.model");

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
    User.findById(req.params.id,(err,docs) =>{
        res.send(docs)
    })
}
exports.login = (req,res) => {
    return passport.authenticate('local')
}
