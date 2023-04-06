const passport = require('passport')

module.exports = {
    login: (req, res) => {
        passport.authenticate('google', { scope: ['email', 'profile'] })
    },
    logout: (req, res) => {
        req.logout()
        req.session.destroy((err) => {
            if (err) console.log('Error : Failed to destroy the session during logout.', err)
            req.user = null
            res.redirect('http://localhost:3000/')
            console.log(`-------> User Logged out`)
        })
    }

}
