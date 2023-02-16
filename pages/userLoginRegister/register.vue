<template>
	<div class="login minHeight100 content_app">
		<view class="loginContent">
			<view class="loginTop">
				<image class="loginImg" :src="logo" mode="aspectFill"></image>
			</view>
			<comp-input :password='false' :firstName="user_name" @myblur="handleUsername" placer="Name"></comp-input>

			<comp-input @myblurSelectval="myblurSelectval" :array="array" :selectedType="true" :firstName="user_phone"
				:selectval="selectval" :password='false' @myblur="handleUserPhone" placer="Telephone">
			</comp-input>
			<!-- 	
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage1"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage2"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage3"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage4"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage5"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage6"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage7"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage8"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage9"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage11"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage111"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage1111"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage11111"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage111111"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage1111111"></web-view></view>
<view class="web-view"><web-view ref="webview" :src="link" class="web-view" @onPostMessage="onPostMessage11111111"></web-view></view>
 -->
			<codeTime :areacode="selectvalNumber" @myblur="handleCode" :phone="phone" />
			<comp-input :password='false' :firstName="user_email" @myblur="handleUserEmail" placer="Email"></comp-input>
			<comp-input :password='false' :firstName="possword" @myblur="handlePassword" placer="Possword"></comp-input>
			<comp-input :password='true' :firstName="rePasswords" @myblur="handleRePassword" placer="Confirm Possword">
			</comp-input>
			<comp-input :password='false' :firstName="InviteCode" @myblur="handleInviteCode" placer="Invite Code">
			</comp-input>

			<view class="loginButtom">
				<button type="success" @click="handleOnLogins" :disabled="disabled" size="large"
					class="content_app11 textColor19 weight color0c50d6 paddingAll">Register</button>
			</view>
			<view class="loginAccount textColorff fontSize15" @click="nativeToPage">
				<text class="color94 mrr">Registered to log in </text>

			</view>

		</view>

	</div>

</template>

<script>
	import {
		firstName,
		firstName1
	} from "@/static/images/lxg/base64.js";
	import {
		register,
		getAreacode
	} from '@/api/index.js'
	import compInput from '@/components/compInput'
	import codeTime from '@/components/timeTag/codeTime'
	// import selects from '@/components/compInput/selects'
	export default {
		components: {
			compInput,
			codeTime,
		},
		data() {
			return {
				getCodeLists: [],
				array: [],
				selectvalNumber: "001",
				selectval: "",
				show: false,
				dataKeys: {
					userId: 'myUserId',
					msgId: 'myMsgId',
					name: 'myName',
					message: 'myMessageName',
					img: 'myImg',
					avator: 'myAvator'
				},
				firstName: firstName,
				firstName1: firstName1,
				username: "",
				password: "",
				rePassword: "",
				disabled: false,
				email: "",
				phone: "",
				code: "",
				logo: require('../../static/images/other/logo.png'),
				user_name: require('../../static/images/other/user_name.png'),
				user_phone: require('../../static/images/other/phone.png'),
				user_email: require('../../static/images/other/email.png'),
				possword: require('../../static/images/other/possword.png'),
				rePasswords: require('../../static/images/other/suoOpen.png'),
				InviteCode: require('../../static/images/other/inviteCode.png'),
				InviteCodes:""
			};
		},
		onShow() {
			this.getAreacodes()
		},
		methods: {
			
			// async getDetail() {
			// 			const res = await getApp().globalData.request.post('daren/info', {
			// 				id: this.itemid
			// 			});
			// 			if (res.code && res.code == 200) {
			// 				uni.report &&
			// 					uni.report('darenDetail', {
			// 						darenItemid: this.itemid,
			// 						title: res.data.title
			// 					});
			// 				uni.setNavigationBarTitle({
			// 					title: res.data.title
			// 				});
			// 				this.info = res.data;
			// 				var content = res.data.article;
			// 				const nodes = htmlParser(content);
			// 				this.content = nodes;
			// 			} else {
			
			// 				uni.showToast({
			// 					title: res.msg || '内容获取失败',
			// 					icon:"none",
			// 					success: e => {
			// 						setTimeout(t => {
			// 							uni.navigateBack();
			// 						}, 1500);
									
			// 					}
			// 				});
			// 			}
			// 		}
			getAreacodes() {
				var res = this.$request.get({
						url: getAreacode,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							let getCodeList = res.list;
							getCodeList.forEach((item) => {
								this.array.push(item.title)

							})
							this.selectvalNumber = getCodeList[0].value
							this.selectval = this.array[0]
							this.getCodeLists = getCodeList;
							uni.setStorageSync('codeList', res.list)

						},
						res => {
							console.log('failure');
						}
					);
			},
			handleCode(messarr) {
				this.code = messarr[0]


			},
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			myblurSelectval(messarr) {
				this.selectval = this.array[messarr]
				this.selectvalNumber = this.getCodeLists[messarr].value

			},
			handlePassword(messarr) {
				this.password = messarr[0]
			},
			handleInviteCode(messarr) {
				this.InviteCodes = messarr[0]
			},
			handleRePassword(messarr) {
				this.rePassword = messarr[0]
			},
			handleUserPhone(messarr) {
				this.phone = messarr[0]
			},
			handleUserEmail(messarr) {
				this.email = messarr[0]
			},

			handleUsername(messarr) {
				this.username = messarr[0]
			},

			showButtom() {
				if (this.account != "" && this.md5Pwd != "") {
					this.disabled = false
				} else {
					this.disabled = true
				}
			},
			nativeToPage() {
				uni.navigateTo({
					url: "/pages/userLoginRegister/login"
				})
			},
			handleOnLogins() {
				if (this.password != this.rePassword) {
					uni.showToast({
						icon: "none",
						title: "Check password"
					})
					return
				}
				if (this.username == "") {
					uni.showToast({
						icon: "none",
						title: "Username can not be empty"
					})
					return
				}
				if (this.phone == "") {
					uni.showToast({
						icon: "none",
						title: "Enter phone number"
					})
					return
				}
				if (this.code == "") {
					uni.showToast({
						icon: "none",
						title: "please enter verification code"
					})
					return
				}
				if (this.selectvalNumber == "") {
					uni.showToast({
						icon: "none",
						title: "please enter verification code"
					})
					return
				}
				 

				var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				var ok = emailRegExp.test(this.email);

				if (ok) {

				} else {
					// 输入的格式不符合要求
					uni.showToast({
						icon: "none",
						title: "Error email"
					})
					return
				}

				let params = {
					username: this.username,
					password: this.password,
					rePassword: this.rePassword,
					email: this.email,
					phone: this.phone,
					code: this.code,
					areacode: this.selectvalNumber,
					invite_code:this.InviteCodes
				}

				this.$request
					.post({
						url: register,
						data: params
					})
					.then(
						res => {

							uni.navigateTo({
								url: "/pages/userLoginRegister/login"
							})

						},
						res => {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					);


			}
		},
	};
</script>

<style scope>
	/* .banner {
		height: 260rpx;
		position: relative;
		background-color: #f5f5f5;
		flex-direction: row;
		overflow: hidden;
	}
	
	.banner-img {
		flex: 1;
	}
	
	.title-area {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		z-index: 11;
	}
	
	.title-text {
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		lines: 2;
		color: #ffffff;
		overflow: hidden;
	}
	
	.article-meta {
		padding: 20rpx 30rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	
	.article-meta-text {
		color: gray;
	}
	
	.article-text {
		font-size: 26rpx;
		line-height: 50rpx;
		margin: 0 20rpx;
	}
	
	.article-author {
		font-size: 30rpx;
	}
	
	.article-time {
		font-size: 30rpx;
	}
	
	.article-content {
		font-size: 30rpx;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		overflow: hidden;
	}
	.banner {
		height: 260rpx;
		position: relative;
		background-color: #f5f5f5;
		flex-direction: row;
		overflow: hidden;
	}
	
	.banner-img {
		flex: 1;
	}
	
	.title-area {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		z-index: 11;
	}
	
	.title-text {
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		lines: 2;
		color: #ffffff;
		overflow: hidden;
	}
	
	.article-meta {
		padding: 20rpx 30rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	
	.article-meta-text {
		color: gray;
	}
	
	.article-text {
		font-size: 26rpx;
		line-height: 50rpx;
		margin: 0 20rpx;
	}
	
	.article-author {
		font-size: 30rpx;
	}
	
	.article-time {
		font-size: 30rpx;
	}
	
	.article-content {
		font-size: 30rpx;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		overflow: hidden;
	} */
	.loginContent {
		padding: 20px
	}

	.loginTop {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 60upx;
	}


	.loginButtom {
		margin-top: 80upx
	}

	.loginButtom button {
		border-radius: 100upx;
	}

	.loginImg {
		width: 220upx;
		height: 200upx;
		border-radius: 100upx;
	}

	.loginContent0 {
		font-size: 38upx;
		color: #423831;
		font-weight: 700;
		margin-bottom: 20upx
	}

	.loginContent1 {
		font-size: 30upx;
		color: #a2a2a2;
	}

	::v-deep .u-button--disabled {
		opacity: 1 !important;
	}

	.loginAccount {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
/deep/	.uni-form-item.uni-column{
		    background: #c2c0c0;
	}
</style>
