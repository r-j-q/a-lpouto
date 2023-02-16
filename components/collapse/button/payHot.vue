<template>
	<view class="button-stockhot" @click="handleGetSubscribe(id)" > 
		<view class="button-stock-bachot row-viewhot-left">
			<view class="row-viewhot-left-img">
				<image :src="hot" mode=""></image>
			</view>
			<view class="row-viewhot">
				<view class="row-view-lefthot">
					Subscribe 
				</view>
				<view class="row-view-righthot">
					${{money}}/{{unit}} 
				</view>
			</view>
		</view> 
	</view>


</template>

<script>
	export default {
		name: "payHot",
		props: ["money", "unit", "id", "payList"],
		data() {
			return {
				hot: require("../../../static/images/other/hot.png"),
				type: 'bottom',
				down_icon: require("../../../static/images/other/down_icon.png"),
			};
		},

		methods: {
			handleGetSubscribe(id){
				this.$emit("getMoney", id) 
			} 
		}
	}
</script>

<style scope>
	.row-viewhot-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.row-viewhot {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 4;
	}

	.button-stockhot {
		width: 100%;
		height: 68px;
		border-radius: 34px;
		background: #8B401F;
		box-shadow: 0px 3px 6px 0px #000000;
		border-radius: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.button-stockhot .button-stock-bachot {
		width: 94%;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		background-color: #E0411A;
		box-shadow: 0px 3px 6px 0px #8B401F;
		-webkit-box-shadow: 0px 3px 6px 0px #8B401F;

	}

	.row-view-lefthot {
		margin-right: 20px;
		color: #fff;
		font-size: 15px;
		font-weight: normal;
	}

	.row-view-righthot {
		margin-left: 20px;
		color: #fff;
		font-family: SourceHanSansCN-Heavy;
		font-size: 20px;
		font-weight: 900;
		line-height: 20px;
	}

	.row-viewhot-left-img {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		padding-left: 30px;
	}

	.row-viewhot-left image {
		width: 20.52px;
		height: 25.08px;
	}
</style>
