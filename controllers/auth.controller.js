const User = require('../models/User.model')
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res, next) => {
    const loginError = createError(StatusCodes.UNAUTHORIZED, 'Email or password incorrect');
    const { email, password } = req.body

    if(!email || !password) {
        return next(loginError);
    }

    //check email
    User.findOne({ email })
    .then(user => {
        if(!user) {
            console.log('nao existe usuario')
            return next(loginError)
        }
        
        //check password
        return user.checkPassword(password)
        .then(match => {
            if(!match) {
                console.log('senha errada')
                return next(loginError)
            }
            
            //token jwt (info del usuario) emitido y certificado
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'test',
                {
                    expiresIn: '3h'
                }
                ) 
                
                console.log('manda o token', token)
            res.json({ accessToken: token })
        })
    })
    .catch(next)
}