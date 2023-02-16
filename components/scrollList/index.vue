<template>
	<u-scroll-list @right="right" @left="left">
		<view class="scroll-list" style="flex-direction: row;">
			<view class="scroll-list__goods-item jsi" v-for="(item, index) in list" :key="index"
				:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']">
				<image class="scroll-list__goods-item__image" :src="item.thumb"></image>
				<view class="scroll-list__goods-item__text color94 fontSize28 fontWeight">{{ item.name }}</view>
				<view class="scroll-list__goods-item__text color94">{{ item.title1 }}</view>
				<view class="scroll-list__goods-item__text color94">{{ item.title2 }}</view>
			</view>

		</view>
	</u-scroll-list>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
					title1: 'Pluto is a very professional and responsible company and I am very lucky to have chosen this company.',
					title2: "Finney, from Wisconsin, is the 735th member of stock Pluto. Finney, a recent graduate, was very interested in stock investment. But she had no trading experience, and by chance she came across our website. After joining the junior membership, she went through Pluto's courses and accompanied by her mentor in real life. In one month, Finney not only made her first money in the stock market, $7.5k. but she also learned. how to do it in real life. Now she has become an intermediate member of Pluto to learn options investing skills!",
					name: "Finney",
					thumb: 'https://stock-plouto.com/assets/images/lidy.jpg'
				}, {
					 title1:"Thanks to my investment advisor, he has very professional knowledge.",
					 title2:`Steven is a college teacher from Delaware who has two years of experience in
									U.S. stocks. His returns had not been very stable and he was becoming less and
									less confident in the current stock market. By chance, he met our investment
									advisor, Pete, who analyzed his position and gave him some advice. Steven's
									returns are getting higher and higher. Steven is now our premium member.
									He said ‘I've’ never met an investment advisor as professional as Pete, and he solved my
									big problem.`,
					 name: "Steven",
					thumb: 'https://stock-plouto.com/assets/images/jeck.jpg'
				}, {
					title1:`Stock Pluto has helped me to be a more confident investor, to transition my portfolio from paid advisors to managing it myself.`,
					title2:`Jack, a judge from California, is our 214th member. Jack is 57 years old and has
										6 years of personal investment experience with a loss of over $170k. in May
										2022, Jack joined our advanced membership and within 3 months under the guidance
										of his investment teacher, Jack made a profit of over $70k. he is so grateful to
										us that he has now joined the star membership.`,
					name: "Jack",
					thumb: 'https://stock-plouto.com/assets/images/jecks.jpeg'
				}, {
					title1:` Stock Pluto has given me a wealth of investment information and experience and made me a far more diligent researcher and consistent investor.`,
					title2:`Crawford is a retired mechanical specialist. With the help of Ansel, an investment advisor specialist, he went from not knowing anything about stocks at all to being able to operate his account very easily. Now he is passionate about investing. Retirement is also fun, and he says he enjoys his time now.`,
					name: "Crawford",
					thumb: 'https://stock-plouto.com/assets/images/els.jpeg'
				}, {
					title1:`Almost all their research leads to sound buy and sell decisions. Thanks to Stock Pluto, the learning process goes on!`,
					title2:`Elina  is from Los Angeles. She wants to achieve wealth freedom through stock investment! After being introduced by a friend, she became member #2890 of Pluto. Her portfolio has tripled in value since she joined Stock Pluto.`,
					name: "Elina",
					thumb: 'https://stock-plouto.com/assets/images/Elina.jpeg'
				} ]
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
		padding:20upx 0 0   0;
		 
		
	}
	.scroll-list__goods-item__text{
		text-align: left;
		padding: 20upx;
	}
</style>
