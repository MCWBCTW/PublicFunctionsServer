var express = require('express');
var router = express.Router();

/* GET users listing. */
router.delete('/test', function(req, res, next) {
  res.send('/delete/test 请求成功');
});

module.exports = router;