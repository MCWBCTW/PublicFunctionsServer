var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/test', function(req, res, next) {
  res.send('/post/test 请求成功');
});

router.post('/ttt', function(req, res, next) {
  res.send('/post/ttt 请求成功');
});
module.exports = router;