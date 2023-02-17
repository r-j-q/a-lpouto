<template>
	<view class="paddingAll" v-if="titleList">

		<!-- 	<block v-if="extJson.goods_module == 1">
					<view class="goods-love-list s-row has-bg-white has-borderb" v-if="product.length > 0" v-for="(item, index) in product" :key="index" @tap="detail(item)">
						<view class="image"><image :src="item.goods_picture"></image></view>
						<view class="content">
							<view class="title">
								<text class="tag" v-if="item.goods_shoptype">{{ item.goods_shoptype }}</text>
								<text class="title-text" v-if="extJson.goods_title_diy == 1">{{ item.goods_dtitle }}</text>
								<text class="title-text" v-else>{{ item.goods_title }}</text>
							</view>
							<view class="product-amount s-row">
								<view class="cstprice">
									<text>到手价¥</text>
									{{ item.goods_yprice || item.goods_price }}
								</view>
							</view>
		
							<view class="product-coupon s-row">
								<view class="coupon-money" v-if="item.coupon_money && item.coupon_money > 0">
									<text>{{ item.coupon_money }}元券</text>
								</view>
								<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 1">
									<text>预估收益:¥{{ item.tkmoney }}</text>
								</view>
								<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 2">
									<text>佣金:{{ item.tkrates }}%</text>
								</view>
							</view>
						</view>
					</view>
				</block> -->




		<view class="disRowAroundcenterLeft">
			<view class="textColorff color1296db fontSize30 fontWeight">
				{{titleList.symbol}}
			</view>
			<view class=" disRowcCenter textColorFFF" @click="addLike(titleList)">
				+Add Stock
				<u-icon name="heart-fill" :color="isLike?'#e4393c':'#999'" size="38"></u-icon>
			</view>
			 
		</view>
		<view class="textColor5a fontSize24 disRowAroundcenter">
			<view class="">
				${{titleList.price.toFixed(2) || "0.00"}}
			</view>
			<view class="textColorF33 fontSize15 disRowAroundcenter mrl"> 
			<text  :class="Number(titleList.change)>0?'color94':'color43'">{{titleList.change.toFixed(2)|| "0.00"}}</text>
			<text style=" display: flex;margin-left: 20upx;"  :class="Number( titleList.change)>0?'color94':'color43'">{{titleList.changesPercentage.toFixed(2)|| "0.00"}}%</text>
			</view>
		</view> 
		<!-- <view
		  					class="hhs-product-Portrait s-row"
		  					v-if="product.length > 0"
		  					v-for="(item, index) in product"
		  					:key="index"
		  					:class="[extJson.show_border ? 'has-border' : '']"
		  					@tap="detail(item)"
		  				>
		  					<block v-if="item.advert">
		  						<view
		  							class="advertPicture"
		  							v-if="item.compose_image && item.compose_image != ''"
		  							v-bind:style="{ backgroundImage: 'url(' + item.compose_image + ')' }"
		  						></view>
		  						<view class="advertPicture notPicture" v-else></view>
		  					</block>
		  
		  					<block v-else>
		  						<view class="image"><image :src="item.goods_picture" mode="widthFix" class="png"></image></view>
		  						<view class="Portrait-info has-pd-10">
		  							<view class="title is-left">
		  								<text class="tag" v-if="item.goods_shoptype">{{ item.goods_shoptype }}</text>
		  								<text class="title-text" v-if="extJson.goods_title_diy == 1">{{ item.goods_dtitle }}</text>
		  								<text class="title-text" v-else>{{ item.goods_title }}</text>
		  							</view>
		  							<view class="product-coupon s-row">
		  								<view class="coupon-money" v-if="item.coupon_money && item.coupon_money > 0">
		  									<text>券{{ item.coupon_money }}元</text>
		  								</view>
		  								<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 1">
		  									<text>预估收益:¥{{ item.tkmoney }}</text>
		  								</view>
		  								<view class="product-shouyi" v-if="extJson.goods_tkrates_diy == 2">
		  									<text>佣金:{{ item.tkrates }}%</text>
		  								</view>
		  							</view>
		  							<view class="product-price s-row has-mgt-10">
		  								<view class="amount">
		  									<text class="has-desc-color is-size-12 has-pdr-3">到手价￥</text>
		  									<text class="is-size-20">{{ item.goods_yprice || item.goods_price }}</text>
		  								</view>
		  							</view>
		  						</view>
		  					</block>
		  				</view> -->

		<!-- 1111 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
             isLike: {
             	type: Boolean,
             	default:  false
             },
			titleList: {
				type: Object,
				default: {
					price: "0",
					change: "0",
					changesPercentage: "0"
				}
			},
		},

		methods: {
			addLike(v) {
				this.$emit('onHandleLike',v.symbol)
				// console.log("=====>>>>", v.symbol)
			}
		}
	}
</script>

<style scope>
	.disRowAroundcenterLeft {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
