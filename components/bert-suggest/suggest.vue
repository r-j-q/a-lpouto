<template>
	<view class="textarea_">
		<!-- <uni-card class="box" :isFull="true" title="反馈意见" :thumbnail="contentIcon"> -->
			<textarea v-model="data.content" placeholder="Your feedback is very important to us. Please enter it here"></textarea>
		<!-- </uni-card> -->
		<!-- <uni-card class="box" :isFull="true" title="上传图片" :thumbnail="imgListIcon">
			<view class="imgs" v-for="(item, index) in data.imgList" :key="index">
				<image class="img" @click="previewImage(index)" :src="item.path" mode="aspectFit" />
				<uni-icons @click="removeImage(index)" style="color: white; font-size: 30rpx;" type="closeempty" class="remove"></uni-icons>
			</view>
			<view class="imgs" @click="chooseImage">
				<view class="img add-img">
					<uni-icons style="position:absolute; line-height: 150rpx; font-size: 149rpx;" type="camera"></uni-icons>
				</view>
			</view>
		</uni-card>
		<uni-card class="box" :isFull="true" title="联系方式" :thumbnail="contactIcon">
			<input v-model="data.contact" placeholder="手机 QQ或e-mail,方便我们联系您" />
		</uni-card> -->
		<button class="submit-btn" :class="isDisabled==true ?'bacc':''" :disabled="isDisabled" @click="submit">Submit</button>
	</view>
</template>

<script>
	export default {
		props:['isDisabled'],
		data() {
			return {
				data: {
					imgList: [],
					content: "",
					contact: ""
				},
				contentIcon: require("./icons/suggestion.png"),
				contactIcon: require("./icons/contact.png"),
				imgListIcon: require("./icons/image.png")
			}
		},
		methods: {
			chooseImage() {
				let _self = this;
				uni.chooseImage({
					sizeType: ['compressed', 'original'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						_self.data.imgList = _self.data.imgList.concat(res.tempFiles)
					},
					fail: function(err) {
						console.log(err);
					}
				});
			},
			removeImage(index) {
				this.data.imgList.splice(index, 1)
			},
			previewImage(index) {
				uni.previewImage({
					current: index,
					urls: this.data.imgList.map(r => r.path)
				});
			},
			submit() {
				this.$emit("submit", this.data)
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin-bottom: 20rpx;
	}
	.textarea_{
		margin-top: 60upx;
	}
	.bacc{
		background-color: #999;
	}
	textarea{
		width: 90%;
		margin: 0 auto;
		background-color: #ebebeb;
		border-radius: 16upx;
		text-indent: 10upx;
		padding: 20upx;
		color: #333;
	}
	.imgs {
		position: relative;
		display: inline-flex;
		flex-wrap: wrap;
		margin: 10rpx;
		width: 150rpx;
		height: 150rpx;
		.img {
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
			border: 1rpx solid #ebebeb;
		}
		.remove {
			line-height: 30rpx;
			text-align: center;
			border-radius: 10rpx;
			position: absolute;
			right: 0rpx;	
			top: 0rpx;
			width: 30rpx;
			height: 30rpx;
			font-weight: bold;
			background-color: #e53c25;
		}
		.add-img {
			background-color: #f0f0f0;
		}
	}
	.submit-btn {
		width: 94%;
		margin: 0 auto;
		background-color: #4ca594;
		color: #fff;
		margin: 40rpx auto;
	}
</style>
