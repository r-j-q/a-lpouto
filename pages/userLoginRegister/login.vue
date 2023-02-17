<template>
	<div class="login minHeight100 content_app"> 
		<view class="loginContent">
			<view class="loginTop">
				<image class="loginImg" :src="logo" mode=""></image>
			</view>
			<comp-input :password='false' :firstName="user_name" @myblur="onhandleUsername" placer="Name/Email/Telephone">
			</comp-input>
			<comp-input :password='true' :firstName="possword" @myblur="onhandleRePassword" placer="Password"></comp-input>
	<!-- <view class="dapei">
		<scroll-view class="category-scroll" ref="tabbar1" scroll-direction="horizontal" :show-scrollbar="false" :scroll-x="true">
			<view class="category-tab-item" :ref="'navItem' + index" v-for="(item, index) in tabItems" :key="index" :id="item.id" @click="ontabtap(index)">
				<text class="category-tab-item-title" :class="currentTab == index ? 'category-tab-item-title-active' : ''">{{ item.title }}</text>
			</view>
		</scroll-view>

		<swiper
			class="tab-box"
			ref="swiper1"
			:current="currentTab"
			:duration="300"
			@transition="onswiperscroll"
			@animationfinish="animationfinish"
			@onAnimationEnd="animationfinish"
		>
			<swiper-item class="swiper-item" v-for="(page, index) in tabItems" :key="index">
				<dapei-page class="page-item" @onLastTime="onLastTime" :nid="page.cid" ref="dapeiPage"></dapei-page>
			</swiper-item>
		</swiper>
	</view> -->
			<view class="loginButtom textColorFFF"  @click="handleOnLogin">
				<button   :disabled="disabled" size="large"
					class="content_app11 textColor19 weight color0c50d6 textColorFFF paddingAll">Login</button>
			</view>
			<view class="loginAccount textColorff fontSize15">
				<text class="textColor9e mrr">Don't have an account </text>
				<text class="color94" @click="registerTo">Register account </text>
				 
				
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
		login
	} from '@/api/index.js'

	import compInput from '@/components/compInput'
	import {
		mapActions
	} from "vuex"
	export default {
		components: {

			compInput,

		},
		data() {
			return {
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
				age: "",
				disabled: true,
				logo: require('../../static/images/other/logo.png'),
				user_name: require('../../static/images/other/user_name.png'),
				possword: require('../../static/images/other/possword.png'),
			};
		},
		onShow() { 
		uni.removeStorageSync('userInfo');	
		},
		 
		methods: {
			...mapActions({
				setUserInfo: "setUserInfo"
			}),
			
			
			// onLastTime(e){
			// 			this.last_time = e.last_time;
			// 			console.log(e);
			// 		},
			// 		parsePage(index) {
			// 			return this.$refs['dapeiPage'][index];
			// 		},
			// 		animationfinish(e) {
			// 			let index = e.detail.current;
			// 			if (this._touchTabIndex === index) {
			// 				this.isTap = false;
			// 			}
			// 			this._lastTabIndex = index;
			// 			this.switchTab(index);
			// 		},
			// 		onswiperscroll(e) {
			// 			if (this.isTap) {
			// 				return;
			// 			}
			// 			var offsetX = e.detail.dx;
			// 			var preloadIndex = this._lastTabIndex;
			
			// 			if (offsetX > TAB_PRELOAD_OFFSET) {
			// 				preloadIndex++;
			// 			} else if (offsetX < -TAB_PRELOAD_OFFSET) {
			// 				preloadIndex--;
			// 			}
			// 			if (preloadIndex === this._lastTabIndex || preloadIndex < 0 || preloadIndex > this.$refs['dapeiPage'].length - 1) {
			// 				return;
			// 			}
			// 			this.currentTab = preloadIndex;
			// 			var pageItem = this.parsePage(preloadIndex);
			// 			if (pageItem.dataList.length === 0) {
			// 				pageItem.loadData(false,this.last_time);
			// 			}
			// 		},
			// 		switchTab(index) {
			// 			var pageItem = this.parsePage(index);
			// 			this.scrollNavBar(index);
					
			// 			if (pageItem.dataList.length === 0) {
			// 				pageItem.loadData(false,this.last_time);
			// 			}
			// 			if (this.currentTab === index) {
			// 				return;
			// 			}
			// 			this.currentTab = index;
			// 			// 缓存 tabId
			// 			if (pageItem.dataList.length > MAX_CACHE_DATA) {
			// 				let isExist = this.cacheTab.indexOf(this.currentTab);
			// 				if (isExist < 0) {
			// 					this.cacheTab.push(this.currentTab);
			// 				}
			// 			}
						
			// 			// 释放 tabId
			// 			if (this.cacheTab.length > MAX_CACHE_PAGE) {
			// 				let cacheIndex = this.cacheTab[0];
			// 				pageItem.clear();
			// 				this.cacheTab.splice(0, 1);
			// 			}
			// 		},
			// 		async scrollNavBar(index) {
			// 			const el = this.$refs['navItem' + index][0];
			// 			let offset = 0;
			// 			// TODO fix ios offset
			// 			if (index > 0) {
			// 				let sizeData = await this.getNavRect(el);
			// 				var tabwidth = sizeData.width;
			// 				offset = this.tabbarWidth / 2 - tabwidth / 2;
			// 				if (sizeData.right < this.tabbarWidth / 2) {
			// 					offset = sizeData.width;
			// 				}
			// 			}
			// 			_Dom.scrollToElement(el, {
			// 				offset: -offset
			// 			});
			// 		},
			// 		//获取navbar位置信息
			// 		getNavRect(ref) {
			// 			return new Promise(resolve => {
			// 				_Dom.getComponentRect(ref, option => {
			// 					resolve(option.size);
			// 				});
			// 			});
			// 		},
			// 		ontabtap(index) {
			// 			console.log(index);
			// 			this._touchTabIndex = index;
			// 			this.switchTab(index);
			// 		},
			// 		async get_cate_list() {
			// 			const res = await getApp().globalData.request.post('dapei/get_cate');
			// 			this.tabItems = res.data;
			// 			this.$nextTick(() => {
			// 				this.getNavRect(this.$refs.tabbar1).then(res => {
			// 					this.tabbarWidth = res.width;
			// 					this.switchTab(0);
			// 				});
			// 			});
			// 		}
		 
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			onhandleUsername(messarr) {
				this.username = messarr[0]
				 
			},
			onhandleRePassword(messarr) {
				this.password = messarr[0]
				 
			},
		  
			handleOnLogin() {
				let _this = this
				let params = {
					username: _this.username,
					password: _this.password,

				} 
				if(_this.username==""){
					uni.showToast({
						icon:"none",
						title: "wrong user name"
					})
					return 
				}
				if(_this.password==""){
					uni.showToast({
						icon:"none",
						title: "wrong password"
					})
					return 
				}			 

				_this.$request
					.post({
						url: login,
						data: params
					})
					.then(
						res => {
							 
							_this.setUserInfo(res)
							uni.switchTab({
								url: '/pages/tab/index/index',
								animationType: "fade-in",
							})
						},
						res => {
                        uni.showToast({
                        	icon: "none",
                        	title: res.data.msg
                        })
						}
					);
 

			},
			registerTo(){
				uni.navigateTo({
					url:"/pages/userLoginRegister/register"
				})
			}
		},
		onLoad(options) {
			// let pass=this.$md5()
		}
	};
</script>

<style scope>
	
	/* .category-scroll {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		background-color: #ffffff;
	}
	.category-tab-item {
		flex-wrap: nowrap;
		text-align: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.category-tab-item-title {
		text-align: center;
		color: #565656;
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.category-tab-item-title-active {
		color: #fa0000;
		 
	}
	.tab-box {
		margin-top: 10rpx;
		flex: 1;
	}
	
	.swiper-item {
		flex: 1;
		flex-direction: column;
	}
	
	.page-item {
		flex: 1;
		flex-direction: row;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	} */
	
     
	
	.loginContent {
		padding: 20px; 
	}

	.loginTop {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
		margin-bottom: 20px
	}

	.loginButtom {
		margin-top: 40px;
		font-size: 18upx
	}

	.loginButtom button {
		border-radius: 100upx;
	}

	.loginImg {
		width: 200upx;
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
		justify-content: center;
	}
/deep/	.uni-form-item.uni-column{
	    background-color: #c2c0c0;	
	}
	.firstB{
		background-color: #c2c0c0!important;
	}
</style>
