let express = require('express');
let router = express.Router();
let db = require('../../database/dbConfig');



/**
 * @api {post} /login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "success" : "登录成功",
 *      "result" : {
                "Id": 10,
                "username": "12138",
                "mobile": "17681018301",
                "email": null,
                "userhead": null,
                "creacte_time": 1589348813846,
                "update_user": null,
            }
 *  }
 * @apiSampleRequest http://localhost:4000/login
 * @apiVersion 1.0.0
 */
router.post('/login', function (req, res, next) {
    try {
        if (req.body.username !== '' && req.body.password !== '')
        {
            let username = req.body.username;
            let password = req.body.password;
            let project = {username:req.body.username,password:req.body.password};
            let sqlString = 'SELECT * FROM user WHERE username=' + req.body.username + '&& password=' + req.body.password;
            let connection = db.connection();
            db.insert(connection, sqlString, project, function (userdata) {
                console.log('req:' + req.session);
                if (userdata.length==1){
                    req.session.user = userdata;
                    // req.session.user ='1231';
                    res.json({
                        code: '200',
                        success: '登录成功',
                        result: {

                            "Id": userdata[0].Id,
                            "username": userdata[0].username,
                            "mobile": userdata[0].mobile,
                            "email": userdata[0].email,
                            "userhead": userdata[0].userhead,
                            "creacte_time": userdata[0].creacte_time,
                        }
                    });

                }else{
                    res.json({
                        code: '400',
                        success: '用户名或密码错误',
                        result: null
                    });
                }

            });
            db.close(connection);
            return;
        }else{
            res.json({
                code: '400',
                success: '登录帐号或密码不正确',
                result: null
            });
        }
    } catch (error) {
        res.json({
            code: '400',
            success: '登录出错啦',
            result: null
        });
    }
});
/**
 * @api {get} /getuserinfo 获取用户信息
 * @apiDescription 退出登录
 * @apiName getuserinfo
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {   "code": 200,
 *      "success" : "退出成功",
 *      "result" :   {
                "Id": 10,
                "username": "12138",
                "mobile": "17681018301",
                "email": null,
                "userhead": null,
                "creacte_time": 1589348813846,
                "update_user": null,
            }
 *  }
 * @apiSampleRequest http://localhost:4000/logout
 * @apiVersion 1.0.0
 */
router.get('/logout', function (req, res) {
    if (req.session.user){
        res.json({
            code: '200',
            success: '登录成功',
            result: {

                "Id": userdata[0].Id,
                "username": userdata[0].username,
                "mobile": userdata[0].mobile,
                "email": userdata[0].email,
                "userhead": userdata[0].userhead,
                "creacte_time": userdata[0].creacte_time,
            }
        });
    }else{
        res.json({
            code: '400',
            success: '未登录',
            result: null
        });
    }
    res.redirect('index');
});

/**
 * @api {post} /regest 注册
 * @apiDescription 用户注册
 * @apiName regest
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {number} mobile 手机号
 * @apiParam {string} password 密码
 * @apiParam {string} gpass 重复密码
 * @apiParam {number} codes 验证码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {   "code": 200,
 *      "success" : "注册成功",
 *      "result" :  null
 *  }
 * @apiSampleRequest http://localhost:4000/regest
 * @apiVersion 1.0.0
 */
router.post('/regest', function (req, res, next) {
    let
        username = req.body.username,
        phone = req.body.mobile,
        resPass = req.body.password;
    if (req.body.password == "" || req.body.gpass == "" || req.body.username == "" || req.body.mobile == "") {
        res.json({
            code: '400',
            success: '请求数据不能为空',
            result: null
        });
        return false;
    }
    try {
        if (req.body.password !== req.body.gpass) {
            res.json({
                code: '301',
                success: '重复密码不一致',
                result: null
            });
            return false;
        }
        if (req.body.codes !== '1206') {
            res.json({
                code: '302',
                success: '验证码不一致',
                result: null
            });
            return false;
        }
        delete req.body.codes;
        let creacte_time = Date.now();
        let project = Object.assign({ 'creacte_time': creacte_time }, req.body);
        let sqlString = 'INSERT INTO user SET ?';
        let connection = db.connection();
        db.insert(connection, sqlString, project, function (id) {
            console.log('inserted id is:' + id);
            res.json({
                code: '200',
                success: '注册成功',
                result: {
                    name: username,
                    password: phone,
                    resPass: resPass,
                    id: id
                }
            });
        });
        db.close(connection);
        return;


    } catch (e) {
        res.json({
            code: '400',
            success: '请求出错',
            result: null
        });
    }
});

/**
 * @api {get} /logout 退出登录
 * @apiDescription 退出登录
 * @apiName logout
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {   "code": 200,
 *      "success" : "退出成功",
 *      "result" :  null
 *  }
 * @apiSampleRequest http://localhost:4000/logout
 * @apiVersion 1.0.0
 */
router.get('/logout', function (req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect('index');
});
module.exports = router;