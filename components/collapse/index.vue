<template>
	<view class="collaps_title">
		<!-- <view class="goods-info">
		<view class="top-header" :style="{ top: statusBarHeight }">
			<text class="hhs-iconfont navback" @click="navigateBack">&#xe642;</text>
			<text class="hhs-iconfont navlike" @click="addLikeGoods" v-if="isLikeGoods">&#xe628;</text>
			<text class="hhs-iconfont navlike" @click="addLikeGoods" v-if="!isLikeGoods">&#xe60c;</text>
		</view>
		<simple-bottom-dialog v-model="popupShow" pos="top" backgroundColor="#ff9900" height="200">
			<view class="find-popup" @click.stop="shareModal" :style="{ paddingTop: statusBarHeight }">
				<view class="share-title"><text class="share-title-text">我的足迹</text></view>
				<swiper class="swiper" v-if="productList.length > 0">
					<swiper-item v-for="(item, index) in productList" :key="index">
						<cstProductItemRow @detail="goodsDetail" :item="item" :index="index"></cstProductItemRow>
					</swiper-item>
				</swiper>
				<view class="productList-empty" v-else>
					<image src="/static/img/goods/ui-def.png" class="empty-image-box"></image>
					<text class="empty-text-box">空空如也</text>
				</view>
			</view>
		</simple-bottom-dialog>
		<simple-loading :loading="isLoading" text="数据加载中..." image="/static/img/logo.png"></simple-loading>
		<view v-if="!isLoading" class="goods-info has-mgb-30">
			<list class="scroll-v" scroll-y :enable-back-to-top="true" :show-scrollbar="false">
				<refresh class="tui-refresh" @refresh="onrefresh" @pullingdown="onpullingdown"
					>
					<loading-indicator class="tui-loading"></loading-indicator>
					<text class="refresh-text">{{ refreshText }}</text>
				</refresh> 
				<cell class="goods-swiper-box" v-if="detail.small_images.length > 0">
					<block v-if="detail.zhibo_url && detail.zhibo_url != '' && zhibo_urlCurrentType == 1">
						<video id="goods_video" :src="detail.zhibo_url" :muted="isMuted" :loop="true" :autoplay="true"
							:show-fullscreen-btn="false" :controls="true" class="small_images"></video>
					</block>
					<block v-else>
						<swiper class="goods-swiper" :indicator-dots="false" :autoplay="true" :circular="true"
							:interval="3000" :duration="1000" @change="swiperCurrentChange">
							<swiper-item class="swiper-item" v-for="(item, index) in detail.small_images" :key="index">
								<image :src="item " resize="cover" placeholder="/static/img/ic_default_placeholder.png"
									class="small_images"></image>
							</swiper-item>
						</swiper>
					</block>

					<view class="swiper-type-box" v-if="detail.zhibo_url && detail.zhibo_url != ''">
						<text class="swiper-type-text swiper-type-blr"
							:class="zhibo_urlCurrentType == 2 ? 'swiper-type-text-curr' : ''"
							@click="setZhiboCurrentType(2)">图片</text>
						<text class="swiper-type-text swiper-type-brr"
							:class="zhibo_urlCurrentType == 1 ? 'swiper-type-text-curr' : ''"
							@click="setZhiboCurrentType(1)">视频</text>
					</view>
					<text class="swiper-container-dots"
						v-if="zhibo_urlCurrentType == 2">{{ swiperCurrent }}/{{ detail.small_images.length }}</text>
					<text class="hhs-iconfont swiper-container-dots-isMuted" @click="setIsMuted"
						v-else-if="zhibo_urlCurrentType == 1 && isMuted == true">&#xe63b;</text>
				</cell>
 
				<cell class="goods-info-cell">
					<view class="goods-info-title goods-info-title1">
						<view class="goods-info-left">
							<text class="goods-info-left-after-text"
								v-if="detail.coupon_money && detail.coupon_money > 0">券后价</text>
							<text class="goods-info-left-after-text" v-else>活动价</text>
							<text class="goods-info-left-after-price">￥{{ detail.goods_yprice }}</text>
						</view>
						<view class="goods-info-right">
							<text class="goods-info-right-tag">预估收益：￥{{ detail.tkmoney }}</text>
						</view>
					</view>

					<view class="goods-info-title goods-info-title2">
						<view class="goods-info-left">
							<text class="goods-info-desc-after-text">原价￥{{ detail.goods_price }}</text>
						</view>
						<view class="goods-info-right s-rows">
							<text class="goods-info-right-desc-text-price"
								v-if="detail.goods_sale">已售{{ detail.goods_sale }}件</text>
						</view>
					</view>

					<view class="goods-info-title-margin-button has-margin-button">
						<view class="goods-title-box">
							<text class="hhs-iconfont goods-title-icon" v-if="detail.goods_type == 1">&#xe633;</text>
							<text class="hhs-iconfont goods-title-icon icon-taobao"
								v-else-if="detail.goods_type == 2">&#xe634;</text>
							<text class="hhs-iconfont goods-title-icon"
								v-else-if="detail.goods_type == 3">&#xe632;</text>

							<image class="goods-title-img" v-else-if="detail.goods_type == 5"
								src="/static/img/weipinhui/wei.png"></image>
							<text class="hhs-iconfont goods-title-icon" v-else>&#xe663;</text>
							<text class="ziying" v-if="detail.goods_type == 3&&detail.owner=='g'">营</text>
							<text class="goods-title">{{ detail.goods_dtitle || detail.goods_title }}</text>
						</view>
					</view>
				</cell>
 
				<cell class="goods-info-mall has-margin-button">
					<block v-if="detail.goods_type == 1 || detail.goods_type == 2">
						<view class="s-card-view shop-card-view" v-if="detail.shop_name && detail.shop_name != ''">
							<view class="s-card-body s-border-b">
								<image :src="detail.shopIcon || '/static/img/goods/ic_xd_shop.png'"
									placeholder="/static/img/goods/ic_xd_shop.png" class="s-goods-info-shopIcon">
								</image>
								<text class="s-card-title s-card-title-item">{{ detail.shop_name }}</text>
							</view>
							<view class="s-card-footer">
								<view class=" s-card-footer-item  s-rows s-nowrap">
									<text class="hhs-iconfont s-card-text" :class="detail.score1_lev.class"
										v-if="detail.score1_lev.icon == 'icon-gao'">&#xe602;</text>
									<text class="hhs-iconfont s-card-text" :class="detail.score1_lev.class"
										v-if="detail.score1_lev.icon == 'icon-ping'">&#xe601;</text>
									<text class="hhs-iconfont s-card-text" :class="detail.score1_lev.class"
										v-if="detail.score1_lev.icon == 'icon-di'">&#xe631;</text>
									<text class="s-card-text s-card-text-desc">宝贝描述:{{ detail.score1 }}</text>
								</view>
								<view class=" s-card-footer-item  s-rows s-nowrap">
									<text class="hhs-iconfont s-card-text" :class="detail.score2_lev.class"
										v-if="detail.score2_lev.icon == 'icon-gao'">&#xe602;</text>
									<text class="hhs-iconfont s-card-text" :class="detail.score2_lev.class"
										v-if="detail.score2_lev.icon == 'icon-ping'">&#xe601;</text>
									<text class="hhs-iconfont s-card-text" :class="detail.score2_lev.class"
										v-if="detail.score2_lev.icon == 'icon-di'">&#xe631;</text>
									<text class="s-card-text s-card-text-desc">卖家服务:{{ detail.score2 }}</text>
								</view>
								<view class=" s-card-footer-item  s-rows s-nowrap">
									<text class="hhs-iconfont s-card-text" :class="detail.score3_lev.class"
										v-if="detail.score3_lev.icon == 'icon-gao'">&#xe602;</text>
									<text class="hhs-iconfont s-card-text" :class="detail.score3_lev.class"
										v-if="detail.score3_lev.icon == 'icon-ping'">&#xe601;</text>
									<text class="hhs-iconfont s-card-text" :class="detail.score3_lev.class"
										v-if="detail.score3_lev.icon == 'icon-di'">&#xe631;</text>
									<text class="s-card-text s-card-text-desc">物流服务:{{ detail.score3 }}</text>
								</view>
							</view>
						</view>
					</block>
				</cell> 
				<cell class="has-margin-button">
					<view class="goods-info-title s-row s-nowrap s-space-between" @click="showContentClick">
						<text class="xiangqing">宝贝详情</text>
						<view class="s-text s-s-flex-vbottom">
							<text class="hhs-iconfont s-text" v-if="!showContent">展开  &#xe65e;</text>
							<text class="hhs-iconfont s-text" v-else>收起  &#xe672;</text>
						</view>
					</view>

					<view class="imglist" v-if="showContent">
						<block v-for="(item, index) in goodsContent" :key="index">
							<image :src="item" placeholder="/static/img/ic_default_placeholder.png" mode="widthFix"
								class="goods-image-list"></image>
						</block>
					</view>
				</cell>
 
				<cell class="" v-if="likeGoods.length > 0" v-for="(item, index) in likeGoods" :key="index">
					<cstProductItemRow @detail="goodsDetail" :item="item" :index="index"></cstProductItemRow>
				</cell>
			</list>
 
			<view class="footer-box-cell">
				<view class="s-footer">
					<view class="s-footer-item" @click="navigateToHome">
						<text class="s-footer-icon hhs-iconfont s-h5">&#xe61b;</text>
						<text class="s-footer-text s-h6">首页</text>
					</view>
					<view class="s-footer-item" @click="addtuijianGoods">
						<text class="s-footer-icon hhs-iconfont s-h5 "
							:class="[istuijianGoods ? 's-footer-active' : '']">&#xe60d;</text>
						<text class="s-footer-text s-h6" 
							:class="[istuijianGoods ? 's-footer-active' : '']">{{ istuijianGoods ? '已推荐' : '加入推荐' }}</text>
					</view>
					<view class="s-footer-button shareMakingMoney" hover-class=""
						@click="shareMakingMoney"><text class="button-text">分享赚钱</text></view>
					<view class="s-footer-button openMakingBuy" hover-class=""
						@click="openMakingBuy"><text class="button-text">领券购买</text></view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup">
			<modal-bind-taobao></modal-bind-taobao>
		</uni-popup>
	</view> -->
		<view class="collaps_list" v-for="(item,index) in stockList" :key="index">
			<!-- <view class="collaps_header" @click="handleStateChange(item,index)">
				<view class="collaps_header_left disRowAroundcenter">
					{{item.title}}
				</view>
				<image
					:class="item.active ? 'collaps_header_transition_right collaps_header_right_':'collaps_header_transition_right collaps_header_right'"
					:src='down_icon' alt="" srcset="" />

			</view> -->
			<view class="collaps_header disRowAround textColor9e fontSize13">
				<!-- <view class="fontSize15">
					Working Signals
				</view> -->
				<!-- <view v-if="item.id==1 || item.id==2" class="disRowAroundcenter fontSize15"
					@click.stop="item.vip == false ?jumpToDescribe(item):handleJumpTo(item)">
					More
					<image class="other-style mrl" :src='other' alt="" srcset="" />
				</view> -->
			</view>
			<view class="collaps_content  margAll" :class="item.active ?'active_active':'active_a'">
				<image @click="jumpToDescribe(item)"
					style="border-radius: 10px; width: 100%;height: 160px;margin-top: 10px;" :src="bannerOne"
					mode="aspectFill" v-if="item.id==1 && item.vip == false"></image>
				<image @click="jumpToDescribe(item)"
					style="border-radius: 10px;width: 100%;height: 160px;margin-top: 10px;" :src="bannerTwo"
					mode="aspectFill" v-if="item.id==2 && item.vip == false"></image>
				<view @click="handleStateNativeToDetail(item,flag)" class="overflow2 ptop "
					v-if="item.id==1 &&item.vip == true " v-for="(flag,i) in item.child" :key="flag.id">
					<view class="workingSignalsTitle disRowAroundcenter">
						<view class="textColor fontSize16 fontWeight">
							{{flag.stock_name}}
						</view>
						<view class="fontSize14 mrl">
							{{flag.stock_no}}
						</view>
					</view>
					<text class="workingSignalsContent overflow3 marTop20">
						{{flag.intro}}
					</text>
					<view class="disRowAround paddingTop20">
						<view class="">
							{{flag.CreatedAt.substring(0,10)}}
						</view>
						<view class="">
							<starRating :score="flag.star"></starRating>
						</view>
					</view>
				</view>
				<view class="overflow2 ptop" v-if="item.id==2&&item.vip == true" v-for="(flag,i) in item.child"
					:key="flag.id">
					<view class="disRowAround" @click="handleJumpToDetail(item,flag)">
						<view class="collaps_l textColor19 mrr" :class="flag.type==0 ? 'bggreen':'bgred'">
							{{flag.type==0 ?"C" :"P"}}
						</view>
						<view class="displayRowCol  ">
							<view class="fontSize15 weight textColor">
								{{flag.stock_no}}
							</view>

						</view>

						<!-- <view class="displayRowCol">
							<view class="fontSize15 weight">
								{{flag.CreatedAt.substring(0,10)}}
							</view>

						</view> -->
					</view>

				</view>
				<view v-if="item.id==3" class="collaps_content_padding " v-for="(flag,i) in item.childTrendList"
					:key="i">
					<view class="ptop fontSize15 rowBetween"
						:class="item.vip == false && i>0   ? 'textShadowTostFFF':''">
						<view class="textColorff">
							{{flag.title}}
						</view>
						<view v-if="item.id==3 && i==0" class="disRowAroundcenter fontSize15 textColorff"
							@click.stop="item.vip == false ?jumpToDescribe(item):handleJumpToMore(0,item)">
							More
							<image class="other-style mrl" :src='other' alt="" srcset="" />
						</view>
						<view v-if="item.id==3 && i==1" class="disRowAroundcenter fontSize15 textColorff"
							@click.stop="handleJumpToMore(1,item)">
							More
							<image class="other-style mrl" :src='other' alt="" srcset="" />
						</view>
					</view>
					<view v-for="(flags,g) in flag.child" :key="g"
						@click.stop="item.vip == false   ? jumpToDescribe(item)  :handleJumpToDetail(item,flags)">

						<view class="disRowAroundcenter">

							<view v-if="flags.type==0" class="collaps_l textColor19 bggreen"
								:class="item.vip == false && i>0  ? 'textShadowTost13E6B1':''">
								C
							</view>
							<view v-else class="collaps_l textColor19 bgred"
								:class="item.vip == false && i>0  ? 'textShadowTost13E6B1':''">
								P
							</view>
							<view class="collaps_c mrl mrr"
								:class="item.vip == false && i>0  ? 'textShadowTost13E6B1':''">
								{{flags.stock_no}}
							</view>
							<view class="collaps_h" :class="item.vip == false && i>0  ? 'textShadowTost9E9E9E':''">
								{{flags.CreatedAt.substring(0,10)}}
							</view>
						</view>
						<view class="disRowcCenter ptop">
							<view class="flex1 displayRowCol  ">
								<view class="fontSize15 weight"
									:class="item.vip == false && i>0  ? 'textShadowTostFFF':''">
									${{flags.buy_price}}
								</view>
								<view class="textColor9e fontSize13"
									:class="item.vip == false  && i>0 ? 'textShadowTost9E9E9E':''">
									Buy
								</view>
							</view>
							<view class="flex1 displayRowCol">
								<view class="fontSize15 weight"
									:class="item.vip == false && i>0  ? 'textShadowTostFFF':''">
									${{flags.sale_price}}
								</view>
								<view class="textColor9e fontSize13"
									:class="item.vip == false && i>0  ? 'textShadowTost9E9E9E':''">
									Sell
								</view>
							</view>
							<view class="flex1 displayRowCol">
								<view class="fontSize15 weight textColor"
									:class="item.vip == false && i>0  ? 'textShadowTost13E6B1':''">
									{{flags.reach}}%
								</view>
								<view class="textColor9e fontSize13"
									:class="item.vip == false && i>0  ? 'textShadowTost9E9E9E':''">
									Reach
								</view>
							</view>
						</view>
					</view>

				</view>

				<!-- 登录按钮 -->
				<!-- <u-button type="success" v-if="userInfo === null" @click="nativeGetTo" size="large"
					class="content_app11 textColor19 weight" text="Subscribe to get access to all signals"> </u-button> -->
				<!-- 买的按钮 -->

				<!-- <view class="collapse_botton_reduis content_appfb textColor19 weight margin_button_top"
					@click="jumpToDescribe(item)" v-if="item.vip == false ||  userInfo == null">
					<view class="fontSize19 weight" style="height: 40px;line-height: 40px;">Go to payment</view>
				</view> -->
			</view>
		</view>
	</view>


</template>

<script>
	// const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
	// import cstProductItemRow from '@/components/huahuasheng/nvue/hhs-product-item-row.nvue';
	// import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	// import modalBindTaobao from '@/components/huahuasheng/nvue/hhs-bindTaobao.nvue';
	// var appHelper = getApp().globalData;
	// var request = appHelper.request;
	// import helper from '@/common/helper.js';
	// const JdUnion = uni.requireNativePlugin('Html5App-JdUnion');
	import starRating from '@/components/star-rating/star-rating.vue'
	import {
		mapGetters
	} from "vuex"
	export default {
		name: "collapse",
		computed: {
			...mapGetters(["userInfo"])
		},
		props: {
			stockList: {
				type: Array
			},
			other: {
				type: String,
				default: ""
			}
		},
		components: {
			starRating
		},
		data() {
			return {
	// query: {
				// 	goods_numiid: '',
				// 	goods_type: ''
				// },
				// isLoading: true, // 是否加载中
				// detail: {},
				// goodsContent: [],
				// swiperCurrent: 1,
				// zhibo_urlCurrentType: 2, // 1是视频 2是图片
				// isMuted: true, // 是否禁音
				// likeGoods: [], // 猜你喜欢商品
				// refreshing: false,
				// refreshText: '下拉查看浏览足迹',
				// showContent: true,
				// spinChain: {},
				// isLikeGoods: false,
				// istuijianGoods: false,
				// popupShow: false,
				// productList: [], //足迹商品
				// statusBarHeight: appHelper.statusBarHeight,
				// viplevel:0
				list: [],
				down_icon: require("../../static/images/other/down_icon.png"),
				bannerOne: require("../../static/images/other/bannerOne.png"),
				bannerTwo: require("../../static/images/other/bannerTwo.jpg")
			};
		},
		onShow() {},
		methods: {
			// async loaduserinfo() {
			// 				var that = this;
			// 				const res = await getApp().globalData.request.post('ucenter/getusermoney', {
			// 					uid: this.$store.state.openid
			// 				});
			// 				console.log(res.data);
			// 				if (res.code && res.code == 200) {
			// 					that.viplevel = res.data.vip_level;
			// 				} 
			// 			},
			// 			/**
			// 			 * 分享推广连接给好友
			// 			 */
			// 		 	async shareMakingMoney() {
			// 				const checkBind = await this.checkUserHasBindTaobao();
			// 				if (!checkBind) {
			// 					return;
			// 				}
			
			// 				const detail = this.detail;
			// 				var spinChain = this.spinChain;
			// 				if (!spinChain.wenan) {
			// 					spinChain = await this.getSpinChainInfo();
			// 					if (!spinChain) {
			// 						return;
			// 					}
			// 				}
			// 				var query = this.query;
			// 				console.log(spinChain);
			// 				uni.navigateTo({
			// 					url: `./share_profits?itemid=${query.goods_numiid}&goods_type=${query.goods_type}`
			// 				});
			// 			},
			// 			/**
			// 			 * 打开APP购买
			// 			 */
			// 			async openMakingBuy() {
			// 				//uni.navigateTo({
			// 				//	url: `./index`
			// 				//});
			// 				//return;				
			// 				console.log("111");
			// 				const checkBind = await this.checkUserHasBindTaobao();
			// 				if (!checkBind) {
			// 					return;
			// 				}
			// 				const detail = this.detail;
			// 				var spinChain = this.spinChain;
			// 				spinChain = await this.getSpinChainInfo();
			// 				if (!spinChain) {
			// 					return;
			// 				}
			// 				console.log(spinChain);
			// 				//return false;
			// 				console.log(parseInt(detail.goods_type));
			// 				switch (parseInt(detail.goods_type)) {
			// 					case 3:
			// 						console.log(JdUnion);
			// 						console.log(spinChain.coupon_link);
			// 						JdUnion.openURL({
			// 								type: 'App',
			// 								url: spinChain.coupon_link
			// 							},
			// 							result => {
			// 								console.log(result);
			// 								if (result.code > 0) {
			// 									var message = ['呼起京东成功', '协议错误', '未安装京东', 'URL不在白名单'][result.code] ||
			// 										'打开京东APP失败';
			// 									uni.showToast({
			// 										title: message,
			// 										icon: 'none',
			// 										duration: 4000
			// 									});
			// 								}
			// 							}
			// 						);
			// 						break;
			// 					case 4:
			// 						// 拼多多
			// 						if (plus.runtime.isApplicationExist({
			// 								pname: 'com.xunmeng.pinduoduo',
			// 								action: 'pinduoduo://'
			// 							})) { //安装了拼多多
			// 							console.log(spinChain)
			// 							const plug = uni.requireNativePlugin('UZK-Pinduoduo');
			// 							plug.openPdd({
			// 								url: spinChain.coupon_link
			// 							});
			// 						} else {
			// 							uni.showToast({
			// 								title: '未安装拼多多',
			// 								icon: 'none'
			// 							});
			// 						}
			// 						/*uni.navigateTo({
			// 							url:'/pages/member/ucenter/webview?pddurl='+spinChain.coupon_link
			// 						})*/
			// 						//helper.openBrowser(spinChain.coupon_link);
			// 						break;
			// 					case 5:
			// 						uni.navigateTo({
			// 							url: '/pages/member/ucenter/webview?wphurl=' + spinChain.coupon_link
			// 						})
			// 						// 唯品会	com.achievo.vipshop					
			
			// 						//helper.openBrowser(spinChain.couponurl);
			// 						break;
			// 					default:
			// 						console.log(spinChain.coupon_link);
			// 						Alibcsdk.openurl({
			// 							url: spinChain.coupon_link,
			// 							linkkey: "taobao",
			// 							adzoneid: "103062550066",
			// 							pid: "mm_1894970146_2349700184_111459750396",
			// 							nativeFailedMode: "download",
			// 							appkey: "32828859",
			// 							opentype: 'native'
			// 						})
			
			// 						break;
			// 				}
			// 			},
			// 			/**
			// 			 * 商品转链
			// 			 */
			// 			async getSpinChainInfo() {
			// 				var detail = this.detail;
			// 				console.log(detail);
			// 				var post = {
			// 					itemid: detail.goods_numiid,
			// 					coupon_link: detail.coupon_link,
			// 					goods_type: detail.goods_type,
			// 					seller_id: detail.seller_id,
			// 					coupon_id: detail.coupon_id,
			// 					goods_picture: detail.goods_picture,
			// 					goods_title: detail.goods_title,
			// 					shopName: detail.shop_name,
			// 					uid: this.$store.state.openid
			// 				};
			// 				console.log(post);
			// 				helper.showLoading();
			// 				const res = await request.post('items/createBuyLink', post);
			// 				console.log(res);
			// 				helper.hideLoading();
			// 				if (res.code && res.code == 200) {
			// 					//return false;
			// 					detail.coupon_link = res.data.coupon_link;
			// 					detail.tbpwd = res.data.tbpwd;
			// 					detail.h5Url = res.data.shortUrl;
			// 					if (detail.goods_type == 3) {
			// 						detail.h5Url = res.data.coupon_link;
			// 						//detail.coupon_link = res.data.shortUrl;
			// 					} else if (detail.goods_type == 4) {
			// 						detail.coupon_link = res.data.open_weixin_app;
			// 						detail.h5Url = res.data.open_weixin_app;
			// 					} 
			// 					var userdata = this.$store.state.userinfo;
			// 					console.log(detail);
			
			// 					userdata.yqcode = this.$store.state.userinfo.yqcode;
			
			// 					var createWenan = helper.createWenan(userdata, detail);
			// 					console.log(detail);
			// 					var spinChain = {
			// 						wenan: createWenan.goods.wenan,
			// 						data: createWenan.goods.data
			// 					};
			
			// 					this.spinChain = spinChain;
			// 					console.log(res.data);
			// 					return res.data;
			// 				} else {
			// 					uni.showToast({
			// 						title: res.msg || '口令生成失败 请稍后再试',
			// 						icon: 'none'
			// 					});
			// 					return false;
			// 				}
			// 			},
			// 			/**
			// 			 * 检查用户是否绑定了淘宝
			// 			 */
			// 			async checkUserHasBindTaobao() {
			// 				return new Promise(resolve => {
			// 					if (!this.$store.state.hasLogin) {
			// 						uni.navigateTo({
			// 							url: '/pages/member/ucenter/signIn'
			// 						});
			// 						resolve(false);
			// 					} else if (this.detail.goods_type == 3 || this.detail.goods_type == 4 || this.detail
			// 						.goods_type == 5) {
			// 						// 取消京东和拼多多和唯品会淘宝授权弹窗
			// 						resolve(true);
			// 					} else if (this.$store.state.userinfo['isBindTaoBao'] == 1) {
			// 						resolve(true);
			// 					} else {
			// 						request
			// 							.post('agent/applyInfo', {
			// 								uid: this.$store.state.openid
			// 							})
			// 							.then(applyInfo => {
			// 								if (applyInfo.code && applyInfo.code == 200) {
			// 									resolve(true);
			// 								} else {
			// 									this.$refs.popup.open();
			// 									// 未绑定 执行绑定
			// 									resolve(false);
			// 								}
			// 							})
			// 							.catch(err => {
			// 								resolve(false);
			// 							});
			// 					}
			// 				});
			// 			},
			// 			async updateTkMoneyGet() {
			// 				if (!this.$store.state.hasLogin) {
			// 					uni.navigateTo({
			// 						url: '/pages/member/ucenter/signIn'
			// 					});
			// 					return false;
			// 				}
			
			// 				// 升级赚
			// 				uni.navigateTo({
			// 					url: '/pages/member/agent/apply'
			// 				});
			// 			},
			// 			setIsMuted() {
			// 				this.isMuted = !this.isMuted;
			// 			},
			// 			setZhiboCurrentType(type) {
			// 				this.zhibo_urlCurrentType = type;
			// 			},
			// 			swiperCurrentChange(event) {
			// 				this.swiperCurrent = parseInt(event.detail.current) + 1;
			// 			},
			// 			showContentClick() {
			// 				this.showContent = !this.showContent;
			// 			},
			// 			goodsDetail(e) {
			// 				console.log(e);
			// 				uni.redirectTo({
			// 					url: `/pages/detail/goodsinfo?itemid=${e.itemid}&goods_type=${e.goods_type}`
			// 				});
			// 			},
			// 			navigateToHome() {
			// 				uni.switchTab({
			// 					url: '/pages/index/index'
			// 				});
			// 			},
			// 			onrefresh(e) {
			// 				if (!this.refreshFlag) {
			// 					return;
			// 				}
			// 				this.refreshing = true;
			// 				this.refreshText = '我的足迹...';
			// 				this.popupShow = true;
			// 				setTimeout(r => {
			// 					this.refreshing = false;
			// 				}, 300);
			// 			},
			// 			onpullingdown(e) {
			// 				if (this.refreshing) {
			// 					return;
			// 				}
			// 				if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			// 					this.refreshFlag = true;
			// 					this.refreshText = '释放查看浏览足迹';
			// 				} else {
			// 					this.refreshFlag = false;
			// 					this.refreshText = '下拉查看浏览足迹';
			// 				}
			// 			},
			// 			async loadLoveInfoList() {
			// 				const res = await request.post('product/guessLikeGoods', {
			// 					limit: 20,
			// 					item_id: this.query.goods_numiid,
			// 					goods_type: this.query.goods_type
			// 				});
			// 				if (res.code && res.code == 200) {
			// 					this.likeGoods = res.data;
			// 				}
			// 			},
			// 			async getGoodsInfo() {
			// 				var params = this.query;
			// 				console.log(params.goods_numiid);
			// 				const res = await request.post('items/info', {
			// 					itemid: params.goods_numiid,
			// 					goods_type: params.goods_type
			// 				});
			// 				console.log(res.data);
			// 				if (res.code == 200) {
			// 					console.log(res)
			// 					var info = res.data.info;
			// 					if (params.goods_type == 4) {
			// 						info.goods_picture = info.small_images[0];
			// 						this.goodsContent = info.small_images;
			// 					} else if (params.goods_type == 3) {
			// 						this.goodsContent = info.imgList;
			// 					} else if (params.goods_type == 5) {
			// 						this.goodsContent = info.goodsDetailPictures;
			// 					} else {
			// 						console.log(111)
			// 						//this.loadTBKgoodsInfo(params.goods_numiid);
			// 						this.goodsContent = info.detailPics;
			// 					}
			// 					console.log(info);
			// 					this.isLoading = false;
			// 					this.detail = info;
			// 					this.reportProductFootPrint(info);
			// 					this.checkLikeGoods();
			// 					this.checktuijianGoods();
			// 					this.loadLoveInfoList();
			// 				} else {
			// 					console.log(res);
			// 					uni.showToast({
			// 						title: res.msg || '获取商品详情失败',
			// 						icon: 'none'
			// 					});
			// 					setTimeout(r => {
			// 						uni.navigateBack({
			// 							delta: 1
			// 						});
			// 					}, 1000);
			// 					return false;
			// 				}
			// 			},
			
			// 			/**
			// 			 * 获取淘宝商品描述
			// 			 * @param {Object} goods_numiids 商品ID
			// 			 */
			// 			async loadTBKgoodsInfo(goods_numiid) {
			// 				console.log(goods_numiid);
			// 				var time = new Date().getTime();
			// 				const [error, res] = await uni.request({
			// 					url: 'https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0',
			// 					method: 'GET',
			// 					header: {
			// 						'content-type': 'application/json;charset=UTF-8  '
			// 					},
			// 					data: {
			// 						data: '{"id":"' + goods_numiid + '"}',
			// 						_: new Date().getTime()
			// 					}
			// 				});
			// 				console.log(res);
			// 				if (res.statusCode == 200) {
			// 					var info = res.data.data.pcDescContent || {};
			// 					var arr = info.match(/<img.*?(?:>|\/>)/gi);
			// 					var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			// 					var srcArr = [];
			// 					for (var i = 1; i < arr.length; i++) {
			// 						var src = arr[i].match(srcReg);
			// 						if (src[1]) {
			// 							var url = src[1];
			// 							if (url.substr(0, 7).toLowerCase() != 'http://' || url.substr(0, 8).toLowerCase() !=
			// 								'https://') {
			// 								url = 'http://' + url;
			// 							}
			// 							srcArr.push(url);
			// 						}
			// 					}
			// 					if (srcArr.length > 0) {
			// 						this.goodsContent = srcArr;
			// 						console.log(goodsContent);
			// 					}
			// 				}
			// 			},
			// 			async checkLikeGoods() {
			// 				var data = this.detail;
			// 				var post = {
			// 					uid: this.$store.state.openid,
			// 					goods_title: data.goods_title,
			// 					goods_picture: data.goods_picture,
			// 					goods_type: data.goods_type,
			// 					shopType: data.shopType,
			// 					coupon_money: data.coupon_money,
			// 					goods_yprice: data.goods_yprice,
			// 					goods_price: data.goods_price,
			// 					goods_sale: data.goods_sale,
			// 					goods_numiid: data.goods_numiid
			// 				};
			// 				var res = await request.post('product/checkLikeGoods', post);
			// 				if (res.code && res.code == 200) {
			// 					this.isLikeGoods = true;
			// 				} else {
			// 					this.isLikeGoods = false;
			// 				}
			// 			},
			// 			async checktuijianGoods() {
			// 				var data = this.detail;
			// 				var post = {
			// 					uid: this.$store.state.openid,
			// 					goods_title: data.goods_title,
			// 					goods_picture: data.goods_picture,
			// 					goods_type: data.goods_type,
			// 					shopType: data.shopType,
			// 					coupon_money: data.coupon_money,
			// 					goods_yprice: data.goods_yprice,
			// 					goods_price: data.goods_price,
			// 					goods_sale: data.goods_sale,
			// 					goods_numiid: data.goods_numiid
			// 				};
			// 				var res = await request.post('product/checktuijianGoods', post);
			// 				if (res.code && res.code == 200) {
			// 					this.istuijianGoods = true;
			// 				} else {
			// 					this.istuijianGoods = false;
			// 				}
			// 			},
			// 			/**
			// 			 * 商品收藏 / 取消收藏
			// 			 */
			// 			async addLikeGoods() {
			// 				if (!this.$store.state.hasLogin) {
			// 					uni.navigateTo({
			// 						url: '/pages/member/ucenter/signIn'
			// 					});
			// 					return false;
			// 				}
			// 				uni.showLoading({
			// 					title: '请稍等',
			// 					mask: true
			// 				});
			// 				var data = this.detail;
			// 				var post = {
			// 					uid: this.$store.state.openid,
			// 					goods_title: data.goods_title,
			// 					goods_picture: data.goods_picture,
			// 					goods_type: data.goods_type,
			// 					shopType: data.shopType,
			// 					coupon_money: data.coupon_money,
			// 					goods_yprice: data.goods_yprice,
			// 					goods_price: data.goods_price,
			// 					goods_sale: data.goods_sale,
			// 					goods_numiid: data.goods_numiid,
			// 					tkrates: data.tkrates
			// 				};
			// 				console.log(post);
			// 				var res = await request.post('product/addLikeGoods', post);
			// 				console.log(res);
			// 				uni.hideLoading();
			// 				if (res.code && res.code == 200) {
			// 					uni.showToast({
			// 						title: res.msg || '操作成功',
			// 						icon: 'none'
			// 					});
			// 					this.isLikeGoods = this.isLikeGoods ? false : true;
			// 				} else {
			// 					uni.showToast({
			// 						title: res.msg || '操作失败',
			// 						icon: 'none'
			// 					});
			// 				}
			// 			},
			
			// 			/**
			// 			 * 商品推荐 / 取消推荐
			// 			 */
			// 			async addtuijianGoods() {
			// 				if (!this.$store.state.hasLogin) {
			// 					uni.navigateTo({
			// 						url: '/pages/member/ucenter/signIn'
			// 					});
			// 					return false;
			// 				}
			// 				uni.showLoading({
			// 					title: '请稍等',
			// 					mask: true
			// 				});
			// 				var data = this.detail;
			// 				var post = {
			// 					uid: this.$store.state.openid,
			// 					goods_title: data.goods_title,
			// 					goods_picture: data.goods_picture,
			// 					goods_type: data.goods_type,
			// 					shopType: data.shopType,
			// 					coupon_money: data.coupon_money,
			// 					goods_yprice: data.goods_yprice,
			// 					goods_price: data.goods_price,
			// 					goods_sale: data.goods_sale,
			// 					goods_numiid: data.goods_numiid,
			// 					tkrates: data.tkrates
			// 				};
			// 				console.log(post);
			// 				var res = await request.post('product/addtuijianGoods', post);
			// 				console.log(res);
			// 				uni.hideLoading();
			// 				if (res.code && res.code == 200) {
			// 					uni.showToast({
			// 						title: res.msg || '操作成功',
			// 						icon: 'none'
			// 					});
			// 					this.istuijianGoods = this.istuijianGoods ? false : true;
			// 				} else {
			// 					uni.showToast({
			// 						title: res.msg || '操作失败',
			// 						icon: 'none'
			// 					});
			// 				}
			// 			},
			// 			/**
			// 			 * 上报用户足迹
			// 			 */
			// 			async reportProductFootPrint(data) {
			// 				var getDeviceInfo = await helper.getDeviceInfo();
			// 				var post = {
			// 					uid: this.$store.state.openid,
			// 					goods_title: data.goods_title,
			// 					goods_picture: data.goods_picture,
			// 					goods_type: data.goods_type,
			// 					coupon_money: data.coupon_money,
			// 					goods_yprice: data.goods_yprice,
			// 					goods_price: data.goods_price,
			// 					goods_sale: data.goods_sale,
			// 					goods_numiid: data.goods_numiid,
			// 					uuid: getDeviceInfo.imei[0]
			// 				};
			// 				console.log(post);
			// 				await request.post('items/reportfoot', post);
			// 			},
			// 			shareModal(event) {},
			// 			async get_foot_list() {
			// 				var getDeviceInfo = await helper.getDeviceInfo();
			// 				const res = await getApp().globalData.request.post('items/get_foot_list', {
			// 					uuid: getDeviceInfo.imei[0],
			// 					uid: this.$store.state.openid
			// 				});
			// 				console.log(res.data)
			// 				if (res.code && res.code == 200) {
			// 					this.productList = res.data;
			// 				}
			// 			},
			// 			navigateBack() {
			// 				uni.navigateBack();
			// 			}
			// 99999999
			handleJumpTo(item) {
				uni.navigateTo({
					url: getApp().getUrl("/pages/more/index?item=" + encodeURIComponent(JSON.stringify(item)))
				})


			},
			handleJumpToMore(v, item) {
				console.log("-h---->",item)
				if (v == 0) {
					item.id = 3
				} else {
					item.id = 4
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/more/index?item=" + encodeURIComponent(JSON.stringify(item)))
				})
			},
			handleJumpToDetail(item, flag) {
				let params = {
					item,
					flag
				}
				uni.navigateTo({
					url: getApp().getUrl("/pages/ploutoDetail/index?params=" + encodeURIComponent(JSON.stringify(
						params)))
				})
			},
			// 跳转到详情
			handleStateNativeToDetail(item, flag) {
				let prams = {
					items: item,
					item: flag
				}

				let url = getApp().getUrl("/pages/nativeDetail/index?prams=" + encodeURIComponent(JSON.stringify(prams)));

				uni.navigateTo({
					url: url
				})
			},
			handleStateNativeTo(item) {
				let url = getApp().getUrl("/pages/more/index?item=" + encodeURIComponent(JSON.stringify(item)))


				uni.navigateTo({
					url: url
				})
			},
			handleStateChange(item, index) {
				this.$emit("handleStockList", item, index)
			},
			nativeGetTo() {
				let _this = this
				uni.navigateTo({
					url: '/pages/userLoginRegister/login'
				})
				uni.showToast({
					icon: "none",
					title: "Please Sign In"
				})
			},
			jumpToDescribe(item) {
				if (this.userInfo == null) {
					this.nativeGetTo()
				} else {
					uni.navigateTo({
						url: getApp().getUrl("/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(
							item)))
					})
				}


			},

		}
	}
</script>

<style scope>
	.collaps_title {
		color: #333;
	}

	.collaps_list {}

	.collaps_header {
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* height: 80upx; */
		padding: 0 20upx;
	}

	.collaps_header_left {
		font-size: 36upx;
		font-weight: bold;
	}

	.collaps_header_right_ {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}

	.collaps_header_right {

		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}

	.collaps_header_transition_right {
		transition: -webkit-transform 1s;
		transition: transform 1s;
		transition: transform 1s, -webkit-transform 1s;
		width: 20px;
		height: 20px;
	}

	.collaps_content {
		transition: 0.3s;
		height: 0;
		overflow: hidden;
		padding: 0 10upx;
		display: flex;
		justify-content: space-between;
	}

	.active_a {
		height: 0px;
		transition: height 400ms ease-in-out 0ms, -webkit-transform 400ms ease-in-out 0ms, transform 400ms ease-in-out 0ms;
		transform-origin: 50% 50% 0px;
	}

	.active_active {
		height: auto;
		transition: height 400ms ease-in-out 0ms, -webkit-transform 400ms ease-in-out 0ms, transform 400ms ease-in-out 0ms;
		transform-origin: 50% 50% 0px;
		padding-bottom: 40upx
	}

	.other-style {
		width: 14px;
		height: 16px;

	}

	.collaps_content_left {}
</style>
