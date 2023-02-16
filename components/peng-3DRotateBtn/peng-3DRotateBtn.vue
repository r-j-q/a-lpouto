<template>
	<view class="wrap" @touchstart="startHandle" @touchmove="moveHandle" @touchend="endHandle">
		<image class="qq" src="https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/qq.png"></image>
		<view class="box" :style="{transform: `perspective(8000rpx) rotateX(-12deg) rotateY(${Y}deg) translateY(-20%)` }">
			<view v-for="(item, i) in list" :key="i" @click.stop="clickHandle(item,index)" 
				:style="{transform: `rotateY(${item.deg}deg) translateZ(360rpx)`  }" 
				class="itemBox">
				<!-- <view v-for="(item, i) in list" :key="i" @click.stop="clickHandle(item,index)"
					:style="{transform: `rotateY(${deg * (i+1)}deg) translateZ(360rpx)`  }" class="itemBox"> -->
				<!-- <image :src="item.icon"></image>
				<view :class="[index == i ? 'active' : '' ]">{{item.title}}</view> -->
				<view class="testBox" 
				:class="[ index == i ? '' : 'test2', i == rightIndex ? 'rightSty':'', i==leftIndex ?'leftSty': '' ]">
					<image :src="item.selectIcon" v-if="index == i"></image>
					<image :src="item.icon" v-else></image>
					<view :class="[index == i ? 'active' : '' ]">{{item.title}}</view>
				</view>
			</view>
		</view>
		
	</view>
	
	
	<!-- 	<div class="wrapper">
			<div class="top" @click="hideDrawer()"></div>
			<div class="buttom" @click="clickitem()">
				<text class="bottom-title">评论</text>
				<div class="pllist">
					<view class="plitem" v-for="(val, vindex) in plList" :key="vindex">
						<view class="left">
							<image class="plheadimg" :src="val['headimg']"></image>
						</view>
						<view class="right">
							<text class="nickname">{{ val.nickname }}</text>
							<text class="msg">{{ val.msg }}</text>
							<text class="addtime">{{ val.addtime }}</text>
						</view>
					</view>
				</div>
				<textarea class="titletext" maxlength="-1" @input="textareaInput" :value="pinglun"
					placeholder="你想说些什么..." />
				<text class="submit" @click="submitpl()">评论</text>
			</div>
		</div> -->
</template>

<script>
	
	export default {
		props:{
			dataList: {
				type: Array,
				default: function(){
					return [
						{
							icon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/map.png',
							selectIcon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/map_select.png',
							path: '/pages/tabbar/map',
							mode: 'navigateTo', // switchTab
							title: 'Wealth Quarterly',
							deg: 0
						},
						{
							icon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/coupon.png',
							selectIcon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/coupon_select.png',
							path: '/pages/list/coupon_centre',
							mode: 'navigateTo', // switchTab
							title: 'Stock Vane',
							deg: 0
						},
						{
							icon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/mem.png',
							selectIcon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/mem_select.png',
							path: '/pages/member/equity',
							mode: 'navigateTo', // switchTab
							title: 'Plouto',
							deg: 0
						},
						{
							icon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/point.png',
							selectIcon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/point_select.png',
							path: '/pages/tabbar/ticketUp',
							mode: 'navigateTo', // switchTab
							title: 'Swing Signals',
							deg: 0
						},
						{
							icon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/activty.png',
							selectIcon: 'https://ruiheng1201.oss-cn-beijing.aliyuncs.com/app/dev/images/20210224/activty_select.png',
							path: '/pages/activity/list',
							mode: 'navigateTo', // switchTab
							title: 'Trend Signals',
							deg: 0
						} 
					]
				}
			},
			leftAndright1Deg: {
				type: Number,
				default:15
			},
			leftAndright2Deg: {
				type: Number,
				default:20
			},
		},
		data () {
			return {
				deg: 0,
				Y: 0,
				clientX: 0, // 
				moveX: 0,
				direction: -1, // 1 == 向左  2==向右
				difference: 0, // 滑动距离  
				index: 0, // 
				isStart: false,
				list: [],
				leftIndex: null, // 左边第一个元素 （以当前index为准）
				leftIndex2: null, // 左边第二元素
				rightIndex: null,
				rightIndex2: null,
				oneDeg: 15, // 左侧/右侧第一个偏移度数
				towDeg: 20  // 左侧/右侧第er个偏移度数
			}
		},
		created(){
			this.list = JSON.parse(JSON.stringify(this.dataList))
			this.oneDeg = this.leftAndright1Deg
			this.towDeg = this.leftAndright2Deg
			this.deg = 360 / this.list.length;
			this.list.forEach((item, index) => {
				item.deg = this.deg* (index +1)
			})
		},
		beforeMount(){
			
		},
		mounted(){
			let selft = this
			this.deg = 360 / this.list.length;
			this.index = this.list.length - 1
			
			this.setStyle(this.index)
			console.log(this.list, this.deg, this.index, this.list)
		},
		methods:{
			
			// 			hideDrawer() {
			// 				uni.getCurrentSubNVue().hide('auto')
			// 			},
			// 			clickitem() {},
			// 			textareaInput(event) {
			// 				var {
			// 					value
			// 				} = event.detail;
			// 				this.pinglun = value;
			// 			},
			// 			loadMore(e) {
			// 				var timestr = new Date().getTime();
			// 				console.log(timestr)
			// 				this.getplList();
			// 			},
			// 			async getplList() {
			
			// 				var that = this;
			
			// 				try {
			// 					var post = {
			// 						page: that.page,
			// 						limit: 10,
			// 						videoid: uni.getStorageSync('plvideoid'), //读取缓存获取要评论的视频id
			// 					};
			// 					const res = await getApp().globalData.request.post('duanshipin/videopllist', post);
			
			// 					if (res.code == 200) {
			// 						res.data.forEach(item => {
			// 							that.plList.push(item);
			// 						});
			// 						that.page = that.page + 1;
			// 					} else {
			
			// 					}
			// 				} catch (e) {}
			
			// 			},
			// 			async submitpl() {
			// 				console.log("这里发布评论");
			// 				if (!this.$store.state.openid) {
			// 					uni.navigateTo({
			// 						url: '/pages/member/ucenter/signIn'
			// 					});
			// 					return;
			// 				}
			// 				var that = this;
			// 				var plvideoid = uni.getStorageSync('plvideoid'); //读取缓存获取要评论的视频id
			// 				if (that.pinglun.length <= 0) {
			// 					uni.showToast({
			// 						title: '字数太少啦',
			// 						icon: 'none'
			// 					});
			// 					that.pinglun = '';
			// 					return false;
			// 				}
			// 				try {
			// 					var post = {
			// 						id: plvideoid,
			// 						uid: that.$store.state.openid,
			// 						msg: that.pinglun,
			// 						city: that.city
			// 					};
			
			// 					console.log(post);
			// 					const res = await getApp().globalData.request.post('duanshipin/addpinglun', post);
			// 					console.log(res);
			// 					if (res.code == 200) {
			// 						that.pinglun='';
			// 						that.page = 1;
			// 						that.plList = [];
			// 						that.getplList();
			// 						uni.showToast({
			// 							title: '评论成功',
			// 							icon: 'none'
			// 						});
			// 						return false;
			// 					} else {
			
			// 					}
			// 				} catch (e) {
			
			// 				}
			
			// 			},
			
			
			
			
			startHandle(e){
				if(this.isStart) return;
				this.isStart = true
				this.clientX = e.changedTouches[0].clientX
			},
			moveHandle(e){
				let clientX = e.changedTouches[0].clientX
				this.difference = Math.abs(this.clientX - clientX)
				if(this.clientX >clientX){ // 向左转
					this.direction = 1
				}else if(this.clientX <clientX){ // 向右转
					this.direction = 2
				}
			},
			endHandle(e){
				if(this.difference < 20){ // 滑动距离过小, 不做处理
					this.isStart = false
					return
				} 
				if(this.direction == 1){// 向左转
					this.Y -= this.deg
					this.index = (this.index +1) % this.list.length
				}else if(this.direction == 2){ // 向右转
					this.Y += this.deg
					if(this.index == 0) this.index = this.list.length;
					this.index = (this.index -1) % this.list.length
				}
				this.difference = 0
				this.direction = -1
				setTimeout(_ =>{
					this.isStart = false
				}, 500)
				this.setStyle(this.index)
				this.$emit('change', this.index)
			},
			clickHandle(item,index){
				let i = ''
				let list = this.list
				for(let j=0;j<list.length; j++){
					if(list[j].title == item.title){
						i = j
						break
					}
				}
				if(i == index){
					this.$emit('gotoHandle',index)
				}
			},
			setStyle(index){
				// 计算右侧第一个元素下标
				this.rightIndex = (this.index +1) % this.list.length
				// 计算右侧第二个元素下标
				if(this.rightIndex == this.list.length -1){
					this.rightIndex2 = 0
				}else{
					this.rightIndex2 = this.rightIndex + 1
				}
				// 计算左侧第一个元素下标
				if(this.index == 0){
					this.leftIndex = this.list.length-1;
				}else{
					this.leftIndex = (this.index -1) % this.list.length;
				}
				// 计算左侧第二个元素下标
				if(this.leftIndex == 0){
					this.leftIndex2 = this.list.length -1
				}else{
					this.leftIndex2 = this.leftIndex -1
				}
				
				this.list.forEach((item, index) =>{
					let deg = this.deg* (index +1)
					let leftOneDeg = deg -this.oneDeg
					let rightOneDeg = deg +this.oneDeg
					let leftTwoDeg = deg -this.towDeg
					let rightTwoDeg = deg +this.towDeg
					if(index == this.rightIndex ){
						item.deg = leftOneDeg
					}else if(index == this.leftIndex){
						item.deg = rightOneDeg
					}else if(index == this.rightIndex2){
						item.deg = rightTwoDeg
					}else if(index == this.leftIndex2){
						item.deg = leftTwoDeg
					}
					else{
						item.deg = deg
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	// .wrapper {
	// 		flex-direction: column;
	// 		flex: 1;
	// 		text-align: center;
	// 		background-color: transparent;
	// 	}
	
	// 	.top {
	
	// 		flex: 4;
	// 	}
	
	// 	.buttom {
	// 		background-color: #161922;
	// 		opacity: 0.8;
	// 		flex: 8;
	// 		border-top-left-radius: 10px;
	// 		border-top-right-radius: 10px;
	// 		height: 300rpx;
	// 		width: 750rpx;
	// 		z-index: 99999;
	// 		font-size: 12rpx;
	// 	}
	
	// 	.bottom-title {
	// 		line-height: 30px;
	// 		text-align: center;
	// 		font-size: 14px;
	// 		color: #fff;
	// 		width: 750rpx;
	// 		height: 50rpx;
	// 		bottom: 0;
	// 	}
	
	// 	.pllist {
	// 		margin-top: 10rpx;
	// 		padding: 30rpx;
	// 	}
	
	// 	.titletext {
	// 		width: 630rpx;
	// 		height: 80rpx;
	// 		line-height: 80rpx;
	// 		border-radius: 10rpx;
	// 		font-size: 14px;
	// 		color: #fff;
	// 		bottom: 0;
	// 		position: absolute;
	// 		border-color: #fff;
	// 		padding-left: 20rpx;
	// 	}
	
	// 	.submit {
	// 		width: 120rpx;
	// 		height: 80rpx;
	// 		position: absolute;
	// 		right: 0;
	// 		bottom: 0;
	// 		background-color: #ff0000;
	// 		border-radius: 10rpx;
	// 		line-height: 80rpx;
	// 		text-align: center;
	// 		font-size: 16px;
	// 		color: #fff;
	// 	}
	
	// 	.plheadimg {
	// 		width: 60rpx;
	// 		height: 60rpx;
	// 		border-radius: 50%;
	// 	}
	
	// 	.plitem {
	// 		margin-top: 30rpx;
	// 		position: relative;
	// 		flex-wrap: wrap;
	// 		flex-direction: row;
	// 	}
	
	// 	.nickname {
	// 		color: #999;
	// 		font-size: 12px;
	// 	}
	
	// 	.msg {
	// 		color: #fff;
	// 		font-size: 14px;
	// 	}
	
	// 	.addtime {
	// 		color: #999;
	// 		font-size: 12px;
	// 	}
	
	// 	.left {
	// 		width: 80rpx;
	// 	}
	
	// 	.right {
	// 		width: 550rpx;
	// 	}
	
	
	
	
	.wrap{
		width: 100vw;
		height: 38vh;
		// border: 1px solid red;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(#33334B, #17182D);
		position: relative;
		.qq{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 760rpx;
			height: 200rpx;
		}
	}
	.wrap:hover .box{
		
		// transform: perspective(600rpx) rotateX(-10deg) rotateY(36deg);
	}
	.box{
		width: 100rpx;
		height: 100rpx;
		position: relative;
		// border: 1px solid yellow;
		box-sizing: border-box;
		transform-style: preserve-3d;
		transform: perspective(600rpx) rotateX(-10deg) translateY(-50%);
		transition: all .5s;
		// transform-origin: center center 300rpx;
		.itemBox{
			width: 100rpx;
			height: 100rpx;
			position: absolute;
			// overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// border: 1px dashed blue;
			perspective:100;
			// transform-style: preserve-3d;
			// transform: perspective(600rpx) rotateX(-10deg);
			// transition: all .5s;
			.testBox{
				width: 240rpx;
				height: 100rpx;
				font-weight: bold;
				// border: 1px solid red;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				// transform: rotateY(45deg);
				// transform: rotateY(60deg);
				image{
					// position: absolute;
					width: 80rpx;
					height: 80rpx;
					// transform-origin: center center;
				}
				
				view{
					font-size: 24rpx;
					color: #6262AF;
					transition: all .5s;
				}
				.active{
					color: #AC8861;
				}
			}
			.test2{
				transform: rotateY(180deg);
				// transform: rotateY(45deg);
			}
			.leftSty{
				transform: rotateY(0deg);
				// transform: rotateY(45deg);
			}
			.rightSty{
				transform: rotateY(0deg);
				// transform: rotateY(45deg);
			}
			// transform: perspective(1000rpx) rotateX(-10deg);
			// image{
			// 	position: absolute;
			// 	width: 80rpx;
			// 	height: 80rpx;
			// 	// transform-origin: center center;
			// 	transform: rotateY(50deg);
			// }
			
			// view{
			// 	font-size: 24rpx;
			// 	transition: all .5s;
			// }
		}
	}
	
	// .iconfont{
	// 		font-family:iconfont;
	// 	}
	// 	.wrapper {
		 
	// 		height: 166upx;
	// 		flex-direction: column;
	// 	}
	// 	.status-bar {
	// 		height: 44upx;	background-color:transparent;
	// 	}
	// 	.nav {
	// 		flex-direction: row;height:80upx; justify-content: space-between;padding: 0 15px;
	// 	}
	// 	.title{line-height: 80upx;color: #eee;font-size: 18px;}
	// 	.title-left{color: #FFFFFF;font-size: 18px;}
	// 	.title-rigth{color: #FFFFFF;font-size: 18px;}
	// 	.title-center{flex-direction: row;height: 45px;}
		
	// 	.active-title{border-bottom-width: 1px;font-weight: bold; border-style: solid;border-bottom-color: #FFFFFF; color: #FFFFFF;height: 40px;}
	// 	.img{width: 50upx;height: 50upx;margin-top: 18upx;}
</style>
