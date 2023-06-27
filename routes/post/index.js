var express = require('express');
var router = express.Router();
const { Buffer } = require('buffer')
// 上传文件模块
const multiparty = require('multiparty')
// 文件操作模块
const fs = require('fs')
const path = require('path')
// 文件路径
const STATIC_FILES = path.join(__dirname, '../../static/files')
// 上传文件的临时路径
const STATIC_TEMPORARY = path.join(__dirname, '../../static/temporary')


const db = require('../../db/index');


router.post('/test', function (req, res, next) {
    res.send({
      code: 200,
      msg: '/post/test 请求成功'
    });
});



// 分片上传文件
router.post('/uploadFile', function (req, res, next) {
    
    let form = new multiparty.Form();
    
    //这里可以设置图片上传的路径，默认为当前用户下的temp文件夹
    form.parse(req, function(err, fields, files) {
        let filename = fields.filename[0]; // 文件名
        let hash = fields.hash[0]; // hash 标识
        let chunk = files.chunk[0]; // 数据
        let dir = `${STATIC_TEMPORARY}/${filename}`;

        try {
            if (!fs.existsSync(dir)) { // fs.existsSync 以同步的方法检测目录是否存在，如果目录存在 返回 true ，如果目录不存在 返回false
                fs.mkdirSync(dir); //  fs.mkdirSync() 方法用于同步创建目录。
            }
            const buffer = fs.readFileSync(chunk.path); // 同步读取文件
            const ws = fs.createWriteStream(`${dir}/${hash}`); // 用于快速创建可写流，以将数据写入文件
            ws.write(buffer); // 写入数据
            ws.close(); // 关闭读写流
            res.status(200).send({
                code: 200,
                msg: '上传成功',
                data: {
                    filename,
                    hash
                },
                err: null
            })
        } catch (err) {
            res.status(500).send({
                code: 500,
                msg: '上传失败',
                data: {
                    filename,
                    hash
                },
                err
            })
        }
    })
});


// 新增设备信息
router.post('/addDevice', async (req, res) => {
    db.add('INSERT INTO webRTC(deviceId,deviceName,online,created_at) VALUES(?,?,?,?)', [
        req.body.deviceId,
        req.body.deviceName,
        req.body.online,
        req.body.created_at,
    ], (err, result) => {
        if (err) {
            res.status(200).send({
                code: 500,
                msg: '上传失败!',
                data: {},
                err
            })
            return
        }
        res.status(200).send({
            code: 200,
            msg: '上传成功',
            data: result,
            err: null
        })
    })
    
})



// 客户端关闭，修改数据库中设备在线状态
router.post('/editOnline', async (req, res) => {
    let id = req.body.id; // 当前客户端的设备号
    db.modify(`UPDATE webRTC SET online = ? WHERE id = ?`, [0], id, (err, result) => {
        if (err) {
            res.status(200).send({
                code: 500,
                msg: '修改失败!',
                data: {},
                err
            })
            return
        }
        res.status(200).send({
            code: 200,
            msg: '修改成功!',
            data: result,
            err: null
        })
    })
})


module.exports = router;