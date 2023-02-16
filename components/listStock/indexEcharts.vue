<template>
	<view class="tabTop">
		<scroll-view scroll-x="true"   :scroll-with-animation="true">
			<view class="box"   >
				<view class="tabTopItem" v-for="(item,index) in tabTopList" :key="index"
					:class="{'ac':tabTopCurrent == index}" @click="jumpToDescribe(item)">
					<view class="content_list_">
						<view class="content_list_1">
							<view class="fontSize10  t_a_c textColorFFF">{{item.symbol}} </view>
							 <view class="dis_row_l">
							  <view class="dis_row_1">
							  	<view class="fontSize14 fontWeight list_s_t"> {{item.price}}</view>
							  	<view class="list_s" :class="item.p_f=='+'?'textColorffb860':'textColor0c50d6'">
							  		<view class="fontSize12 mrr" :class="Number( item.p_h)>0?'color94':'color43'">{{item.p_f=='+'?'+':''}} {{item.p_r}} </view>
							  		<view class="fontSize12" :class="Number( item.p_h)>0?'color94':'color43'"> {{item.p_f=='+'?'+':''}}{{ item.p_h}}% </view>
							  	</view>
							  </view>
							<!-- 	<view class="dis_row_2" v-if="index==0"> 
									 <EchartsLine :dateline="dateDJI" :dataLines="dataDJI"></EchartsLine> 
								</view>
								<view class="dis_row_2"  v-if="index==1">
								<EchartsLine :dateline="dateIXIC" :dataLines="dataIXIC"></EchartsLine> 
								</view>
								<view class="dis_row_2"  v-if="index==2">
									 <EchartsLine :dateline="dateGSPC" :dataLines="dataGSPC"></EchartsLine> 
								</view> -->
							 </view>
						</view>

					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>
<script>
	 import {
	 	mapGetters
	 } from "vuex"
	 import EchartsLine from "./EchartsLine.vue";
	export default {
		 
		 props: ['tabTopList','dataDJI','dataIXIC','dataGSPC','dateGSPC','dateIXIC','dateDJI'],
		components:{
			EchartsLine
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				itemWidth: 0, //每个item的宽度
				totalWidth: 10000, //设置一个默认总宽度
				scrollLeft: 0, //滑动距离

				tabTopCurrent: 0,
				 
			}
		},
		mounted() {
			// this.getEle()
			 
		},
		methods: { 
		 
			// 点击tab切换高亮，并进行滑动，（index-1）是为了点击项显示在第二栏的位置
			jumpToDescribe(item) {
				if (this.userInfo == null) {
					this.nativeGetTo()
				} else {
					let params = {
						item 
					}
					uni.navigateTo({
						url: getApp().getUrl("/pages/ploutoDetail/index?params=" + encodeURIComponent(JSON.stringify(
							params)))
					})
				}
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
			getEle() {
				/*
					计算总宽度和每个item的宽度
					item宽度 = 自身宽度 + 8px右边距
					总宽度 = item个数 * 每个item的宽度
				*/
				// this.$nextTick(() => {
					let dom = uni.createSelectorQuery().select(".tabTopItem");
					dom.boundingClientRect((data) => {
                          console.log("===datadata====>", data)
						let num = 3;
						this.itemWidth = data.width + 8;
                        this.totalWidth = num * this.itemWidth;
						console.log("===totalWidth====>", this.totalWidth)
					}).exec()
				// })
			}
		}
	}
</script>
<style scoped lang="scss">
	.fontSize10{
		font-size: .1vw;
	}
	.dis_row_l{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		    width: 100%;
	}
	.dis_row_1{
		flex: 1;
	}
	.dis_row_2{
		width: 100px;
		height: 70px;
		background-color: #191428;
	}
	.t_a_c{
		text-align: left;
		
	}
	.content_list_ {
		// width: 100%;
		padding: 20upx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.content_list_1 {
			width: 100%;
			border-radius: 18upx;
			// box-shadow: #ccc 0px 0px 10px 0px !important;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			// padding: 14upx;
			// height: 100px;

			.list_s_t {
				margin: 10upx 0;
				text-align: left;
			}

		}

		.list_s {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}

	.tabTop {
		width: 760rpx;
		// background: red;
		height: 200rpx;
		margin: auto;
        margin-bottom: 40upx;
		/* 隐藏滚动条样式 */
		::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		.box {
			display: flex;
			align-items: center;

			.tabTopItem {
				margin: 10px 8px 10px 8px;
				border-radius: 20upx;
				    box-shadow: #ccc 0px 0px 10px 0px !important;
				text-align: center;
				width: 400rpx;
				height: 180rpx;
				// line-height: 200rpx;
				background-color: #191428;
				font-size: 28rpx;
				color: #8D9199;
				margin-right: 8px;
				position: relative;
				overflow: hidden;

				.tips {
					position: absolute;
					right: 0;
					top: 0;
					width: 72rpx;
					height: 28rpx;
				}
			}

			.ac {
				font-size: 30rpx;
				// background: #fff;
				// color: #17181B;
			}
		}
	}
</style>
