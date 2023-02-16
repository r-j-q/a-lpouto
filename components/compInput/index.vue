<template>
	<view class="firstNameRow content_app2f">
		<view class="firstName" :class="xing ?'firstNameX':''">
			<image :src="firstName" class="firstB"></image>
		</view>
		<picker class="disRowAroundcenter uniInput pickerStyle sis" v-if="selectedType" @change="bindPickerChange"
			:value="index" :range="array">
			{{selectval}}
			<image :src="down_icon" style="width: 20px;height: 20px;"></image>
		</picker>
		
		<!-- <view class="trade-area">
		
				<list class="scroll-v list" scroll-y :enable-back-to-top="true" :show-scrollbar="false" @scrolltolower="loadMore" ref="goTop">
					<cstRefresh @refresh="onrefresh" :refreshing="refreshing" @pullingdown="onpullingdown"></cstRefresh>
		            <cell>
		                <image class="swiper-item-image" src="/static/detection_title.jpg"></image>
		            </cell>
					<cell class="content">
							<view class="s-ceil  find-head-content">
								<view class="s-list-content head-content">
									<view class="content-title s-rows s-nowrap s-flex-vcenter">
										<text class="title-name">全车检测/350项</text>
										<text class="hot-km">报告样例</text>
									</view>
		                            <view class="business s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_text">排查车辆是否存在事故、火烧、水泡风险，深度检测重要部件、外观内饰损伤情况。
		                                </text>
		                                <text class="business_price">￥490</text>
		                            </view>
		                            <view class="s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_icon">90天回购</text>
		                                <text class="business_icon">25项检测工具</text>
		                                <text class="business_icon">检测报告</text>
		                                <bottom class="query_btn"><text class="btn_color">去下单</text></bottom>
		                            </view>
									<text class="is-size-12 business_desc"></text>
								</view>
							</view>
		                    <view class="s-ceil  find-head-content">
		                    	<view class="s-list-content head-content">
		                    		<view class="content-title s-rows s-nowrap s-flex-vcenter">
		                    			<text class="title-name">重要部件检测/229项</text>
		                    			<text class="hot-km">报告样例</text>
		                    		</view>
		                            <view class="business s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_text">排查车辆是否存在事故、火烧、水泡风险及重要部件损伤情况。</text>
		                                <text class="business_price">￥399</text>
		                            </view>
		                            <view class="s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_icon">90天回购</text>
		                                <text class="business_icon">25项检测工具</text>
		                                <text class="business_icon">检测报告</text>
		                                <bottom class="query_btn"><text class="btn_color">去下单</text></bottom>
		                            </view>
		                    		<text class="is-size-12 business_desc"></text>
		                    	</view>
		                    </view>
		                    <view class="s-ceil  find-head-content">
		                    	<view class="s-list-content head-content">
		                    		<view class="content-title s-rows s-nowrap s-flex-vcenter">
		                    			<text class="title-name">事故排查检测/120项</text>
		                    			<text class="hot-km">报告样例</text>
		                    		</view>
		                            <view class="business s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_text">仅排查车辆是否存在事故、火烧、水泡风险。
		                                </text>
		                                <text class="business_price">￥199</text>
		                            </view>
		                            <view class="s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_icon">90天回购</text>
		                                <text class="business_icon">25项检测工具</text>
		                                <text class="business_icon">检测报告</text>
		                                <bottom class="query_btn"><text class="btn_color">去下单</text></bottom>
		                            </view>
		                    		<text class="is-size-12 business_desc"></text>
		                    	</view>
		                    </view>
		                    <view class="s-ceil  find-head-content">
		                    	<view class="s-list-content head-content">
		                    		<view class="content-title s-rows s-nowrap s-flex-vcenter">
		                    			<text class="title-name">全车检测/350项</text>
		                    			<text class="hot-km">报告样例</text>
		                    		</view>
		                            <view class="business s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_text">排查车辆是否存在事故、火烧、水泡风险，深度检测重要部件、外观内饰损伤情况。
		                                </text>
		                                <text class="business_price">￥490</text>
		                            </view>
		                            <view class="s-rows s-nowrap s-flex-vcenter">
		                                <text class="business_icon">90天回购</text>
		                                <text class="business_icon">25项检测工具</text>
		                                <text class="business_icon">检测报告</text>
		                                <bottom class="query_btn"><text class="btn_color">去下单</text></bottom>
		                            </view>
		                    		<text class="is-size-12 business_desc"></text>
		                    	</view>
		                    </view>
		                    <text class="bottom_text">新车指导价≥100万的车请联系客服申请豪车事故检测</text>
		                    <text class="bottom_kefu">联系客服(09:00-28:30)</text>
					</cell>
					<cell class="tui-refresh">
						<text class="refresh-text">{{ loadingText }}</text>
					</cell>
				</list>
			</view> -->
		<view class="uni-form-item uni-column">
			<input autocomplete="off" :password="password" class="my-uni-input"
				placeholder-style=" font-size:14px;color: #a2a2a2;" @input="replaceInput" v-model="changeValue"
				:placeholder="placer" />
		</view>
	</view>

</template>

<script>
	// import helper from '@/common/helper.js';
	// 	import simpleTabbar from '@/components/simple-pro/nvue/simple-tabbar.nvue';
	// 	import cstRefresh from '@/components/huahuasheng/nvue/hhs-refresh.nvue';
	// 	const picker = weex.requireModule('picker');
	// 	import share from '@/common/app-plus/simple-share.js';
	// 	import { mapState, mapMutations } from 'vuex';
	// 	let selectInfo = null;
	// 	const tabItems = [{
	// 			title: '5km以内',
	// 			type: 'new',
	// 			submenu: [{
	// 				name: '5km内',
	// 				value: "11",
	// 			}, 
	// 			{
	// 				name: '10km内',
	// 				value: "11",
	// 			},
	// 			{
	// 				name: '15km内',
	// 				value: "11",
	// 			},
	// 			{
	// 				name: '20km内',
	// 				value: "11",
	// 			},
	// 			{
	// 				name: '50km内',
	// 				value: "11",
	// 			},
	// 			]
	// 		},
	// 		{
	// 			title: '92#',
	// 			type: 'hot'
	// 		},
	// 		{
	// 			title: '价格优先',
	// 			type: 'km'
	// 		},
	// 		{
	// 			title: '全部品牌',
	// 			type: 'click'
	// 		}
	// 	];
	// 	const dom = weex.requireModule('dom');
	export default {

		data() {
			return {
				 // statusBarHeight: '60rpx',
				 // 				tabItems: tabItems,
				 // 				banner: [],
				 // 				currentAddres: '',
				 // 				navdata: [],
				 // 				currentTab: 0,
				 // 				refreshing: false,
				 // 				page: 1,
				 // 				pulling: false,
				 // 				refreshText: '',
				 // 				malList: [],
				 // 				latitude: '',
				 // 				longitude: '',
				 // 				getHomeTopIcon: {
				 // 					leftIcon: '',
				 // 					rightIcon: ''
				 // 				},
				 // 				currentTypeIndex: 0,
				 // 				menuinfo:false,
				 // 				searchText: ''
				index: 0,
				changeValue: "",
				down_icon: require("../../static/images/other/down_icon.png")
			};
		},
		props: { 
			array: {
				type: Array
			},
			selectval: {
				type: String
			},
			selectedType: {
				type: Boolean,
				default: false
			},
			xing: {
				type: Boolean
			},
			placer: {
				type: String
			},
			firstName: {
				type: String
			},
			password: {
				type: Boolean
			},
		},

		methods: {
			// onNavigationBarSearchInputChanged(text) {
			// 			this.searchText = text.text;
			// 		},
			// 		onNavigationBarSearchInputConfirmed(event) {
			// 			uni.navigateTo({
			// 				url: '../tradeArea/tradeAreaList?search='+this.searchText,
			
			// 				success() {
			// 					uni.hideKeyboard();
			// 				}
			// 			});
			// 		},
			// 		async onLoad() {
			// 			this.loadBanner();
			// 			this.getCatelist();
			// 			const [err, res] = await uni.getLocation();
			// 			if (res && res.longitude) {
			// 				this.latitude = res.latitude;
			// 				this.longitude = res.longitude;
			// 			}
			// 			this.getList();
			// 		},
					
			// 		methods: {
			// 			pageScrollTo() {
			// 				uni.pageScrollTo({
			// 					scrollTop: 0
			// 				});
			// 				console.log(this.$refs.goTop);
			// 				const el = this.$refs.goTop;
			// 				console.log(el);
			// 				dom.scrollToElement(el, {});
			// 			},
			// 			navigateTo(url, isLogin) {
							
			// 				if (isLogin == true && !this.hasLogin) {
			// 					console.log(url)
			// 					uni.navigateTo({
			// 						url: '/pages/member/ucenter/signIn'
			// 					});
			// 					return;
			// 				}
							
			// 				uni.navigateTo({
			// 					url: url
			// 				});
			// 			},
			// 			toDetail(item) {
			// 				console.log(item)
			// 				uni.navigateTo({
			// 					url: './detail?id='+item.id+'&title='+item.business_name
			// 				});
			// 			},
			// 			restList(list) {
			// 				let mallList = list.map(item => {
			// 					var business_picture = item.business_picture.split(',');
			// 					item.business_picture = business_picture;
			// 					item.mall_picture = business_picture[0] || '';
			// 					item.space = helper.mallListSpace(this.latitude, this.longitude, item.latitude, item.longitude).toFixed(2);
			// 					return item;
			// 				});
			// 				return mallList;
			// 			},
			// 			async getList(type) {
			// 				var itemsInfo = this.tabItems[this.currentTab];
			// 				this.loadingText = '数据加载中...';
			// 				try {
			// 					var post = {
			// 						page: this.page,
			// 						type: itemsInfo.type || 'hot',
			// 						latitude: this.latitude,
			// 						longitude: this.longitude
			// 					};
			// 					console.log(post);
			// 					const result = await getApp().globalData.request.post('area/arealist', post);
			//                     console.log(result);
			// 					if (result.code == 200 && result.data.length > 0) {
			// 						this.loadingText = '加载完成';
			
			// 						if (this.page == 1) {
			// 							this.malList = this.restList(result.data);
			// 						} else {
			// 							this.malList = this.restList(this.malList.concat(result.data));
			// 						}
			// 					} else {
			// 						this.loadingText = '没有更多了';
			// 					}
			// 				} catch (e) {
			// 					console.log(e);
			// 					this.loadingText = '网络繁忙';
			// 				}
			// 				if (type == 'refreshData') {
			// 					this.pulling = true;
			// 					this.refreshing = false;
			// 					this.refreshText = '已刷新';
			// 					setTimeout(() => {
			// 						// TODO fix ios和Android 动画时间相反问题
			// 						this.pulling = false;
			// 					}, 500);
			// 				}
			// 			},
			// 			onrefresh(e) {
			// 				if (!this.refreshFlag) {
			// 					return;
			// 				}
			// 				this.refreshing = true;
			// 				this.refreshText = '正在刷新...';
			// 				this.page = 1;
			
			// 				this.getList('refreshData');
			// 			}, 
			
			// 			onpullingdown(e) {
			// 				if (this.refreshing || this.pulling) {
			// 					return;
			// 				}
			// 				if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			// 					this.refreshFlag = true;
			// 					this.refreshText = '释放立即刷新';
			// 				} else {
			// 					this.refreshFlag = false;
			// 					this.refreshText = '下拉可以刷新';
			// 				}
			// 			},
			// 			loadMore() {
			// 				if (this.loadingText == '加载完成') {
			// 					return;
			// 				}
			// 				this.page = this.page + 1;
			// 				this.getList();
			// 			},
						
			
			// 			async getCatelist() {
			// 				var res = await getApp().globalData.request.post("car/navlist", {
			// 					limit: 80
			// 				});
			// 				if (res.code && res.code == 200) {
			// 					var navdata = helper.arrayToNewArray(res.data, 4);
			
			// 					this.navdata = navdata;
			
			// 				} else {
			
			// 				}
			// 			},
			// 			async loadBanner() {
			// 				try {
			// 					const res = await getApp().globalData.request.post('index/banner', {
			// 						action: 'trade_area'
			// 					});
			// 					if (res.code == 200) {
			// 						this.banner = res.data;
			// 					}
			// 				} catch (e) {
			// 					console.log(e);
			// 				}
			// 			},
			// 			toCategory(item) {
			// 				uni.navigateTo({
			// 					url: `../tradeArea/tradeAreaList?id=${item.id}&title=${item.title}`
			// 				});
			// 			},
			// 			toCateNav(item) {
			// 				getApp().globalData.request.navigateTo({
			// 					target: item.target,
			// 					url: item.link,
			// 					title: item.title,
			// 					desc: item.desc_info,
			// 					param: item.params,
			// 					hasLogin: item.hasLogin || 0
			// 				});
			// 			},
						
			// 			togglePage(e) {
			// 				this.menuinfo =true;
			// 				//selectInfo = e;
			// 				uni.getSubNVueById('findShare').show('slide-in-bottom');
			// 			}
			
			// 890
			bindPickerChange(selectval) {
				this.$emit('myblurSelectval',selectval.detail.value)
				       
			},
			 
			replaceInput() {
				this.$emit('myblur', [this.changeValue])
			}
		}
	}
</script>

<style>
	/* .noborder {
			border-bottom-width: 0rpx;
		}
	
		.scroll-v {
			flex: 1;
			flex-direction: column;
			background-color: #f2f2f2;
		}
	
		.trade-area {
			flex: 1;
			flex-direction: column;
			background-color: #ffffff;
	
		}
	
		.header-home {
			background-color: #ffffff;
		}
	
		.swiper {
			width: 750rpx;
			height: 240rpx;
			background-color: #f2f2f2;
		}
	
		.swiper-item {
			flex: 1;
			height: 240rpx;
		}
	
		.index_header {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: nowrap;
		}
	
		.wap_left_icon {
			width: 100rpx;
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
	        margin-left: 290rpx;
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
			background-color: #f1f1f1;
			color: #c4c4c4;
			border-radius: 50rpx;
			padding-left: 20rpx;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: nowrap;
			font-size: 28rpx;
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
			width: 70rpx;
			height: 70rpx;
		}
	
		.swiper-item-image {
			flex: 1;
			width: 750rpx;
			height: 240rpx;
		}
	
	
		.nav-data {
			width:720rpx;
			height: 600rpx;
			margin-left: 15rpx;
			margin-top: 16rpx;
			margin-bottom: 20rpx;
			border-radius: 30rpx;
			border-color: #ff5f00;
			border-width: 8rpx;
		}
	
		
		.information{
			width:750rpx;
			height:60rpx;
			margin-top: 20rpx;
			background-color: #f5f5f5;
		}
		.info{
			width: 700rpx;
			margin-left: 25rpx;
			font-size: 24rpx;
			line-height:60rpx;
		}
		.product-image {
			width: 130rpx;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 2rpx;
		}
		.nav{
			flex-wrap: wrap;
			flex-direction: row;
			margin-top: 10rpx;
		}
		.content{
			position: relative;
		
		}
		.select{
			
			height:500rpx;
			
		} 
		.menu{
			padding:0 38rpx;
			flex-wrap: wrap;
			flex-direction: row;
		}
		.menu-info{
			height: 500rpx;	
			position:absolute;
			background-color: #007AFF;
			z-index:9;
		}
		.icon{
			width:16rpx;
			height: 12rpx;
			margin-top: 23rpx;
			margin-left: 8rpx;
			
		}
		.title {
			color: #3a3a3a;
			font-size: 26rpx;
			line-height: 60rpx;		
		}
		.s-page-wrapper{
			position:relative ;
			z-index:11;
		}
	
		.head-content {
			padding-left: 15rpx;
			margin-top: 0rpx !important;
			padding-top: 0rpx !important;
			flex-direction: column;
		}
	    
		.content-title {
			border-bottom-width: 1rpx;
	        border-color: #000000;
	        padding: 10rpx 10rpx;
		}
	
		.title-name {		
			margin-bottom: 10rpx;
			width: 450rpx;
			text-align: left;
	        border-left-width: 10rpx;
	        border-left-color:#e2602c;
	        padding-left: 20rpx;
	        font-size: 32rpx;
		}
	
		.hot-km {
			width: 100rpx;
			text-align: right;
			font-size: 26rpx;
			flex: 1;
			margin-bottom: 10rpx;
			color: #808695;
		}
	    .business{
	        padding-top:40rpx;
	    }
		.business_text {
	        width:450rpx;
			font-size: 28rpx;
			color: #515a6e;
		}
	    .business_price {
	        width:200rpx;
	    	font-size: 40rpx;
	    	color: #fe5b24;
	        text-align: right;
	        font-weight: bold;
	    }
		.business_desc {
			lines: 2;
			margin-top: 10rpx;
			font-size: 30rpx;
			color: #515a6e;
		}
	
		.findTop {
			position: fixed;
			right: 20rpx;
			bottom: 40rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 1000rpx;
			text-align: center;
			background-color: rgba(51, 51, 51, 0.7);
		}
	
		.findTop-text {
			width: 80rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #ffffff;
		}
	
		.s-ceil {
			padding: 20rpx 0;
			align-items: center;
			flex-wrap: nowrap;
	        background-color: #ffffff;
	        border-radius: 10rpx;
	        margin-top: 20rpx;
	        width:700rpx;
	        margin-left:25rpx;
		}
	    .business_icon{
	        background-color: #fff0ed;
	        margin-right: 30rpx;
	        border-radius: 2rpx;
	        font-size: 30rpx;
	        color: #e19588;
	    }
	    .query_btn{ 
	        width:120rpx;
	        height:70rpx;
	        background-color:#ff6b21;
	        justify-content: center;
	        align-items: center;
	        border-radius: 5px;
	    }
	    .btn_color{
	        color:#ffffff;
	        font-size: 30rpx;
	    }
	    .bottom_text{
	        width:750rpx;
	        text-align: center;
	        margin-top: 50rpx;
	        font-size: 25rpx;
	    }
	    .bottom_kefu{
	        width:350rpx;
	        height: 60rpx;
	        line-height: 60rpx;
	        margin-left: 200rpx;
	        text-align: center;
	        margin-top: 30rpx;
	        font-size: 25rpx;
	        background-color: #ffffff;
	        border-radius: 25px;
	    } */
	/* 3445 */
	.firstNameRow {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 40upx;
		border-radius: 12upx;

	}

	.my-uni-input {
		margin: 10rpx auto;
		width: 500rpx;
		height: 90upx;
		border: none;
		outline: none;
		padding-left: 20rpx;
		font-size: 16px;
		font-weight: bold;
		color: #333;
		-webkit-background-color: #c2c0c0;
		background-color: #c2c0c0;
		caret-color: #333;
	}

	/deep/ .my-uni-input:focus {
		-webkit-box-shadow: 0 0 0 1000px whiteinset;
		background-color: #c2c0c0;
		outline: none !important;
	}

	.firstName {
		width: 32upx;
		height: 36upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	/* .sis{
		font-size: .1vw;
	} */

	.firstNameX {
		width: 16upx;
		height: 16upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.firstB {
		width: 100%;
		height: 100%
	}

	.uniInput {
		background-color: #c2c0c0;
		border: none;
		color: #fff;
		font-size: 13px;  
	}
</style>
