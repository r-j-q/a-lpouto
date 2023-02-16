<template>
	 
		<view class="three-content-style">
			<view class="all-content-sttyle disRowAroundcenter">
				<image style="width: 20px;height: 20px;" :src="code" alt="">
					 
				<input @input="replaceInput"  maxlength="4" style="text-indent: 10px;color: #fff;" v-model="mydata.checkNum"
					placeholder="code" />
			</view>
			<view v-if="!codeTime" class="get-content-style" @tap="getCheckNum()">
				<text> Get Code </text>
			</view>
			<view v-else class="get-content-style"  >
				<text>{{ codeTime+'s'}}</text>
			</view>
		</view>
	 
</template>

<script>
	import { 
		getcode
	} from '@/api/index.js'
	export default {
		props: ['phone','areacode'],
		data() {
			return {
				codeTime: 0,
				code: require("../../static/images/other/code.png"),
				mydata: {
					checkNum: ""
				}
			}
		},
		methods: {
			replaceInput() {
				this.$emit('myblur', [this.mydata.checkNum])
			},
			getcodes(){
				var that = this;
				that.$request.get({
				    url:  `${getcode}?phone=${that.phone}&areacode=${that.areacode}`, 
				    success: res => { 
				        console.log('success',res);
				        
				    },
				    fail: res => {
				        console.log('failure',res);
				        
				    },
				    complete: res=> {
				        // since 1.2.0
				        console.log('complete', res);
				    }
				});
			},
			getCheckNum() {
				 
				this.getcodes()
				// console.log("这是手机号", this.areacode);
				if (this.codeTime > 0) {
					uni.showToast({
						title: 'Getting',
						icon: "none"
					});
					return;
				} else {
					this.codeTime = 60
					let timer = setInterval(() => {
						this.codeTime--;
						if (this.codeTime < 1) {
							clearInterval(timer);
							this.codeTime = 0
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style scope>
	.all-content-sttyle {

		display: flex;
		flex-wrap: nowrap;
	}

	.left-content-style {
		margin-right: 40px;
	}

	.three-content-style {
		background-color: white;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #c2c0c0;
	}

	.btn-content-style {
		background-color: #4ca594;
		font-size: 28rpx;
		width: 160rpx;

		color: white;
		font-weight: 600;
	}

	.get-content-style {
		background-color: #4ca594;
		height: 70rpx;
		line-height: 70rpx;
		color: white;
		border-radius: 10rpx;
		padding: 0 20rpx;
	}
 /deep/ .u-button--success{
		background-color: #4ca594!important;
	}
</style>
