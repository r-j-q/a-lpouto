<template>
	<view class="content content_app_style_content">

		<view class="marketCountStyle">

			<view class="mostList bg35" v-for="(items,index) in mostListArr" :key="index">
				 
				<view class="mostListRowEr bg35" @click.stop="jumpToDetail(items)"  
					 >
					<view class="textColorFFF fontSize15 bg35 paddingAll mostList100">
						<view class="mostListRowList bg35">
							<view class="bg35 fontSizeB1"> {{items.symbol}}</view>
							<view class="bg35 fontSizeB1">{{items.price}}</view>
							<view class="bg35 fontSizeB1" :class="items.changesPercentage>0?'color94':'color43'">
								{{items.changesPercentage.toFixed(2)}}%</view>
						</view>
					</view>
				</view>

			</view>
		</view>  
		<!-- <button type="default">{{release.version}}</button> -->

		<!-- <view class="brand">
		    <view class="brand-cate-gory"  elevation="2px">
		        <scroll-view v-if="tabs.length > 0" class="brand-tab-title" scroll-direction="horizontal" :show-scrollbar="false" :scroll-x="true" :scroll-into-view="scrollInto">
		            <view class="brand-tab-title-txt" v-for="(tab, index) in tabs" :key="index" :id="tab.id" @click="changTab(index)">
		                <text class="brand-tab-title-txt" :class="[tabCurrentIndex == index ? 'brand-tab-active' : '']">{{ tab.name }}</text>
		            </view>
		        </scroll-view>
		    </view>
		
		    <swiper :current="tabCurrentIndex" class="swiper-box" :duration="300" @change="changSlider">
		        <swiper-item class="swiper-item" v-for="(tab, index1) in tabs" :key="index1">
		            <scroll-view class="scroll-v list" scroll-y :show-scrollbar="false" @scrolltolower="loadMore(index1)" scroll-with-animation enable-back-to-top>
		                <cstRefresh @refresh="onrefresh(index1)" :refreshing="tab.refreshing" @pullingdown="onpullingdown" :refreshText="tab.refreshText"></cstRefresh>
		
		                <view class="s-margin" v-if="tab.product.length > 0">
		                    <view class="s-border-radius-small s-bg-white s-margin-top-xs" v-for="(item, index) in tab.product" :key="index">
		                        <view class="s-ceil s-bordern" @click="toBrandInfo(item.id)">
		                            <image class="s-list-icons" :src="item.brand_logo"  placeholder="/static/img/ic_default_placeholder.png"></image>
		                            <view class="s-list-content">
		                                <text class="is-size-14 has-mgb-5">{{ item.tb_brand_name }}</text>
		                                <text class="is-size-12 is-grey s-ellipsis ">{{ item.introduce }}</text>
		                            </view>
		                        </view>
		
		                        <view class="s-rows s-wrap bran-goods-rows s-margin-bottom-xs" v-if="item.goods.length > 0">
		                            <view
		                                class="s-img-card brand-goods s-text-center"
		                                v-for="(goods, gindex) in item.goods"
		                                :key="gindex"
		                                @click="toDetail(goods.goods_numiid, goods.goods_type)"
		                            >
		                                <image class="imgs s-text-center s-border-radius-small" placeholder="/static/img/ic_default_placeholder_220.png" :src="goods.goods_picture"></image>
		                                <text class="s-img-card-txt s-text-center s-ellipsis brand-goods-title">{{ goods.goods_dtitle }}</text>
		                                <view class="s-img-card-more s-text-center">
		                                    <text class="brand-goods-price s-text-center">到手约￥{{ goods.goods_yprice }}</text>
		                                </view>
		                            </view>
		                        </view>
		                    </view>
		                </view>
		
		                <view class="tui-refresh">
		                    <text class="refresh-text">{{ tab.loadingText }}</text>
		                </view>
		            </scroll-view>
		        </swiper-item>
		    </swiper>
		</view> -->
		<!-- 		<view class="content_app_style_content content_app">
           <scroll-view class="content_app_style_content" scroll-y="true" @scrolltoupper="scrolltoupper">
				<view class="paddingTopbottom20"> -->
		<!-- <collapse :other="other" :stockList="stockListIndex" @handleStockList="handleStockList" /> -->
		<!-- <view v-if="vip_end_vip ==false" class="textColorff paddingAll margAll content_app11">
						Our signals help investors get rid of complex data and information by using big data mining and
						intelligent analysis, and offer decisions on investment based on data models.
					</view>
					<view
						class="collapse_botton_reduis background-left-right margin_button_top  rowBetweenaround paddingAll"
						@click="jumpToDescribe(stockListIndex[0])" v-if="vip_end_vip == false ||  userInfo == null">

						<view class="textColorFFF fontSize15">
							intelligent analysis
						</view>
						<view class="fontSize19 weight backgroundfff paddingBtnAll fontSize15">Buy Now</view>
					</view> -->
		<!-- <view class="lookMore">
						<view class="textColorFFF">
							PLOUTO
						</view>
						<view class="textColorFFF" @click="nativeJumpTo">
							 
							
						</view>
					</view>
					<view class="lookMoreVideo">
						<u-swiper
							:list="list4"
							nextMargin="0"
							circular
							:autoplay="false"
							radius="10"
							bgColor="#191428"
						    ></u-swiper>
					</view>
					<productList/>
					<scrollList/> -->
		<!-- 	</view>
			</scroll-view> -->

	</view>

	</view>


	<!-- <view class="brand">
		    <view class="brand-cate-gory"  elevation="2px">
		        <scroll-view v-if="tabs.length > 0" class="brand-tab-title" scroll-direction="horizontal" :show-scrollbar="false" :scroll-x="true" :scroll-into-view="scrollInto">
		            <view class="brand-tab-title-txt" v-for="(tab, index) in tabs" :key="index" :id="tab.id" @click="changTab(index)">
		                <text class="brand-tab-title-txt" :class="[tabCurrentIndex == index ? 'brand-tab-active' : '']">{{ tab.name }}</text>
		            </view>
		        </scroll-view>
		    </view>
		
		    <swiper :current="tabCurrentIndex" class="swiper-box" :duration="300" @change="changSlider">
		        <swiper-item class="swiper-item" v-for="(tab, index1) in tabs" :key="index1">
		            <scroll-view class="scroll-v list" scroll-y :show-scrollbar="false" @scrolltolower="loadMore(index1)" scroll-with-animation enable-back-to-top>
		                <cstRefresh @refresh="onrefresh(index1)" :refreshing="tab.refreshing" @pullingdown="onpullingdown" :refreshText="tab.refreshText"></cstRefresh>
		
		                <view class="s-margin" v-if="tab.product.length > 0">
		                    <view class="s-border-radius-small s-bg-white s-margin-top-xs" v-for="(item, index) in tab.product" :key="index">
		                        <view class="s-ceil s-bordern" @click="toBrandInfo(item.id)">
		                            <image class="s-list-icons" :src="item.brand_logo"  placeholder="/static/img/ic_default_placeholder.png"></image>
		                            <view class="s-list-content">
		                                <text class="is-size-14 has-mgb-5">{{ item.tb_brand_name }}</text>
		                                <text class="is-size-12 is-grey s-ellipsis ">{{ item.introduce }}</text>
		                            </view>
		                        </view>
		
		                        <view class="s-rows s-wrap bran-goods-rows s-margin-bottom-xs" v-if="item.goods.length > 0">
		                            <view
		                                class="s-img-card brand-goods s-text-center"
		                                v-for="(goods, gindex) in item.goods"
		                                :key="gindex"
		                                @click="toDetail(goods.goods_numiid, goods.goods_type)"
		                            >
		                                <image class="imgs s-text-center s-border-radius-small" placeholder="/static/img/ic_default_placeholder_220.png" :src="goods.goods_picture"></image>
		                                <text class="s-img-card-txt s-text-center s-ellipsis brand-goods-title">{{ goods.goods_dtitle }}</text>
		                                <view class="s-img-card-more s-text-center">
		                                    <text class="brand-goods-price s-text-center">到手约￥{{ goods.goods_yprice }}</text>
		                                </view>
		                            </view>
		                        </view>
		                    </view>
		                </view>
		
		                <view class="tui-refresh">
		                    <text class="refresh-text">{{ tab.loadingText }}</text>
		                </view>
		            </scroll-view>
		        </swiper-item>
		    </swiper>
		</view> -->



</template>

<script>
	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes;
	import {
		noauthStockIndex,
		userIndex,
		noauthIndex,
		stockIndex,
		noauthstockMost,
		userstockList
	} from "@/api/index.js";

	// import collapse from "@/components/collapse/index.vue";

	import btnIndex from '@/components/peng-3DRotateBtn/peng-3DRotateBtn'
	import listStock from '@/components/listStock/index.vue'
	import indexEcharts from '@/components/listStock/indexEcharts.vue'
	// import scrollList from '@/components/scrollList/index.vue'
	// import productList from '@/components/scrollList/productList.vue'

	export default {
		name: "index",
		components: {
			// collapse,
			btnIndex,
			listStock,
			indexEcharts,
			// scrollList,
			// productList
		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
			 
				mostListArr: [], 
			};
		},
		watch: {},
		onLoad(option) {
			let _this = this;
			  
			// _this.getNoauthstockMost("actives")
			// _this.getNoauthstockMost("losers")
			// _this.getNoauthstockMost("gainers")
		let opt = JSON.parse(decodeURIComponent(option.params));
			uni.setNavigationBarTitle({
				title:opt.item
			})
		if(opt.index==0){
			_this.getNoauthstockMost("actives")
		}
		if(opt.index==1){
			 _this.getNoauthstockMost("losers")
		}
		if(opt.index==2){
			_this.getNoauthstockMost("gainers")
		} 
		},
		onShow() {
			// this.loadCate(res => {
			//     console.log('分类加载完了');
			//     this.getList(0);
			// });
		 


		},
		mounted() {},

		methods: {
			jumpToDetail(item) {
				let params = {
					item
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/ploutoDetail/index?params=" + encodeURIComponent(JSON.stringify(
						params)))
				})
				console.log("jumpToDetail", item)
			},
			//获取自选股列表 userstockList
			getUserstockList() {
				this.mostListArrAddStock = []
				var res = this.$request.get({
						url: `${userstockList}`,
						loadingTip: 'more...'
					})
					.then(
						res => {
							let {
								list,
								market
							} = res;
							list.forEach((item, index) => {
								market.forEach((items, index) => {
									if (item.symbol === items.symbol) {
										this.mostListArrAddStock.push({
											price: items.price,
											changesPercentage: items.changesPercentage.toFixed(2),
											symbol: items.symbol,
											ID: item.ID,

										})
									}
									// item.price= items.price;
									// item.changesPercentage= items.changesPercentage.toFixed(2);
								})
							})

							// this.mostListArr=list
							console.log("--123-2---------->", this.mostListArr)
						},

					)
			},
			getNoauthstockMost(v) {
				this.mostListArr = []
				var res = this.$request.get({
						url: `${noauthstockMost}?listtype=${v}`,
						loadingTip: 'more...'
					})
					.then(
						res => {
                        this.mostListArr = res.list
							// if (v == 'actives') {
							// 	this.resListactives = res.list
							// }
							// if (v == 'losers') {
							// 	this.resListlosers = res.list
							// }
							// if (v == 'gainers') {
							// 	this.resListgainers = res.list
							// }
							// this.mostListArr=[
							// ...this.resListactives, 
							// ...this.resListlosers, 
							// ...this.resListgainers, 
							// ] 
							// this.mostListArr = [{
							// 		title: "Most Active",
							// 		list: this.resListactives
							// 	},
							// 	{
							// 		title: "Most Loser",
							// 		list: this.resListlosers
							// 	},
							// 	{
							// 		title: "Most Gainer",
							// 		list: this.resListgainers
							// 	}
							// ];

							// console.log("--res getNoauthstockMost------------>", this.mostListArr)
						},

					)
			},

			handleMarhetList(item) {
				console.log("======>", item)
				this.marketCount = item;
				if (item == 1) {
					this.getUserstockList()
				} else {
					this.getNoauthstockMost("actives")
					this.getNoauthstockMost("losers")
					this.getNoauthstockMost("gainers")
				}
			},
			// get_google(){
			// 	getApp().paymentGoogle()
			// },
			getStockBaseList(stock_no) {

				var res = this.$request.get({
						url: `${noauthStockIndex}?stock_no=${stock_no}&time_type=1min`,
						loadingTip: 'stock...'
					})
					.then(
						res => {

							let baseData = res.list;

							baseData.forEach((item) => {
								if (stock_no === '^DJI') {
									this.dateDJI.push(item.date)
									this.dataDJI.push(item.open)
								} else if (stock_no === "^IXIC") {
									this.dateIXIC.push(item.date)
									this.dataIXIC.push(item.open)
								} else if (stock_no === "^GSPC") {
									this.dateGSPC.push(item.date)
									this.dataGSPC.push(item.open)
								}
								// item.time = self.timeProcessing(item.date);
								// item.traNumber = "43300"
								// item.avgPrice = item.open
								// item.curPrice = item.high
								// item.yesterdayClose = item.close
							})

							// console.log('this.dataDJI>', this.dataDJI)
							// console.log('this.dataIXIC>', this.dataIXIC)
							// console.log('this.dataGSPC>', this.dataGSPC)



						},
						res => {
							console.log('failure');
						}
					);
			},
			getStockIndex() {
				var res = this.$request.get({
						url: `${stockIndex}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							let arr = []
							res.list.forEach((item) => {
								if (item.symbol === "^GSPC" || item.symbol === "^IXIC" || item.symbol === "^DJI") {
									item.p_r = (item.price - item.previousClose).toFixed(2);
									item.p_f = item.price - item.previousClose < 0 ? "-" : "+";
									item.p_h = (((item.price - item.previousClose) / item.previousClose) * 100)
										.toFixed(2);
									arr.push(item)


								}
							})
							this.listArr = arr;
							console.log("--21--->", this.listArr)
						}
					)
			},
			toCheck() {
				// 主动检查更新，一般用于设置界面中
				// 用法：设置auto为false,当用户点击检查更新时，执行此方法
				this.$refs.updateRef.check();
			},
			// toDetail(itemid, goods_type) {
			//     uni.navigateTo({
			//         url: '/pages/detail/goodsinfo?itemid=' + itemid + '&goods_type=' + goods_type
			//     });
			// },
			// toBrandInfo(brandid) {
			//     uni.navigateTo({
			//         url: './brandInfo?brand_id=' + brandid
			//     });
			// },
			// async getList(index, type) {
			//     let activeTab = this.tabs[index];
			//     this.scrollInto = activeTab.id;
			//     activeTab.loadingText = '数据加载中...';
			//     try {
			//         var post = { cateid: activeTab.id, page: activeTab.page, limit: 10 };
			//         const res = await getApp().globalData.request.post('brand/brandlist', post);
			//         if (res.code == 200) {
			//             if (res.data.length > 0) {
			//                 activeTab.loadingText = '加载完成';
			//                 activeTab.isNextStatus = true;
			//                 if (activeTab.page == 1) {
			//                     activeTab.product = res.data;
			//                 } else {
			//                     activeTab.product = activeTab.product.concat(res.data);
			//                 }
			//             } else {
			//                 activeTab.loadingText = '没有更多了';
			//                 activeTab.isNextStatus = false;
			//             }
			//         } else {
			//             activeTab.loadingText = '没有更多了';
			//             activeTab.isNextStatus = false;
			//         }
			//     } catch (e) {
			//         activeTab.loadingText = '没有更多了';
			//         activeTab.isNextStatus = false;
			//     }

			//     if (type == 'refreshData') {
			//         this.pulling = true;
			//         activeTab.refreshing = false;
			//         activeTab.refreshText = '已刷新';
			//         setTimeout(() => {
			//             // TODO fix ios和Android 动画时间相反问题
			//             this.pulling = false;
			//         }, 500);
			//     }
			// },
			// loadMore(e) {
			//     let activeTab = this.tabs[this.tabCurrentIndex];
			//     activeTab.page = activeTab.page + 1;
			//     this.getList(this.tabCurrentIndex);
			// },
			// changSlider(e) {
			//     let index = e.target.current || e.detail.current;
			//     this.tabCurrentIndex = index;
			//     this.switchTab(index);
			// },
			// switchTab(index) {
			//     if (this.tabs[index].product.length === 0) {
			//         this.getList(index);
			//     }
			// },
			// changTab(index) {
			//     this.tabCurrentIndex = index;
			//     this.switchTab(index);
			// },
			// onrefresh(e) {
			//     var tab = this.tabs[this.tabCurrentIndex];
			//     if (!tab.refreshFlag) {
			//         return;
			//     }
			//     tab.refreshing = true;
			//     tab.refreshText = '正在刷新...';
			//     tab.page = 1;
			//     this.getList(this.tabCurrentIndex, 'refreshData');
			// },
			// onpullingdown(e) {
			//     var tab = this.tabs[this.tabCurrentIndex];
			//     if (tab.refreshing || this.pulling) {
			//         return;
			//     }
			//     if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			//         tab.refreshFlag = true;
			//         tab.refreshText = '释放立即刷新';
			//     } else {
			//         tab.refreshFlag = false;
			//         tab.refreshText = '下拉可以刷新';
			//     }
			// },
			// async loadCate(callback) {
			//     try {
			//         const res = await getApp().globalData.request.post('brand/cateList', { pid: 0 });

			//         if (res.code == 200) {
			//             var catedata = [];
			//             catedata.push({
			//                 id: 0,
			//                 name: '精选品牌',
			//                 product: [],
			//                 refreshing: false,
			//                 loadingstatus: false,
			//                 loadingText: '加载中...',
			//                 isNextStatus: true, // 是否还允许下次加载
			//                 page: 1
			//             });
			//             for (let i in res.data) {
			//                 var scate = res['data'][i];
			//                 catedata.push({
			//                     id: scate.id,
			//                     name: scate.name,
			//                     product: [],
			//                     refreshing: false,
			//                     loadingstatus: false,
			//                     loadingText: '加载中...',
			//                     isNextStatus: true, // 是否还允许下次加载
			//                     page: 1
			//                 });
			//             }
			//             this.tabs = catedata;
			//         }
			//     } catch (e) {
			//         console.log(e);
			//     }
			//     callback && callback('ok');
			// }
			// 3333333
			// 旋转事件
			changeHandle(index) {
				console.log(index, 'index')
			},
			// 点击事件
			gotoHandle(index) {
				console.log(index, 'index')
			},
			onHandleCheck(res) {
				this.release = res;

				console.log("handleCheck", e);
			},
			onHandleError(e) {
				console.log("handleError", e);
			},
			onHandleFinish(e) {
				if (!res.isTest) {
					uni.showToast({
						title: 'End Update',
						icon: 'none'
					});
				}
			},
			scrolltoupper() {},
			handleStockList(item, index) {
				var _this = this;
				_this.stockList[index].active = !_this.stockList[index].active;
			},
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
			addGoods() {
				uni.navigateTo({
					url: "/pages/seachPage/index"
				})
			},
			jumpToDescribe(item) {
				if (this.userInfo == null) {
					this.nativeGetTo()
				} else {
					uni.navigateTo({
						url: getApp().getUrl("/pages/mine/index")

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
							_this.vip_end_vip = res.vip_end
							_this.stockListIndex = [{
								title: "Pluto",
								active: true,
								id: 3,
								vip: res.vip_end,
								childTrendList: [{
										title: "Swing Signals",
										child: res.short,
										id: 3


									},
									{
										title: "Trend Signals",
										child: res.long,
										id: 4
									}
								]
							}]
							console.log('----eeee----->', _this.stockListIndex)
							_this.stockList = [{
									title: "Wealth Quarterly Guide",
									child: res.report,
									active: true,
									id: 1,
									vip: res.report_vip_end
								},
								{
									title: "Stock Vane",
									child: res.smartmoney,
									active: true,
									id: 2,
									vip: res.sm_vip_end
								},
								{
									title: "Plouto",
									active: true,
									id: 3,
									vip: res.vip_end,
									childTrendList: [{
											title: "Swing Signals",
											child: res.short,
											id: 3


										},
										{
											title: "Trend Signals",
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
	.mostListTitle1 {
		/* border-left: 16upx solid #4ca594; */
		/* border-radius: 10px; */
		/* padding-left: 20upx; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.marketCountStyle {
		width: 100%;
	}

	.lookMore {
		width: 94%;
		margin: 0 auto;
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0;
		font-weight: bold;
	}

	.mostList {
		width: 94%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 30upx;
		padding: 20upx;
		border-radius: 16upx;
		border: 1upx solid #999;

	}

	.mostListRowEr {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0;
		/* border-bottom: 1upx solid #999; */

	}

	.lookMoreVideo {
		width: 94%;
		margin: 0 auto;
		padding: 40upx 0;

	}

	.mostListRowList {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	/deep/ .uni-video-video {
		background-color: #191428;
		border: none;
		object-position: center;
	}

	.mostList100 {
		width: 100%;
	}

	.marketCountStyleTwo {
		width: 50%;
		margin: 0 auto;
		padding: 20upx 0;
		border: 1px solid #fff;
		margin-top: 30%;
		text-align: center;
		border-radius: 10upx;
		font-size: 24px;
	}

	/* /deep/ .u-scroll-view{
		background-color: #191428;
	} */

	/* .brand {
    flex-direction: column;
    flex: 1;
    border-top-style: solid;
    border-top-width: 1rpx;
    border-top-color: #f8f8f8;
    background-color: #f2f2f2;
}
.brand-cate-gory {
    height: 100rpx;
    line-height: 100rpx;
    background-color: #ffffff;
    border-bottom-style: solid;
    border-bottom-width: 1rpx;
    border-bottom-color: #f6f6f6;
}
.brand-tab-title {
    background-color: #ffffff;
    height: 100rpx;
    flex-direction: row;
    color: #333333;
}
.brand-tab-title-txt {
    padding: 0rpx 20rpx;
    height: 100rpx;
    font-size: 28rpx;
    line-height: 100rpx;
    text-align: center;
    color: #333333;
}
.brand-tab-active {
    color: #fa0000;
}
.brand-card {
    flex-direction: column;
    flex: 1;
}
.brand-list {
    flex-direction: column;
    flex: 1;
}
.s-list-icons {
    width: 100rpx;
    height: 100rpx;
    background-color: #f6f6f6;
    margin-left: 20rpx;
    margin: 20rpx;
}
.s-bordern {
    border-bottom-width: 0rpx;
    border-bottom-color: #ffffff;
}
.imgs {
    width: 200rpx;
    height: 200rpx;
    background-color: #f6f6f6;
}
.brand-goods {
    width: 220rpx;
    margin: 0rpx;
}
.bran-goods-rows {
    margin-left: 20rpx;
}
.brand-goods-title {
    width: 200rpx;
    text-align: center;

    text-overflow: ellipsis;
    overflow: hidden;

    color: #333333;
    font-size: 22rpx;
    line-height: 30rpx;
}

.brand-goods-price {
    width: 200rpx;
    text-align: center;
    color: #fa0000;
    font-size: 22rpx;
}

.swiper-box {
    flex: 1;
}

.swiper-item {
    flex: 1;
}

.scroll-v {
    flex: 1;
    flex-direction: column;
    width: 750rpx;
}
.s-ceil {
	padding: 25rpx 0;
	border-bottom-width: 1rpx;
	border-bottom-style: solid;
	border-bottom-color: #E9E9E9;
	align-items: center;
	flex-direction: row;
	flex-wrap: nowrap;
} */
	.content_app_style_content {
		min-height: 100vh;
		overflow-y: scroll;

	}

	/* ::v-deep .uni-swiper-dot.uni-swiper-dot-active {
		background-color: #fff;
		background: #fff;
	} */

	.tab-list-style-view {
		color: #B2620A;
		width: 94%;
		margin: 0 auto;
		padding: 1upx;
	}

	.text-aligin-center {
		text-align: center;
	}

	.fontSizeB1 {
		font-size: 26upx;
	}
</style>
