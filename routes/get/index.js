var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send({
    code: 200,
    msg: 'get/test 请求成功',
  });
});

module.exports = router;
