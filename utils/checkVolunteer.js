module.exports = function checkVolunteer(req, res, next){
    const role = req.decodedToken.role
  
    if(role === 'volunteer'){
      next()
    } else {
      res.status(401).json({message: 'You don´t have the necesary permisions to access this resource. Only Volunteers allowed'})
    }
  }