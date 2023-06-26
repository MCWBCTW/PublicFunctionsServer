var express = require('express');
var router = express.Router();
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')

const db = require('../../db/index');

const tools = require('../../utils/tools')
// 上传文件的临时路径
const STATIC_TEMPORARY = path.join(__dirname, '../../static/temporary')
// 文件路径
const STATIC_FILES = path.join(__dirname, '../../static/files')


// 合并切片接口
router.get('/mergeFile', async (req, res) => {
    const { filename } = req.query
    try {
        let len = 0; // 分片文件总长度
        // 分片文件 内容 集合
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash,index) => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${hash}`)
            len += buffer.length
            return buffer
        });
        // 合并文件
        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`); // 创建文件
        ws.write(buffer); // 写入文件
        ws.close(); // 完成
        // 删除之前的文件切片
        tools.ForceFolderDeletion(`${STATIC_TEMPORARY}/${filename}`, () => {})
        res.send({
            code: 200,
            msg: '合并成功',
            data: {
                filename,
            },
            err: null
        });
    } catch (err) {
        res.send({
            code: 500,
            msg: '合并失败',
            data: {
                filename,
            },
            err
        });
    }
})

// 校验文件是否上传过
router.get('/inspectFile', async (req, res) => {
    const { filename } = req.query
    let fileUrl = `${STATIC_FILES}/${filename}`; // 如果文件已上传过，将会保存在此地址
    if (fs.existsSync(fileUrl)) {
        // 文件存在，已上传过
        res.status(200).send({
            code: 201,
            msg: '文件已上传',
            data: null,
            err: null
        })
    } else {
        res.status(200).send({
            code: 202,
            msg: '文件未上传',
            data: null,
            err: null
        })
    }
})


// 直接返回前端10万条数据，配合实现虚拟滚动
router.get('/oneHundredThousand', async (req, res) => {

    let data = []; // 返回的数据
    for(let i = 0; i < 100000; i++){
        data.push({
            id: i,
            msg: Math.random() + ''
        })
    }
    res.status(200).send({
        code: 200,
        msg: '获取成功',
        data,
        err: null
    })
})


// 返回数据库中已储存的设备数据，
router.get('/getDeviceInfo', async (req, res) => {
    db.query('SELECT * FROM webRTC WHERE online = 1 LIMIT 5', (err, result) => {
        if (err) {
            res.status(200).send({
                code: 500,
                msg: '数据库查询失败!',
                data: null,
                err
            })
        }
        res.status(200).send({
            code: 200,
            msg: '数据库查询成功!',
            data: result,
            err: null
        })
    })
})

module.exports = router;
