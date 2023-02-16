<template>
  <view class="me_fel">
  	<view class="me_fel0" v-for="(item,index) in lists" :key="index">
  		<view class="me_fel1 textColorFFF">
  			 {{item.title}}
  		</view>
		<view class="me_fel2 color88">
			{{item.content}} 
		</view>
		
  	</view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				 lists:[
					 {title:"1:Will the platform reveal my personal privacy? ",content:"We can tell you with great responsibility that your personal information is very secure and we will protect your privacy."},
					 {title:"2:Will the news be updated in real-time?",content:"In order to get a better experience for users, our news information is updated in real-time."},
					 {title:"3:Is there a limit on the number of self-selected stocks to be added?",content:"To ensure a better user experience, there is no limit on the number of self-selected stocks for the time being."},
					 {title:"4:How do you contact us if you have any questions?",content:"You can input any problems you encounter on the feedback page. Or you can send an E-mail to Jame.plouto8@gmail.com. Customer service will respond to your problem within 24 hours."}
				 ]
			}
		},
		methods: {
            
        }
	}
</script>
<style scoped>
	.me_fel0{
		width: 94%;
		margin: 0 auto;
		display: flex;
		flex-direction: column; 
		justify-content: space-between;
	}
	.me_fel1{
		padding: 30upx 0;
		font-size: 28upx;
		font-weight: bold;
	}
	.me_fel2{
		font-size: 26upx;
	}
</style>