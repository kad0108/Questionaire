/* 引入模块 */
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');//文件模块
const path = require('path');//处理路径模块
const bodyParser = require('body-parser');//处理post数据模块
const api = require('./api');
const app = express();

// app.set('jwtTokenSecret', 'YOUR_SESCRET_STRING');


/* 加载中间件 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
//访问静态资源文件，访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')));
//因为是单页应用，所有请求都走/dist/index.html
app.get('*', function(req, res){
	const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
	res.send(html);
})

app.listen(8088);
console.log('success listen port 8088...');