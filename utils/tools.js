const fs = require('fs')
const path = require('path')

/**
 * 强制删除目标文件夹或文件
 * @param {string} url 需要删除的目标文件夹地址
 * @param {function} cb 处理完成的回调函数
 */
function ForceFolderDeletion(url, cb){
    fs.stat(url, (err, status) => {
        if (status.isDirectory()) {
            // 为文件夹，需要先删除全部子文件或子文件夹
            fs.readdir(url, (err, urls) => {
                urls = urls.map(item => path.join(url, item)); // 拿到所有子级的路径
                let index = 0; // 当前删除的子级下标
                function setp(){
                    if (index === urls.length) {
                        // 子级删除完，删除自身
                        return fs.rmdir(url, cb);
                    }
                    // 删除第一个子级后，再删除第二个子级，直到删除完后，再删除自身
                    ForceFolderDeletion(urls[index++], setp);
                }
                setp();
            })
        } else {
            // 为文件，直接删除
            fs.unlink(url, cb)
        }
    })
}

module.exports = {
    ForceFolderDeletion
}