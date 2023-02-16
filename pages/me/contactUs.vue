<template>
	<view class="animations0">
		
		<view >
			<view class="textColorFFF fontSize15 paddingAll">
					 E-mail : Jame.plouto8@gmail.com
				</view>
				<button class="bg94 textColorff wH" @click="copyFunction('Jame.plouto8@gmail.com')">Copy</button>
			
		</view>
	 <!-- 	<view class="animationsall">
			<view class="animations1"></view>
			<view class="animations"  :style="{width:previewWidth + '%'}"></view>
		</view>
		 -->
		 
	</view>
</template>

 
	<script>
		export default {
			data() {
				return {
					 previewWidth:20 
				}
			},
			onLoad() {
				// this.changePreviewWidth(0,100)
			},
			methods: {
				
				copyFunction(v){
					//#ifndef H5
					    uni.setClipboardData({
					        data: String(v), // 必须字符串
					        success: function () {
								uni.showToast({
									title:'Copy  success'
								})
					            // console.log('Copy  success');
					        }
					    });
					    //#endif 
				},
	           changePreviewWidth(min,max){
				   let _this=this;
				    
				   setInterval(()=>{
					   let shu =Math.floor(Math.random() * (max - min + 1)) + min;
					_this.previewWidth= shu;
					console.log("=========>>>>>>>>",shu)
				   },1000)
			   }
	        }
		}
	</script>
 

<style>
	.wH{
		width: 90%;
		margin: 0 auto;
		color: #fff;
		margin-top: 40%;
	}
	.animations0{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 30%;
	}
	.animationsall{
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
	}
	.animations1{
	width: 50%;
	
	background-color: bisque;
	
	height: 20px;
	margin-bottom: 10px;
	animation: fadenum1 5s  infinite;	
	}
	@keyframes fadenum1 {
		50% {
			transform:  scale(1, 1);
		}
	}
	.animations {
	     width: 50%;     
		height: 20px;
		margin-bottom: 10px;

      background-color: rgba(218, 82, 82, 0.2);
		/* animation: fadenum .8s ; */
		transform: scale(3, 1);
	}

/* 	@keyframes fadenum {
		50% { 
			transform: scale(3, 1);
		}
	} */
</style>
