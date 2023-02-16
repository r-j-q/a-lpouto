<template>
	<view class="scroll-view-item-border content_app">
		<u-tabs :list="list2" @change="changeTabs"></u-tabs>

		<view class="uni-padding-wrap uni-common-mt">
			<view>
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

							<!-- <view class="displayRowCol">
								<view class="fontSize15 weight textColor">
									{{flag.CreatedAt.substring(0,10)}}
								</view>

							</view> -->
						</view>
					</view>
					<view v-if="id==3 || id==4" class="collaps_content_padding borderBottoms"
						v-for="(flag,i) in moreList" :key="i" @click="onHandleJumpToDetails(flag)">

						<view class="disRowAroundcenter">

							<view class="collaps_l textColor19" :class="flag.type==0 ? 'bggreen':'bgred'">
								{{flag.type==0 ?"C" :"P"}}
							</view>
							<view class="collaps_c mrl mrr">
								{{flag.stock_no}}
							</view>
							<view class="collaps_h">
								{{flag.CreatedAt.substring(0,10)}}
							</view>
						</view>
						<view class="disRowcCenter ptop">
							<view class="flex1 displayRowCol  ">
								<view class="fontSize15 weight textColorff">
									${{flag.buy_price}}
								</view>
								<view class="textColorff fontSize13">
									Buy
								</view>
							</view>
							<view class="flex1 displayRowCol">
								<view class="  fontSize15 weight textColorff">
									${{flag.sale_price}}
								</view>
								<view class="textColorff fontSize13">
									Sell
								</view>
							</view>
							<view class="flex1 displayRowCol">
								<view class="fontSize15 weight textColor">
									{{flag.reach}}%
								</view>
								<view class="textColor9e fontSize13">
									Reach
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
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
		getStockBase
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
				moreList: [],
				is_end: 0,
				page: 1,
				isActive: true,
				id: 1,
				items: {},
				list2: [{
					name: '当前'
				}, {
					name: '历史'
				}]
			};
		},

		onLoad(option) {
			self = this;
			let item = JSON.parse(decodeURIComponent(option.item));
			uni.setNavigationBarTitle({
				title: item.title
			});
			console.log("===more===>", item.id)
			self.id = item.id
			self.items = item

			self.getStockBaseList()
			if (item.id != 2 && item.id != 1) {
				self.getStockBaseList(1)
			}

		},
		onShow() {

		},
		methods: {
			changeTabs(e) {
				self.moreList=[];
				self.page=1;
				self.isActive=true;
				if(e.index==1){
					self.is_end=1
				 }else{
					self.is_end=0
				}
		       self.getStockBaseList(self.id);
				 
			 
				// self.isActive
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
					self.getStockBaseList(self.id)
				}

			},
			scrolltoupper() {},
			getStockBaseList(v) {
				console.log("传入more的ID=", self.id)
				let url = getlist;
				let type_id = 1; 
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
	.scroll-view-item-border {
		padding: 20upx;
		/* height: 100%; */
		min-height: 100%; 
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

	.top {
		height: 200px;
		width: 100%;
	}

	.center {
		height: 200px;
		width: 100%;
		background: green;
	}

/* 	.bottom {
		height: 200px;
		width: 100%;
		background: blue;
	} */

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.collapse_botton_reduis {
		width: 100%;
		border-radius: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10upx 0;
		font-size: 28upx;
	}
</style>
