<template>
	<view>
		<view class="fixedit" :style="{top:top}">
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
				<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index"
					class="grace-tab-current-1" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
					@tap="tabChange">{{cate.name}}
				</view>
			</scroll-view>
		</view>
		<view style="height:100upx;"></view>
		<!-- 文章内容区 -->
		<view class="grace-news-list" style="width:94%; margin: 0 auto;">
			<block class="newsListStyleNews" v-for="(item, index) in artList" :key="index">
				<!-- 一张图 -->
				<navigator @click="nato(item)" open-type="navigate" v-if="cateCurrentIndex==0">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main textColorFFF fontWeight">{{item.title}}</view>
						<view class="grace-news-list-title-main textColorFFF"  >
							{{item.updatetime| formatDate }}</view>
					<!-- 	<view class="grace-news-list-title-main textColorFFF" v-if="cateCurrentIndex==1">
							{{item.publishedDate }}</view> -->
						<view class="grace-news-list-img-big">
							<image :src="item.img" mode="widthFix"></image>
						</view>
						<view class="">
							{{item.text}}
						</view>
					</view>
				</navigator>
				
				
				   <view v-if="cateCurrentIndex==1">
					   <view class="stepBox">
					   		<view class="step pd-top10">
					   			<view class="stepLeft">
					   				<view class="num">{{index+1}}</view>
					   				<view class="line"></view>
					   			</view>
					   			<view class="stepRight">
					   				<view class="title fontWeight marginBottom20">{{item.title}}</view>
					   				<view class="title marginBottom20">{{item.publishedDate}}</view>
					   				<view class="grace-news-list-img-big">
					   					<image :src="item.img" mode="widthFix"></image>
					   				</view>
									 
					   				<view class="content ">{{item.text}}</view>
					   				 
					   			</view>
					   		</view> 
							 
					   	</view> 
						<!-- <view class="borderLine"></view> -->
				        <!-- <mSidebar title="">
						 
				           <view class="row">
				                <m-steps   :item='item'  :index='index' :activity= 'activity' date='updateTime'>
				                   
									<view slot="status">
										 
									<view class="fontWeight fontSize19 textColorFFF">
									 	{{item.title}}
									</view>
									
									 <view class="color88">
									 	{{item.text}}
									 </view>
									</view>
				                </m-steps>
				            </view>
				        </mSidebar> -->
				    </view>
				<!-- 三张图 -->
				<!-- <navigator url="../article-info/article-info" v-if="item.imgs.length >= 3">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main">{{item.title}}</view>
						<view class="grace-news-list-imgs">
							<image :src="item.imgs[0]" mode="widthFix"></image>
							<image :src="item.imgs[1]" mode="widthFix"></image>
							<image :src="item.imgs[2]" mode="widthFix"></image>
						</view>
					</view>
				</navigator> -->
			</block>
		</view>
	</view>
</template>
<script>
	import mSidebar from "@/components/m-sidebar/m-sidebar.vue"
	import mSteps from '@/components/m-steps/m-steps.vue'
	import {
		baseUrlImgShow
	} from '@/common/config.js'
	import {
		noauthNews,
		noauthstockNews
	} from '@/api/index.js'
	var page = 1,
		cate = 0;
	export default {
		components: {
		    mSidebar,
		    mSteps
		},
		data() {
			return {
				activity:1,//当前进度条状态
				top: 0,
				//分类信息
				categories: [{
						cateid: 0,
						name: "Event"
					},
					{
						cateid: 1,
						name: "Brief News"
					}
				],
				// 当前选择的分类
				cateCurrentIndex: 0,
				// 演示文章数据
				artList: []
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
		onLoad: function() {
			// #ifdef H5
			this.top = '44px';
			// #endif
			page = 1;
			artList: [];
			this.getNewsList();
		},
		//下拉刷新
		onPullDownRefresh: function() {
			// 重置分页及数据
			page = 1;
			this.artList = [];
			this.getNewsList();
		},
		// 加载更多
		onReachBottom: function() {
			this.getNewsList();
		},
		methods: {
			nato(item) {
				if (this.cateCurrentIndex == 0) {
					uni.navigateTo({
						url: '/pages/consultingService/detail?id=' + item.ID
					})
				}

			},
			// 数据和分页是模拟的，实际也是这样写

			addhttp(urls) {
				var s = /(http|https):\/\/\S*/;

				return s.test(urls)
			},

			getNewsList() {


				uni.showLoading({});
				// 假设已经到底，实际根据api接口返回值判断
				// if (page >= 3) {
				// 	uni.showToast({
				// 		"title": "已经加载全部",
				// 		icon: "none"
				// 	});
				// 	return;
				// }
				var res = this.$request.get({
						url: `${noauthNews}?page=` + page,
						loadingTip: 'more...'
					})
					.then(
						res => {
							var newsList = res.list;
							newsList.forEach((items, i) => {
								items.img = this.addhttp(items.img) == true ? items.img : baseUrlImgShow + items
									.img;
							})
							this.artList = this.artList.concat(newsList);
							console.log("----->>>>>", this.artList);
							uni.hideLoading();
							page++;
							uni.hideLoading();
							uni.stopPullDownRefresh();
						},

					)

			},
			getNewsBriefList() {


				uni.showLoading();
				// 假设已经到底，实际根据api接口返回值判断
				// if (page >= 3) {
				// 	uni.showToast({
				// 		"title": "已经加载全部",
				// 		icon: "none"
				// 	});
				// 	return;
				// }
				var res = this.$request.get({
						url: `${noauthstockNews}?page=` + page,
						loadingTip: 'more...'
					})
					.then(
						res => {
							var newsList = res.list;
							newsList.forEach((items, i) => {
								items.img = this.addhttp(items.image) == true ? items.image : baseUrlImgShow +
									items
									.image;
							})
							this.artList = this.artList.concat(newsList);
							console.log("----->>>>>", this.artList);
							uni.hideLoading();
							page++;
							uni.hideLoading();
							uni.stopPullDownRefresh();
						},

					)

			},
			// getNewsList() {
			// 	uni.showLoading({});
			// 	// 假设已经到底，实际根据api接口返回值判断
			// 	if (page >= 3) {
			// 		uni.showToast({
			// 			"title": "已经加载全部",
			// 			icon: "none"
			// 		});
			// 		return;
			// 	}
			// 	uni.request({
			// 		url: `${noauthNews}?page=` + page,
			// 		method: 'GET',
			// 		data: {},
			// 		success: res => {
			// 			console.log("----->>>>>", res);
			// 			var newsList = res.list;
			// 			this.artList = this.artList.concat(newsList);
			// 			uni.hideLoading();
			// 			page++;
			// 		},
			// 		complete: res => {
			// 			uni.hideLoading();
			// 			uni.stopPullDownRefresh();
			// 		}
			// 	});
			// },
			tabChange: function(e) {
				// 选中的索引
				var index = e.currentTarget.dataset.index;
				// 具体的分类id
				var cateid = e.currentTarget.dataset.cateid;
				this.cateCurrentIndex = index;
				// 动态替换内容
				this.content = this.categories[index].name;

				// 读取分类数据
				cate = cateid; //把分类信息发送给api接口即可读取对应分类的数据
				// 重置分页及数据 
				page = 1;
				this.artList = [];

				if (cateid === 0) {
					this.getNewsList();
				} else {
					this.getNewsBriefList()
				}

				// 加载对应分类数据覆盖上一个分类的展示数据 加载更多是继续使用这个分类

			}
		}
	}
</script>
<style lang="scss">
	/* 分段器头部 fixed 定位 */
	.fixedit {
		// width: 100%; 
		position: fixed;
		z-index: 99;
		left: 0;
		top: 0;
		 padding-left: 10px;
	}

	.grace-news-list-imgs {
		max-height: 68px;
		overflow: hidden;
	}

	/*
graceUI.wxss [ graceUI 为收费 UI 框架，此处只包含一小部分使用到的 ]
link : graceui.hcoder.net
author : 5213606@qq.com 深海
verson : 1.1.1
*/
	/* 通用样式 */
	view {
		font-size: 28upx;
	}

	.grace-padding {
		padding: 2%;
		width: 96%;
	}

	.grace-common-bg {
		background: #F8F8F8;
	}

	.grace-noborder {
		border: 0 !important;
	}

	.grace-left-padding-wrap {
		width: 96%;
		padding: 12upx 0;
		padding-left: 4%;
		overflow: hidden;
		background: red;
	}

	.grace-left-padding-wrap .grace-list {
		border-bottom: 1upx solid #D1D1D1;
		padding-left: 0;
	}

	.grace-left-padding-wrap .grace-list view text {
		color: #666;
		font-size: 28upx;
	}

	/* 栅格布局 */
	.grace-flex {
		display: flex !important;
	}

	.grace-rows {
		display: flex;
		flex-direction: row !important;
	}

	.grace-columns {
		display: flex;
		flex-direction: column !important;
	}

	.grace-tab-current-1 {
		color: #FFFFFF;
	}

	.grace-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.grace-nowrap {
		display: flex;
		flex-wrap: nowrap !important;
	}

	.grace-space-between {
		display: flex;
		justify-content: space-between !important;
	}

	.grace-tab {
		padding: 0;
	}

	.grace-tab-title {
		white-space: nowrap;
		text-align: center;
		padding-left: 10px;
		// background: #FFFFFF;
	}

	.grace-tab-title view {
		width: auto;
		padding: 0 12px;
		margin: 0 8px;
		line-height: 42px;
		display: inline-block;
		text-align: center;
		/* border-bottom: 2px solid #FFFFFF; */
		font-size: 30upx;
		/* color: #FFFFFF; */
	}

	.grace-tab-title view:first-child {
		margin-left: 0;
	}

	.grace-tab-title view:last-child {
		margin-right: 0;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #4ca594 !important;
		color: #4ca594;
	}

	/* 新闻列表 */
	.grace-news-list {
		padding: 12upx 0;
	}

	.newsListStyleNews {
		border-bottom: 20upx solid #f5f5f5;
	}

	.grace-news-list>navigator {
		display: block;
		width: 100%;
		padding: 12upx 0;
		margin: 12upx 0;
	}

	.grace-news-list-items {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	.grace-news-list-img {
		width: 200upx;
		flex-shrink: 0;
	}

	.grace-news-list-title {
		width: 100%;
		overflow: hidden;
	}

	.grace-news-list-title-main {
		line-height: 1.5em;
		font-size: 32upx;
		width: 100%;
	}

	.grace-news-list-title-desc {
		font-size: 24upx;
		display: block;
		color: #666;
		margin-top: 12upx;
		height: 40upx;
		line-height: 40upx;
	}

	.grace-news-tips {
		width: auto;
		padding: 0 12upx;
		border-radius: 5upx;
		overflow: hidden;
		background: #FF4343;
		position: absolute;
		top: 0;
		color: #FFFFFF;
		height: 36upx;
		line-height: 36upx;
		font-size: 20upx;
	}

	.grace-news-tips-l {
		left: 0;
	}

	.grace-news-tips-r {
		right: 0;
	}

	.grace-news-list-info {
		width: 100%;
		margin-top: 10upx;
		line-height: 36upx;
		font-size: 24upx;
		color: #666;
		justify-content: space-between;
	}

	.grace-news-list-info view {
		font-size: 24upx;
		color: #666;
	}

	.grace-news-list-info text {
		font-size: 24upx;
		color: #666;
		margin-right: 10upx;
	}

	.grace-news-list-img-news {
		width: 100%;
		flex-wrap: wrap;
		color: #fff;
		/* border-bottom: 20upx solid #ccc; */
	}

	.grace-news-list-imgs {
		justify-content: space-between;
		width: 100%;
		display: flex;
		margin: 18upx 0;
		align-items: flex-start;
	}

	.grace-news-list-imgs image {
		width: 31.3%;
		margin: 0 1%;
	}

	.grace-news-list-img-big {
		width: 100%;
		padding: 18upx 0;
	}

	.grace-news-list-img-big image {
		width: 100%;
	}

	/* 文章骨架结构 */
	.grace-skeleton {
		padding: 5px 0;
		background: #F1F2F3;
		border-radius: 8px;
	}

	.grace-article-title {
		margin: 8px 12px;
		font-size: 26px;
		line-height: 1.5em;
		font-weight: 700;
	}

	.grace-article-author-line {
		margin: 3px 12px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.grace-article-author {
		display: flex;
		flex-wrap: nowrap;
	}

	.grace-article-author image {
		width: 28px;
		height: 28px;
		border-radius: 100%;
	}

	.grace-article-author .author-name {
		line-height: 28px;
		padding-left: 5px;
	}

	.grace-article-author-line .btn {
		display: inline-block;
		height: 28px;
		line-height: 28px;
		border-radius: 3px;
		padding: 0 10px;
		background: #00B26A;
		color: #FFFFFF;
	}

	.grace-article-info-line {
		margin: 8px 12px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.grace-article-info-line view {
		color: #888;
		line-height: 20px;
		font-size: 12px;
	}

	.grace-article-contents {
		margin: 10px 0;
	}

	.grace-article-contents .img-item {
		width: 100%;
	}

	.grace-article-contents .img-item image {
		width: 100%;
	}

	.grace-article-contents .text-item {
		margin: 8px 12px;
		line-height: 2.2em;
		font-size: 16px;
		color: #2F2F2F;
	}
	.stepItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding-bottom: 0.5rem;
	}
	.stepItem:not(:last-of-type):after{
		content: "";
		font-size: 0;
		height: 65%;
		width: 0.05rem;
		background: #07c160;
		position: absolute;
		left: 0.2rem;
		top: 0.48rem;
	}
	.stepBox{
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.34375rem;
		color: #07c160;
	}
	/* 步骤条 */
	.stepBox{
			width: 90%;
			height: 100%;
			margin: 0 auto;
			font-size: 12px;
			.step{
				display: flex;
				height: 100%;
				.stepLeft{
					// height: 100%;
					position: relative;
					.num{
						height: 55rpx;
						width: 55rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
						color: #fff;
						background-color: #A8A8A8;
						position: relative;
						z-index: 2;
						font-size: 12px;
					}
					.line{
						height: 100%;
						background-color: #A8A8A8;
						width: 1px;
						z-index: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						top: 0;
						left: 50%;
						transform: translate(0%, 0%);
					}
				}
				.stepRight{
					height: 100%;
					margin-left: 20rpx;
					.title{
						width: fit-content;
						 
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						  
					}
					.content{
						font-size: 11px;
						height: 100%;
						color: #fff;
					}
				}
			}
		} 
		.borderLine{
				position: absolute;
				top: 20rpx;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid #309AFE;
				box-shadow:2px 2px 5px #d0c9c9;
			} 
</style>
