var router = require('express').Router();
var rootPath = '/Users/Jack/GitHub/midweekmanager/layouts'


router.get('/', function(req, res) {
  res.sendFile('posts.html', { root: rootPath });
})

router.get('/todolist', function(req, res) {
  res.sendFile('todo.html', { root: rootPath });
})


module.exports = router
