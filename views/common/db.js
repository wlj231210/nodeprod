// 导入模块
var mysql = require('mysql');
// 导入配置文件
const configObj = require(process.cwd() + "/common/config.json").db_config

// 连接数据库
const db = mysql.createConnection({ host: configObj.host, port: configObj.port, database: configObj.dbname})

// 声明全局变量  全局都可以用
global.db = db