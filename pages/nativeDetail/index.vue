<template>
	<view class="scroll-view-item-border content_app">
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<view class="scroll-view-item ">
					<view class="paddingAll   textColorff ptop">
						<view class="workingSignalsTitle disRowAroundcenter">
							<view class="textColor fontSize24 fontWeight">
								{{items.stock_name}}
							</view>
							<view class="fontSize19 mrl">
								{{items.stock_no}}
							</view>
						</view>
						<text class="workingSignalsContent  marTop20">
							{{items.intro}}
						</text>
						<view class="disRowAround paddingTop20">
							<view class="">
								{{items.CreatedAt.substring(0,10)}}
							</view>
							<view class="">
								<starRating :score="items.star"></starRating>
							</view>
						</view>
					</view>




				</view>

			</view>
		</view>
	</view>

</template>

<script>
	import starRating from '@/components/star-rating/star-rating.vue';
	import {
		mapGetters
	} from "vuex";
	import {
		getlist,
		getSmartmoney,
		getStockBase
	} from '@/api/index.js';
	var self;
	export default {
		props: ["item"],
		computed: {
			...mapGetters(["userInfo"])
		},
		components: {
			starRating
		},
		data() {
			return {
				moreList: [],
				is_end: 0,
				page: 1,
				isActive: true,
				id: 1,
				items: {}
			};
		},

		onLoad(option) {
			self = this;
			console.log("itemsitemsitemsitems", JSON.parse(decodeURIComponent(option.prams)))
			let item = JSON.parse(decodeURIComponent(option.prams));

			uni.setNavigationBarTitle({
				title: item.items.title
			});
			self.id = item.item.id
			self.items = item.item



		},
		methods: {


			onReachBottom() {
				self.scrolltolower()
			},
			scroll(event) {},
			//滚动到底部/右边触发
			scrolltolower() {
				if (self.isActive) {
					self.page++
					self.onChangeGetStockBaseList(self.id, 1)
				}

			},
			onChangeGetStockBaseList(v) {
				console.log("传入more的ID=", self.id)
				let url = getlist;
				let type_id = 1;
				if (self.page > 1 || v == 1) {
					self.is_end = 1
				}
				if (self.id == 1) {
					url = `${getStockBase}?is_end=${self.is_end}`
				} else if (self.id == 2) {
					url = `${getSmartmoney}?is_end=${self.is_end}`
				} else {
					if (self.id == 4) {
						type_id = 1
					} else {
						type_id = 2
					}
					url = `${getlist}?is_end=${self.is_end}&type_id=${
type_id}&page=${this.page}`
				}
				var res = self.$request.get({
						url: url,
						loadingTip: 'more...'
					})
					.then(
						res => {

							self.moreList = self.moreList.concat(res.list)
							if (res.list.length < 10 && v == 1) {
								self.isActive = false
							}
							console.log('more 列表', self.moreList);

						},
						res => {
							console.log('failure');
						}
					)
			}
		}
	}
</script>

<style scope>
	.scroll-view-item-border {
		padding: 20upx;

		/* min-height: 100%; */
	}

	uni-page-body,
	uni-page-refresh {
		height: 100% !important;
	}

	.scroll-view {
		white-space: nowrap;
		height: 100vh;
		width: 100%;
	}

	.top {
		height: 200px;
		width: 100%;
	}

	.center {
		height: 200px;
		width: 100%;
		background: green;
	}

	.bottom {
		height: 200px;
		width: 100%;
		background: blue;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.collapse_botton_reduis {
		width: 100%;
		border-radius: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10upx 0;
		font-size: 28upx;
	}
</style>
