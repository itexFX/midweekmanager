var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt    = require('jsonwebtoken')
var config = require('../../config')
var User   = require('../../models/user')

// \\ ** SESSIONS API ENDPOINT ** \\ //

router.post('/', function (req, res, next) {
  var username = req.body.username
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.sendStatus(401) }
      var jsonToken = {username: username}
      var token = jwt.sign(jsonToken, config.secret, {expiresIn:'1440m'})
      res.send(token)
    })
  })
})

module.exports = router
