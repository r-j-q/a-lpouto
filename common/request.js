import {
 	baseUrl
 } from "./config.js"
 class Request {

 	config = {
 		baseUrl: baseUrl,
 		business: 'data',
 	}

 	static posUrl(url) {
 		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
 	}

 	// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }
	// static getUrl(config) {
	// 	let url = config.url || ''
	// 	let abs = Request.posUrl(url);
	// 	if (!abs) {
	// 		let f = config.slashAbsoluteUrl
	// 		if (f) {
	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
	// 		}
	// 	}
	// 	return abs ? url : (config.baseUrl + url)
	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }// static getUrl(config) {
 	// 	let url = config.url || ''
 	// 	let abs = Request.posUrl(url);
 	// 	if (!abs) {
 	// 		let f = config.slashAbsoluteUrl
 	// 		if (f) {
 	// 			abs = /^\/([\w.]+\/?)\S*/.test(url)
 	// 		}
 	// 	}
 	// 	return abs ? url : (config.baseUrl + url)
 	// }
 	static getUrl(config) {
 		let url = config.url || ''
 		let abs = Request.posUrl(url);
 		if (!abs) {
 			let f = config.slashAbsoluteUrl
 			if (f) {
 				abs = /^\/([\w.]+\/?)\S*/.test(url)
 			}
 		}
 		return abs ? url : (config.baseUrl + url)
 	}

 	// static getContentType(config) {
 	// 	var type = config.contentType || 'json'
 	// 	var charset = config.encoding || 'UTF-8'
 	// 	if (type === 'json') {
 	// 		return 'application/json;charset=' + charset
 	// 	} else if (type === 'form') {
 	// 		return 'application/x-www-form-urlencoded;charset=' + charset
 	// 	} else if (type === 'file') {
 	// 		return 'multipart/form-data;charset=' + charset
 	// 	} else if (type === 'text') {
 	// 		return 'text/plain;charset=' + charset
 	// 	} else if (type === 'html') {
 	// 		return 'text/html;charset=' + charset
 	// 	} else {
 	// 		throw new Error('unsupported content type : ' + type)
 	// 	}
 	// }
 	static getContentType(config) {
 		var type = config.contentType || 'json'
 		var charset = config.encoding || 'UTF-8'
 		if (type === 'json') {
 			return 'application/json;charset=' + charset
 		} else if (type === 'form') {
 			return 'application/x-www-form-urlencoded;charset=' + charset
 		} else if (type === 'file') {
 			return 'multipart/form-data;charset=' + charset
 		} else if (type === 'text') {
 			return 'text/plain;charset=' + charset
 		} else if (type === 'html') {
 			return 'text/html;charset=' + charset
 		} else {
 			throw new Error('unsupported content type : ' + type)
 		}
 	}
 	// interceptor = {

 	// 	request: undefined,
 	// 	response: undefined,
 	// 	fail: undefined,
 	// 	complete: undefined // since 1.2.0
 	// }

 	// setConfig(config) {
 	// 	this.config = Object.assign(this.config, config)
 	// }
 	interceptor = {

 		request: undefined,
 		response: undefined,
 		fail: undefined,
 		complete: undefined // since 1.2.0
 	}

 	setConfig(config) {
 		this.config = Object.assign(this.config, config)
 	}
 	// request(options = {}) {
 	// 	var that = this;
 	// 	if (options.data === undefined) {
 	// 		options.data = {}
 	// 	}
 	// 	if (options.header === undefined) {
 	// 		options.header = {}
 	// 	}

 	// 	let _options = Object.assign({}, this.config, options)
 	// 	_options = Object.assign(options, _options)

 	// 	_options.url = Request.getUrl(_options)
 	// 	if (!_options.header['Content-Type']) {
 	// 		_options.header['Content-Type'] = Request.getContentType(_options)
 	// 	}
 	// 	let _config = _options
 	// 	if (that.interceptor.request && typeof that.interceptor.request === 'function') {
 	// 		_config = that.interceptor.request(_options)
 	// 	}
 	// 	let task = undefined
 	// 	let promise = new Promise((resolve, reject) => {

 	// 		let extras = {}

 	// 		that._prepare(that, _config, extras)

 	// 		if (_config.contentType === 'file') {
 	// 			task = uni.uploadFile({
 	// 				..._config,
 	// 				success: res => {
 	// 					that._success(that, _config, res, resolve, reject)
 	// 				},
 	// 				fail: res => {
 	// 					that._fail(that, _config, res, resolve, reject)
 	// 				},
 	// 				complete: (res) => {
 	// 					that._complete(that, _config, res, extras)
 	// 				}
 	// 			})
 	// 			if (_config.progress && typeof _config.progress === 'function') {
 	// 				task.onProgressUpdate(_res => {
 	// 					_config.progress(_res, task)
 	// 				})
 	// 			}
 	// 		} else {
 	// 			task = uni.request({
 	// 				..._config,
 	// 				success: res => {
 	// 					that._success(that, _config, res, resolve, reject)
 	// 				},
 	// 				fail: res => {
 	// 					that._fail(that, _config, res, resolve, reject)
 	// 				},
 	// 				complete: (res) => {
 	// 					that._complete(that, _config, res, extras)
 	// 				}
 	// 			})
 	// 		}
 	// 	})
 	// 	if (_config.success || _config.fail || _config.complete) {
 	// 		return task;
 	// 	}
 	// 	return promise;
 	// }
 	request(options = {}) {
 		var that = this;
 		if (options.data === undefined) {
 			options.data = {}
 		}
 		if (options.header === undefined) {
 			options.header = {}
 		}

 		let _options = Object.assign({}, this.config, options)
 		_options = Object.assign(options, _options)

 		_options.url = Request.getUrl(_options)
 		if (!_options.header['Content-Type']) {
 			_options.header['Content-Type'] = Request.getContentType(_options)
 		}
 		let _config = _options
 		if (that.interceptor.request && typeof that.interceptor.request === 'function') {
 			_config = that.interceptor.request(_options)
 		}
 		let task = undefined
 		let promise = new Promise((resolve, reject) => {

 			let extras = {}

 			that._prepare(that, _config, extras)

 			if (_config.contentType === 'file') {
 				task = uni.uploadFile({
 					..._config,
 					success: res => {
 						that._success(that, _config, res, resolve, reject)
 					},
 					fail: res => {
 						that._fail(that, _config, res, resolve, reject)
 					},
 					complete: (res) => {
 						that._complete(that, _config, res, extras)
 					}
 				})
 				if (_config.progress && typeof _config.progress === 'function') {
 					task.onProgressUpdate(_res => {
 						_config.progress(_res, task)
 					})
 				}
 			} else {
 				task = uni.request({
 					..._config,
 					success: res => {
 						that._success(that, _config, res, resolve, reject)
 					},
 					fail: res => {
 						that._fail(that, _config, res, resolve, reject)
 					},
 					complete: (res) => {
 						that._complete(that, _config, res, extras)
 					}
 				})
 			}
 		})
 		if (_config.success || _config.fail || _config.complete) {
 			return task;
 		}
 		return promise;
 	}
 	// get(options = {}) {
 	// 	options.method = 'GET'
 	// 	return this.request(options)
 	// }

 	// post(options = {}) {
 	// 	options.method = 'POST'
 	// 	return this.request(options)
 	// }
// <view class="">
// 		<block v-if="showLoading"><view class="loading-box"></view></block>

// 		<block v-else>
// 			<view class="daren-banner-box" v-if="banner.length > 0">
// 				<view class="talentsub-background"></view>
// 				<view class="margin-tb-sm">
// 					<swiper :indicator-dots="false" :autoplay="true" interval="5000" duration="200" class="daren-banner-swiper">
// 						<swiper-item v-for="(item, index) in banner" :key="index" @tap="toDaren(item.id)">
// 							<image :src="item.article_banner" class="daren-slide-image" mode="widthFix" />
// 							<view class="talentsub-text">{{ item.shorttitle }}</view>
// 							<view class="talentsub-div">
// 								<view class="talentsub-num">
// 									<view class="number">{{ item.goods_total }}</view>
// 									<view class="danpin">单品</view>
// 								</view>
// 								<image :src="item.head_img" mode=""></image>
// 							</view>
// 						</swiper-item>
// 					</swiper>
// 				</view>
// 			</view>
 
// 			<view class="week-new" v-if="week.length > 0">
// 				<view class="week-title">本周新作</view>
// 				<view class="week-container">
// 					<scroll-view class="swiper-wrapper" :scroll-x="true" :scroll-with-animation="true">
// 						<view class="new-article" v-for="(item, index) in week" :key="index" @tap="toDaren(item.id)">
// 							<image :src="item.article_banner" class="article-img" mode="widthFix"></image>
// 							<view class="article-title">
// 								<text>{{ item.title }}</text>
// 							</view>
// 							<view class="article-info">
// 								<image :src="item.head_img" class="info-img"></image>
// 								<text class="info-name">{{ item.daren_name }}</text>
// 							</view>
// 						</view>
// 					</scroll-view>
// 				</view>
// 			</view>
 
// 			<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '', '']" style="bottom: 56px;"><text class="iconfont icon-shangla"></text></view>
 
// 			<view class="wandering" v-if="wandering.length > 0">
// 				<view class="wandering-title">大家都在逛</view>
// 				<view class="wandering-content">
// 					<view class="wandering-div" v-for="(item, index) in wandering" :key="index" @tap="toDaren(item.id)">
// 						<view class="wandering-top">
// 							<image :src="item.article_banner" mode="widthFix" class="wandering-image"></image>
// 							<view class="wandering-label">
// 								<text class="label-num" v-if="item.label && item.label.length > 0">{{ item.label[0] }}</text>
								 
// 							</view>
// 						</view>
// 						<view class="wandering-desc">
// 							<view class="wandering-div-title">
// 								<text class="">{{ item.title }}</text>
// 							</view>
// 							<view class="wandering-div-subtitle">
// 								<text class="">{{ item.article_desc }}</text>
// 							</view>
// 						</view>
// 					</view>
// 				</view>
// 			</view>
// 		</block>
// 	</view>
 	// put(options = {}) {
 	// 	options.method = 'PUT'
 	// 	return this.request(options)
 	// } 
 	// delete(options = {}) {
 	// 	options.method = 'DELETE'
 	// 	return this.request(options)
 	// }

 	// upload(options = {}) {
 	// 	options.method = 'POST'
 	// 	options.contentType = 'file'
 	// 	return this.request(options)
 	// }
 	get(options = {}) {
 		options.method = 'GET'
 		return this.request(options)
 	}

 	// post(options = {}) {
 	// 	options.method = 'POST'
 	// 	return this.request(options)
 	// }

 	// put(options = {}) {
 	// 	options.method = 'PUT'
 	// 	return this.request(options)
 	// }
 	post(options = {}) {
 		options.method = 'POST'
 		return this.request(options)
 	}

 	put(options = {}) {
 		options.method = 'PUT'
 		return this.request(options)
 	}
 	// delete(options = {}) {
 	// 	options.method = 'DELETE'
 	// 	return this.request(options)
 	// }

 	// upload(options = {}) {
 	// 	options.method = 'POST'
 	// 	options.contentType = 'file'
 	// 	return this.request(options)
 	// }
 	delete(options = {}) {
 		options.method = 'DELETE'
 		return this.request(options)
 	}

 	upload(options = {}) {
 		options.method = 'POST'
 		options.contentType = 'file'
 		return this.request(options)
 	}

 	// _success = function(that, _config, res, resolve, reject) {

 	// 	if (res.data.code == 0  ) {  
 	// 		var result = res.data  
 	// 		var parseFileJson = _config.contentType === 'file' && typeof result === 'string' && (_config
 	// 			.dataType ===
 	// 			undefined || _config.dataType === 'json')
 	// 		if (parseFileJson) {
 	// 			result =  res.data ;
 	// 		}
 	// 		var skip = _config.skipInterceptorResponse
 	// 		if (that.interceptor.response && typeof that.interceptor.response === 'function' && !skip) {
 	// 			result = that.interceptor.response(result, _config)
 	// 			if (_config.businessSuccess  ) {  
 	// 				var _data = _config.business ? result[_config.business] : result;

 	// 				_config.success ? _config.success(_data) : resolve(_data)
 	// 				return;
 	// 			}
 	// 		} else {


 	// 			_config.success ? _config.success(result) : resolve(result)
 	// 			return;
 	// 		}
 	// 	}
 	// 	that._fail(that, _config, res, resolve, reject)
 	// }
 	_success = function(that, _config, res, resolve, reject) {

 		if (res.data.code == 0) {
 			var result = res.data
 			var parseFileJson = _config.contentType === 'file' && typeof result === 'string' && (_config
 				.dataType ===
 				undefined || _config.dataType === 'json')
 			if (parseFileJson) {
 				result = res.data;
 			}
 			var skip = _config.skipInterceptorResponse
 			if (that.interceptor.response && typeof that.interceptor.response === 'function' && !skip) {
 				result = that.interceptor.response(result, _config)
 				if (_config.businessSuccess) {
 					var _data = _config.business ? result[_config.business] : result;

 					_config.success ? _config.success(_data) : resolve(_data)
 					return;
 				}
 			} else {


 				_config.success ? _config.success(result) : resolve(result)
 				return;
 			}
 		}
 		that._fail(that, _config, res, resolve, reject)
 	}
 	// _fail = function(that, _config, res, resolve, reject) {

 	// 	if (res.errMsg === 'request:fail abort') {
 	// 		return
 	// 	}
 	// 	var result = res
 	// 	if (that.interceptor.fail && typeof that.interceptor.fail === 'function') {
 	// 		result = that.interceptor.fail(res, _config)
 	// 	}
 	// 	_config.fail ? _config.fail(result) : reject(result)
 	// }

 	// _prepare = function(that, _config, obj = {}) {
 	// 	if (that.interceptor.prepare && typeof that.interceptor.prepare === 'function') {
 	// 		that.interceptor.prepare(_config, obj)
 	// 		return
 	// 	}
 	// 	obj.startTime = Date.now()
 	// 	if (_config.loadingTip) {
 	// 		uni.showLoading({
 	// 			title: _config.loadingTip
 	// 		})
 	// 	}
 	// 	if (_config.contentType === 'file') {
 	// 		if (_config.formData === undefined || _config.formData === null) {
 	// 			_config.formData = _config.data
 	// 			delete _config.data
 	// 		}
 	// 		delete _config.header['Content-Type']
 	// 		delete _config.header['Referer']
 	// 		_config.method = 'POST'
 	// 	}

 	// }
 	_fail = function(that, _config, res, resolve, reject) {

 		if (res.errMsg === 'request:fail abort') {
 			return
 		}
 		var result = res
 		if (that.interceptor.fail && typeof that.interceptor.fail === 'function') {
 			result = that.interceptor.fail(res, _config)
 		}
 		_config.fail ? _config.fail(result) : reject(result)
 	}

 	_prepare = function(that, _config, obj = {}) {
 		if (that.interceptor.prepare && typeof that.interceptor.prepare === 'function') {
 			that.interceptor.prepare(_config, obj)
 			return
 		}
 		obj.startTime = Date.now()
 		if (_config.loadingTip) {
 			uni.showLoading({
 				title:"loading"
 				// title: _config.loadingTip
 			})
 		}
 		if (_config.contentType === 'file') {
 			if (_config.formData === undefined || _config.formData === null) {
 				_config.formData = _config.data
 				delete _config.data
 			}
 			delete _config.header['Content-Type']
 			delete _config.header['Referer']
 			_config.method = 'POST'
 		}

 	}

 	// _complete = function(that, _config, res, obj = {}) {
 	// 	if (that.interceptor.complete && typeof that.interceptor.complete === 'function') {
 	// 		that.interceptor.complete(_config, obj, res)
 	// 		return
 	// 	}
 	// 	obj.endTime = Date.now()

 	// 	if (_config.loadingTip) {
 	// 		let diff = obj.endTime - obj.startTime;
 	// 		let duration = _config.loadingDuration || 500
 	// 		if (diff < duration) {
 	// 			diff = duration - diff
 	// 		} else {
 	// 			diff = 0
 	// 		}

 	// 		setTimeout(function() {
 	// 			uni.hideLoading()
 	// 		}, diff)
 	// 	}
 	// 	if (_config.complete) {
 	// 		_config.complete(res)
 	// 	}
 	// }
 	_complete = function(that, _config, res, obj = {}) {
 		if (that.interceptor.complete && typeof that.interceptor.complete === 'function') {
 			that.interceptor.complete(_config, obj, res)
 			return
 		}
 		obj.endTime = Date.now()

 		if (_config.loadingTip) {
 			let diff = obj.endTime - obj.startTime;
 			let duration = _config.loadingDuration || 500
 			if (diff < duration) {
 				diff = duration - diff
 			} else {
 				diff = 0
 			}

 			setTimeout(function() {
 				uni.hideLoading()
 			}, diff)
 		}
 		if (_config.complete) {
 			_config.complete(res)
 		}
 	}
 }
 var request = new Request()

 request.setConfig({
 	baseUrl: baseUrl,
 	debug: true
 })
 export default request
 
 // methods: {
 // 		topScrollTap() {
 // 			uni.pageScrollTo({
 // 				scrollTop: 0,
 // 				duration: 0
 // 			});
 // 		},
 // 		loadonLoad() {
 // 			this.$Request.post("daren/daren").then(res => {
 // 				if (res.code == 200) {
 // 					this.banner = res.data.top || [];
 // 					this.week = res.data.week || [];
 // 					this.wandering = res.data.wandering || [];
 // 					setTimeout(r => {
 // 						this.showLoading = false;
 // 					}, 200);
 // 				} else {
 // 				}
 // 			});
 // 		},
 // 		loadDarenList() {
 // 			this.$Request.post("daren/darenlist", { page: this.page }).then(res => {
 // 				if (res.code == 200) {
 // 					res.data.forEach(item => {
 // 						this.wandering.push(item);
 // 					});
 // 				}
 // 			});
 // 		},
 // 		toDaren(darenid) {
 // 			uni.navigateTo({
 // 				url: './daren?id=' + darenid
 // 			});
 // 		}
 // 	}
