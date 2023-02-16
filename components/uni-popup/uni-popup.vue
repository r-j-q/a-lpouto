<template>
	<view v-if="showPopup" class="uni-popup-view" :class="[popupstyle]" @touchmove.stop.prevent="clear">
		<uni-transition v-if="maskShow" :mode-class="['fade']" :styles="maskClass" :duration="duration" :show="showTrans" @click="onTap" />
		<uni-transition :mode-class="ani" :styles="transClass" :duration="duration" :show="showTrans" @click="onTap">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<slot />
			</view>
		</uni-transition>
	</view>
</template>

<script>
	//111111
	
	// const cateData = [{
	// 			id: '1',
	// 			title: 'bendi',
	// 			page: 1,
	// 			eliteId: 1,
	// 			limit: 8,
	// 			refreshing: false,
	// 			refreshText: '下拉可以刷新',
	// 			loadingText: '加载中...',
	// 			data: [],
	// 			posturl: 'duanshipin/getbendilist',
	// 			zhuyeid: 0
	// 		},
	// 		{
	// 			id: '2',
	// 			title: 'left',
	// 			page: 1,
	// 			eliteId: 2,
	// 			limit: 8,
	// 			refreshing: false,
	// 			refreshText: '下拉可以刷新',
	// 			loadingText: '加载中...',
	// 			data: [],
	// 			posturl: 'duanshipin/getguanzhulist',
	// 			zhuyeid: 0
	// 		}
	// 	];
	// 	import HttpRequest from '@/common/httpRequest.js';
	// 	import HttpCache from '@/common/cache.js';
	// 	var system = uni.getSystemInfoSync();
	// 	//import uniHeader from '@/components/header';
	// 	import uniFooter from '@/components/footer';
	// 	import uniSwiper from '@/components/swiper';
	// 	import uniPush from '@/components/push';
	// 	import cstRefresh from '@/components/huahuasheng/nvue/hhs-refresh.nvue';
	// 	import {
	// 		mapState,
	// 		mapMutations
	// 	} from 'vuex';
	// 	export default {
	// 		components: {
	// 			//uniHeader,
	// 			uniFooter,
	// 			uniSwiper,
	// 			uniPush,
	// 			cstRefresh
	// 		},
	// 		props: {
	
	// 		},
	// 		data() {
	// 			return {
	// 				cateData: cateData,
	// 				statusBarHeight: system.statusBarHeight,
	// 				screenHeight: system.screenHeight,
	// 				curIndex: 2,
	// 				playStatus: true,
	// 				myvideo: [],
	// 				playerCur: 0,
	// 				scrollLeft: 0,
	// 				refreshText: '下拉可以刷新',
	// 				loadingText: '加载中...',
	// 				refreshing: false,
	// 				show: false,
	// 				currentcity: '石家庄',
	// 				order: 0, //0为
	// 			}
	// 		},
	// 		created() {
	// 			var that = this;
	// 			that.dangqian = 0;
	// 			uni.$on('playid', event => {
	// 				//console.log(event);
	// 				this.playerCur = event.playid
	// 			});
	// 		},
	// 		computed: {
	// 			...mapState(['hasLogin', 'userinfo', 'openid'])
	// 		},
	// 		onLoad() {
	// 			var that = this;
	// 			console.log(this.screenWidth)
	// 			//this.myvideo = uni.createVideoContext('myVideo', this);
	// 			uni.getStorage({
	// 				key: 'currentcity',
	// 				success: function(res) {
	// 					console.log(res.data);
	// 					that.currentcity = res.data;
	// 				},
	// 				fail: function(res) {
	// 					console.log("11233");
	// 					uni.getLocation({
	// 						type: 'wgs84',
	// 						geocode: true, //设置该参数为true可直接获取经纬度及城市信息
	// 						success: function(res) {
	// 							console.log(res.address.city);
	// 							that.currentcity = res.address.city;
	// 							uni.setStorage({
	// 								key: 'currentcity',
	// 								data: res.address.city,
	// 								success: function() {
	// 									console.log('success');
	// 								}
	// 							});
	// 						},
	// 						fail: function() {
	// 							console.log("获取定位失败")
	// 							uni.showToast({
	// 								title: '获取地址失败，将导致部分功能不可用',
	// 								icon: 'none'
	// 							});
	// 						}
	// 					});
	// 				}
	// 			});
	// 		},
	// 		onShow() {
	// 			console.log("切换到前台")
	// 			if (this.curIndex == 2) {
	// 				uni.hideTabBar()
	// 				this.show = true;
	// 				uni.createVideoContext('myVideo' + this.playerCur, this).play()
	// 				uni.$emit('zanting', {
	// 					zanting: 0
	// 				});
	// 			}
	// 		},
	// 		onHide() {
	// 			if (this.curIndex == 2) {
	// 				console.log("切换到后台")
	// 				uni.showTabBar();
	// 				this.show = false;
	// 				uni.createVideoContext('myVideo' + this.playerCur, this).pause();
	// 				uni.$emit('zanting', {
	// 					zanting: 1
	// 				});
	// 			}
	// 		},
	// 		onTabItemTap() {
	
	// 		},
	// 		methods: {
	// 			navigateBack() {
	// 				uni.navigateBack();
	// 			},
	// 			goPath: function(e) {
	
	// 				if (!this.$store.state.openid) {
	// 					uni.navigateTo({
	// 						url: '/pages/member/ucenter/signIn'
	// 					});
	// 					return;
	// 				}
	// 				uni.getSubNVueById('xuanze').show('slide-in-bottom', 200, () => {});
	// 				return;
	// 				uni.createVideoContext('myVideo').pause();
	// 				var url = e.target.dataset.url;
	// 				uni.navigateTo({
	// 					url: url,
	// 					animationType: "none"
	// 				})
	// 			},
	// 			onItemChange(e) {
	// 				this.curIndex = e;
	// 				console.log(e)
	// 			},
	// 			xiaoxi() {
	// 				uni.navigateTo({
	// 					url: '/pages/duanshipin/zhuye/xiaoxi'
	// 				});
	// 			},
	// 			zhuye() {
	// 				if (!this.$store.state.openid) {
	// 					uni.navigateTo({
	// 						url: '/pages/member/ucenter/signIn'
	// 					});
	// 					return;
	// 				}
	// 				uni.navigateTo({
	// 					url: '/pages/duanshipin/zhuye/index?uid=' + this.userinfo.userid
	// 				});
	// 			},
	// 			tozhibo() {
	// 				if (!this.$store.state.openid) {
	// 					uni.navigateTo({
	// 						url: '/pages/member/ucenter/signIn'
	// 					});
	// 					return;
	// 				}
	// 				console.log('zhibo')
	// 				uni.navigateTo({
	// 					url: '/pages/zhibo/index'
	// 				});
	// 			},
	// 			onchange: function(current) {
	// 				this.curIndex = current;
	// 				let activeTab = this.cateData[current];
	// 				this.playStatus = this.curIndex === 2 ? true : false;
	
	// 				if (this.curIndex == 2) {
	// 					uni.hideTabBar()
	// 					this.show = true;
	// 					uni.createVideoContext('myVideo' + this.playerCur, this).play()
	// 					uni.$emit('zanting', {
	// 						zanting: 0
	// 					});
	// 				} else {
	// 					uni.showTabBar()
	// 					this.show = false;
	// 					uni.createVideoContext('myVideo' + this.playerCur, this).pause()
	// 					uni.$emit('zanting', {
	// 						zanting: 1
	// 					});
	// 				}
	// 				console.log(current)
	// 				if (current < 2 && activeTab.data == '') {
	// 					if (!this.$store.state.openid) {
	// 						uni.navigateTo({
	// 							url: '/pages/member/ucenter/signIn'
	// 						});
	// 						return;
	// 					}
	// 					this.page = 1;
	// 					this.getList('', this.curIndex);
	// 				}
	// 			},
	// 			async getList(type, index) {
	// 				let activeTab = this.cateData[index];
	// 				var that = this;
	// 				if (type == 'search') {
	// 					activeTab.page = 1;
	// 					activeTab.data = [];
	// 				}
	// 				that.loadingText = '数据加载中...';
	// 				try {
	// 					const result = await getApp().globalData.request.post(activeTab.posturl, {
	// 						page: activeTab.page,
	// 						limit: activeTab.limit,
	// 						currentcity: this.currentcity,
	// 						uid: this.$store.state.openid
	// 					});
	// 					if (result.code == 200) {
	// 						console.log(result)
	// 						if (result.data.length > 0) {
	// 							activeTab.loadingText = '加载完成';
	// 							if (activeTab.page == 1) {
	// 								activeTab.data = result.data;
	// 							} else {
	// 								activeTab.data = activeTab.data.concat(result.data);
	// 							}
	// 						} else {
	// 							activeTab.loadingText = '没有更多了';
	// 						}
	// 					} else {
	// 						activeTab.loadingText = '没有更多了';
	// 					}
	// 				} catch (e) {
	// 					activeTab.loadingText = '网络繁忙';
	// 				}
	// 				if (type == 'refreshData') {
	// 					this.pulling = true;
	// 					activeTab.refreshing = false;
	// 					activeTab.refreshText = '已刷新';
	// 					setTimeout(() => {
	// 						// TODO fix ios和Android 动画时间相反问题
	// 						this.pulling = false;
	// 					}, 500);
	// 				}
	// 			},
	// 			onrefresh(index) {
	// 				var tab = this.cateData[index];
	// 				console.log(index)
	// 				if (!tab.refreshFlag) {
	// 					return;
	// 				}
	
	// 				tab.refreshing = true;
	// 				tab.refreshText = '正在刷新...';
	// 				tab.page = 1;
	// 				tab.data = [];
	
	// 				this.getList('refreshData', index);
	
	// 			},
	// 			loadMore(index) {
	// 				let activeTab = this.cateData[index];
	// 				activeTab.page = activeTab.page + 1;
	// 				this.getList('', index);
	// 			},
	// 			onpullingdown(e) {
	// 				var tab = this.cateData[this.curIndex];
	// 				console.log()
	// 				if (tab.refreshing || this.pulling) {
	// 					return;
	// 				}
	// 				if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
	// 					tab.refreshFlag = true;
	// 					tab.refreshText = '释放立即刷新';
	// 				} else {
	// 					tab.refreshFlag = false;
	// 					tab.refreshText = '下拉可以刷新';
	// 				}
	// 			},
	// 			todetail(e, index) {
	// 				var tab = this.cateData[this.curIndex];
	
	// 				uni.setStorage({
	// 					key: 'zyvideolist',
	// 					data: tab,
	// 					success: function() {}
	// 				});
	// 				uni.setStorage({
	// 					key: 'zyvideoindex',
	// 					data: index,
	// 					success: function() {}
	// 				});
	// 				uni.navigateTo({
	// 					url: '/pages/duanshipin/list?type=2'
	// 				});
	// 			}
	// 		}
	// 	}
	// 11111
	import uniTransition from '../uni-transition/uni-transition.vue'
	import popup from './popup.js'
	 

	export default {
		name: 'UniPopup',
		components: {
			uniTransition
		},
		props: {
			animation: {
				type: Boolean,
				default: true
			},
			 
			type: {
				type: String,
				default: 'center'
			},
			maskclick: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			return {
				popup: this
			}
		},
		mixins: [popup],
		watch: {
			 
			type: {
				handler: function(newVal) {
					this[this.config[newVal]]()
				},
				immediate: true
			}, 
			maskclick:
			 {
				 handler:function(val){
					 
					 this.mkclick = val
				 },
				 immediate: true
				
			}
		},
		data() {
			return {
				duration: 300,
				ani: [],
				showPopup: false,
				showTrans: false,
				maskClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'backgroundColor': 'rgba(0, 0, 0, 0.4)'
				},
				transClass: {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				},
				maskShow: true,
				mkclick: true,
				popupstyle: 'top'
			}
		},
		// created() {
		// 	if (this.animation) {
		// 		this.duration = 300
		// 	} else {
		// 		this.duration = 0
		// 	}
		// },
		created() {
			if (this.animation) {
				this.duration = 300
			} else {
				this.duration = 0
			}
		},
		methods: {
			clear(e) {
				e.stopPropagation()
			},
			// open() {
			// 	this.showPopup = true
			// 	this.$nextTick(() => {
			// 		new Promise(resolve => {
			// 			clearTimeout(this.timer)
			// 			this.timer = setTimeout(() => {
			// 				this.showTrans = true
			// 				// fixed by mehaotian 兼容 app 端
			// 				this.$nextTick(() => {
			// 					resolve();
			// 				})
			// 			}, 50);
			// 		}).then(res => {
			// 			// 自定义打开事件
			// 			clearTimeout(this.msgtimer)
			// 			this.msgtimer = setTimeout(() => {
			// 				this.customOpen && this.customOpen()
			// 			}, 100)
			// 			this.$emit('change', {
			// 				show: true,
			// 				type: this.type
			// 			})
			// 		})
			// 	})
			// },
			open() {
				let _this =this;
				_this.showPopup = true
				_this.$nextTick(() => {
					new Promise(resolve => {
						clearTimeout(_this.timer)
						_this.timer = setTimeout(() => {
							_this.showTrans = true
							// fixed by mehaotian 兼容 app 端
							_this.$nextTick(() => {
								resolve();
							})
						}, 50);
					}).then(res => {
						// 自定义打开事件
						clearTimeout(_this.msgtimer)
						_this.msgtimer = setTimeout(() => {
							_this.customOpen && _this.customOpen()
						}, 100)
						_this.$emit('change', {
							show: true,
							type: _this.type
						})
					})
				})
			},
			// close(type) {
			// 	this.showTrans = false
			// 	this.$nextTick(() => {
			// 		this.$emit('change', {
			// 			show: false,
			// 			type: this.type
			// 		})
			// 		clearTimeout(this.timer)
			// 		// 自定义关闭事件
			// 		this.customOpen && this.customClose()
			// 		this.timer = setTimeout(() => {
			// 			this.showPopup = false
			// 		}, 300)
			// 	})
			// },
			close(type) {
				let _this =this;
				_this.showTrans = false
				_this.$nextTick(() => {
					_this.$emit('change', {
						show: false,
						type: _this.type
					})
					clearTimeout(_this.timer)
					// 自定义关闭事件
					_this.customOpen && _this.customClose()
					_this.timer = setTimeout(() => {
						_this.showPopup = false
					}, 300)
				})
			},
			// onTap() {
			// 	if (!this.mkclick) return
			// 	this.close()
			// }, 
			// top() {
			// 	this.popupstyle = 'top'
			// 	this.ani = ['slide-top']
			// 	this.transClass = {
			// 		'position': 'fixed',
			// 		'left': 0,
			// 		'right': 0,
			// 	}
			// }, 
			onTap() {
				let _this = this;
				if (!_this.mkclick) return
				_this.close()
			}, 
			top() {
				let _this = this;
				_this.popupstyle = 'top'
				_this.ani = ['slide-top']
				_this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				}
			}, 
			// bottom() {
			// 	this.popupstyle = 'bottom'
			// 	this.ani = ['slide-bottom']
			// 	this.transClass = {
			// 		'position': 'fixed',
			// 		'left': 0,
			// 		'right': 0,
			// 		'bottom': 0
			// 	}
			// }, 
			bottom() {
				let _this =this;
				_this.popupstyle = 'bottom'
				_this.ani = ['slide-bottom']
				_this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
					'bottom': 0
				}
			}, 
			// center() {
			// 	this.popupstyle = 'center'
			// 	this.ani = ['zoom-out', 'fade']
			// 	this.transClass = {
			// 		'position': 'fixed',
			// 		/* #ifndef APP-NVUE */
			// 		'display': 'flex',
			// 		'flexDirection': 'column',
			// 		/* #endif */
			// 		'bottom': 0,
			// 		'left': 0,
			// 		'right': 0,
			// 		'top': 0,
			// 		'justifyContent': 'center',
			// 		'alignItems': 'center'
			// 	}
			// }
			center() {
				let _this = this;
				_this.popupstyle = 'center'
				_this.ani = ['zoom-out', 'fade']
				_this.transClass = {
					'position': 'fixed',
					/* #ifndef APP-NVUE */
					'display': 'flex',
					'flexDirection': 'column',
					/* #endif */
					'bottom': 0,
					'left': 0,
					'right': 0,
					'top': 0,
					'justifyContent': 'center',
					'alignItems': 'center'
				}
			}
		}
	}
</script>
<style scoped>
	.uni-popup-view {
		position: fixed;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		opacity: 0;
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.uni-top-mask {
		opacity: 1;
	}

	.uni-bottom-mask {
		opacity: 1;
	}

	.uni-center-mask {
		opacity: 1;
	}

	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}

	.bottom {
		bottom: 0;
	}

	.uni-popup__wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	.content-ani {
		/* transition: transform 0.3s;
 */
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.uni-top-content {
		transform: translateY(0);
	}

	.uni-bottom-content {
		transform: translateY(0);
	}

	.uni-center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>