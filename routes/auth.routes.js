const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();

authRouter.get('/login', (req, res) => {
    res.render('login');
})

authRouter.post(
    '/login', 
    passport.authenticate('local-login', {
        successRedirect: '/blog',
        failureRedirect: '/auth/signup',
        failureFlash: true
    })
)
authRouter.get('/signup', (req, res) => {
    res.render('signup');
})
authRouter.post(
    '/login', 
    passport.authenticate('local-signup', {
        successRedirect: '/blog',
        failureRedirect: '/auth/signup',
        failureFlash: true
    })
)
authRouter.get('/logout', (req, res) => {
    req.logout();
    req.flash('succes_msg', 'You are logged out')
    res.redirect('/auth/login')
})

module.exports = {
    authRouter,
}