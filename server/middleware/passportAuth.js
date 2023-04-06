module.exports = {
    ensureAuth: (req, res, next) => {
      if (req.isAuthenticated()) { return next() }
      res.redirect("http://localhost:3000/login")
      console.log("Can't access Route or Todo's. You're not logged in!")
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
  }
  