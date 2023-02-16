<template>
	<view>
		<view class="content">
			<view class="col" v-for="(item,index) in list" :key="index" @click="play(item.videoId,index)">
				<view class="name textColorFFF fontSize16 fontWeight">
					{{item.name}}
				</view>
				<video v-if="currentId == item.videoId" style="width: 690rpx;height: 390rpx; display: block;"
					autoplay="true" :id="'video'+item.videoId" :src="item.video"></video>
				<block v-else>
					<image :src="item.img" style="height:390rpx;width:690rpx;display: block;"></image>
					<view class=" block">
						<view class="sanjia"></view>
					</view>
				</block>
				 
				 
			</view>
		</view>
	</view>
</template>

<script>
	import {
		noauthvideolist
	} from '@/api/index.js';
	 
	import {
		baseUrlImgShow
	} from '@/common/config.js'
	export default {
		data() {
			return {
				list: [],
				currentId: 0,
				scrollH: 0,
				scrollTop: 0,
				height: 0,
				windowHeight: 0
			}
		},
		onLoad() {
			let that = this
			that.getList() 
			// 获取可视区域高度
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight
				}
			})
			 
		},
		onPageScroll(res) {
			// 获取滚动距离
			this.scrollH = res.scrollTop
			// 判断元素是否已经出了可视区
			if (this.scrollH > this.scrollTop || this.scrollH + this.windowHeight < this.scrollTop) {
				const e = uni.createVideoContext("video" + this.currentId, this);
				e.pause()
			}
		},
		onHide() {
			this.currentId = 0
		},
		methods: {
			getNoauthvideolists() {
				console.log("--34--99---------->")
				 this.$request.get({
						url: `${noauthvideolist}?goods_id=`,
						loadingTip: 'more...'
					})
					.then(
						res => {
								console.log("--34------------>", res)
							this.getList(res.list)
						 
						},
			
					)
			},
			play(id, i) {
				this.currentId = id
				// 获取当前播放视频 元素距离顶部的高度
				if (this.height == 0) {
					uni.createSelectorQuery().select('.col').boundingClientRect((res) => {
						this.height = res.height
						this.scrollTop = res.height * (i + .5)
					}).exec()
				} else {
					this.scrollTop = this.height * (i + .5)
				}
			},
			getList(lists) {
				
				 
				
				// lists.forEach((item,index)=>{
				// this.list.push({
				// 	name:item.title,
				// 	img:baseUrlImgShow+item.img,
				// 	video:item.url,
				// 	videoId:item.ID,
				// })	
				// })
				// https://stock-plouto.com/sVideo/abc.m3u8
				let url ='https://stock-plouto.com/sVideo/'
				console.log("----123------>", this.list)
				this.list = [{
					name: 'How dose the stock market work',
					img:url+ 'img1.png',
					video: url+'abc.m3u8',
					videoId: '1'
				} ,{
					name: 'How is the stock price determined stock market',
					 img:url+ 'img2.png',
					 video:  url+'work2.mp4',
					videoId: '2'
				},{
					name: 'options for beginners(part 1)',
					 img:url+ 'img3.png',
					 video: url+ 'work3.mp4',
					videoId: '3'
				},{
					name: 'options for beginners(part 2)',
					 img:url+ 'img4.png',
					 video: url+ 'work4.mp4',
					videoId: '4'
				}]
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30rpx;
	}

	.name {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 0 0 10px 10px;

		text-align: center;
		font-size: 28upx;
		text-align: left;
	}

	.col {
		overflow: hidden;
		position: relative;
		overflow: hidden;
		margin-bottom: 50rpx;

		.block {
			position: absolute;
			width: 100%;
			height: 390rpx;
			background-color: rgba($color: #000000, $alpha: .3);
			left: 0; 
			display: flex;
			justify-content: center;
			align-items: center;

			.sanjia {
				width: 0;
				height: 0;
				border-top: 12px solid transparent;
				border-left: 17px solid #FFFFFF;
				border-bottom: 12px solid transparent;
			}
		}
	}
</style>
