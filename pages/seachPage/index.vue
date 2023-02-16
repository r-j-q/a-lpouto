<template>
	<view class="searchList">

		<view class="searchListRow content">
			<view class="searchListRowdrawJt" @click="navigatiTo">
				<view class="drawJt"> </view>
			</view>
			<view class="searchListRowlists">
				<u-input   prefixIcon="search" placeholder="Search"   border="surround" v-model="keyword" class="searchListRowRight bg88"
					   ></u-input>
				<button @click="onChangeInput" class="u-button-right content" type="primary" >Search</button>
			</view>
			 
		</view>
		<view class="textColorFFF marTop50"> 
			<view class="">
				<view class="textColorFFF bg201c35 fontSize15">
					Hot stock
				</view>
				<view class="searchListRowList searchListRow" @click="jumpToDetail(item)"
					v-for="(item,index) in noauthstockMostFive" :key="index">
					<view class="searchListRowListTitle ">
						<view class="fontWeight fontSize14 bjt">{{item.symbol}}</view>
						<view class="color88 fontSize12 bjt">{{item.name}}</view>
					</view>
					<view class="color94 fontSize12 bjt" v-if='item.price'>
						  {{item.price}}
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		noauthstockSearch,
		noauthstockMost
	} from "@/api/index.js";
	export default {
		name: 'message',
		data() {
			return {
				keyword: "",
				bgColor: '#001f3f',
				noauthstockMostFive: []
			}

		},
		onLoad: function(options) {
			this.getNoauthstockMost()
		},
		methods: {
			jumpToDetail(item) {
				let params = {
					item
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/ploutoDetail/index?params=" + encodeURIComponent(JSON.stringify(
						params)))
				})
				console.log("jumpToDetail", item)
			},
			getNoauthstockMost() {
				 
				var res = this.$request.get({
						url: `${noauthstockMost}?listtype=gainers`,
						loadingTip: 'more...'
					})
					.then(
						res => {
							let {
								list
							} = res;
							list?.forEach((item, i) => {
								if (i < 5) {
									this.noauthstockMostFive.push(item)
								}
							})
							// this.noauthstockMostFive  
							// console.log("--res getNoauthstockMost------------>", res)
						},

					)
			},

			getNoauthstockSearch() {
				uni.showLoading();
				var res = this.$request.get({
						url: `${noauthstockSearch}?stock_no=${this.keyword}`,
						loadingTip: 'more...'
					})
					.then(
						res => {
						let {nasdaq_list,amex_list,nyse_list,etf_list}	= res;
							this.noauthstockMostFive = [...nasdaq_list,...amex_list,...amex_list,...etf_list]
						 uni.hideLoading()
						},

					)

			},
			// 点击收缩时触发
			onChangeInput() {
				this.getNoauthstockSearch()
				console.log("----", this.keyword)
			},
			navigatiTo() {
				uni.navigateBack()
			}
		}

	}
</script>

<style scoped>
	.searchList {
		width: 94%;
		margin: 0 auto;

	}

	.searchListRow {
		padding-top: 60upx;
		background-color: #191428;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		/* background-color: #c2c0c0; */
		/* background-color: #A8A8A8; */
	}
	.searchListRowlists{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-radius: 5px; 
		background-color: #7b7888!important;
		flex: 1;
	}

	.marTop50 {
		margin-top: 50px;
	}

	.bg201c35 {
		background-color: #201c35;
		padding: 10upx;
		border-bottom: .1px solid #fff;
	}

	.bjt {
		background-color: #201c35;
	}

	.searchListRowList {
		padding: 20upx 10upx;
		background-color: #201c35;
		border-bottom: .1px solid #fff;
	}

	.searchListRowRight {
		flex: 1;
		/* border: 1px solid #fff; */
		height: 70upx;
		 
		font-size: 28upx;
	}

	/deep/ .uni-input-input {

		color: #fff;
	}

	.u-button-right{
		width: 160upx;
		background-color: #7b7888;
		border: none;
		outline: none;
		margin-left: 20upx;
		border-left: 1px solid #fff;
		 
	}
	.searchListRowdrawJt {
		width: 70upx;
	}

	.drawJt {
		border: 4rpx solid #c2c0c0;
		width: 30rpx;
		height: 30rpx;
		border-left-color: transparent;
		border-top-color: transparent;
		transform: rotate(135deg); //左箭头
		margin: 0 auto;
		margin-top: 20rpx;
	}
	/deep/ .uni-input-input{
		background-color: #7b7888!important;
		border: none;
		outline: none;
	}
	 .searchListRowlists .u-input--border{
			border-color: #7b7888!important;
			border: 1px solid  #7b7888!important;
		}
		
</style>
