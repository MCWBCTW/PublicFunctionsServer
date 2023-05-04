var express = require('express');
var router = express.Router();

/* GET users listing. */
router.put('/test', function(req, res, next) {
  res.send('put/test 请求成功');
});

module.exports = router;