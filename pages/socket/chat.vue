<template>
	<!-- 聊天界面展示https://www.bilibili.com/video/BV1hT4y1P75N?p=22  搭建1和2 -->
	<view class="content">

		<!-- 聊天内容 -->
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-ls" v-for="(item,index) in unshiftmsg" :key="index" :id="'msg'+ index">
					<!-- <view class="chat-time" v-if="item.createTime != ''">{{changeTime(item.createTime)}}</view> -->
					<view class="msg-m msg-left" v-if="item.sendName ==  friendName">
						<image class="user-img" src="https://stock-plouto.com/login/assets/img/ploutos.png"></image>
						<view class="message" v-if="item.content.TextType == 0">
							<!-- 文字 -->
							<view class="msg-text">{{item.content.content}}</view>
						</view>
						<view class="message" v-if="item.content.TextType == 1" @tap="previewImg(item.content.content)">
							<!-- 图像 -->
							<image :src="item.content.content" class="msg-img" mode="widthFix"></image>

						</view>
						<view class="message" v-if="item.TextType == 2" @tap="playVoice(item.sendText.voice)">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.sendText.time*4+'rpx'}">
								<image src="https://stock-plouto.com/login/assets/img/ploutos.png" class="voice-img">
								</image>
								{{item.sendText.time}}″
							</view>
						</view>
						<view class="message" v-if="item.TextType == 3" @tap="openLocation(item.sendText)">
							<!-- 位置 -->
							<view class="msg-map">
								<view class="map-name">{{item.sendText.name}}</view>
								<view class="map-address">{{item.sendText.address}}</view>
								<!-- 如果map不起作用，就可以直接用一张图片去替代 -->
								<map class="map" :longitude="item.sendText.longitude" :latitude="item.sendText.latitude"
									:markers="covers(item.sendText)"></map>
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.sendName != friendName &&item.content.content">
						<image class="user-img"
							src="https://img1.baidu.com/it/u=2645944223,563452453&fm=253&fmt=auto&app=120&f=JPEG?w=830&h=800">
						</image>
						<view class="message" v-if="item.content.TextType == 0">
							<view class="msg-text">{{item.content.content}}</view>
						</view>
						<view class="message" v-if="item.content.TextType == 1" @tap="previewImg(item.content.content)">
							<image :src="item.content.content" class="msg-img" mode="widthFix"></image>
						</view>
						<view class="message" v-if="item.TextType == 2" @tap="playVoice(item.sendText.voice)">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.sendText.time*4+'rpx'}">
								{{item.sendText.time}}″
								<image src="https://stock-plouto.com/login/assets/img/ploutos.png" class="voice-img">
								</image>
							</view>
						</view>
						<view class="message" v-if="item.TextType == 3" @tap="openLocation(item.sendText)">
							<!-- 位置 -->
							<view class="msg-map">
								<view class="map-name">{{item.sendText.name}}</view>
								<view class="map-address">{{item.sendText.address}}</view>
								<map class="map" :longitude="item.sendText.longitude" :latitude="item.sendText.latitude"
									:markers="covers(item.sendText)"></map>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	import dateTime from './dateTime.js';
	import submit from './submit.vue';
	import {
		mapGetters
	} from "vuex";
	import {
		userWechat
	} from '@/api/index.js'
	//音频播放
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				friendName: "xpq", //friendName等于在左边 不等于在右边 
				msg: [],
				// 反转数据接收
				unshiftmsg: [],
				imgMsg: [],
				listMessageDataForEach: [],
				loadMoreDataList: [],
				scrollToView: '',
				oldTime: new Date(),
				inputh: '60',
				timeout: 100000, // 1s
				timeoutObj: null,
				WebSocketUrl: "",
				openSocket: true,
				// WebSocketUrl : "wss://websocket.stock-plouto.com/ws?uid=" 

			}
		},
		onLoad() {
			// console.log("this.userInfo.username", this.userInfo)

			if (this.userInfo) {
				this.WebSocketUrl =
					`wss://websocket.stock-plouto.com/ws?uid=${this.userInfo.ID}&username=${this.userInfo.username}`;

				this.getUserWechat(0);
				this.initScokets()
			} else {
				uni.navigateTo({
					url: "/pages/userLoginRegister/login"
				})
			}
			this.$nextTick(function() {
				this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
			})
		},
		onShow() {


			// 数组倒叙 主要是应对后端传过来的数据
			// for (var i = 0; i < this.msg.length; i++) {
			// 	//时间间隔处理
			// 	if (i < this.msg.length - 1) { //这里表示头部时间还是显示一下
			// 		let t = dateTime.spaceTime(this.oldTime, this.msg[i].createTime);
			// 		if (t) {
			// 			this.oldTime = t;
			// 		}
			// 		this.msg[i].createTime = t;
			// 	}
			// 	// 获取图片，为下面的预览做准备
			// 	if (this.msg[i].TextType == 1) {
			// 		this.imgMsg.unshift(this.msg[i].sendText)
			// 	}
			// 	this.unshiftmsg.unshift(this.msg[i]);
			// }
			// 跳转到最后一条数据 与前面的:id进行对照

		},
		components: {
			submit

		},
		onPullDownRefresh() {
			let _this = this
			setTimeout(function() {
				uni.stopPullDownRefresh();
				let lastid = Math.min.apply(Math, _this.loadMoreDataList.map(item => {
					return item.ID
				}))
				_this.getUserWechat(lastid);

			}, 1000);
		},
		methods: {
			async getUserWechat(lastid) {
				let system = uni.getSystemInfoSync();
				var res = await this.$request.post({
						url: `${userWechat}?lastid=${lastid}`,
						loadingTip: 'stock...'
					}, )
					.then(
						msg => {
							if (msg.list.length > 0) {
								let listMessageData = msg.list.reverse();
								listMessageData.forEach((item, i) => {
									if (JSON.parse(JSON.parse(item.content).content) != undefined) {
										item.content = JSON.parse(JSON.parse(item.content).content);
										item.TextType = 0
										if (item.content.TextType == 1) {
											this.imgMsg.unshift(item.content.content)
										}
										if (item.is_admin == 1) {
											item.sendName = 'xpq'

										} else {
											item.sendName = 'left'
										}
									}

								});
								this.loadMoreDataList.unshift(...listMessageData);
								this.unshiftmsg = this.loadMoreDataList;

								console.log("===历史记录==>", this.loadMoreDataList)
							}

						},
						res => {}
					);
			},
			changeTime(date) {
				return dateTime.dateTime1(date);
			},
			// 进行图片的预览
			previewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				console.log("index", index)
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//音频播放
			playVoice(e) {
				innerAudioContext.src = e;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
			},
			//地图定位
			covers(e) {
				let map = [{
					latitude: e.latitude,
					longitude: e.longitude,
					iconPath: "https://stock-plouto.com/login/assets/img/ploutos.png"
				}]
				return (map);
			},
			//跳转地图信息
			openLocation(e) {
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function() {
						console.log('success');
					}
				});
			},
			//接受输入内容
			inputs(e) {
				console.log("=接受输入内容=======>", e)

				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
				if (e.type == 0) {
					let datas = {
						ID: 108,
						TextType: 0,
						content: {
							content: e.message,
							TextType: 0,
						},
						is_admin: 0,
						is_read: 1,
						time: 1658302732,
						wid: 10,
						friendName: "xpq",
					}

					this.startSend(JSON.stringify({
						content: e.message,
						TextType: 0
					}))

					this.unshiftmsg.push(datas);
					console.log("=debugger=======>", e)
				} else if (e.type == 1) {
					let datas = {
						ID: 108,
						TextType: 1,
						content: {
							content: e.message,
							TextType: 1,
						},
						is_admin: 0,
						is_read: 1,
						time: 1658302732,
						wid: 10,
						friendName: "xpq",
					}
					this.startSend(JSON.stringify({
						content: e.message,
						TextType: 1
					}))
					this.unshiftmsg.push(datas);
				}
				// debugger
				// console.log("=debugger=======>", e)
			},
			//输入框高度
			heights(e) {
				console.log("高度:", e)
				this.inputh = e;
				this.goBottom();
			},
			// 滚动到底部
			goBottom() {
				this.scrollToView = '';
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
			},
			// initScokets  start

			//具体流程
			// 判断是否已连接
			initScokets() {
				let that = this;
				uni.connectSocket({
					url: that.WebSocketUrl, 
					protocols: [that.userInfo.token], 
                    success(res) {
						console.log("判断是否已连接----》", res)
						that.open(); //1、判断是否打开连接
						that.scoketMessage(); //2、判断websocket服务器是否返回信息
						// that.TimeOut(); //3、websocket超时操作
					},
					fail(err) {
						console.log("WebSocket连接失败 connectSocket=", err);
						that.error();
					},
				});
			},
			//连接成功
			open() {
				let that = this;
				uni.onSocketOpen(

					(res) => {
						console.log("WebSocket连接成功了-------->");
						// that.reset();  //连接成功之后做两秒的一次连接(心跳机制)
					});
			},
			//服务器返回信息
			scoketMessage() {
				let that = this;
				console.log("消息发送成功后服务端响应了");
				uni.onSocketMessage((res) => {
					console.log("-服务器返回信息--99999》", res);
					let SocketMessage = JSON.parse(res.data)
					//获取服务器返回内容，并获取当前时间戳以作服务器超时判断 

					console.log("-服务器返回信息SocketMessage.isadmin--99999》", SocketMessage.isadmin);
					let datas = {}
					// || JSON.parse(res.data).content.includes("新socket连接")
					// debugger
					if (!SocketMessage.content.includes("新socket连接") && SocketMessage.isadmin == 1) {
						datas = {
							TextType: 0,
							content: {
								content: JSON.parse(SocketMessage.content).content
							},
							is_admin: SocketMessage.is_admin,
							is_read: SocketMessage.is_read,
							sendName: "xpq",
							time: SocketMessage.time,
							wid: 10
						}
						that.unshiftmsg.push(datas)
					}
					console.log("-push服务器返回信息---》", datas);

					// that.goBottom()
					// that.serveTime = new Date().getTime();        //以下可以写服务器返回之后具体操作

				});
			},
			//超时响应
			TimeOut() {
				let that = this;
				setInterval(function() {
					let times = new Date().getTime();
					if (times - that.serveTime > 2000) {
						//以下做超时后的操作
					}
				}, 500);
			},
			// 连接失败
			error() {
				let that = this;

				uni.onSocketError(function(res) {
					console.log("WebSocket连接打开失败，请检查！");
					that.openSocket = false
					that.initScokets(); //连接失败之后，重新向服务器发起连接
				});
			},
			// 心跳响应
			reset() {
				let that = this;
				clearInterval(that.timeoutObj);
				that.timeoutObj = setInterval(function() {
					//做一个判断：在没有获取某个值或者其他需求下，做个无响应的websocket连接。否则就做一个有响应的连接
					if (that.openSocket == false) {
						that.startSend()
					} else {
						uni.sendSocketMessage({
							data: "", //data值根据实际需求赋值
							// header:{
							// 	token: that.userInfo.token
							// }, 
							success: (res) => {
								console.log("正在发送....");
							},
							fail: (err) => {
								console.log("发送失败,重新连接....");
								that.initScokets();
							},
						});
					}

					//（这里做的是其他状态的判断）if (  ) {  that.startSend()  }

				}, 1000);
			},
			//发送信息
			startSend(datas) {
				let that = this;

				let data = JSON.parse(datas);
				 
			 
				// data.token = that.userInfo.token;
					// console.log("发送信息发送信息发送信息发送信息",   data);
				uni.sendSocketMessage({
					data: JSON.stringify(data), //data值根据实际需求赋值
					success: (res) => {
						// console.log("发送的数据89", data);
						console.log("WebSocket发送消息成功....", res);
					},
					fail: (err) => {
						console.log("发送失败，重新连接....");
					},
				});
			},

			// initScokets   end
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background-color: rgba(244, 244, 244, 1);
	}

	.chat {
		height: 100%;

		.chat-main {
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 20rpx;
			// padding-bottom: 120rpx;  //获取动态高度
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 10rpx 0rpx;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}

				.message {
					flex: none;
					max-width: 480rpx;
					margin: 0px 10rpx;
				}

				.msg-text {
					font-size: 32rpx;
					color: rgba(39, 40, 50, 1);
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: 20rpx;
				}

				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;

					.map-name {
						font-size: 32rpx;
						color: rgba(39, 40, 50, 1);
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						//下面四行是单行文字的样式
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-address {
						font-size: 24rpx;
						color: rgba(39, 40, 50, 0.4);
						padding: 0 24rpx;
						//下面四行是单行文字的样式
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map {
						padding-top: 8rpx;
						width: 464rpx;
						height: 190rpx;
					}
				}

				.voice {
					// width: 200rpx;
					min-width: 100rpx;
					max-width: 400rpx;
				}

				.voice-img {
					width: 28rpx;
					height: 36rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.ms-img {
					margin-left: 16rpx;
				}

				.msh-map {
					margin-left: 16rpx;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.voice {
					text-align: right;

				}

				.voice-img {
					float: left;
					transform: rotate(180deg);
					width: 28rpx;
					height: 36rpx;
					padding-bottom: 4rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: rgba(255, 228, 49, 0.8);
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.ms-img {
					margin-right: 16rpx;
				}

				.msh-map {
					margin-left: 16rpx;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.voice {
					text-align: left;

				}

				.voice-img {
					float: right;
					padding: 4rpx;
					width: 28rpx;
					height: 36rpx;
				}
			}
		}
	}
</style>
