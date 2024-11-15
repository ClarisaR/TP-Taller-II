const auth = (req, res, next)=>{
    if(req.session.userId){
        return next()
    }else{
        res.status(401).json({ message: 'No autenticado'}).end
    }
}

module.exports = {
    auth
}