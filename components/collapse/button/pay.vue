<template> 
	<view class="button-stock" @click="handleGetIds(id)">

		<view class="button-stock-bac row-view">
			<view class="row-view-left">
				Subscribe
			</view>
			<view class="row-view-right">
				${{money}}/{{unit}}
			</view>
		</view> 
	</view>


</template>

<script>
	export default {
		name: "pay",
		props: ["money", "unit", "id", "payList"],
		data() {
			return {
				type: 'bottom',
				down_icon: require("../../../static/images/other/down_icon.png"),

			};
		},

		methods: {
			handleGetIds(id) {
				this.$emit("getMoney", id)
			}

		}
	}
</script>

<style scope>
	.row-view {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.button-stock {
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
		margin-bottom: 30upx;

	}

	.button-stock .button-stock-bac {
		width: 94%;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		background-color: #E47B34;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16), inset 0px 3px 6px 0px #FCCA28;
		-webkit-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16), inset 0px 3px 6px 0px #FCCA28;

	}

	.row-view-left {
		margin-right: 20px;
		color: #fff;
		font-size: 15px;
		font-weight: normal;
	}

	.row-view-right {
		margin-left: 20px;
		color: #fff;
		font-family: SourceHanSansCN-Heavy;
		font-size: 20px;
		font-weight: 900;
		line-height: 20px;
	}
</style>
