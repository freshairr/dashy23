const express = require('express')
const passport = require('passport')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth') 
const { ensureAuth } = require('../middleware/passportAuth')

router.get('/', homeController.getIndex) 
router.get('/dashboard', homeController.getDashboard )
router.get('/login/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] }
))
router.get('/oauth2/redirect/accounts.google.com',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3000/dashboard', 
    failureMessage: true 
  }),
  function(req, res) {
    res.redirect('http://localhost:3000/dashboard');
})
router.get('/logout', function(req, res) {
  req.logout()
  req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('http://localhost:3000/')
      console.log(`-------> User Logged out`)
  })}
)

module.exports = router