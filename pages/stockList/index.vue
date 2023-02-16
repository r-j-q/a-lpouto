<template>
	<view class="content_app_style_content content_app">
		<view>
			<!-- #ifdef APP-PLUS -->
			<wrap-version-update id="62c534057696a80001ec9c0d" @check="onHandleCheck" @error="onHandleError"
				@finish="onHandleFinish">
			</wrap-version-update>
			<!-- #endif -->
		</view>
		<view class="">
			<!-- <btnIndex :dataList="list" class="rotaBtn" :leftAndright1Deg="15" :leftAndright2Deg="25" -->
			<btnIndex   class="rotaBtn" :leftAndright1Deg="15" :leftAndright2Deg="25"
			 @change="changeHandle" @gotoHandle="gotoHandle"/>
			<!-- <swiper class="swiper" circular indicator-dots autoplay="true" style="height: 180px;padding: 10px;">
				<swiper-item class="image">
					<image @click="jumpToDescribe(stockList[0])" :src="bannerOne" mode="widthFix"
						style="width: 100%;border-radius: 10px;"></image>
				</swiper-item>
				<swiper-item @click="jumpToDescribe(stockList[1])" class="image">
					<image :src="bannerTwo" mode="widthFix" style="width: 100%;border-radius: 10px;"></image>
				</swiper-item>
			</swiper> -->
		</view>
		<!-- 	<view class="tab-list-style-view">
			<view class="" v-for="(item,index) in stockList" :key="index">

				<view class="" v-for="(items,i) in item.child" :key="i">
					<view class="">
						<text class="workingSignalsContent overflow3 marTop20" @click.stop="item.vip == false ?jumpToDescribe(item):handleStateNativeToDetail(item,items)">
							{{items.intro}}
						</text>
					</view>
				</view> 

			</view>
		</view> -->
		<scroll-view class="content_app_style_content" scroll-y="true" @scrolltoupper="scrolltoupper">
			<view>
				<collapse :other="other" :stockList="stockList" @handleStockList="handleStockList" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes;
	import {
		userIndex,
		noauthIndex
	} from "@/api/index.js";

	import collapse from "@/components/collapse/index.vue"; 
	     import btnIndex from '@/components/peng-3DRotateBtn/peng-3DRotateBtn'
	export default {
		name: "index",
		components: {
			collapse, 
			btnIndex
		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return { 
				stockList: [],
				other: require("../../../static/images/other/like.png"),
				bannerOne: require("../../../static/images/other/bannerOne.png"),
				bannerTwo: require("../../../static/images/other/bannerTwo.png"),
			};
		},
		watch: {},
		onShow() {
			let _this = this;
			_this.getStockList();
		},
		mounted() {},

		methods: {
			// 旋转事件
			changeHandle(index){
			    console.log(index, 'index')
			},
			// 点击事件
			gotoHandle(index){
			    console.log(index, 'index')
			},
			onHandleCheck(e) {
				console.log("handleCheck", e);
			},
			onHandleError(e) {
				console.log("handleError", e);
			},
			onHandleFinish(e) {
				console.log("handleFinish", e);
			},
			scrolltoupper() {},
			handleStockList(item, index) {
				var _this = this;
				_this.stockList[index].active = !_this.stockList[index].active;
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

							_this.stockList = [{
									title:  "Wealth Quarterly Guide",
									child: res.report,
									active: true,
									id: 1,
									vip: res.report_vip_end
								},
								{
									title:  "Stock Vane",
									child: res.smartmoney,
									active: true,
									id: 2,
									vip: res.sm_vip_end
								},
								{
									title:  "Plouto",
									active: true,
									id: 3,
									vip: res.vip_end,
									childTrendList: [{
											title:  "Swing Signals",
											child: res.short,
											id: 3


										},
										{
											title:  "Trend Signals",
											child: res.long,
											id: 4
										}
									]
                                } 
							];
							console.log("======>", _this.stockList);
						},
						(res) => {}
					);
			},
			 
		},
	};
</script>
<style scoped>
	.content_app_style_content {
		min-height: 100vh;
		overflow-y: scroll;
		padding-bottom: 200upx;
	}

	::v-deep .uni-swiper-dot.uni-swiper-dot-active {
		background-color: #fff;
		background: #fff;
	}

	.tab-list-style-view {
		color: #B2620A;
		width: 94%;
		margin: 0 auto;
		padding: 1upx;
	}

	.text-aligin-center {
		text-align: center;
	}
</style>
