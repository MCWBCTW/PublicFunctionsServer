var express = require('express');
var router = express.Router();

// 上传文件模块
const multiparty = require('multiparty')
// 文件操作模块
const fs = require('fs')



/* GET users listing. */
router.post('/test', function (req, res, next) {
    res.send({
      code: 200,
      msg: '/post/test 请求成功'
    });
});



// 分片上传文件
router.post('/uploadFile', function (req, res, next) {
    let form = new multiparty.Form({uploadDir: './files'});
    //这里可以设置图片上传的路径，默认为当前用户下的temp文件夹
    // form.uploadDir = "./files";
    form.parse(req, function(err, fields, files) {
        //files即为上传图片的信息
        console.log(fields, files)
        if(!err){
            console.log('1===', fields);
            console.log('2===', files);
            let upFile = files.file[0]
            // 重命名
            res.send({
                code: 200,
                msg: '上传成功',
                fileSize: ((upFile.size) / 1048576).toFixed(2) + 'M'
            })
        } else {
            res.send({
                code: 400,
                msg: '失败',
                err
            });
        }
    });

});





module.exports = router;