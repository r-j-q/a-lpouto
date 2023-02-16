<template>
	<u-scroll-list @right="right" @left="left">
		<view class="scroll-list" style="flex-direction: row;">
			<view class="scroll-list__goods-item jsi">
				<view class="scroll-list__goods-item__text color94 fontSize28 fontWeight">Primary member</view>
				<view class="scroll-list__goods-item__text color94">$ 267 /4 weeks</view>
				<view class="scroll-list__goods-item__text color94">lnstructor guides trading</view>
				<view class="scroll-list__goods-item__text color94">You will get the services</view>
				<view class="scroll-list__goods-item__text color94">
					Provide industry information, mining high-potential enterprises.<br />
					A weekly stock research report.<br />
					Four junior investment lessons.<br />
					Professional in the stock 8-10 years of investment manager guidance services.<br />
					The company only provides consulting and training services.<br />

				</view>
			</view>
			<view class="scroll-list__goods-item jsi">
				<view class="scroll-list__goods-item__text color94 fontSize28 fontWeight">lntermediate member</view>
				<view class="scroll-list__goods-item__text color94">$ 467 /4 weeks</view>
				<view class="scroll-list__goods-item__text color94">Mentors with more than five years of
						investment experience lead the team </view>
				<view class="scroll-list__goods-item__text color94">You will get the services</view>
				<view class="scroll-list__goods-item__text color94">
					Stock advanced guidance, Analyze the top stocks of the week.<br />
					Four junior option lessons and options trading guidance.<br />
					Senior options investment director guidance services.<br />
					The company only provides consulting and training services.<br />
			
				</view>
			</view>
			<view class="scroll-list__goods-item jsi">
				<view class="scroll-list__goods-item__text color94 fontSize28 fontWeight">Advanced member</view>
				<view class="scroll-list__goods-item__text color94">$ 1277 /12 weeks</view>
				<view class="scroll-list__goods-item__text color94">Limits to 200 person every. Director-level mentors lead the team </view>
				<view class="scroll-list__goods-item__text color94">You will get the services</view>
				<view class="scroll-list__goods-item__text color94">
					Options analysis and guidance.<br />
					Index options.<br />
					Scalp trading teaching.<br />
					Pluto Senior investment experts one-to-one service.<br />
					The company only provides consulting and training services.
			
				</view>
			</view>

		</view>
	</u-scroll-list>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			}
		}
	}
</script>

<style lang="scss">
	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 20px;

			&__image {
				width: 120px;
				height: 120px;
				border-radius: 100px;
			}

			&__text {
				color: #f56c6c;
				text-align: center;
				font-size: 12px;
				margin-top: 5px;
			}
		}

		&__show-more {
			background-color: #fff0f0;
			border-radius: 3px;
			padding: 3px 6px;
			@include flex(column);
			align-items: center;

			&__text {
				font-size: 12px;
				width: 12px;
				color: #f56c6c;
				line-height: 16px;
			}
		}
	}

	.scroll-list__goods-item {
		width: 560upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.jsi {
		box-shadow: #fff 0 0 5px !important;
		margin: 20upx;
		border-radius: 16upx;
		padding: 20upx;


	}

	.scroll-list__goods-item__text {
		text-align: left;

	}
</style>
