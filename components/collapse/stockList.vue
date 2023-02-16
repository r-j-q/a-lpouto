<template>
	<view class="collaps_title">

		<view class="collaps_list" v-for="(item,index) in stockList" :key="index">
			<view class="collaps_header" @click="handleChange(item,index)">
				<view class="collaps_header_left disRowAroundcenter">
					{{item.title}}
				</view>
				<u-icon size="20px" color="#fff"
					:class="item.active ? 'collaps_header_transition_right collaps_header_right_':'collaps_header_transition_right collaps_header_right'"
					name="arrow-down"></u-icon>
			</view>
			
			
			<!-- <view class="content">
					<button @click="init" class="btu">初始化</button>
			
					<button @click="login" class="btu">淘宝授权登录</button>
			
					<button @click="getuserinfo" class="btu">获取用户授权信息</button>
			
					<button @click="logout" class="btu">退出淘宝登录</button>
			
					<button @click="openurl" class="btu">打开优惠券</button>
			
					 
			
					<button @click="opendetail" class="btu">打开商品详情</button>
			
					<button @click="openshop" class="btu">打开店铺</button>
			
					<button @click="openmycart" class="btu">打开我的购物车</button>
			
					<button @click="qdBycode" class="btu">渠道备案By code</button>
			
					<button @click="qdBytoken" class="btu">渠道备案By token（推荐）</button>
					
					
					<button @click="qdByhide" class="btu">渠道备案(静默式)</button>
					
					<button @click="getutdid" class="btu">获取UTDID</button>
					
					<button @click="getBaichuanVersion" class="btu">获取SDK版本信息</button>
					<text>{{title}}</text>
				</view> -->
			<view class="collaps_header disRowAround textColor9e fontSize13">
				<view class="fontSize15">
					Working Signals
				</view>
				<view class="disRowAroundcenter fontSize15">
					More
					<img class="other-style mrl" :src="other" alt="" srcset="">
				</view>
			</view>
			<view class="collaps_content content_app2f margAll" :class="item.active ?'active_active':'active_a'">
			 
				<view @click="handleEchartsDetail" v-if="item.id==3 || item.id==4" class="collaps_content_padding" v-for="(flag,i) in item.child"
					:key="flag.id">

					<view class="disRowAroundcenter">
						<view class="collaps_l textColor19">
							L
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
							<view class="fontSize15 weight">
								${{flag.buy_price}}
							</view>
							<view class="textColor9e fontSize13">
								Buy
							</view>
						</view>
						<view class="flex1 displayRowCol">
							<view class="fontSize15 weight">
								${{flag.sale_price}}
							</view>
							<view class="textColor9e fontSize13">
								Sell
							</view>
						</view>
						<view class="flex1 displayRowCol">
							<view class="fontSize15 weight textColor">
								{{flag.profit}}%
							</view>
							<view class="textColor9e fontSize13">
								Potential Gain
							</view>
						</view>
					</view>
				</view> 
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		name: "collapse",
		props: {
			stockList: {
				type: Array,
				default: [],

			}
		},
		data() {
			return {
				 
				list: [],
				other: require("../../static/images/other/like.png")
			};
		},
		methods: {
			// init() {
			// 				console.log('点击了');
			// 				Alibcsdk.init(
			// 					result => {
			// 						console.log(JSON.stringify(result))
			// 						this.showMsg(JSON.stringify(result))
			// 					}
			// 				)
			// 			},
			// 			login() { //授权登录
			// 				Alibcsdk.login(
			// 					result => {
			// 						console.log(JSON.stringify(result))
			// 						this.showMsg(JSON.stringify(result))
			// 					}
			// 				)
			// 			},
			// 			logout() {
			// 				Alibcsdk.logout(
			// 					result => {
			// 						console.log(JSON.stringify(result))
			// 						this.showMsg(JSON.stringify(result))
			// 					}
			// 				)
			// 			},
			// 			openurl() {
			// 				var url =
			// 					"https://uland.taobao.com/coupon/edetail?spm=a311n.9159044%2Fnew2019.19184768.1&e=FnN7yyC4dDENfLV8niU3R5TgU2jJNKOfNNtsjZw%2F%2FoJa3UC6%2BxeMcvutwNVTX3KSLspxGy3zBjap%2B7s0sowtFPv0%2FvoXyvpgzdTtiOUchMjLkU4k%2FaBIVWVfKa%2BhVnNDLVAuU8CMzMdDN4WEWA%2BAQJjB6TX2HR3QWPoiHfuLmMmYBFolcv5ukJVnRh%2ByXggR%2BnoDgTNhwmM%3D&app_pvid=59590_11.21.12.113_437_1567994479465&ptl=floorId%3A21801%3Bapp_pvid%3A59590_11.21.12.113_437_1567994479465%3Btpp_pvid%3A80bf32d7-c746-4719-b292-9d9082df9a4e&union_lens=lensId%3An%401567994479%4080bf32d7-c746-4719-b292-9d9082df9a4e_594360302497%401%3Brecoveryid%3A201_11.142.52.250_1238534_1567994478674%3Bprepvid%3A201_11.142.52.250_1238534_1567994478674&pid=mm_33231688_7050284_23466709";
			// 				Alibcsdk.openurl({
			// 					url: url,
			// 					linkkey: "taobao",
			// 					adzoneid: "103062550066",
			// 					pid: "mm_131245267_59600050_103062550066",
			// 					nativeFailedMode: "download",
			// 					appkey: "27142849",
			// 					opentype: 'native'
			// 				})
			// 			},
			// 			/**
			// 			渠道备案可以使用通用的渠道备案链接（可在淘宝联盟后台获取）后面拼接上rtag参数，改参数为自定义参数，可以为用户ID，用户通过该页面备案成功后
			// 			可通过taobao.tbk.sc.publisher.info.get( 淘宝客-公用-私域用户备案信息查询 )这个接口来获取对应rtag的渠道ID。页面地址：
			// 			https://open.taobao.com/api.htm?docId=37989&docType=2&scopeId=14474
			// 			**/
			// 			/*openqdurl() {
			// 				var url = "https://mos.m.taobao.com/inviter/register?inviterCode=2W7YYZ&src=pub&app=common&rtag=123456";
			// 				Alibcsdk.openwebviewurl({
			// 					url: url,
			// 				}, result => {
			// 					uni.showToast({
			// 						title: result.msg
			// 					});
			// 					console.log(JSON.stringify(result));
			// 				})
			// 			},
			// 			*/
			// 			/*
			// 			申请渠道可以使用该方法打开H5授权登录页面，从服务端获取到access_token在调用渠道备案接口。
			// 			H5授权登录换取access_token见淘宝联盟开发平台，页面地址：https://open.taobao.com/doc.htm?docId=118&docType=1&spm=a219a.7395903.0.0.16af3971ApSa3N
			// 			https://oauth.m.taobao.com/authorize?response_type=code&client_id=你的appkey&redirect_uri=你的回调地址&state=自定义参数&view=web
			// 			*/
			// 			/*openh5url() {
			// 				var url =
			// 					"https://oauth.m.taobao.com/authorize?response_type=code&client_id=28002500&redirect_uri=http://www.baidu.com&state=1212&view=web";
			// 				Alibcsdk.openwebviewurl({
			// 					url: url,
			// 				}, result => {
			// 					uni.showToast({
			// 						title: result.msg
			// 					});
			// 					console.log(JSON.stringify(result));
			// 				})
			// 			},
			// 			*/
			// 			opendetail() {
			// 				Alibcsdk.opendetail({
			// 					itemid: '563275619905',
			// 					linkkey: "taobao",
			// 					adzoneid: "103062550066",
			// 					pid: "mm_131245267_59600050_103062550066",
			// 					nativeFailedMode: "download",
			// 					appkey: "27142849",
			// 					opentype: 'native'
			// 				})
			// 			},
			// 			openshop() {
			// 				Alibcsdk.openshop({
			// 					shopid: 57630185,
			// 					sellerid: '202224264',
			// 					linkkey: "taobao",
			// 					adzoneid: "103062550066",
			// 					pid: "mm_131245267_59600050_103062550066",
			// 					nativeFailedMode: "download",
			// 					appkey: "27142849",
			// 					opentype: 'native'
			// 				})
			// 			},
			// 			openmycart() {
			// 				Alibcsdk.openmycart({
			// 					linkkey: "taobao",
			// 					adzoneid: "103062550066",
			// 					pid: "mm_131245267_59600050_103062550066",
			// 					nativeFailedMode: "download",
			// 					appkey: "27142849",
			// 					opentype: 'native'
			// 				})
			// 			},
			// 			getuserinfo() {
			// 				Alibcsdk.getuserinfo(
			// 					result => {
			// 						this.showMsg(JSON.stringify(result))
			// 						console.log(JSON.stringify(result))
			// 					}
			// 				)
			// 			},
			// 			/**用户授权后，前端拿到用户的code，用code作为参数传给后端，后端用code来换取用户的access_token,获取到用户的access_token后
			// 			 *再用用户的access_token去请求淘宝联盟渠道备案接口进行=备案。
			// 			 *接口名称：taobao.tbk.sc.publisher.info.save( 淘宝客-公用-私域用户备案 )					
			// 			 *接口地址：https://open.taobao.com/api.htm?docId=37988&docType=2&scopeId=14474
			// 			 * 用code换取用户的access_token见淘宝联盟FAQ,地址：https://open.taobao.com/doc.htm?docId=118&docType=1&spm=a219a.7395903.0.0.7ef4397107L4Jv
			// 			 */
						
			// 			qdBycode() {
			// 				if(this.is_login){
			// 					this.publisher("code");
			// 				}else{
			// 					Alibcsdk.login(res=>{
			// 						if(res.status){
			// 							this.is_login = true;
			// 							this.publisher("code")
			// 						}
			// 					})
			// 				}
			// 			},
			// 			/**用户授权后，前端拿到用户access_token，用access_token作为参数传给后端，后端用access_token去请求
			// 			 *淘宝联盟渠道备案接口进行备案。
			// 			 *接口名称：taobao.tbk.sc.publisher.info.save( 淘宝客-公用-私域用户备案 )					
			// 			 *接口地址：https://open.taobao.com/api.htm?docId=37988&docType=2&scopeId=14474
			// 			 */
			// 			qdBytoken() {
			// 				if(this.is_login){
			// 					this.publisher("token");
			// 				}else{
			// 					Alibcsdk.login(res=>{
			// 						if(res.status){
			// 							this.is_login = true;
			// 							this.publisher("token")
			// 						}
			// 					})
			// 				}
			// 			},
			// 			qdByhide() {
			// 				if(this.is_login){
			// 					this.qdhide();
			// 				}else{
			// 					Alibcsdk.login(res=>{
			// 						if(res.status){
			// 							this.is_login = true;
			// 							this.qdhide();
			// 						}
			// 					})
			// 				}
			// 			},
			// 			qdhide(){
			// 				Alibcsdk.qdByhide({
			// 					url:"https://oauth.m.taobao.com/authorize?response_type=token&client_id=2626000263&redirect_uri=http://wygapp.ruanjiangc.com/test.html&state=1221&view=web"
			// 				},result => {
			// 						console.log(JSON.stringify(result))
			// 						if(result.status){
			// 							var access_token = result.data.access_token;
			// 							//用获取到的access_token作为参数传给后端，换取渠道id
			// 							this.request(access_token);
							
			// 						}
			// 					})
			// 			},
			// 			publisher(type){
			// 				Alibcsdk.getpublisher({
			// 						url: 'https://oauth.m.taobao.com/authorize?response_type=' + type + '&client_id=2626000263&redirect_uri=http://wygapp.ruanjiangc.com/test.html&state=1212&view=web'
			// 					},
			// 					result => {
			// 						console.log(JSON.stringify(result))
			// 						if(result.status){
			// 							if(type == "token"){
			// 								//用获取到的access_token作为参数传给后端，换取渠道id
			// 								this.request(result.data.access_token);
			// 								return;
			// 							}
			// 							uni.showModal({
			// 								title: '数据获取成功',
			// 								content: JSON.stringify(result),
			// 								showCancel: false,
			// 								cancelText: '取消',
			// 								confirmText: '确认',
			// 								success: res => {},
			// 								fail: () => {},
			// 								complete: () => {}
			// 							});
			// 						}else{
			// 							uni.showToast({
			// 								title: '用户关闭了页面'
			// 							});
			// 						}
			// 					})
			// 			},
			// 			request(access_token){
			// 				uni.request({
			// 					url: 'https://www.012u.com/api/v4/tb/test_addqd?access_token=' + access_token,
			// 					method: 'GET',
			// 					data: {},
			// 					success: res => {
			// 						console.log(JSON.stringify(res.data))
			// 						uni.showModal({
			// 							title: '数据获取成功',
			// 							content: JSON.stringify(res.data.data),
			// 							showCancel: false,
			// 							cancelText: '取消',
			// 							confirmText: '确认',
			// 							success: res => {},
			// 							fail: () => {},
			// 							complete: () => {}
			// 						});
			// 					},
			// 					fail: () => {},
			// 					complete: () => {}
			// 				});
			// 			},
			// 			getutdid(){
			// 				Alibcsdk.getutdid(
			// 				result=>{
			// 					this.showMsg(JSON.stringify(result))
			// 				})
			// 			},
			// 			getBaichuanVersion(){
			// 				Alibcsdk.getBaichuanVersion(res=>{
			// 					this.showMsg(JSON.stringify(res))
			// 				})
			// 			},
			// 			showMsg(msg){
			// 				uni.showModal({
			// 					title: '接口调用成功',
			// 					content: msg,
			// 					showCancel: false,
			// 					cancelText: '',
			// 					confirmText: '确定',
			// 					success: res => {},
			// 					fail: () => {},
			// 					complete: () => {}
			// 				});
			// 			}
			
			
			// 99999999999
			handleEchartsDetail(){
				 uni.navigateTo({
				 	url: "/pages/ploutoDetail/index",
					animationType: "fade-in",
				 })
			 },
            
			handleChange(item, index) {
				this.$emit("handleStockList", item, index)
			} 
		}
	}
</script>

<style scope>
	.collaps_title {
		color: #9E9E9E;
	}
/* .share_profits {
	background-color: #f2f2f2;
	flex: 1;
	flex-direction: column;
}
.list {
	flex: 1;
	flex-direction: column;
	width: 750rpx;
}
.tkrates {
	margin: 20rpx;
}
.tkrates-box {
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 20rpx;
}
.tkrates-text {
	font-size: 30rpx;
	color: #cc9b24;
}
.rates-icon {
	font-size: 35rpx;
	color: #cc9b24;
}
.scroll-help-view {
	margin: 20rpx;
	margin-top: 0rpx;
}
.scroll-view-mater {
	margin: 20rpx;
	margin-top: 0rpx;
}
.matter-else-text {
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 20rpx;
}
.matter-else-text-wenan {
	font-family: PingFangSC-Regular;
	font-size: 24rpx;
	color: #666;
}
.eat-row {
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 20rpx;
}
.left-poster {
	width: 236rpx;
	height: 400rpx;
}
.imageUrl {
	flex: 1;
	flex-direction: column;
}
.eat-small {
}
.eat-ok {
	width: 200rpx;
	height: 200rpx;
	margin-left: 20rpx;
	margin-bottom: 20rpx;
}
.eat-small-img {
	flex: 1;
}
.sel-img {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	right: 12rpx;
	top: 17rpx;
}

.new-share-view {
	width: 750rpx;
	height: 204rpx; 
	background-color: #fff;
}

.bottom-share-view {
	padding: 20rpx;
	padding-left: 50rpx;
	padding-right: 50rpx;
}

.new-share-item { 
}

.new-share-item-image {
	width: 100rpx;
	height: 100rpx;
}

.new-share-item-text {
	font-size: 24rpx;
	color: #7c8187;
	margin-top: 14rpx;
} */
	.collaps_list {}

	.collaps_header {
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 80upx;
		padding: 0 20upx;
	}

	.collaps_header_left {
		font-size: 36upx;
		font-weight: bold;
	}

	.collaps_header_right_ {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}

	.collaps_header_right {

		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}

	.collaps_header_transition_right {
		transition: -webkit-transform 1s;
		transition: transform 1s;
		transition: transform 1s, -webkit-transform 1s;
		width: 20px;
		height: 20px;
	}

	.collaps_content {
		transition: 0.3s;
		height: 0;
		overflow: hidden;
		padding: 0 20upx;
	}

	.active_a {
		height: 0px;
		transition: height 400ms ease-in-out 0ms, -webkit-transform 400ms ease-in-out 0ms, transform 400ms ease-in-out 0ms;
		transform-origin: 50% 50% 0px;
	}

	.active_active {
		height: auto;
		transition: height 400ms ease-in-out 0ms, -webkit-transform 400ms ease-in-out 0ms, transform 400ms ease-in-out 0ms;
		transform-origin: 50% 50% 0px;
		padding-bottom: 40upx
	}

	.other-style {
		width: 14px;
		height: 16px;

	}

	.collaps_content_left {
		/* text-align: left; */
	}
</style>
