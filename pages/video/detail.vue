<template>
	<div class="page">
		 <!-- https://ext.dcloud.net.cn/plugin?id=856 -->
		<div class="video-box">
			<!--  -->
			<view class="video-box-title textColorFFF paddingTB">
                 {{videoList[videoId].content}}
			</view>
			<view class="video-box-video">
				<yy-video-player :auto-play="true" :url="videoList[videoId].src"
					:poster="videoList[videoId].avatar" :danmuList="danmuList" :show-back-btn="false">
				</yy-video-player>
			</view>

		</div>
	</div>
</template>

<script>
	import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	export default {
		components: {
			yyVideoPlayer
		},

		data() {
			return {
				danmuList: [],
				videoId: 0,
				videoList: [{
						src: 'https://stock-plouto.com/sVideo/work1/work1.m3u8',
						content: 'How dose the stock market work',
						avatar: 'https://stock-plouto.com/sVideo/img1.png',
					},
					{
						src: 'https://stock-plouto.com/sVideo/work2/work2.m3u8',
						content: 'How is the stock price determined stock market',
						avatar: 'https://stock-plouto.com/sVideo/img2.png'
					},
					{
						src: 'https://stock-plouto.com/sVideo/work3/work3.m3u8',
						content: 'options for beginners(part 1)',
						avatar: 'https://stock-plouto.com/sVideo/img3.png'
					},
					{
						src: 'https://stock-plouto.com/sVideo/work4/work4.m3u8',
						content: 'options for beginners(part 2)',
						avatar: 'https://stock-plouto.com/sVideo/img4.png'

					}
				],
			}
		},
		onLoad(options) {
			this.videoId = options.id;
		},
		methods: {

		},

	}
</script>

<style scoped>
	.video-box{
		width: 94%;
		margin: 0 auto;
	}
	 .video-box-video{
		 width: 100%;
		 
	 }

	.color_f_f {
		color: #fff
	}
</style>
