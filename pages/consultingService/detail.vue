<template>
	<view class="content_app paddingAll minHeight100">
		<view class="textColorFFF fontSize19 fontWeight">
			{{title}}
		</view>
		<view class="textColorFFF fontSize16 paddingTB">
			{{updatetime| formatDate }}
		</view>
		<view class="content_app_img">
			<image :src="imgs" mode=""></image>
		</view>
		<view class="">

			<bctos-rich-text :nodes="itemsContent"></bctos-rich-text>
		</view>
		<!-- <view class=""> -->
		<!-- <u-read-more :shadowStyle="shadowStyle" :closeText="closeText" :openText="closeText">
				<rich-text :nodes="itemsContent"></rich-text>
			</u-read-more> -->
		<!-- </view> -->


	</view>
	<!-- <view class="new-home">
		<view class="header-home" :style="{ paddingTop: statusBarHeight + '' }" ref="app_bar" elevation="2px">
			<view class="index_header" ref="app_bar_bg">
				<view class="wap_center_search" @click="wap_search"><text
						class="hhs-iconfont wap_search_icon">&#xe63f;粘贴宝贝标题，先领券再购买</text></view>
				<view class="wap_right_icon" @click="wap_sigin">
					<image v-if="getHomeTopIcon.rightIcon" :src="getHomeTopIcon.rightIcon" class="wap_right_icon-image">
					</image>
				</view>
			</view>

			<view class="new-home-top-nav">
				<scroll-view class="category-scroll" :scroll-left="navScorllLeft" scroll-direction="horizontal"
					 :scroll-x="true">
					<view class="category-tab-item" :ref="'navItem' + index" v-for="(item, index) in tabItems"
						:key="index" :id="item.id" @click="ontabtap(index)">
						<text class="category-tab-item-title"
							:class="currentTab == index ? 'category-tab-item-title-active' : ''">{{ item.title }}</text>
					</view>
				</scroll-view>
				<view class="new-home-top-nav-move" @click="navigatorTo('/pages/cate/index')"><text
						class="hhs-iconfont new-home-top-nav-move-text">&#xe643;</text></view>
			</view>
		</view>

		<swiper :current="currentTab" class="swiper-box" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item" v-for="(tab, index1) in tabItems" :key="index1">
				<waterfall class="scroll-v" column-count="2" column-gap="7" left-gap="7" right-gap="7"
					enableBackToTop="true" :show-scrollbar="false" loadmoreoffset="15" @loadmore="loadMore(index1)"
					@scroll="swiperScroll" ref="waterfallRef">
					<cstRefresh @refresh="onrefresh(index1)" :refreshing="tab.refreshing" @pullingdown="onpullingdown"
						:refreshText="tab.refreshText"></cstRefresh>
					<header v-if="index1 == 0">
						<swiper class="swiper-banner" indicator-active-color="#ffffff"
							indicator-color="rgba(255,255,255,.4)" v-if="bannerAdvert.length > 0" :indicator-dots="true"
							:autoplay="true" :interval="5000" :duration="500" :circular="true">
							<swiper-item class="swiper-banner-item" v-for="(item, index) in bannerAdvert" :key="index"
								@tap="toCategory(item)">
								<view class="swiper-banner-item">
									<image :src="item.picture" class="swiper-banner-item-image"
										placeholder="/static/img/ic_banner_placeholder_h310.png"></image>
								</view>
							</swiper-item>
						</swiper>

						<swiper class="nav-swiper" :indicator-dots="false" :autoplay="false"
							:current="bannerAdvertLowerCurr" @change="bannerAdvertLowerChange">
							<swiper-item class="nav-swiper-item" v-for="(item, index) in bannerAdvertLower"
								:key="index">
								<view class="nav-item" v-for="(nitem, nindex) in item" :key="nindex"
									@click="toCategory(nitem)">
									<image class="nav-item-image" :src="nitem.picture"
										placeholder="/static/img/ic_default_placeholder.png"></image>
									<text class="nav-item-text">{{ nitem.title }}</text>
								</view>
							</swiper-item>
						</swiper>
						<view class="swiper-pagination s-rows  s-flex-center">
							<view class="hhs-swiper-dots-item" v-for="(dotsItem, dindex) in bannerAdvertLower"
								:key="dindex"
								:class="[bannerAdvertLowerCurr === dindex ? 'hhs-swiper-dots-item-curr' : '']"></view>
						</view>
						<view class="center" style="margin-top:10rpx;">

							<view style="margin-left:10rpx;margin-top:10rpx;flex-direction: row;">
								<image src="/static/tbbj.png" style="width:362rpx;" mode="widthFix"
									@click="navigatorTo('/pages/member/ucenter/help/infordetail?id=1')">
								</image>
								<image src="/static/pddbj.png" style="width:362rpx;margin-left: 6rpx;" mode="widthFix"
									@click="navigatorTo('/pages/member/ucenter/help/infordetail?id=2')">
								</image>
							</view>
						</view>
						<view class="toutiao" v-if="darenlist.length > 0">
							<view class="toutiao-box">
								<view class="toutiao-logo" @click="navigatorTo('/pages/member/ucenter/help')">
									<image src="/static/img/ic_home_headmsg.png" class="toutiao-logo-image"></image>
								</view>
								<swiper class="toutiao-swiper-slider" :vertical="true" :circular="true" :interval="2000"
									:autoplay="true">
									<swiper-item class="toutiao-swiper-slider-item" v-for="(daren, index) in darenlist"
										:key="index" @click="darenDetail(daren)">
										<text class="toutiao-swiper-slider-item-text">{{ daren.title }}</text>
									</swiper-item>
								</swiper>
								<view class="toutiao-youjiantou"><text
										class="hhs-iconfont toutiao-youjiantou-text">&#xe641;</text></view>
							</view>
						</view> 
						<view class="home_activity" v-if="activity.length > 0">
							<view class="home_activity_top" v-for="(item, index) in activity" :key="index">
								<view class="home_activity_top-one" v-if="item.nodeCount == 1">
									<image :src="item.bgImg" class="home_activity_top-one-image"
										:style="{ width: item.width + 'rpx', height: item.height + 'rpx' }"></image>
								</view>
								<view class="home_activity_top-tow" v-if="item.nodeCount > 1"
									:style="{ width: item.width + 'rpx', height: item.height + 'rpx', backgroundImage: item.bgImg }">
									<block v-for="(sub, sindex) in item.nodeDTOList" :key="sindex">
										<image :src="sub.posImage" class="home_activity_top-one-image"
											:style="{ width: sub.width + 'rpx', height: sub.height + 'rpx' }"></image>
									</block>
								</view>
							</view>
						</view>
 
						<view class=" s-nowrap s-flex-center  find_product_bg">
							<text class="find_product_bg_text">=</text>
							<text class="find_product_bg_text">奈斯优选</text>
							<text class="find_product_bg_text">=</text>
						</view>
					</header>
					<cell v-for="(item, index) in goodsListData" :key="index" class="s-tab-list-cell">
						<hhsProductItem @detail="hssdetail" :item="item" :index="index"></hhsProductItem>
					</cell>
					<header style="width: 750rpx;">
						<view class=" s-nowrap s-flex-center  find_product_bg">
							<text class="find_product_bg_text">=</text>
							<text class="find_product_bg_text">发现好货</text>
							<text class="find_product_bg_text">=</text>
						</view>
					</header>
					<cell v-for="(item, index) in tab.data" :key="index" class="s-tab-list-cell">
						<cstProductItem @detail="detail" :item="item" :index="index"></cstProductItem>
					</cell>

					<header class="tui-refresh" v-if="tab.isLoading || tab.data.length > 4">
						<text class="refresh-text">{{ tab.loadingText }}</text>
					</header>
				</waterfall>
			</swiper-item>
		</swiper> -->
</template>

<script>
	// import cstProductItem from '@/components/huahuasheng/nvue/hhs-product-item.nvue';
	// import hhsProductItem from '@/components/shop/hhs-product-item.nvue';
	// import cstRefresh from '@/components/huahuasheng/nvue/hhs-refresh.nvue';
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// //const _Dom = weex.requireModule('dom');
	// import mixins from './config/indexmixins.js';
	// import topAddDialog from '@/components/huahuasheng/nvue/hhs-adDialog.nvue';
	// import searchDialog from '@/components/huahuasheng/nvue/hhs-searchDialog.nvue';
	// // 缓存每页最多
	// const MAX_CACHE_DATA = 100;
	// // 缓存页签数量
	// const MAX_CACHE_PAGE = 3;
	// let hasOnload = false;




	import {
		mapGetters
	} from "vuex"
	import {
		baseUrlImgShow
	} from '@/common/config.js'
	import {
		noauthNewsdetail
	} from '@/api/index.js'
	var self;
	export default {
		computed: {
			...mapGetters(["userInfo"])
		},

		data() {
			return {
				shadowStyle: {
					color: "#ffffff",
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				},
				closeText: "More",
				itemsContent: {},
				forms: {
					detail: {
						title: "",
						updatetime: ""
					}
				},
				updatetime: '',
				title: '',
				goodsListData: [],
				imgs:""

				// statusBarHeight: '44rpx',
				// currentTab: 0,
				// tabItems: [],
				// cacheTab: [],
				// bannerAdvertLower: [],
				// bannerAdvertLowerCurr: 0,
				// bannerAdvert: [], // 广告位
				// darenlist: [],
				// showHeader: true,
				// navScorllLeft: 0,
				// getHomeTopIcon: {
				// 	leftIcon: '',
				// 	rightIcon: ''
				// },
				// activity: [],
				// ClipboardData:""
			};
		},
		filters: {
			formatDate: function(value) {
				var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var sdate = ("0" + date.getDate()).slice(-2);
				var hour = ("0" + date.getHours()).slice(-2);
				var minute = ("0" + date.getMinutes()).slice(-2);
				var second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				var result = year + "." + month + "." + sdate + " " + hour + ":" + minute //+ ":" + second;
				// 返回
				return result;
			},

		},
		onLoad(option) {
			self = this;

			console.log("option.id", option.id)
			//          self.itemsContent = self.formatRichText(self.forms.intro)
			this.getNoauthNewsList(option.id);
			// console.log("=======>", forms.title)
		},

		methods: {
			  addhttp(urls) {
			  var s =/(http|https):\/\/\S*/;
			  
			    return s.test(urls)
			 },
			getLocalTime(time) {
				var date = new Date(time * 1000);
				Y = date.getFullYear() + '-';
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				D = date.getDate() + ' ';
				h = (date.getHours() + 1 < 10 ? '0' + (date.getHours() + 1) : date.getHours() + 1) + ':';
				m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + ':';
				s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1);

				return Y + M + D + h + m + s;
			},
			getNoauthNewsList(id) {

				var res = self.$request.get({
						url: `${noauthNewsdetail}?id=` + id,
						loadingTip: 'more...'
					})
					.then(
						res => {
						 

							self.title = res.detail.title;
							  

							self.imgs =   self.addhttp(res.detail.img)==true?res.detail.img:baseUrlImgShow+res.detail.img;
								console.log("===r9999====>", self.imgs)
							self.updatetime = res.detail.updatetime;
							self.itemsContent = self.formatRichText(res.detail.intro)

						},
						res => {
							console.log('failure');
						}
					)
			},
			formatRichText(html) {
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			}
		}
	}




	// 999999


	// async init() {
	// 				console.log("============")
	// 				let {
	// 					data
	// 				} = await getApp().globalData.request.post('shop/goodsList');
	// 				console.log("============")
	// 				console.log(data)
	// 				this.goodsListData = data
	// 			},
	// 			async youxi() {
	// 				uni.navigateTo({
	// 					url: '/pages/game/eluosi'
	// 				});
	// 			},
	// 			async getList(index, action = 1) {
	// 				let activeTab = this.tabItems[index];

	// 				if (activeTab.isLoading) {
	// 					return;
	// 				}
	// 				if (action === 1) {
	// 					activeTab.page = 1;
	// 				}
	// 				activeTab.isLoading = true;
	// 				try {
	// 					var post = {
	// 						page: activeTab.page,
	// 						limit: activeTab.limit,
	// 						cateid: activeTab.id,
	// 						source: 'home'
	// 					};
	// 					const res = await getApp().globalData.request.post('product/goodslist', post);
	// 					console.log(res);
	// 					activeTab.isLoading = false;
	// 					if (action === 1) {
	// 						activeTab.data = [];
	// 					}

	// 					if (res.code == 200) {
	// 						res.data.forEach(item => {
	// 							if (item.goods_numiid) {
	// 								activeTab.data.push({
	// 									id: this.newGuid() + item.goods_numiid,
	// 									goods_picture: item.goods_picture,
	// 									goods_dtitle: item.goods_dtitle,
	// 									goods_title: item.goods_title,
	// 									goods_sale: item.goods_sale,
	// 									coupon_money: item.coupon_money,
	// 									goods_type: item.goods_type,
	// 									goods_price: item.goods_price,
	// 									goods_yprice: item.goods_yprice,
	// 									goods_numiid: item.goods_numiid,
	// 									goods_info: item.goods_info,
	// 									tkrates: item.tkrates,
	// 									goods_todaysale: item.goods_todaysale,
	// 									tkmoney: item.tkmoney,
	// 									goods_shoptype: item.goods_shoptype
	// 								});
	// 							} else {
	// 								activeTab.data.push(item);
	// 							}
	// 						});
	// 						activeTab.refreshing = false;
	// 					} else {
	// 						activeTab.loadingText = "加载完毕"
	// 					}
	// 				} catch (e) {
	// 					activeTab.isLoading = false;
	// 					activeTab.refreshing = false;
	// 				}

	// 				if (action == 1) {
	// 					activeTab.refreshing = false;
	// 					activeTab.refreshText = '已刷新';
	// 					activeTab.refreshFlag = false;
	// 					setTimeout(() => {
	// 						// TODO fix ios和Android 动画时间相反问题
	// 						this.pulling = false;
	// 					}, 500);
	// 				}
	// 				setTimeout(r => {
	// 					activeTab.refreshing = false;
	// 				}, 3000);
	// 			},
	// 			detail(e) {
	// 				this.navigatorTo(`/pages/detail/goodsinfo?itemid=${e.itemid}&goods_type=${e.goods_type}`);
	// 			},
	// 			hssdetail(e){
	// 				console.log(e);
	// 				uni.navigateTo({
	// 					url: `/pages/special/shop/details?itemid=${e.itemid}&goods_type=${e.goods_type}`
	// 				});
	// 			},
	// 			navigateTo(url, isLogin) {
	// 				console.log(url);
	// 				if (isLogin == true && !this.hasLogin) {
	// 					console.log(url)
	// 					uni.navigateTo({
	// 						url: '/pages/member/index'
	// 					});
	// 					return;
	// 				}

	// 				uni.navigateTo({
	// 					url: url
	// 				});
	// 			},
	// 			newGuid() {
	// 				let s4 = function() {
	// 					return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
	// 				};
	// 				return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4())
	// 					.toUpperCase();
	// 			},
	// 			loadMore(e) {
	// 				var activeTab = this.tabItems[this.currentTab];
	// 				activeTab.page = activeTab.page + 1;
	// 				this.getList(this.currentTab, 2);
	// 			},
	// 			onrefresh(e) {
	// 				var tab = this.tabItems[this.currentTab];
	// 				if (!tab.refreshFlag) {
	// 					return;
	// 				}
	// 				tab.refreshing = true;
	// 				tab.refreshText = '正在刷新...';
	// 				this.pulling = true;
	// 				this.getList(this.currentTab);
	// 			},
	// 			onpullingdown(e) {
	// 				var tab = this.tabItems[this.currentTab];
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
	// 			async scrollNavBar(index) {
	// 				//let sizeData = await this.getNavRect(this.$refs['navItem' + index][0]);
	// 				//var offset = index * sizeData.width;
	// 				//this.navScorllLeft = offset;
	// 			},
	// 			//获取navbar位置信息
	// 			switchTab(index) {
	// 				this.scrollNavBar(index);
	// 				if (this.tabItems[index].data.length === 0) {
	// 					this.getList(index);
	// 				}
	// 				if (this.currentTab === index) {
	// 					return;
	// 				}
	// 				// 缓存 tabId
	// 				if (this.tabItems[this.currentTab].data.length > MAX_CACHE_DATA) {
	// 					let isExist = this.cacheTab.indexOf(this.currentTab);
	// 					if (isExist < 0) {
	// 						this.cacheTab.push(this.currentTab);
	// 					}
	// 				}
	// 				this.currentTab = index;
	// 				// 释放 tabId
	// 				if (this.cacheTab.length > MAX_CACHE_PAGE) {
	// 					let cacheIndex = this.cacheTab[0];
	// 					this.clearTabData(cacheIndex);
	// 					this.cacheTab.splice(0, 1);
	// 				}
	// 			},
	// 			clearTabData(e) {
	// 				this.tabItems[e].data.length = 0;
	// 				this.tabItems[e].loadingText = '加载更多...';
	// 			},
	// 			ontabtap(index) {
	// 				this.switchTab(index);
	// 			},
	// 			ontabchange(e) {
	// 				let index = e.target.current || e.detail.current;
	// 				this.switchTab(index);
	// 			},
	// 			toCategory(item) {
	// 				getApp().globalData.request.navigateTo({
	// 					target: item.target,
	// 					url: item.link,
	// 					title: item.title,
	// 					desc: item.desc_info,
	// 					param: item.params,
	// 					hasLogin: item.hasLogin || 0
	// 				});
	// 			},
	// 			darenDetail(item) {
	// 				this.navigatorTo(item.url);
	// 			},
	// 			navigatorTo(url) {
	// 				uni.navigateTo({
	// 					url: url
	// 				});
	// 			},
	// 			jumpAdList() {
	// 				console.info("jumpAdList");
	// 				if (!this.hasLogin) {
	// 					uni.navigateTo({
	// 						url: '/pages/member/ucenter/signIn'
	// 					});
	// 					return;
	// 				}
	// 				uni.navigateTo({
	// 					url: '/pages/game/index'
	// 				});
	// 			},
	// 			wap_sigin() {
	// 				if (this.hasLogin == false) {
	// 					this.navigatorTo('/pages/member/ucenter/signIn');
	// 				} else {
	// 					this.navigatorTo('/pages/member/agent/checkin');
	// 				}
	// 			},
	// 			wap_search() {
	// 				this.navigatorTo('/pages/search/index');
	// 			},
	// 			navigateBack() {
	// 				uni.navigateBack();
	// 			},
	// 			bannerAdvertLowerChange(e) {
	// 				const {
	// 					current
	// 				} = e.detail;
	// 				this.bannerAdvertLowerCurr = current;
	// 			},
	// 			swiperScroll(e) {
	// 				var contentOffset = e.contentOffset;
	// 				var tab = this.tabItems[this.currentTab];
	// 				if (contentOffset.y < (this.currentTab == 0 ? -380 : -100)) {
	// 					tab.showHeader = false;
	// 				} else {
	// 					tab.showHeader = true;
	// 				}
	// 			}
</script>

<style scope>
	/* .new-home {
		flex: 1;
		flex-direction: column;

		background-color: #f6f6f6;
	}

	.header-home {
		background-color: #ffffff;
	}

	.index_header {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
	}

	.wap_left_icon {
		width: 80rpx;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.wap_left_icon-image {
		text-align: center;
		justify-content: center;
		align-items: center;
		width: 70rpx;
		height: 70rpx;
	}

	.wap_center_search {
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
	}

	.wap_search_icon {
		height: 70rpx;
		line-height: 70rpx;
		flex: 1;
		background-color: #f5f5f5;
		color: #8a8a8a;
		border-radius: 50rpx;
		padding-left: 20rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
		font-size: 26rpx;

	}

	.wap_right_icon {
		width: 120rpx;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.wap_right_icon-image {
		text-align: center;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
	}

	 
	.new-home-top-nav {
		flex-direction: row;
		flex-wrap: nowrap;
		height: 80rpx;
	}

	.new-home-top-nav-move {
		width: 100rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}

	.new-home-top-nav-move-text {
		width: 100rpx;
		color: #de0101;
		font-size: 34rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		text-align: center;
	}

	.category-scroll {
		width: 650rpx;
		height: 80rpx;
		flex-direction: row;
	}

	.category-tab-item {
		flex-wrap: nowrap;
		text-align: center;
		width: 100rpx;
	}

	.category-tab-item-title {
		width: 100rpx;
		text-align: center;
		color: #565656;
		//color: rgba(255, 255, 255, 0.65);
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.category-tab-item-title-active {
		color: #de0101;
		border-bottom-color: #de0101;
		border-bottom-width: 4rpx;
	}

	.scroll-v {
		flex: 1;
		flex-direction: column;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		flex: 1;
		flex-direction: column;
	}
 
	.nav-swiper-item {
		flex-wrap: wrap;
		flex-direction: row;
		background-color: #ffffff;
		padding-top: 5rpx;
	}

	.nav-swiper {
		flex: 1;
		background-color: #ffffff;
		height: 360rpx;
	}

	.nav-item {
		padding-top: 20rpx;
		width: 149rpx;
		align-items: center;
	}

	.nav-item-image {
		width: 90rpx;
		height: 90rpx;
	}

	.nav-item-text {
		line-height: 60rpx;
		height: 60rpx;
		text-align: center;
		font-size: 26rpx;
		padding-top: 10rpx;
		color: #515a6e;
		lines: 1;
	}

	.swiper-pagination {
		padding-top: 20rpx;
		padding-bottom: 10rpx;
		background-color: #ffffff;
	}

	.hhs-swiper-dots-item {
		width: 30rpx;
		height: 6rpx;
		background-color: #c5c8ce;
	}

	.hhs-swiper-dots-item-curr {
		background-color: #f23c39;
	}

 
	.swiper-banner {
		height: 310rpx;
		background-color: #f2f2f2;
	}

	.swiper-banner-item {
		flex: 1;
		height: 310rpx;
	}

	.swiper-banner-item-image {
		flex: 1;

		height: 310rpx;
	} */
	::v-deep uni-rich-text div {
		color: #fff
	}
	.content_app_img{
		width: 94%;
		height: 400upx;
		margin: 0 auto;
		
	}
		.content_app_img image{
			width: 100%;
			height: 100%;
		}
</style>
