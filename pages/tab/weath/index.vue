<template>
	<view class="scroll-view-item-border content_app">
	<!-- 	 <view class="page-news">
		 		<waterfall
		 			class="listview"
		 			column-count="2"
		 			column-gap="7"
		 			left-gap="7"
		 			right-gap="7"
		 			enableBackToTop="true"
		 			:show-scrollbar="false"
		 			loadmoreoffset="15"
		 			@loadmore="loadMore()"
		 		>
		 			<hhs-refresh @refresh="onrefresh" @pullingdown="onpullingdown" :refreshing="refreshing"></hhs-refresh>
		 
		 			<cell v-for="(item, index) in dataList" :key="item.Guid" class="s-tab-list-cell" @click="goDetail(item)">
		 				<view class="dapei-card">
		 					<view class="image-view">
		 						<image class="dapei-card-image " :src="item.picture" placeholder="/static/img/ic_default_placeholder.png"></image>
		 						<view class="itemcount">
		 							<text class="itemcount-text">{{ item.item_ids.length }}个宝贝</text>
		 						</view>
		 					</view>
		 					<view class="dapei-card-content-box">
		 						<view class="tui-product-title">
		 							<text class="product-title">{{ item.title }}</text>
		 						</view>
		 						<view class="tui-product-footer">
		 							<view class="tui-product-author">
		 								<image :src="item.author_avatar" class="author_avatar"></image>
		 								<text class="author_nick">{{ item.author_nick }}</text>
		 							</view>
		 							<text class="cs-iconfont product-score">&#xe637; {{ item.score }}</text>
		 						</view>
		 					</view>
		 				</view>
		 			</cell>
		 
		 			<header v-if="isLoading || dataList.length > 4">
		 				<view class="loading-more">
		 					<text class="loading-more-text">{{ loadingText }}</text>
		 				</view>
		 			</header>
		 		</waterfall>
		 	</view> -->
		<scroll-view class="content_app_style_content" scroll-y="true" @scrolltoupper="scrolltolower">
			<view class="uni-padding-wrap uni-common-mt">
				<view>
					<!-- 	<lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city><lee-select-city
							:getPosition="getPosition"
							@submit="submitHandler"
							@select-current="useCurrentPosition"
						></lee-select-city> -->
					<view class="scroll-view-item top">
                         <view class="paddingAll   textColorff b20" @click="onHandleNativeToDetail(item)" v-if="id==1"
							v-for="(item,index) in moreList" :key="index">
							<view class="workingSignalsTitle disRowAroundcenter">
								<view class="textColor fontSize16 fontWeight">
									{{item.stock_name}}
								</view>
								<view class="fontSize14 mrl">
									{{item.stock_no}}
								</view>
							</view>
							<text class="workingSignalsContent overflow3 marTop20">
								{{item.intro}}
							</text>
							<view class="disRowAround paddingTop20">
								<view class="">
									{{item.CreatedAt.substring(0,10)}}
								</view>
								<view class="">
									<starRating :score="item.star"></starRating>
								 </view>
							</view>
						</view>
						 <view class="w_94_auto" v-if="vip_end_vip == false">
						 	<image :src="bannerOne" mode=""></image>
						 </view>
						<view v-if="vip_end_vip == false" class="textColorff paddingAll margAll content_app11">
							Wealth Quarterly Guide selects the most promising 10 stocks,making it easier to make profits in
							earnings season. By leveraging over 300 factors, strong data resources including big data on
							public opinion across the Internet, and artificial intelligence, Wealth Quarterly Guide compares
							and analyzes the historical stock performance following the release of each financial statement.
						</view>
						<!-- <view class="collapse_botton_reduis content_appfb textColor19 weight margin_button_top"
							@click="jumpToDescribe(stockListIndex[0])" v-if="vip_end_vip == false ||  userInfo == null">
							<view class="fontSize19 weight" style="height: 40px;line-height: 40px;">Pay to unlock all
								content</view>
						</view> -->
						
						<view
							class="collapse_botton_reduis background-left-right margin_button_top  rowBetweenaround paddingAll"
							@click="jumpToDescribe(stockListIndex[0])" v-if="vip_end_vip == false ||  userInfo == null">
						  <view class="textColorFFF fontSize15">
								intelligent analysis
							</view>
							<view class="fontSize19 weight backgroundfff paddingBtnAll fontSize15">Buy Now</view>
						</view>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import starRating from '@/components/star-rating/star-rating.vue'
	import {
		mapGetters
	} from "vuex"
	import {
		getlist,
		getSmartmoney,
		getStockBase,
		userIndex,
		noauthIndex
	} from '@/api/index.js'
	var self;
	export default {
		props: ["item"],
		computed: {
			...mapGetters(["userInfo"])
		},
		components: {
			starRating
		},
		data() {
			return {
				stockListIndex: [],
				moreList: [],
				is_end: 0,
				page: 1,
				isActive: true,
				id: 1,
				items: {},
				vip_end_vip: true,
				bannerOne: require("../../../static/images/other/bannerOne.png"),
				bannerTwo: require("../../../static/images/other/bannerTwo.jpg"),
			};
		},

		onLoad(option) {
			self = this;
			self.id = 1
			self.items = {
				title: "Stock vane",
				id: 1
			}

		},
		onShow() {
			let _this = this;
			// _this.getStockList();
			_this.getStockBaseList();
			 
		},
		methods: {
			
				// submitHandler({ simple }) {
				// 			uni.showModal({
				// 				title: '当前选择',
				// 				content: simple.join('/')
				// 			})
				// 		},
						
				// 		useCurrentPosition(name) {
				// 			uni.showModal({
				// 				title: '使用当前定位',
				// 				content: name
				// 			})
				// 		},
						
				// 		getPosition() {
							
				// 		}
				
				
				// async loadData(refresh, last_time = '') {
				// 			if (this.isLoading) {
				// 				return;
				// 			}
				// 			this.isLoading = true;
				// 			this.isNoData = false;
				// 			this.requestParams.last_time = last_time;
				// 			var request = getApp().globalData.request;
				
				// 			const result = await request.post('dapei/index', this.requestParams).catch(err => {
				// 				console.log(err);
				// 				if (this.dataList.length == 0) {
				// 					this.isNoData = true;
				// 				}
				// 			});
				// 			console.log(result);
				
				// 			if (result.code == 200) {
				// 				const data = result.data.content;
				// 				this.isNoData = data.length <= 0;
				// 				const data_list = data.map(item => {
				// 					return {
				// 						Guid: this.newGuid() + item.id,
				// 						...item
				// 					};
				// 				});
				// 				if (refresh) {
				// 					this.dataList = data_list;
				// 				} else {
				// 					this.dataList = this.dataList.concat(data_list);
				// 				}
				// 				this.$emit('onLastTime', {
				// 					last_time: result['data']['last_time']
				// 				});
				// 			}
				
				// 			this.isLoading = false;
				// 			if (refresh) {
				// 				// this.requestParams.last_time = '';
				// 				this.refreshing = false;
				// 				this.refreshFlag = false;
				// 				this.refreshText = '已刷新';
				// 				if (this.pullTimer) {
				// 					clearTimeout(this.pullTimer);
				// 				}
				// 				this.pullTimer = setTimeout(() => {
				// 					this.pulling = false;
				// 				}, 1000);
				// 			}
				// 		},
				// 		loadMore(e) {
				// 			this.loadData(false, this.requestParams.last_time);
				// 		},
				// 		clear() {
				// 			this.dataList.length = 0;
				// 			this.requestParams.minId = '';
				// 		},
				// 		goDetail(detail) {
				// 			if (this.navigateFlag) {
				// 				return;
				// 			}
				// 			console.log(detail);
				// 			this.navigateFlag = true;
				// 			var url = getApp().config("html5Host") + `h5Detail/dapei?contentId=${detail['id']}&publishTime=${detail['addtime']}`
				// 			console.log(url);
				// 			uni.navigateTo({
				// 				url: '/pages/special/webview?url='+encodeURIComponent(url),
				// 				success: res => {},
				// 				fail: () => {},
				// 				complete: () => {}
				// 			});
				// 			setTimeout(() => {
				// 				this.navigateFlag = false;
				// 			}, 200);
				// 		},
				
				// 		refreshData() {
				// 			if (this.isLoading) {
				// 				return;
				// 			}
				// 			this.pulling = true;
				// 			this.refreshing = true;
				// 			this.refreshText = '正在刷新...';
				// 			this.loadData(true);
				// 		},
				// 		onrefresh(e) {
				// 			this.refreshData();
				// 		},
				// 		onpullingdown(e) {
				// 			if (this.refreshing) {
				// 				return;
				// 			}
				// 			this.pulling = false;
				// 			if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
				// 				this.refreshFlag = true;
				// 				this.refreshText = '释放立即刷新';
				// 			} else {
				// 				this.refreshFlag = false;
				// 				this.refreshText = '下拉可以刷新';
				// 			}
				// 		},
				// 		newGuid() {
				// 			let s4 = function() {
				// 				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
				// 			};
				// 			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
				// 		}
			nativeGetTo() {
				let _this = this
				uni.navigateTo({
					url: '/pages/userLoginRegister/login'
				})
				uni.showToast({
					icon: "none",
					title: "Please Sign In"
				})
			},
			jumpToDescribe(item) {
				if (this.userInfo == null) {
					this.nativeGetTo()
				} else {
					uni.navigateTo({
						url: getApp().getUrl("/pages/mine/index")
						// url: getApp().getUrl("/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(
						// 	item)))
					})
				}


			},
			async getStockList() {
				var _this = this;
				var res = await _this.$request
					.get({
						url: _this.userInfo?.token ? userIndex : noauthIndex,
						loadingTip: "stock...",
					})
					.then(
						(res) => {
							_this.vip_end_vip = res.report_vip_end
							_this.stockListIndex = [{
								title: "Wealth Quarterly Guide",
								child: res.report,
								active: true,
								id: 1,
								vip: res.report_vip_end
							}]

							console.log("=====>", res.sm_vip_end)
							if (res.report_vip_end == true) {
								_this.getStockBaseList()
							}

						},
						(res) => {}
					);
			},
			onHandleNativeToDetail(item) {
				let prams = {
					items: self.items,
					item
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/nativeDetail/index?prams=" + encodeURIComponent(JSON.stringify(
						prams)))
				})
			},
			// nativeTo(item) {
			// 	uni.navigateTo({
			// 		url:getApp().getUrl( "/pages/more/index?item=" + encodeURIComponent(JSON.stringify(item)))
			// 	})
			// },
			onHandleJumpToDetails(flag) {

				let params = {
					item: self.items,
					flag
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/detail/index?params=" + encodeURIComponent(JSON.stringify(
						params)))
				})
			},
			// jumpToDescribe(item) {
			// 	if (this.userInfo == null) {
			// 		uni.navigateTo({
			// 			url: '/pages/userLoginRegister/login'
			// 		})
			// 	} else {
			// 		uni.navigateTo({
			// 			url: getApp().getUrl("/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(item)))
			// 		})
			// 	}


			// },
			// onPullDownRefresh() {},
			onReachBottom() {
				self.scrolltolower()
			},
			scroll(event) {},
			//滚动到底部/右边触发
			scrolltolower() {
				if (self.isActive) {
					self.page++
					self.getStockBaseList(self.id, 1)
				}

			},
			scrolltoupper() {},
			getStockBaseList(v) {
				console.log("传入more的ID=", self.id)
				let url = getlist;
				let type_id = 1;
				if (self.page > 1 || v == 1) {
					self.is_end = 1
				}
				if (self.id == 1) {
					url = `${getStockBase}?is_end=${self.is_end}`
				} else if (self.id == 2) {
					url = `${getSmartmoney}?is_end=${self.is_end}`
				} else {
					if (self.id == 3) {
						type_id = 1
					} else {
						type_id = 2
					}
					url = `${getlist}?is_end=${self.is_end}&type_id=${
type_id}&page=${this.page}`
				}
				var res = self.$request.get({
						url: url,
						loadingTip: 'more...'
					})
					.then(
						res => {

							self.moreList = self.moreList.concat(res.list)
							if (res.list.length < 10 && v == 1) {
								self.isActive = false
							}
							console.log('more 列表', self.moreList);

						},
						res => {
							console.log('failure');
						}
					)
			}
		}
	}
</script>

<style scope>
	
	/* .no-data {
		flex: 1;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}
	
	.page-news {
		flex: 1;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	
	.listview {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		 
	}
	
	.loading-icon {
		width: 28px;
		height: 28px;
		margin-right: 5px;
		color: gray;
	}
	
	.loading-text {
		margin-left: 2px;
		font-size: 16px;
		color: #999999;
	}
	
	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 14px;
		padding-bottom: 14px;
		text-align: center;
	}
	
	.loading-more-text {
		font-size: 28upx;
		color: #999;
	}
	.dapei-card {
		width: 355rpx;
		background-color: #ffffff;
		border-width: 1rpx;
		border-style: solid;
		border-color: #eaeef1;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.image-view {
		height: 380rpx;
		width: 355rpx;
		position: relative;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		position: relative;
	}
	
	.dapei-card-image {
		height: 380rpx;
		width: 355rpx;
		position: absolute;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	.itemcount {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
	}
	.itemcount-text {
		background-color: rgba(0, 0, 0, 0.4);
		padding: 6rpx 10rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #ffffff;
	}
	.dapei-card-content-box {
		width: 355rpx;
		padding-top: 5rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		position: relative;
	}
	.tui-product-title {
		padding: 10rpx;
		padding-top: 5rpx;
	}
	
	.product-title {
		font-size: 24rpx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #333333;
		line-height: 38rpx; 
		lines: 3;
		text-overflow: ellipsis;
	}
	.tui-product-footer {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.tui-product-author {
		margin-top: 5rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		margin-bottom: 5rpx;
	}
	.author_avatar {
		width: 38rpx;
		height: 38rpx;
		border-radius: 50rpx;
	}
	.author_nick {
		margin-left: 10rpx;
		font-size: 24rpx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #333333;
	}
	.product-score {
		font-size: 24rpx;
		color: #ff3c32;
	} */
	
	
	
	/* 00000000 */
	.scroll-view-item-border {
		padding: 20upx;
		/* height: 100%;
		min-height: 100vh; */
	}

	.content_app_style_content {
		min-height: 100vh;
		overflow-y: scroll;
	}

	uni-page-body,
	uni-page-refresh {
		height: 100% !important;
	}

	.scroll-view {
		white-space: nowrap;
		height: 100vh;
		width: 100%;
	}

	/* .top {
		height: 200px;
		width: 100%;
	} */

	.center {
		height: 200px;
		width: 100%;
		background: green;
	}

	.bottom {
		height: 200px;
		width: 100%;
		background: blue;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

/* 	.collapse_botton_reduis {
		width: 100%;
		border-radius: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10upx 0;
		font-size: 28upx;
	} */
</style>
