var express = require('express');

var router = express.Router();

//引入mysql模块

var mysql = require("mysql");

//引入文件

var dbConfig = require('./database/DBConfig');

var querySql = require('./database/querysql');

//使用DBConfig中配置信息创建一个MySQL连接池

var pool = mysql.createPool(dbConfig.mysql);

//响应JSON数据

var responseJSON = function (res, ret) {
    if (typeof ret == 'undefined') {
        res.json({ code: "-200", msg: "操作失败" });
    } else {
        res.json(ret);
    }

};

//进行查询

router.get('/query', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var params = req.query || req.params;        //前端传的参数（暂时写这里，在这个例子中没用）
        connection.query(qusrySql.UserSQL, function (err, result) {
            //将结果以json形式返回到前台
            responseJSON(res, result);
            //释放链接
            connection.release();
        })
    })
})