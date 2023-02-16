<template> 
		 
 
	<view class="content_list_">
		 
		<view class="content_list_1" v-for="(item,i) in listArr" :key="i">
			<view class="fontSize14  ">{{item.name}} </view>
			<view class="fontSize14 fontWeight list_s_t"> {{item.price}}</view>
			<view class="list_s" :class="item.p_f=='+'?'textColorffb860':'textColor0c50d6'">
				<view class="fontSize12 mrr">{{item.p_f=='+'?'+':'-'}} {{item.p_r}} </view>
				<view class="fontSize12"> {{item.p_f=='+'?'+':'-'}}{{item.p_h}}% </view>
			</view>
		</view>

	</view> 
</template>

<script>
	export default {
		name: "listStock",
		props: ['listArr'],
		data() {
			return {
				 
			}
		},
		methods: {
		 
		}
	}
</script>

<style scoped lang="scss">
	.content_list_ {
		width: 100%;
		padding: 20upx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.content_list_1 {
			width: 28%;
			border-radius: 18upx;
			box-shadow: #ccc 0px 0px 10px 0px !important;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 14upx;
			height: 100px;

			.list_s_t {
				margin: 10upx 0;
			}

		}

		.list_s {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}
</style>
