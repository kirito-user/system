class AuthController {
    login(req, res){
        console.log(req.session);
    }
}

module.exports = new AuthController()