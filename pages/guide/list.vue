<template>
	<view class="guide">
		<swiper class="flex1" interval="3000" :show-indicators="false" :auto-play="autoPlay" @change="sliderChange"
			:infinite="false" :forbid-slide-animation="false">
			<swiper-item class="flex1" v-for="(img, index) in imageList" :key="index">
				<view class="flex1" @click="launchAppIndex">
					<image class="flex1" resize="contain" :src="img.src" />
				</view>
			</swiper-item>
		</swiper>
		<view class="swiper-to-home" @click="launchApp"><text class="swiper-to-home-text">Skip</text></view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [{
						src: require('../../static/images/lunbo/boot/guide_1.png')
					},
					{
						src: require('../../static/images/lunbo/boot/guide_2.png')
					},
					{
						src: require('../../static/images/lunbo/boot/guide_3.png')
					},
					{
						src: require('../../static/images/lunbo/boot/guide_4.png')
					}
				],
				autoPlay: false,
				currIndex: 0,
				agreement: '',
				app_name: ''
			};
		},

		onReady() {

		},
		methods: {

			sliderChange(e) {
				this.currIndex = e.detail.current;
			},
			launchAppIndex() {
				console.log('launchAppIndex');
				if (this.imageList.length == this.currIndex + 1) {
					this.launchApp();

				} else {
					return;
				}
			},
			launchApp() {
				// 直接到APP 且下次不再显示引导页
				uni.setStorage({
					key: 'launchFlag',
					data: true,
					success() {
						console.log('launchAppIndex');
						uni.switchTab({
							url: '/pages/tab/index/index'
						});
					}
				});
			}
		}
	};
</script>
<style scoped>
	.guide {
		flex-direction: column;
		flex: 1;
		background-color: #191224;
		height: 100vh;
	}

	.flex1 {
		flex: 1;
		height: 100vh;
	}

	.swiper-to-home {
		position: absolute;
		z-index: 999;
		right: 40rpx;
		top: 80rpx;
	}

	.swiper-to-home-text {
		color: #ffffff;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
		border-width: 1rpx;
		border-color: #ffffff;
		border-style: solid;
		border-radius: 30rpx;
		font-size: 28rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		padding-left: 25rpx;
		padding-right: 25rpx;
	}

	.indicator {
		width: 714rpx;
		height: 30rpx;
		position: absolute;
		bottom: 50rpx;
		left: 1rpx;
		item-color: #f6f6f6;
		item-selected-color: #fd575c;
		item-size: 20rpx;
	}

	.dialog-btn-box {
		width: 584rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.left-btn-text {
		height: 100rpx;
		line-height: 100rpx;
		width: 290rpx;
		text-align: center;
		border-top-color: #f6f6f6;
		border-top-width: 2rpx;
		border-right-color: #f6f6f6;
		border-right-width: 3rpx;
		font-size: 32rpx;
		color: #7d7c7b;
	}

	.right-btn-text {
		height: 100rpx;
		line-height: 100rpx;
		width: 290rpx;
		text-align: center;
		border-top-color: #f6f6f6;
		border-top-width: 2rpx;
		font-size: 32rpx;
		color: #174ba5;
	}

	.search-dialog {
		width: 584rpx;
	}

	.search-dialog-box {
		background-color: #ffffff;
		border-radius: 20rpx;
	}

	.image-view-box {
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.search-dialog-image {
		margin-top: 10rpx;
		width: 220rpx;
		height: 210rpx;
		justify-content: center;
		align-items: center;
		background-color: transparent;
	}

	.search-dialog-content {
		padding: 30rpx;
		background-color: #ffffff;
	}

	.search-dialog-content-text {
		color: #2c373e;
		font-size: 25rpx;
		text-align: left;
		flex: 1;
	}

	.search-dialog-content-text-d {
		color: #2c373e;
		font-size: 25rpx;
		text-align: left;
	}
</style>
