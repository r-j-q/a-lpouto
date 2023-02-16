<template>
	<view class="content_app">
		<u-tabs lineColor="#4ca594" :activeStyle="{
		    color: '#4ca594',
		    fontWeight: 'bold',
		    transform: 'scale(1.2)'
		}" :list="marhetList" @click="handleMarhetList"></u-tabs>
		<!-- <view>
			<view class="bannerImage s-flex-vcenter">
				<image src="/static/img/nview/brand-header.png" class="brand-header"></image>
		
				<image :src="info.brand_logo" class="s-flex-center brand_logo" placeholder="/static/img/ic_default_placeholder.png"></image>
			</view>
			<view class="banner-info ">
				<view class="">
					<text class="s-text">{{ info.tb_brand_name }}</text>
					<text class="s-desc s-black6 s-wrap">{{ info.introduce }}</text>
				</view>
			</view>
			<view class="" v-for="(item,index) in product_list" :key="index">
				<row-roduct :item="item" @detail="detail" :index="index"></row-roduct>
			</view>
		</view> -->
		<!-- uni.$u.date('1585926095536', 'yyyy-mm-dd') -->
		 <view class="" v-if="marketCountEvent===1">
		 	<uni-list v-for="(item,index) in noauthNewsList" :key="index">
		 		<uni-list-item link="navigateTo" @click="navigateToDetail(item)" showArrow :title="item.title" ellipsis="4"
		 			:thumb="imageList[index%5]" thumb-size="lg" :note="item.updatetime"></uni-list-item>
		 	</uni-list>
			<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
				:nomore-text="nomoreText" />
		 </view>
		 
	</view>

</template>

<script>
	// import rowRoduct from "@/components/huahuasheng/nvue/hhs-product-item-row.nvue"
	// const $Request = getApp().globalData.request;
	import {
		mapGetters
	} from "vuex"
 
	import {
		noauthNews
	} from '@/api/index.js'
	var self;
	export default {
		computed: {
			...mapGetters(["userInfo"])
		},
		components: {

		},
		data() {
			return {
				marketCountEvent: 1,
				marhetList: [{
					name: 'Event',
					id: 1
				}, {
					name: 'Brief News',
					id: 2
				}],
				loadingText: "loading",
				loadmoreText: "loading",
				nomoreText: "----no more----",
				status: "loading",
				totleSize: 0,
				page: 1,
				noauthNewsList: [],
				imageList: [
					require('../../../static/images/zx/shen_1.jpeg'),
					require('../../../static/images/zx/shen_2.jpeg'),
					require('../../../static/images/zx/shen_3.jpeg'),
					require('../../../static/images/zx/shen_4.jpeg'),
					require('../../../static/images/zx/shen_1.jpeg')
				]
			};
		},
		onReachBottom() {
			// more/loading/noMore
			if (self.noauthNewsList.length >= self.totleSize) return;
			self.status = 'loading';
			self.page++;
			setTimeout(() => {
				self.getNoauthNewsList()
				if (self.noauthNewsList.length >= self.totleSize) self.status = 'nomore';
				else self.status = 'loading';
			}, 1000)

			// 停止下拉刷新滚动
			uni.stopPullDownRefresh()
		},
		onLoad(option) {
			// if (!e.brand_id) {
			// 	uni.navigateBack();
			// } else {
			// 	this.itemid = e.brand_id;
			// 	this.loadData();
			// }
			self = this;
			self.getNoauthNewsList()

		},
		onShow() {

		},
		methods: {
			handleMarhetList(item) {
				this.marketCountEvent = item.id
			},
			// loadData() {
			// 	$Request.post('brand/brandinfo', { id: this.itemid }).then(res => {
			// 		if (res.code == 200) {
			// 			this.info = res.data;

			// 			uni.report &&
			// 				uni.report('BrandDetail', {
			// 					brandId: this.itemid,
			// 					title: res.data.tb_brand_name
			// 				});

			// 			this.loadGoods();
			// 			setTimeout(r => {
			// 				this.showContent = true;
			// 			}, 500);
			// 		} else {
			// 			uni.showToast({
			// 				title: res.msg || '品牌不存在',
			// 				icon: 'none'
			// 			});
			// 			setTimeout(r => {
			// 				uni.navigateBack();
			// 			}, 500);
			// 		}
			// 	});
			// },
			// loadGoods() {
			// 	$Request.post('brand/brandGoods', { brand_id: this.itemid, page: this.page }).then(res => {
			// 		if (res.code == 200) {
			// 			res.data.forEach(d => {
			// 				this.product_list.push(d);
			// 			});
			// 		}
			// 	});
			// },
			// detail(e) {
			// 	uni.navigateTo({
			// 		url: `/pages/detail/goodsinfo?itemid=${e.itemid}&goods_type=${e.shopType}`
			// 	});
			// }

			functionDate(v) {

				// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
				var dates = new Date(v * 1000);
				var Y = dates.getFullYear() + '-';
				var M = (dates.getMonth() + 1 < 10 ? '0' + (dates.getMonth() + 1) : dates.getMonth() + 1) + '-';
				var D = dates.getDate() + ' ';
				var h = dates.getHours() + ':';
				var m = dates.getMinutes() + ':';
				var s = dates.getSeconds();
				var ds = Y + M + D + h + m + s;
				return ds;

			},
			navigateToDetail(item) {
				uni.navigateTo({
					url: getApp().getUrl("/pages/consultingService/detail?id=" + item.ID)
				})
			},
			getNoauthNewsList() {

				var res = self.$request.get({
						url: `${noauthNews}?page=` + self.page,
						loadingTip: 'more...'
					})
					.then(
						res => {
							self.totleSize = res.total;
							res.list.forEach((item) => {
								item.updatetime = self.functionDate(item.updatetime)
							})

							self.noauthNewsList.push(...res.list);
							console.log('more 列表', res.list);

							self.totleSize = self.noauthNewsList.length
							if (self.noauthNewsList.length >= self.totleSize) {
								self.status = 'nomore';
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
	/* .bannerImage {
		width: 750rpx;
		height: 300rpx;
		position: relative;
	}
	.banner-info {
		background-color: #ffffff;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	.brand-header{
		width: 750rpx;
		flex: 1;
	}
	.brand_logo{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		position: absolute;
		top: 100rpx;
	} */
	::v-deep .uni-list-item {
		padding: 20rpx 0;
		background-color: #191428 !important;
		border: none;
		position: initial;
		color: #fff !important;
	}

	::v-deep .uni-list-item span {
		color: #fff !important;
	}

	::v-deep .uni-list-item__content-note span {
		color: #7b7888 !important;
	}

	::v-deep .uni-list--border-top {
		height: 0px;
	}

	::v-deep .uni-list--lg {
		width: 120upx;
		height: 120upx;
	}
</style>
