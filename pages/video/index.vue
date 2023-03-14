<template>
	<div class="page-all-video">
		<view @click="jumpToVideoDetail(idx)" class="page-list-img" v-for="(item,idx) in videoList" :key="idx" >
			<view class="page-list-img1"> {{item.content}}</view>
			<view class="page-list-img0">
			<image :src="item.avatar" mode=""></image>	
			</view>
			 
		</view> 
	</div>
</template>

<script>
	 
	export default {
	 
		data() {
			return {
				 
				videoList: [{
						src: 'https://stock-plouto.com/sVideo/work1/work1.m3u8',
						content: 'How dose the stock market work', 
						avatar: 'https://stock-plouto.com/sVideo/img1.png',
						 
					},
					{
						src: 'https://stock-plouto.com/sVideo/work2/work2.m3u8',
						content: 'How is the stock price determined stock market', 
						avatar: 'https://stock-plouto.com/sVideo/img2.png',
						 
					},
					{
						src: 'https://stock-plouto.com/sVideo/work3/work3.m3u8',
						content: 'options for beginners(part 1)', 
						avatar: 'https://stock-plouto.com/sVideo/img3.png',
						 
					},
					{
						src: 'https://stock-plouto.com/sVideo/work4/work4.m3u8',
						content: 'options for beginners(part 2)',
						 avatar: 'https://stock-plouto.com/sVideo/img4.png',
						 
					}
				],

			}
		},
		 
		 
	 
	 
		methods: { 
			jumpToVideoDetail(index){
				 
				uni.navigateTo({
					url:"/pages/video/detail?id="+index
				})
				 
			}
		},
		 
	}
</script>

<style scoped>
	.page-all-video{
		padding: 40upx;
	}
	.page-list-img {
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 justify-content: center;
		 margin-bottom: 20upx;
	} 
	.page-list-img0{
		width: 100%;
		height: 400upx;
		
	}
	.page-list-img0 image{
		width: 100%;
		height: 100%;
		background-size: cover;
		
	}
	.page-list-img1{
		width: 100%;
		color: #fff;
		text-align: left;
		padding: 20upx 0;
		font-size: 28upx;
	}
</style>
