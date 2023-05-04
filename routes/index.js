
const express = require('express');
const router = express.Router(); // 注册路由 


const getRouter = require('./get/index.js');
const postRouter = require('./post/index.js');
const putRouter = require('./put/index.js');
const deleteRouter = require('./delete/index.js');

// 注入用户路由模块
router.use('/get', getRouter);
router.use('/post', postRouter);
router.use('/put', putRouter);
router.use('/delete', deleteRouter);

module.exports = router;