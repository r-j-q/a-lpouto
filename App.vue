<script>
	// db49d0da61306fe0b6b0d2328b600e3a63b2b120
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';
	// const systemInfo = uni.getSystemInfoSync();
	// const statusBarHeight = Math.round((750 / systemInfo.screenWidth) * systemInfo.statusBarHeight);
	// import request from './common/httpRequest.js';
	// import cache from './common/cache.js';
	// import plusListener from '@/common/app-plus/plus-listener.js';
	// import plusHelper from '@/common/helper.js';
	// var bugly = uni.requireNativePlugin("wrs-bugly");

	var iapChannel = null;
	const productIds = ['stockguide01', 'stockguide02', 'stockguide03', 'stockguide04',
		'stockguide05'
	];
	import {
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				// if (plus.push.getAllMessage()) {
				// 	plus.push.clear();
				// }
				// systemInfo: systemInfo,
				// statusBarHeight: statusBarHeight + 'rpx',
				// statusBarHeightNum: statusBarHeight,
				// request: request,
				// cache: cache
			}
		},
		computed: {
			// ...mapState(['hasLogin', 'openid', 'userinfo'])
			...mapGetters(['userInfo']),
		},
		onLaunch: function() {
			// console.log('App Launch')
			// var options = {};
			// switch (uni.getSystemInfoSync().platform) {
			// 	case 'android':
			// 		options.appId = '79b1399ae4';

			// 		break;
			// 	case 'ios':
			// 		options.appId = '79b1399ae4';
			// 		break;
			// 	default:
			// 		break;
			// }
			// options.style =
			// "bannerNoTitle"; 
			// bugly.init(options); 
			// if (process.env.NODE_ENV === 'development') {
			// 	console.log("????????????")
			// 	uni.setKeepScreenOn({
			// 		keepScreenOn: true
			// 	});
			// }
			// const domModule = weex.requireModule('dom');
			// domModule.addRule('fontFace', {
			// 	fontFamily: 'huahuashengAppIcon',
			// 	src: "url('./static/huahuashengAppIcon.ttf')"
			// });
			// this.getDeviceInfo();



			// plus.screen.lockOrientation('portrait-primary'); //??????????????????
			// plusListener.checkArguments(); // ??????????????????
			// plusListener.newintentListener(); // ??????????????????
			// plusListener.pushListener(); // ?????????????????????
			//#ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform === 'ios' && this.userInfo) {
				this.initIAP()
			}
			//#endif
		},
		methods: {
			randomString(e) {
				e = e || 32;
				var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
					a = t.length,
					n = "";
				for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
				return n
			},
	// 		paymentGoogle() {

	// 			plus.payment.getChannels((providers) => {
	// 				var randomData = this.randomString(32);
	// 				var totalPrice = "1.00";
	// 				var environment = 1; // ?????? 1 ???product  3???test
	// 				let provider = providers.find(function(e) {
	// 					return e.id === "google-pay";
	// 				});

	// 				let paymentMethodType = "CARD";

	// 				let cardPaymentMethodConfig = {
	// 					environment: environment, // ?????? 1 ???product  3???test
	// 					paymentMethodType: paymentMethodType, //?????? CARD???PAYPAL
	// 					existingPaymentMethodRequired: false, //?????? ???????????????true??????????????????????????????allowedPaymentMethods?????????????????????isReadyToPay????????????true???
	// 					currencyCode: "USD", //??????
	// 					countryCode: "US", //????????????????????????
	// 					transactionId: randomData, //??????????????????googlepay?????????????????????
	// 					totalPriceStatus: "FINAL", //??????  NOT_CURRENTLY_KNOWN???ESTIMATED???FINAL
	// 					totalPrice: totalPrice, //?????? ??????????????????^[0-9]+(\.[0-9][0-9])?$
	// 					// totalPriceLabel: "100heelo", //??????
	// 					checkoutOption: "DEFAULT", //?????? DEFAULT???COMPLETE_IMMEDIATE_PURCHASE
	// 					// merchantName: "Example Merchant", //??????
	// 					emailRequired: true, //??????
	// 					shippingAddressRequired: true, //??????
	// 					shippingPhoneNumberRequired: false, //??????
	// 					allowedCountryCodes: ["US", "GB"], //??????
	// 					allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"], //??????
	// 					allowedCardNetworks: ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"], //??????
	// 					allowPrepaidCards: false, //??????
	// 					// allowCreditCards:false,//??????  
	// 					assuranceDetailsRequired: false, //??????
	// 					billingAddressRequired: true, //??????
	// 					billingAddressParametersFormat: "FULL", //?????? MIN
	// 					phoneNumberRequired: false, //??????
	// 					tokenizationSpecificationType: "DIRECT", //?????? PAYMENT_GATEWAY???DIRECT
	// 					gateway: "", //PAYMENT_GATEWAY?????????
	// 					gatewayMerchantId: "", //PAYMENT_GATEWAY?????????
	// 					protocolVersion: "ECv2", //DIRECT?????????
	// 					publicKey: "BBRljhN6F6IO86baW7JZKbOLW8Em0TGMaidIva/U+e8qefYnMX8Pu5H6EILv+aJJHzgG+WLnlKHgkF0bJjJCUuQ=", //DIRECT?????????
	// 					buildTokenizationSpecification: { //?????????????????????????????????????????????????????????tokenizationSpecification??????,?????????????????????????????????`tokenizationSpecificationType`???`gateway`???`gatewayMerchantId`???`protocolVersion`???`publicKey`?????????(HBuilderX 3.5.1+??????)
	// 						"type": "PAYMENT_GATEWAY",
	// 						"parameters": {
	// 							"gateway": "custom-gateway",
	// 							"gatewayMerchantId": "mock-gatewayMerchantId"
	// 						}
	// 					}
	// 				};
 

	// 				let statement;

	// 				if (paymentMethodType === "CARD") {
	// 					statement = {
	// 						...cardPaymentMethodConfig
	// 					};
	// 				} else {
	// 					// statement = {
	// 					// 	...paypalPaymentMethodConfig
	// 					// };
	// 				}

	// 				console.log(JSON.stringify(statement));

	// 				plus.payment.request(provider, statement, (result) => {
	// 					console.log("???????????? :" + JSON.stringify(result));
	// 				}, (e) => {
	// 					console.log("??????????????? " + JSON.stringify(e));
	// 				})
	// 			});

	// 		},
			// ...mapMutations(['getUseriInfo', 'login', 'getUIStyle']),
			// isIos() {
			// 	return systemInfo.platform === 'android' ? false : true;
			// },
			// isAndroid() {
			// 	return systemInfo.platform === 'ios' ? false : true;
			// },
			// async getDeviceInfo() {
			// 	let uuid = '';
			// 	if (this.isIos()) {
			// 		uuid = plusHelper.getIdfa();
			// 	} else {
			// 		var device = await plusHelper.getDeviceInfo();
			// 		try {
			// 			uuid = device.uuid[0];
			// 		} catch (e) {
			// 			uuid = e.imei.split(',');
			// 		}
			// 	}
			// 	this.$SysCache.put('plus_device_uuid', uuid);
			// 	console.log('????????????--->uuid???', uuid);
			// }
			getSort(obj) {

				obj.sort((a, b) => {
					let t1 = new Date(Date.parse(a.date.replace(/-/g, "/")))
					let t2 = new Date(Date.parse(b.date.replace(/-/g, "/")))
					return t2.getTime() - t1.getTime()
				})
				return obj

			},
			getUrl(url) {
				if (url.indexOf('%') > -1) {
					url = url.replace(/%/g, '%25');
				}
				return url
			},

			// plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			// 	const res = uni.getSystemInfoSync();
			// 	let errMsg =
			// 		`???????????????${res.brand}??????????????????${res.model}????????????????????????${res.system}?????????????????????${res.platform}??????????????????${err}`;
			// 	console.log('???????????????' + errMsg);
			// });

			rTime(date) {
				var json_date = new Date(date).toJSON();
				console.log("===1111=json_date===>", json_date)
				let st = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
					/\.[\d]{3}Z/, '')
				console.log("===1111====>", st)
				return st
			},
			timestamp(date) {
				return new Date(date).getTime()
			},
			setStartEndTime(start, end) {
				var date = new Date(start);
				var nowDatas = date.getTime();
				var endDate = new Date(end);
				var endDatas = endDate.getTime();
				var leftTime = endDatas - nowDatas;


				return leftTime

			},
			/**
			 * ?????????????????????
			 * */
			timestampToTimeFunction(leftTime) {
				if (leftTime >= 0) {
					let d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					let h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					let m = Math.floor(leftTime / 1000 / 60 % 60);
					let s = Math.floor(leftTime / 1000 % 60);

					return {
						d,
						h,
						m,
						s
					}
					// console.log(this.d + '???' + this.h + '???' + this.m + '???' + this.s + '???')
				}
			},


			// IOS ??????
			initIAP() {
				let _this = this;
				plus.payment.getChannels(function(channels) {
						console.log("==1============>", channels)
						let channel = channels.find(i => i.id === 'appleiap');
						iapChannel = channel ? channel : null;
						_this.requestOrder();

					},
					function(e) {});
			},
			// appid  1631471618
			requestOrder() {
				let _this = this;
				uni.showLoading({
					title: 'stock...'
				})
				console.log("=======4===========>", productIds)
				iapChannel.requestOrder(productIds,
					(orderList) => {
						uni.hideLoading();

					}, (e) => {
						uni.hideLoading();

					});
			},
			applePay(productid, id) {
				let _this = this;
				console.log("=$request===>", productid)
				uni.showLoading({});
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: productid,
						optimize: true,
						username: `${_this.userInfo?.username}-${productid}`
					},
					success: (e) => {
						uni.hideLoading();

						// ????????????????????????
						// var statement = {
						// 	productid: productid
						// }
						// plus.payment.request(iapChannel, statement, function(res) {
						// 		paysuccers({
						// 			data: {
						// 				openid: that.openid,
						// 				token: that.token,
						// 				receipt_data: JSON.stringify(res)
						// 			}
						// 		}).then(tow => {
						// 			uni.hideLoading();
						// 			if (tow.code == 1) {
						// 				uni.showToast({
						// 					title: tow.msg,
						// 					icon: 'none'
						// 				})
						// 			} else {
						// 				uni.showToast({
						// 					title: tow.msg,
						// 					icon: 'none'
						// 				})
						// 			}
						// 		})



						console.log("===11111=====>", e);
						_this.paySuccess(e.transactionReceipt, id)

					},
					fail: (e) => {
						console.log("===111113=====>", e);
						uni.hideLoading();

					},
					complete: (e) => {
						console.log("===111112=====>", e);
						uni.hideLoading();

					}
				})
			},
			paySuccess(v, id) {
				console.log("???????????????????????????", v, id)
				let _this = this;
				var res = _this.$request.config.baseUrl
					.post({
						url: `/user/applepay`,
						data: {
							treceipt: v,
							id
						},
						loadingTip: 'stock...'
					})
					.then(
						res => {
							// console.log("=2222222229999999===>", res)
							try {
								uni.switchTab({
									url: '/pages/tab/index/index',
									animationType: "fade-in",
								})
							} catch (e) {}


						},
						res => {}
					);
			},
			// IOS ??????

		}
	};
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	@import "uview-ui/index.scss";
	@import url("@/static/css/index.css");
    page {   
		background-color: #191428;
	}
/* #endif */
</style>
