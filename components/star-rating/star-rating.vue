<template>
	<!-- <view class="star-rating-style">
		<view class="star-rating-box" @touchstart='fun' @touchmove.stop.prevent='fun'>
		<image v-for="(item,i) in 5" class="icon-start-style" :src="(i+1)|getSrc(score)" mode="" style="opacity:1"></image>
		</view>
		<text class="star-rating-title-style">{{title}}</text>
	</view> -->
	<view class="star-rating-style">
		<view class="star-rating-box" @touchstart='fun' @touchmove.stop.prevent='fun'>
			<image v-for="(item,i) in 5" class="icon-start-style" :src="(i+1)|getSrc(score)" mode="" style="opacity:1">
			</image>
		</view>
		<text class="star-rating-title-style">{{title}}</text>
	</view>
	<!--    <div class="wrapper">
		<div class="status-bar"></div>
		<div class="nav" @click="back">
			<text class="back">&#xe582;</text>
			<text class="title">nvue 渐变色标题栏</text>
		</div>
    </div>
	    <div class="wrapper">
	 		<div class="status-bar"></div>
	 		<div class="nav" @click="back">
	 			<text class="back">&#xe582;</text>
	 			<text class="title">nvue 渐变色标题栏</text>
	 		</div>
	     </div>
		    <div class="wrapper">
		 		<div class="status-bar"></div>
		 		<div class="nav" @click="back">
		 			<text class="back">&#xe582;</text>
		 			<text class="title">nvue 渐变色标题栏</text>
		 		</div>
		     </div>
			    <div class="wrapper">
			 		<div class="status-bar"></div>
			 		<div class="nav" @click="back">
			 			<text class="back">&#xe582;</text>
			 			<text class="title">nvue 渐变色标题栏</text>
			 		</div>
			     </div>
				    <div class="wrapper">
				 		<div class="status-bar"></div>
				 		<div class="nav" @click="back">
				 			<text class="back">&#xe582;</text>
				 			<text class="title">nvue 渐变色标题栏</text>
				 		</div>
				     </div>
					    <div class="wrapper">
					 		<div class="status-bar"></div>
					 		<div class="nav" @click="back">
					 			<text class="back">&#xe582;</text>
					 			<text class="title">nvue 渐变色标题栏</text>
					 		</div>
					     </div>
						    <div class="wrapper">
						 		<div class="status-bar"></div>
						 		<div class="nav" @click="back">
						 			<text class="back">&#xe582;</text>
						 			<text class="title">nvue 渐变色标题栏</text>
						 		</div>
						     </div>
							    <div class="wrapper">
							 		<div class="status-bar"></div>
							 		<div class="nav" @click="back">
							 			<text class="back">&#xe582;</text>
							 			<text class="title">nvue 渐变色标题栏</text>
							 		</div>
							     </div>-->
</template>

<script>
	export default {
		name: 'star-rating',
		data() {
			return {
				iconStartSrcList: ['', '../../static/other/delivery_icon_star_disable.png',
					'../../static/other/delivery_icon_star_active.png'
				],
				title: '',
				width: 0,
			}
		},
		props: {
			name: {
				type: String,
				default: '',
			},
			score: {
				type: Number,
				default: 0,
			},
		},
		methods: {
			// fun(e) {
			// 	let score=Math.ceil(((e.changedTouches[0].pageX - e.currentTarget.offsetLeft)/this.width)*5);
			// 	if(score>=5)score=5;
			// 	if(score<=0)score=0;
			// 	this.$emit('changeScore', {
			// 		name: this.name,
			// 		score,
			// 	})
			// },
			fun(e) {
				let score = Math.ceil(((e.changedTouches[0].pageX - e.currentTarget.offsetLeft) / this.width) * 5);
				if (score >= 5) score = 5;
				if (score <= 0) score = 0;
				this.$emit('changeScore', {
					name: this.name,
					score,
				})
			},
			// getDescBox() {
			// 	uni.createSelectorQuery().in(this).select('.star-rating-box').boundingClientRect(result => {
			// 		if (result) {
			// 			this.width = result.width;
			// 		} else {
			// 			this.getDescBox();
			// 		}
			// 	}).exec();
			// },
			getDescBox() {
				uni.createSelectorQuery().in(this).select('.star-rating-box').boundingClientRect(result => {
					if (result) {
						this.width = result.width;
					} else {
						this.getDescBox();
					}
				}).exec();
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.getDescBox()
			});
		},
		filters: {
			// getSrc: function(i, score) {
			// 	if (score == 0) return '/static/star-rating/delivery_icon_star_empty.png';
			// 	if (score < i) return '/static/star-rating/delivery_icon_star_disable.png';
			// 	if (score >= i) return '/static/star-rating/delivery_icon_star_active.png';
			// }
			getSrc: function(i, score) {
				if (score == 0) return '/static/star-rating/delivery_icon_star_empty.png';
				if (score < i) return '/static/star-rating/delivery_icon_star_disable.png';
				if (score >= i) return '/static/star-rating/delivery_icon_star_active.png';
			}
		},
		watch: {
			// score(val) {
			// 	if (val == 0) this.title = '';
			// 	if (val == 1) this.title = 'very bad';
			// 	if (val == 2) this.title = 'bad';
			// 	if (val == 3) this.title = 'generally';
			// 	if (val == 4) this.title = 'satisfy';
			// 	if (val == 5) this.title = 'Very satisfied';
			// }
			score(val) {
				if (val == 0) this.title = '';
				if (val == 1) this.title = 'very bad';
				if (val == 2) this.title = 'bad';
				if (val == 3) this.title = 'generally';
				if (val == 4) this.title = 'satisfy';
				if (val == 5) this.title = 'Very satisfied';
			}
		}
	}
</script>

<style lang="scss">
	::v-deep uni-image>img {
		opacity: 1;
	}

	.star-rating-style {
		display: flex;
		align-items: center;

		.icon-start-style {
			width: 30rpx;
			height: 30rpx;
			margin: 0 6rpx;
		}

		.star-rating-title-style {
			padding-left: 30rpx;
			color: #999;
			font-size: 24rpx;
		}
	}
	
	
	
		// .wrapper {
		// 	background-image: linear-gradient(to right, #a80077, #66ff00);
		// 	flex-direction: column;
		// }
		// .status-bar {
		// 	flex: 1;
		// }
		// .nav {
		// 	position: relative;
		// 	height: 88px;
		// 	flex: 0;
		// 	justify-content: center;
		// 	align-items: center;
		// }
	 //    .title {
	 //        font-size: 36upx;
	 //    }
		// .back {
		// 	position: absolute;
		// 	left: 3px;
		// 	color: #000000;
		// 	font-family: unibtn;
		// 	font-size: 54upx;
		// }
</style>
