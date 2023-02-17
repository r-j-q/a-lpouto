<template>
  <view class="me_fel">
  	<view class="me_fel0">
  		<view class="me_fel1 color88" @click="loginOut(1)">
  			 <view class="">
  			 	Sign Out
  			 </view>
			 <u-icon name="arrow-right" color="#999" size="24"></u-icon>
  		</view>
		<view class="me_fel1 color88" @click="loginOut(2)">
			<view class="">
				Reset Password
			</view>
			  <u-icon name="arrow-right" color="#999" size="24"></u-icon>
		</view>
		 <view class="me_fel1 color88" @click="loginOut(3)">
			<view class="">
				Close Account
			</view>
			 <u-icon name="arrow-right" color="#999" size="24"></u-icon>
		</view>
		 
		
  	</view>
	
	<u-toast ref="uToast"></u-toast>
	<u-modal :value="LoginOutShow" content="Sign Out" title="TIPS" :showTitle="false" :showCancelButton="true" cancelText="Cancel" confirmText="Confirm" @confirm="confirmOut" @cancel="cancelOut" ref="uModal" :asyncClose="true"></u-modal>
	<u-modal :value="show" content="Do you confirm the cancellation of the account?" title="TIPS" :showCancelButton="true" cancelText="Cancel" confirmText="Confirm" @confirm="confirm" @cancel="cancel" ref="uModal" :asyncClose="true"></u-modal>
  </view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import {
		userLogoff
	} from "@/api/index.js"
	export default {
		data() {
			return {
				 show: false,
				 LoginOutShow:false
			}
		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		methods: {
			cancelOut(){
				this.LoginOutShow = false;
			},
			// _this.userInfo?.token 
			cancel(){
				this.show = false;
			},
		 	showModal() {
		 			this.show = true;
		 		},
		 		confirm() {
					let _this=this;
					_this.show = false;
					_this.$request
						.get({
							url: userLogoff, 
							 
						 })
						.then(
					     res => {
							 uni.removeStorageSync('userInfo')
							_this.$refs.uToast.show({
								title: 'Close account success',
								callback() {
									uni.switchTab({
										url: "/pages/tab/index/index"
									})
								}
							})
					      },
					
						)
					
					
		 			 
		 		},
				confirmOut(){
					uni.removeStorageSync('userInfo')
					 uni.showToast({
					 	title:"Sign out success"
					 });
					 setTimeout(()=>{
						uni.switchTab({
							url:"/pages/tab/index/index"
						}) 
					 },500)
				},
            loginOut(v){
				let _this=this;
				if(v==1){
					 if(_this.userInfo?.token ){
					   this.LoginOutShow = true; 
					   uni.removeStorageSync('userInfo')
					 }else{
					 	uni.showToast({
							icon:'none',
					 		title:"PLEASE SIGN IN FIRST"
					 	})
					 }
					 
				}else if(v==2){
					uni.navigateTo({
						url:"/pages/userLoginRegister/changePasssword"
					})
				}else if(v==3){
					if(_this.userInfo?.token ){
					_this.showModal() 	
					}else{
						uni.showToast({
							icon:'none',
							title:"PLEASE SIGN IN FIRST"
						})
					}
					 
					 
				}
				  
				console.log("=======>",v)
			}
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
		border-bottom: .1vw solid #999;
		text-align: center;
		border-radius: 10upx;
		margin-top: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.me_fel2{
		font-size: 26upx;
	}
</style>