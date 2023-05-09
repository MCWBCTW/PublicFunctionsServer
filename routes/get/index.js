var express = require('express');
var router = express.Router();
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')

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





module.exports = router;
