var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// const bodyParser = require('body-parser');
const routes = require('./routes'); 

var websocket = require('ws');
var server = new websocket.Server({
    port: 3060
});

server.on('open', () => {
    console.log('webSocket开启');
});
server.on('close', () => {
    console.log('webSocket关闭');
});
server.on('connection', (ws, req) => {
    console.log('webSocket连接成功');
    ws.on('message', (data) => {
        // data: 接收信息
        server.clients.forEach((item) => {
            if (item.readyState === ws.OPEN) {
                item.send('' + data);
            }
        });
    });
});


var app = express();

// view engine setup
// 查看引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors()); // 注入cors模块解决跨域
// app.use(bodyParser.urlencoded({extended:false}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// catch 404 and forward to error handler
// 捕获404并转发到错误处理程序
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // 设置局部变量，仅在开发中提供错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
