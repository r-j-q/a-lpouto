<template>
	<view class="scroll-view-item-border content_app">
		<scroll-view class="content_app_style_content" scroll-y="true" @scrolltoupper="scrolltolower">
			<view class="uni-padding-wrap uni-common-mt">
				<view>
					<view class="scroll-view-item top">
						<!-- <view class="container">
		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" style="height:calc(100vh )">
			<view v-for="(item, index) in catelist" :key="index" class="tab-bar-item" :class="[currentTab == index ? 'active' : '']" :data-current="index" @tap="swichNav">
				<text>{{ item.title }}</text>
			</view>
		</scroll-view>
		<view class="right-box"> 
			<block v-for="(item, index) in catelist" :key="index">
				<view class="page-view" :hidden="currentTab !== index">
					<swiper indicator-dots autoplay circular interval="5000" duration="150" class="swiper" v-if="h5swiper.length > 0">
						<swiper-item v-for="(banner, bindex) in h5swiper" :key="bindex" @tap="bannerDetail(banner)">
							<image :src="banner.h5TopBanner" class="slide-image" />
						</swiper-item>
					</swiper>
					<view class="class-box">
						<view class="class-item">
							<view class="class-name">{{ item.title }}</view>
							<view class="g-container">
								<block v-for="(subCate, subIndex) in item['sub']" :key="subIndex">
									<view class="g-box" @tap="productList(subCate)">
										<image :src="subCate.image" class="g-image" />
										<view class="g-title">{{ subCate.title }}</view>
									</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</block> 
		</view>
	</view> -->


						<view class="overflow2 ptop borderBottoms" v-if="id==2" v-for="(flag,i) in moreList" :key="i">

							<view class="disRowAround" @click="onHandleJumpToDetails(flag)">
								<view class="collaps_l textColor19 mrr" :class="flag.type==0 ? 'bggreen':'bgred'">
									{{flag.type==0 ?"C" :"P"}}
								</view>
								<view class="displayRowCol  ">
									<view class="fontSize15 weight textColorff">
										{{flag.stock_no}}
									</view>

								</view>

								<view class="displayRowCol">
									<view class="fontSize15 weight textColor">
										{{flag.CreatedAt.substring(0,10)}}
									</view>
									<!-- .substring(0,10) -->

								</view>
							</view>
						</view>
						<view class="w_94_auto poretive" v-if="vip_end_vip == false">
							<image :src="bannerTwo" mode=""></image>
							<view class="main-two-buttom colorffb860">
								Only $7.9/M
							</view>
						</view>
						<view v-if="vip_end_vip == false" class="textColorff paddingAll margAll content_app11">
							Aiming to help you in selecting prospective stocks, Stock Vane analyzes data on each
							transaction of stocks, and identifies stocks that institutional funds are buying with
							classification algorithm of machine learning. Then it further screens to build stock pools
							based on diagnosis of the K-line chart of such stocks.
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
		<u-loadmore v-if="vip_end_vip != false" :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText"
			fontSize="14px" iconSize="14px" />
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
				status: "",
				loadingText: "loading",
				loadmoreText: "loading",
				nomoreText: "----no more----",
				stockListIndex: [],
				moreList: [],
				is_end: 0,
				isActive: true,
				id: 1,
				items: {},
				vip_end_vip: true,
				bannerTwo: require("../../../static/images/other/bannerTwo.jpg"),
				page: 1,
				total: 0
			};
		},

		onLoad(option) {
			self = this;
			self.id = 2
			self.items = {
				title: "Stock vane",
				id: 2
			}
			self.getStockList();
		},

		methods: {

			// async loadSwiper() {
			// 			const res = await this.$Request.post("product/speciallist");
			// 			if (res.code && res.code == 200) {
			// 				this.h5swiper = res.data;
			// 			}
			// 		},
			// 		async loadCateList() {
			// 			var goodsCate = this.$SysCache.get('app_dtk_cate_list');
			// 			if (goodsCate) {
			// 				this.catelist = goodsCate;
			// 			} else {
			// 				const res = await this.$Request.post("index/catelist");
			// 				if (res.code && res.code == 200) {
			// 					this.catelist = res.data;
			// 					this.$SysCache.put('app_dtk_cate_list', res.data, 43200);
			// 				}
			// 			}
			// 		},
			// 		// 点击标题切换当前页时改变样式
			// 		swichNav(e) {
			// 			let cur = e.currentTarget.dataset.current;
			// 			if (this.currentTab == cur) {
			// 				return false;
			// 			} else {
			// 				uni.pageScrollTo({
			// 					scrollTop: 0
			// 				});
			// 				this.currentTab = cur;
			// 				this.checkCor();
			// 			}
			// 		},
			// 		//判断当前滚动超过一屏时，设置tab标题滚动条。
			// 		checkCor() {
			// 			if (this.currentTab > 7) {
			// 				this.scrollTop = 500;
			// 			} else {
			// 				this.scrollTop = 0;
			// 			}
			// 		},
			// 		bannerDetail(e) {
			// 			if (e.isApp == 1) {
			// 				uni.navigateTo({
			// 					url: '/pages/special/activity/activity?special_id=' + e.id
			// 				});
			// 			} else {
			// 				this.$Request.navigateTo({
			// 					target: 'code-browser-link',
			// 					url: e.url,
			// 					title: e.h5Title,
			// 					desc: e.h5Title,
			// 					param: ''
			// 				});
			// 			}
			// 		},
			// 		productList(e) {
			// 			uni.navigateTo({
			// 				url: `/pages/search/goods_list?cateid=${e.pid}&title=${e.title}&keywords=${e.title}`
			// 			});
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
					})
					// uni.navigateTo({
					// 	url: getApp().getUrl("/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(
					// 		item)))
					// })
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
							_this.vip_end_vip = res.sm_vip_end
							_this.stockListIndex = [{
								title: "Stock Vane",
								child: res.sm_vip_end == false ? res.smartmoney.slice(0, 3) : res.smartmoney,
								active: true,
								id: 2,
								vip: res.sm_vip_end
							}]

							console.log("=====>", res.sm_vip_end)
							if (res.sm_vip_end == true) {
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
  console.log("----->",flag)
				let params = {
					item: self.items,
					flag
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/ploutoDetail/index?params=" + encodeURIComponent(JSON.stringify(
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
				if (self.moreList.length >= self.total) return;
				self.status = 'loading';
				// console.log("self.isActive", self.isActive)

				self.page++
				setTimeout(() => {
					self.getStockBaseList(self.id, 1)
					if (self.moreList.length >= self.total) self.status = 'nomore';
					else self.status = 'loading';

				}, 1000)


				// if (_this.categoryNameList.length >= _this.totleSize) return;
				// _this.status = 'loading';
				// _this.pageNum++;
				// setTimeout(() => {
				// 	_this.getSubjectListByName()
				// 	if (_this.categoryNameList.length >= _this.totleSize) _this.status = 'nomore';
				// 	else _this.status = 'loading';
				// }, 1000)

				// 停止下拉刷新滚动
				uni.stopPullDownRefresh()

			},
			scrolltoupper() {},
			getStockBaseList(v) {
				console.log("传入more的ID=", self.id)
				console.log("传入more的vvvvv=", v)
				let url = getlist;
				let type_id = 1;
				if (self.page > 1 || v == 1) {
					self.is_end = 1
				}
				if (self.id == 1) {
					url = `${getStockBase}?is_end=${self.is_end}&page=${self.page}`
				} else if (self.id == 2) {
					url = `${getSmartmoney}?is_end=${self.is_end}&page=${self.page}`
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
							self.total = res.total;
							self.moreList.push(...res.list)
							// if (res.list.length < 10  ) {
							// 	self.isActive = false
							// }
							// console.log('more 列表', self.moreList);


							if (self.moreList.length >= self.total) {
								self.status = 'nomore';
								console.log('more 22列表', self.moreList);
							} else {
								self.status = 'loadmore';
							}

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
	/* 
.tab-view {
	height: 100%;
	width: 200upx;
	position: fixed;
	left: 0;
	z-index: 10;
}

.tab-bar-item {
	width: 200upx;
	height: 110upx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26upx;
	color: #444;
	font-weight: 400;
}

.active {
	position: relative;
	color: #000;
	font-size: 30upx;
	font-weight: 600;
	background: #fcfcfc;
}

.active::before {
	content: '';
	position: absolute;
	border-left: 8upx solid #e41f19;
	height: 30upx;
	left: 0;
}
 

.right-box {
	padding: 10upx 20upx 0 220upx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: border-box;
}

.page-view {
	width: 100%;
	overflow: hidden;
}

.swiper {
	width: 100%;
	height: 260upx;
	border-radius: 12upx;
	overflow: hidden;
	transform: translateZ(0);
}

.swiper .wx-swiper-dot {
	width: 8upx;
	height: 8upx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

.swiper .wx-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16upx;
	overflow: hidden;
}

.swiper .wx-swiper-dot-active::before {
	background: #fff;
}

.swiper .wx-swiper-dot.wx-swiper-dot-active {
	width: 16upx;
}

.slide-image {
	width: 100%;
	height: 260upx;
	background: url('~@/unpackage/res/images/goods/ic_banner_placeholder_h380.png') center center no-repeat #ffffff;
	background-size: 80%;
}

.class-box {
	padding-top: 30upx;
}

.class-item {
	background: #fff;
	width: 100%;
	box-sizing: border-box;
	padding: 20upx;
	margin-bottom: 20upx;
	border-radius: 12upx;
}

.class-name {
	font-size: 22upx;
}

.g-container {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
}

.g-box {
	width: 33.3333%;
	text-align: center;
	padding-top: 40upx;
}

.g-image {
	width: 120upx;
	height: 120upx;
	background: url('~@/unpackage/res/images/goods/ic_default_placeholder.png') center center no-repeat #ffffff;
	background-size: 80%;
}

.g-title {
	font-size: 22upx;
} */



	.scroll-view-item-border {
		padding: 20upx;
		/* height: 100vh;
		min-height: 100vh; */
		overflow-y: scroll;

	}

	.content_app_style_content {
		/* min-height: 100vh; */
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

	/* .collapse_botton_reduis {
		width: 100%;
		border-radius: 25px;
		 
		padding: 10upx 0;
		font-size: 28upx;
	} */
</style>
