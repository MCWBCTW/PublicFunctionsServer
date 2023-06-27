// 引入mysql
const mysql = require("mysql");

// 视频通话设备，数据库基本数据格式
// {
//   deviceId: '',
//   deviceName: '',
//   online: '',
//   created_at: '',
// }


// 建立一个连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'public',
    port: '3306',
});


const db = {
    // 增
    add(SQL, data, callback){
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query(SQL, data, (error, result) => {
                connection.release(); // 释放连接

                if (error) {
                    callback(error);
                    return;
                }

                callback(null, result);
            })
        })
    },
    // 删 
    delete(SQL, id, callback){
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
        
            connection.query(SQL, id, (error, results) => {
                connection.release(); // 释放连接
            
                if (error) {
                    callback(error);
                    return;
                }
            
                callback(null, results);
            });
          });
    },
    // 改
    modify(SQL, newData, id, callback){
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
        
            connection.query(SQL, [...newData, id], (error, results) => {
                connection.release(); // 释放连接
            
                if (error) {
                    callback(error);
                    return;
                }
            
                callback(null, results);
            });
          });
    },
    // 查
    query(SQL, callback){
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
        
            connection.query(SQL, (error, results) => {
                connection.release(); // 释放连接
            
                if (error) {
                    callback(error);
                    return;
                }
            
                callback(null, results);
            });
          });
    },
}
   


// var db = mysql.createConnection({     
//     host: 'localhost',       
//     user: 'root',              
//     password: '123456',       
//     port: '3306',                   
//     database: 'public' 
// }); 
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


// var  addSql = 'INSERT INTO webRTC(deviceId,deviceName,online,created_at) VALUES(?,?,?,?)';
// var  addSqlParams = ['123', '测试设备1', 1, '2020-10-10 12:00:00'];
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