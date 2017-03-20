"use strict";
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const models = require('./db');
const express = require('express');
const router = express.Router();

const secret = 'kad';

var jwt = require('./jwt');

// 创建用户账号
router.post('/api/login/createAccount', (req, res)=>{
	var user = {
		account: req.body.account,
		password: req.body.password
	}
	let newUser = new models.User(user);
	models.User.find({account: user.account}, (err, data) => {
		if(err) res.send(data);
		else {
			if(data.length){
				res.send('用户已存在');
			}else{
				newUser.save((err, ans)=>{
					if(err) res.send(err);
					else {
						var token = jwt.sign(user);
						res.send({
							token: token
						});
					}
				})
			}
		}
	})
	
})
// 获取用户账号
router.post('/api/login/getAccount', (req, res)=>{
	var user = {
		account: req.body.account,
		password: req.body.password
	}
	models.User.find({account: req.body.account}, (err, data)=>{
		if(err) res.send(err);
		else {
			if(!data.length){
				res.send('用户不存在');
			}else if(data[0].password != req.body.password){
				res.send('密码错误');
			}else {
				var token = jwt.sign(user);
				res.send({
					token: token
				});
			}
		}
	})
})
// 新建问卷
router.post('/api/qsnr/createQsnr', (req, res) => {
	let token = req.headers['x-csrf-token'];
	jwt.verify(token, function(err, data){
		if(err) res.send(err);
		else{
			let newQsnr = new models.Qsnr({
				account: data.account,
				qsnr: req.body.qsnr,
				state: req.body.state
			});
			newQsnr.save((err, ans)=>{
				if(err) res.send(err);
				else {
					res.send('success');
				}
			})
		}
	})
})
// 获取当前登录用户所有问卷
router.get('/api/qsnr/getQsnrLists', (req, res) => {
	let token = req.headers['x-csrf-token'];
	jwt.verify(token, function(err, data){
		if(err) res.send(err);
		else{
			models.Qsnr.find({account: data.account}, (err, ans) => {
				if(err) res.send(err);
				else{
					res.send(ans);
				}
			})
		}
	})
})
// 获取单个问卷
router.get('/api/qsnr/getQsnr/:id', (req, res) => {
	let token = req.headers['x-csrf-token'];
	jwt.verify(token, function(err, data){
		if(err) res.send(err);
		else{
			models.Qsnr.findById(mongoose.Types.ObjectId(req.params.id), (err, ans) => {
				if(err) res.send(err);
				else{
					res.send(ans);
				}
			})
		}
	})
})
// 填写问卷
router.get('/api/qsnr/fillQsnr/:id', (req, res) => {
	models.Qsnr.findById(mongoose.Types.ObjectId(req.params.id), (err, ans) => {
		if(err) res.send(err);
		else{
			res.send(ans);
		}
	})
})
// 更新问卷
router.post('/api/qsnr/updateQsnr/:id', (req, res) => {
	let token = req.headers['x-csrf-token'];
	jwt.verify(token, function(err, data){
		if(err) res.send(err);
		else {
			let upQuery = {
				qsnr: req.body.qsnr,
				state: req.body.state
			};
			models.Qsnr.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {$set: upQuery}, (err, ans) => {
				if(err) res.send(err);
				else res.send('success');
			})
		}
	})
})
// 删除问卷
router.get('/api/qsnr/deleteQsnr/:id', (req, res) => {
	let token = req.headers['x-csrf-token'];
	jwt.verify(token, function(err, data){
		if(err) res.send(err);
		else {
			models.Qsnr.remove({'_id': mongoose.Types.ObjectId(req.params.id)}, (err, ans) => {
				if(err) res.send(err);
				else res.send(ans);
			})
		}
	})
})
// 广场展示，所有用户已发布的问卷
router.get('/api/qsnr/square', (req, res) => {
	models.Qsnr.find({state: 'publish'}, (err, ans) => {
		if(err) res.send(err);
		else{
			res.send(ans);
		}
	})
})

module.exports = router;