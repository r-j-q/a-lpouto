<template>

	<view class="describeContent wai-style">
		<view class="describeContent wai-style-content">
			<view class="describeContent-title" v-if="id==1">
				Wealth Quarterly
			</view>
			<view class="describeContent-title" v-else-if="id==2">
				Stock Vane
			</view>
			<view class="describeContent-title" v-else> Signals </view>

			<view class="describeContent-Content" v-if="id==1">
				<view class="">· Analyzing data on each transaction of stocks</view>
				<view class="">· Identifying stocks by classification algorithm of machine learning </view>
				<view class="">· Building stock pools based on diagnosis of the K-line chart of such stocks </view>
			</view>
			<view class="describeContent-Content" v-else-if='id==2'>
				<view class="">· Selecting the most promising 12 stocks</view>
				<view class="">· Strong data resources on the Internet </view>
				<view class="">· Artificial intelligence analysis </view>
				<view class="">· Compareing and analyzing the historical stock performance </view>
			</view>
			<view class="describeContent-Content" v-else>
				<view class="">· Using big data mining and intelligent analysis</view>
				<view class="">· Helping you get rid of complex data and information </view>
				<view class="">· Offering decisions on investment based on data models</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "describe",
		props: ["id"],
		data() {
			return {

			};
		},

		methods: {}
	}
</script>

<style scope>
	.wai-style {
		padding: 10px 0;
		margin: 0 20upx;
		border-radius: 14px;
	}

	.wai-style-content {
		width: 90%;
		margin: 0 auto;

		overflow: hidden;
	}

	.describeContent {

		padding: 0 auto;
		display: flex;
		flex-direction: column;
		background: linear-gradient(111deg, #FEE1B0 4%, #FEE1B0 4%, #FECC77 49%, #F8D38A 97%, #F8D38A 97%);
	}

	.describeContent-title {
		color: #A25401;
		font-size: 18px;
		font-family: SourceHanSansCN-Heavy;
		font-weight: bold;
	}

	.describeContent-Content {
		color: #A25401;
	}
</style>
