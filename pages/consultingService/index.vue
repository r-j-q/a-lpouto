<template>
	<view class="content_app minHeight100">
		  <uni-list v-for="(item,index) in noauthNewsList" :key="index">
		     <uni-list-item link="navigateTo"  @click="navigateToDetail(item)" showArrow :title="item.title" ellipsis="4"   :thumb="imageList[index%5]"
		      thumb-size="lg"  ></uni-list-item> 
		 </uni-list>
	</view> 
<!-- <view class="like">


		<view class="goods-box ">
			<list class="scroll-v" scroll-y enableBackToTop="true" :show-scrollbar="false" @scrolltolower="loadMore()" loadmoreoffset="50" scroll-with-animation enable-back-to-top>
				<cstRefresh @refresh="onrefresh" :refreshing="refreshing" @pullingdown="onpullingdown" :refreshText="refreshText"></cstRefresh>
				<cell v-if="notDataLoading">
					<view class="emptyItm-list-cell">
						<view class="empty-image-box"><image src="/static/img/goods/ui-def.png" class="not-data-def"></image></view>
						<text class="emoty-text">暂无商品</text>
					</view>
				</cell>

				<cell class="s-tab-list-cell" v-else v-for="(item, index) in product" :key="index">
					 </cell>

				<cell class="tui-refresh" v-if="!notDataLoading">
					<text class="refresh-text">{{ loadingText }}</text>
				</cell>
			</list>
		</view>
	</view> -->
<!-- 2222 -->
</template>
  
<script>
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
		 components:{
		             
		        },
		data() {
			return {
					// options: [
					// 			{
					// 				text: '取消',
					// 				style: {
					// 					backgroundColor: '#007aff'
					// 				}
					// 			},
					// 			{
					// 				text: '确认',
					// 				style: {
					// 					backgroundColor: '#dd524d'
					// 				}
					// 			}
					// 		],
					// 		notDataLoading: false,
					// 		product: [],
					// 		refreshing: false,
					// 		refreshText: '下拉可以刷新',
					// 		loadingText: '加载中...',
					// 		page: 1
				
				
				
				 noauthNewsList:[],
				 imageList0:require('../../static/images/zx/shen_1.jpeg'),
				 imageList1:require('../../static/images/zx/shen_2.jpeg'),
				 imageList2:require('../../static/images/zx/shen_3.jpeg'),
				 imageList3:require('../../static/images/zx/shen_4.jpeg'),
				 imageList4:require('../../static/images/zx/shen_5.jpeg'),
				 imageList5:require('../../static/images/zx/shen_6.jpeg'),
				  
				  
				  
				   
			};
		}, 

		onLoad(option) {
			self = this;
			 self.getNoauthNewsList()

		},
		onShow() {
			
		},
		methods: { 
			
			// longpress(e) {
			// 			console.log(e);
			// 		},
			// 		change(open) {
			// 			// console.log('当前开启状态：' + open)
			// 		},
			// 		longpress2(event) {
			// 			uni.showModal({
			// 				title: '温馨提示',
			// 				content: '您确定取消收藏当前商品？',
			// 				success: res => {
			// 					if (res.confirm) {
			// 						this._$deleteGoods(event.item, event.index);
			// 					}
			// 				}
			// 			});
			// 		},
			// 		async _$deleteGoods(item, index) {
			// 			uni.showLoading({
			// 				title: '请稍等',
			// 				mask: true
			// 			});
			// 			var post = {
			// 				uid: this.$store.state.openid,
			// 				goods_title: item.goods_title,
			// 				goods_picture: item.goods_picture,
			// 				goods_type: item.goods_type,
			// 				shopType: item.shopType,
			// 				coupon_money: item.coupon_money,
			// 				goods_yprice: item.goods_yprice,
			// 				goods_price: item.goods_price,
			// 				goods_sale: item.goods_sale,
			// 				goods_numiid: item.goods_numiid,
			// 				tkrates: item.tkrates
			// 			};
			// 			var res = await getApp().globalData.request.post('product/addLikeGoods', post);
			// 			uni.hideLoading();
			// 			if (res.code && res.code == 200) {
			// 				uni.showToast({
			// 					title: '操作成功',
			// 					icon: 'none'
			// 				});
			// 				this.product.splice(index, 1);
			// 			} else {
			// 				uni.showToast({
			// 					title: res.msg || '操作失败',
			// 					icon: 'none'
			// 				});
			// 			}
			// 		},
			// 		async getList(type) {
			// 			if (this.notDataLoading) {
			// 				return;
			// 			}
			// 			try {
			// 				const result = await getApp().globalData.request.post('product/likeGoodsList', {
			// 					uid: this.$store.state.openid,
			// 					page: this.page
			// 				});
			// 				if (result.code == 200) {
			// 					if (result.data.length > 0) {
			// 						this.loadingText = '加载完成';
			// 						this.notDataLoading = false;
			// 						if (this.page == 1) {
			// 							this.product = result.data;
			// 						} else {
			// 							this.product = this.product.concat(result.data);
			// 						}
			// 					} else {
			// 						this.loadingText = '没有更多了';
			// 						this.notDataLoading = true;
			// 					}
			// 				} else {
			// 					this.loadingText = '没有更多了';
			// 					this.notDataLoading = true;
			// 				}
			// 			} catch (e) {
			// 				this.loadingText = '网络繁忙';
			// 			}
			// 			if (type == 'refreshData') {
			// 				this.pulling = true;
			// 				this.refreshing = false;
			// 				this.refreshText = '已刷新';
			// 				setTimeout(() => {
			// 					// TODO fix ios和Android 动画时间相反问题
			// 					this.pulling = false;
			// 				}, 500);
			// 			}
			// 		},
			// 		onrefresh(e) {
			// 			if (!this.refreshFlag) {
			// 				return;
			// 			}
			// 			this.refreshing = true;
			// 			this.refreshText = '正在刷新...';
			// 			this.page = 1;
			// 			this.getList('refreshData');
			// 		},
			// 		onpullingdown(e) {
			// 			if (this.refreshing || this.pulling) {
			// 				return;
			// 			}
			// 			if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			// 				this.refreshFlag = true;
			// 				this.refreshText = '释放立即刷新';
			// 			} else {
			// 				this.refreshFlag = false;
			// 				this.refreshText = '下拉可以刷新';
			// 			}
			// 		},
			// 		loadMore(e) {
			// 			this.page = this.page + 1;
			// 			this.getList();
			// 		},
			// 		back() {
			// 			uni.navigateBack();
			// 		},
			// 		detail(e) {
			// 			uni.navigateTo({
			// 				url: `/pages/detail/goodsinfo?itemid=${e.itemid}&goods_type=${e.goods_type}`
			// 			});
			// 		},
			// 		editClickTips() {
			// 			uni.showToast({
			// 				title: '长按即可删除哦~',
			// 				icon: 'none'
			// 			});
			// 		}
			
			
			
			
			
			
			navigateToDetail(item){
				uni.navigateTo({
					url:getApp().getUrl("/pages/consultingService/detail?item=" + encodeURIComponent(JSON.stringify(item)))  
				})
			}, 
			getNoauthNewsList(page) {
				 
				var res = self.$request.get({
						url: `${noauthNews}?page=`+page,
						loadingTip: 'more...'
					})
					.then(
						res => { 
						 
						self.noauthNewsList = res.list;
							console.log('more 列表', res.list);

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
	 ::v-deep .uni-list-item {
	 	padding: 20rpx 0;
	 	background-color: #2F243A!important;
	 	border: none;
	 	position: initial;
		color: #fff!important;
	 }
	 ::v-deep .uni-list-item span{
	   color: #fff!important;
	 }
	 
	 
	 
	 
	 /* .cell-select {
	 	border-color: #007aff;
	 	border-width: 1rpx;
	 	border-style: solid;
	 }
	 
	 .like {
	 	flex: 1;
	 	background-color: #f2f2f2;
	 	flex-direction: column;
	 }
	 
	 .emptyItm-list-cell {
	 	width: 750rpx;
	 	flex: 1;
	 	flex-direction: column;
	 	justify-content: center;
	 	padding-top: 20rpx;
	 }
	 
	 .empty-image-box {
	 	width: 750rpx;
	 	flex: 1;
	 	flex-direction: row;
	 	justify-content: center;
	 }
	 
	 .not-data-def {
	 	width: 250rpx;
	 	height: 250rpx;
	 	text-align: center;
	 	justify-content: center;
	 }
	 
	 .emoty-text {
	 	text-align: center;
	 	justify-content: center;
	 	font-size: 32rpx;
	 	color: #555;
	 }
	 
	 .goods-box {
	 	flex: 1;
	 }
	 
	 .scroll-v {
	 	flex: 1;
	 } */
</style>
