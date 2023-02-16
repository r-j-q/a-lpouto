<template>

	<view class="content_app width100">
		<image :src="descript1" mode="widthFix"></image>
		<describe :id="item.id"></describe>
		<view class="pay-width" v-if="item.id==1|| item.id==2">
			<pay :payList="payList" v-for="(item,index) in toPayList" :unit="unit" :key="index" :id="item.ID"
				:money="item.cur_price" @getMoney="handleGetChildMoney" />
		</view>

		<view class="pay-width" v-if="item.id==3">
			<view class="" v-for="(item,i) in toPayList" :key="i">
				<pay :payList="payList" v-if="i != 2" :id="item.ID" :unit="unitList[i]" :money="item.cur_price"
					@getMoney="handleGetChildMoney" />
				<payHot :payList="payList" v-else :id="item.ID" :unit="unitList[i]" :money="item.cur_price"
					@getMoney="handleGetChildMoney" />
			</view>

		</view>


		<uni-popup ref="popup" :type="type" :animation="true" :maskClick="true">
			<view class="propsUp">
				<view class="disRowAroundaround borderBottom1" v-for="(items,index) in payList" :key="index"
					@click="handleToPayOrder(items)">
					<view class="paddingTB weight disRowAroundcenter">
						<image :src="items.logo" mode="aspectFill" class="logo-style"></image>
						{{items.title}}
					</view>
					<image class="down_icon_view collaps_header_rights" :src='down_icon' />
				</view>
			</view>
		</uni-popup>

	</view>

</template>

<script>
	import describe from "@/components/collapse/button/describe.vue"
	import pay from "@/components/collapse/button/pay.vue"
	import payHot from "@/components/collapse/button/payHot.vue"
	import {
		mapGetters,
		mapActions
	} from "vuex"
	var app = getApp().globalData;
	import {
		goodsList,
		orderCreate,
		noauthGetpayway
	} from '@/api/index.js'
	var loginRes;


	export default {
		name: 'index',
		components: {
			describe,
			pay,
			payHot
		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				type: 'bottom',
				down_icon: require("../../static/images/other/down_icon.png"),
				money: 199,
				moneys: 1990,
				item: {},
				descript1: require("../../static/images/other/descript1.png"),
				descript2: require("../../static/images/other/descript2.png"),
				descript3: require("../../static/images/other/descript3.png"),
				toPayList: [],
				unit: "M",
				unitList: ["M", "M", "Y"],
				payList: [],
				googlepay: "https://stock-plouto.com/assets/img/googlepay.jpg",
				paypal: "https://stock-plouto.com/assets/img/paypel.png",
				iosImg: "https://stock-plouto.com/assets/img/ios.jpeg",
				ids: ""
			}

		},
		watch: {

		},
		onLoad(options) {

			this.item = JSON.parse(decodeURIComponent(options.item));
			console.log("123", this.item)
			if (this.item == 1) {
				this.unit = "M"
			}
			if (this.item == 2) {
				this.unit = "Q"
			}

			this.onHandlegetGoodsList(this.item);
			this.handleNoauthGetpayway()
		},
		mounted() {

		},
		onShow() {

		},
		methods: {
			...mapActions({
				setUserInfo: "setUserInfo"
			}),
			handleToPayOrder(item) {
				if (
					item.title == "Stripe"
				) {
					uni.navigateTo({
						url: "/pages/stripe/index"
					})

				} else {
					this.onHandlegetOrderCreate(item);
				}


				console.log("----------->", item)
			},
			async handleNoauthGetpayway() {
				let system = uni.getSystemInfoSync();
				var res = await this.$request.get({
						url: noauthGetpayway,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							let lists = res.list;
							lists.forEach((item) => {
								if (item.title == "googlepay") {
									item.logo = this.googlepay
								}
								if (item.title == "paypal") {
									item.logo = this.paypal
								}
								if (item.title == "applepay") {
									item.logo = this.iosImg
								}
								if (system.platform === 'android') {
									if (item.platform == 'android') {
										this.payList.push(item)
									}
									console.log("ios", this.payList)
								} else if (system.platform === 'ios') {

									if (item.platform == 'ios') {
										if (item.title == "applepay") {
										     this.payList.push(item)
										}
										 
									}
									console.log("ios====>", this.payList)
								}
							})
							// // #ifdef APP
							// this.payList.push({
							// 	"ID": 100,
							// 	"title": "Stripe",
							// 	"status": 1,
							// 	"platform": "android",
							// 	"logo": "https://stock-plouto.com/assets/img/stripe.png"
							// })
							// // #endif

						},
						res => {}
					);
			},
			handleGetChildMoney(e) {
				console.log("6666666666666------->", e)
				this.userInfo.goodsId = e;
				this.ids = e
				this.setUserInfo(this.userInfo)
				this.$refs['popup'].open();

			},
			onHandlegetOrderCreate(e) {
				let _this = this;

				var res = _this.$request
					.get({
						url: `${orderCreate}?paytype=${e.title}&goods_id=${_this.ids}&payway=1`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							console.log("==paypal===========>", res)

							if (e.title == "paypal") {
								//#ifdef APP-PLUS
								if (uni.getSystemInfoSync().platform === 'ios') {
									plus.runtime.openURL(encodeURI(`${res.pay_url}`))
								} else {
									plus.runtime.openURL(res.pay_url);
								}
								//#endif
								// #ifdef H5
								uni.navigateTo({
									url: `/pages/describe/webView?url=${res.pay_url}`
								})
								// #endif
							} else if (e.title == "applepay") {
								console.log("==========>", res)
								getApp().applePay(res.apple_id, res.id);

								//支付 https://www.eoway.cn/article/1626521648.html
							}
							//  else if (e.title == "googlepay") {
							// 	getApp().getGoogPay(res.amount, res.order_id);
							// } 



						},
						res => {}
					);
			},
			async onHandlegetGoodsList(item) {
				var that = this;
				let type = 2;
				if (item.id == 1) {
					type = 2
				} else if (item.id == 2) {
					type = 0
				} else if (item.id == 3 || item.id == 4) {
					type = 1
					// type = 2
				}
				var res = await that.$request
					.get({
						url: `${goodsList}?type=${type}`,
						loadingTip: 'loading...'
					})
					.then(
						res => {
							let resList = res.list
							resList.forEach((item) => {
								item.cur_price = item.cur_price / 100
							})
							that.toPayList = resList
							console.log("循环支付方式", res.list)
						},
						res => {}
					);
			},

		}
	}
</script>
<style scoped>
	.pay-width {
		width: 90%;
		margin: 0 auto;
		margin: 20px 0;
	}

	.width100 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	/* .width100 image {
		margin-bottom: 40upx;
	} */

	.fixedBottom {
		padding-top: 40upx;
		height: 120upx;
		position: fixed;
		bottom: 0upx;
		left: 0px;
		right: 0px;
		padding: 0 20upx;
	}
</style>
