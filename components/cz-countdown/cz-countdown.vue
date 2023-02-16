<template>
	 <view class="countdown">
		<view class="textColorff fontSize35" v-if="d==0 && h==0 && m==0 && s == 0">
			0
		</view>
		
		<!-- <view class="find-popup" @click="shareModal">
				
				<view class="find-content">
					<view class="tui-btn-cancle" @click.stop="closeModal">
						
						<image class="img" src="/static/img/sort/close.png"></image>
						
					</view>
					<view class="price-explain">
						<text class="explain-word">价格说明</text>
					</view>
					<view class="explain-content">
							<text class="content-text shuoming">价格受市场或其他因素影响可能存在调整，请以结算页加油价格为准，如有疑问，请您联系客服111-1111-111</text>
						
							<text class="content-text">1、团油价:团油价说明</text>
							<text class="content-text">2、国标价:国标价说明</text>
							<text class="content-text">3、油站价:油站价说明</text>
					</view>
				</view>
			</view> -->
		<view class="countdown" v-else>
			<view class="day" v-if="d!=0"><text class="text">{{d}}</text>Day</view>
			<view class="time" style="margin-left: 9rpx;">{{h<10?'0'+h:h}}</view>
			<text class="text">:</text>
			<view class="time">{{m<10?'0'+m:m}}</view>
			<text class="text">:</text>
			<view class="time">{{s<10?'0'+s:s}}</view>
		</view>
	</view> 
	 
</template>

<script>
	export default {
		props: {
			startTime: {
				type: String,
			},
			endTime: {
				type: String,
			},
		},
		data() {
			return {
				timer: null,
				d: 0,
				h: 0,
				m: 0,
				s: 0
			}
		},
		mounted() {
			this.time()
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
		},
		computed: {
			// sTime() {
			// 	return this.startTime
			// },
			// eTime() {
			// 	return this.endTime
			// }
			sTime() {
				return this.startTime
			},
			eTime() {
				return this.endTime
			}
		},
		watch: {
			 
			endTime() {
				clearInterval(this.timer);
				this.time()
			}
		},
		methods: {
			 
			time() {
				let leftTime = this.getDateDiff(this.sTime, this.eTime)
				this.handleCountdownTime(leftTime)
			},
			getDateDiff(startTimes, endTimes) {
				startTimes = startTimes.replace(/\-/g, "/");
				endTimes = endTimes.replace(/\-/g, "/");
				var sTimes = new Date(startTimes);
				var eTimes = new Date(endTimes);
				return parseInt((eTimes.getTime() - sTimes.getTime()) / 1000);
			},
			 
			handleCountdownTime(leftTime) {
				let time = leftTime
				if (time > 0) {
					this.timer = setInterval(() => {
						if (time == 0) {
							clearInterval(this.timer)
							this.h = 0
							this.m = 0
							this.s = 0
						} else {
							this.d = parseInt(leftTime / 3600 / 24);
							this.h = parseInt((time / 3600) % 24);
							this.m = parseInt((time / 60) % 60);
							this.s = parseInt(time % 60);
							time--
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .cstIconfontN {
	// 	text-align: center;
	// 	font-size: 75rpx;
	// }
	
	// .find-popup {
	// 	width: 750rpx;
	// 	flex-direction: column;
	// 	flex: 1; 
	// }
	// .find-content{
	// 	width: 750rpx;
	// 	background-color: #FFFFFF;
	// 	position: fixed;
	// 	bottom: 0rpx;
	// 	border-top-right-radius: 20rpx;
	// 	border-top-left-radius: 20rpx;
	// }
	// .price-explain{
	// 	width:680rpx;
	// 	margin-left: 35rpx;
		
	// }
	// .explain-word{
	// 	font-size: 33rpx;
	// 	color: #333;
	// 	line-height: 80rpx;
	// 	font-weight: bold;
	// }
	// .tui-btn-cancle {
	// 	width: 750rpx;
	// 	height: 70rpx;
	// 	align-items: flex-end;
	
		
	// }
	// .img{
	// 	width:50rpx;
	// 	height:50rpx;
	// 	margin-right:20rpx;
	// 	margin-top: 20rpx;
	// }
	// .explain-content{
	// 	font-size: 28rpx;
	// 	width:680rpx;
	// 	margin-left: 35rpx;
	// 	margin-bottom: 50rpx;
	// }
	// .content-text{
	// 	font-size: 28rpx;
	// 	color:#999;
	// }
	// .shuoming{
	// 	margin-bottom: 28rpx;
	// }
	
	// 222222
	.countdown{
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #fff;

		.day {
			font-size: 30upx;
			color: #B2620A;
			display: flex;
			align-items: center;

			.text {
				color: #fff;
				font-size: 40upx;
				font-weight: bold;
			}
		}

		.time {
			padding: 8rpx;
			background-color: #B2620A;
			border-radius: 4rpx;
			box-sizing: border-box;
		}

		.text {
			font-size: 36upx;
			font-weight: bolder;
			margin: 0 6rpx;
			color: #B2620A;
		}
	}
</style>
