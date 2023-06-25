// 引入mysql
const mysql = require("mysql");
// 建立一个连接池
var db = mysql.createConnection({     
    host: 'localhost',       
    user: 'root',              
    password: '123456',       
    port: '3306',                   
    database: 'public' 
  }); 
   
// db.connect((err) => {
//     if (!err) {
//         console.log('数据库连接成功');
//     }
// });

// var  sql = 'SELECT * FROM webRTC';
// // 查
// db.query(sql, function (err, result) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }
//     console.log('--------------------------SELECT----------------------------');
//     console.log(result);
//     console.log('------------------------------------------------------------\n\n');  
// });

// db.end();

// 视频通话设备，数据库基本数据格式
// {
//   deviceId: '',
//   deviceName: '',
//   online: '',
//   created_at: '',
// }

// var  addSql = 'INSERT INTO webRTC(deviceId,deviceName,online,created_at) VALUES(?,?,?,?)';
// var  addSqlParams = ['123', '测试设备1','1', '2020-10-10 12:00:00'];
// //增
// db.query(addSql, addSqlParams, function (err, result) {
//         if(err){
//           console.log('[INSERT ERROR] - ',err.message);
//           return;
//         }        
 
//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

module.exports = db