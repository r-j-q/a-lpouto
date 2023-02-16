<template>
	<view class="content_app   minHeight100">
	 <view class="mine_list" @click="jumTo(items.id)" v-for="(items,index) in listData" :key="index">
	 	<view class="mine_list_left">
	 		<view class="mine_list_left_img"> 
			<image :src="items.imgUrl" mode=""></image>
			</view>
	 		<view class="textColorFFF fontSize14"> {{items.title}} </view>
	 	</view>
		<u-icon name="arrow-right" color="#999" size="24"></u-icon>
	 </view>
		<!-- 	<view v-if="!hasLogin || empty===true" class="empty">
					<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
					<view v-if="hasLogin" class="empty-tips">
						空空如也
						<navigator class="navigator" v-if="hasLogin" @click="navToShop" open-type="switchTab">随便逛逛></navigator>
					</view>
					<view v-else class="empty-tips">
						空空如也
						<view class="navigator" @click="navToLogin">去登陆></view>
					</view>
				</view> <view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="item.image" 
								:class="[item.loaded]"
								mode="aspectFill" 
								lazy-load 
								@load="onImageLoad('cartList', index)" 
								@error="onImageError('cartList', index)"
							></image>
							<view 
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.title}}</text>
							<text class="attr">{{item.goods_spec}}</text>
							<text class="price">¥{{item.price}}</text>
							<uni-number-box 
								class="step"
								:min="1" 
								:max="item.stock"
								:value="item.number>item.stock?item.stock:item.number"
								:isMax="item.number>=item.stock?true:false"
								:isMin="item.number===1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view><view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>-->



		<!-- <view class="rowBetween paddingAll ptb-80"> -->
			<!-- <view class="main-two" @click="jumpToDescribe(1)">
				<image :src="bannerOne" mode=""></image>
			</view> -->
		<!-- 	<view class="main-two" @click="jumpToDescribe(2)">
				<image :src="bannerTwo" mode=""></image>
				<view class="main-two-buttom colorffb860">
					Only $7.9/W
				</view>
			</view> -->
		<!-- </view> -->
		<!-- <uni-list> -->
			<!-- <uni-list-item link="navigateTo" :thumb="settingmine" showArrow title="My Subscriptions"
				@click="loginOutsMine"></uni-list-item>

			<uni-list-item link="navigateTo" :thumb="contactus" showArrow title="Contact us"
				@click="loginOutsMinesocket">
			</uni-list-item> -->

			<!-- <uni-list-item link="navigateTo" :thumb="changePassword"  showArrow title="My Subscriptions"  to="/pages/mine/index"  ></uni-list-item> -->
			<!-- <uni-list-item link="navigateTo" :thumb="loginOut" showArrow title="Login Out" @click="loginOuts">
			</uni-list-item> -->
		<!-- </uni-list> -->
	</view>

</template>

<script>
	import {
		userMeIndex
	} from "@/api/index.js"
	import countdowns from "@/components/cz-countdown/cz-countdown.vue"
	import {
		mapGetters
	} from "vuex"
	export default {
		name: 'index',

		components: {
			countdowns,
		},
		computed: {
			...mapGetters({
				getUserInfo: "userInfo"
			})
		},
		data() {
			return {
				listData:[
					// {id:1,title:"My Purchase",imgUrl:require("../../../static/images/me/goumai-2.png")},
					{id:2,title:"FAQ",imgUrl:require("../../../static/images/me/fankuifaqs.png")},
					{id:3,title:"Feedback",imgUrl:require("../../../static/images/me/fankui.png")},
					{id:4,title:"Terms of Service",imgUrl:require("../../../static/images/me/fuwutiaokuanjiyinsi-2.png")},
					{id:5,title:"Contact Us",imgUrl:require("../../../static/images/me/lianxiwomen-2.png")},
					{id:6,title:"Settings",imgUrl:require("../../../static/images/me/shezhi-2.png")},
					{id:7,title:"Privacy Policy",imgUrl:"../../../static/images/me/zhuce-2.png"},
				],
				vip: require("../../../static/images/other/vip.png"),
				settingmine: require("../../../static/images/other/settingmine.png"),
				loginOut: require("../../../static/images/other/loginOut.png"),
				changePassword: require("../../../static/images/other/changePassword.png"),
				bannerOne: require("../../../static/images/other/bannerOne.png"),
				bannerTwo: require("../../../static/images/other/bannerTwo.jpg"),
				contactus: require("../../../static/images/other/contactus.png"),

			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			jumTo(id){
				let urls =''
				if(id===1){
					urls='/pages/me/myPurchase'
				}else if(id===2){
					urls='/pages/me/faq'
					 
				}else if(id===3){
					urls='/pages/me/suggest'
					 
				}else if(id===4){
					urls='/pages/me/termsOfService'
					 
				}else if(id===5){
					urls='/pages/me/contactUs'
					 
				}else if(id===6){
		 			urls='/pages/me/settin'
				}else if(id===7){
					urls='/pages/me/privacyPolicy'
				}
				 
				uni.navigateTo({
					url: urls
				})
			},
			//请求数据
			// async loadData(){
			// 	let list = await this.$api.json('cartList'); 
			// 	let cartList = list.map(item=>{
			// 		item.checked = true;
			// 		return item;
			// 	});
			// 	this.cartList = cartList;
			// 	this.calcTotal();  //计算总价 
			// },
			//          async getCartList(){ 
			//              var that = this;
			//              try {
			//                  const res = await getApp().globalData.request.post('shop/getCartList', {
			//                      uid: that.$store.state.openid
			//                  });
			//                  console.log(res);
			//                  if (res.code == 200) {
			//                     that.cartList = res.data;
			//                  } else {
			//                      uni.showToast({
			//                          title: res.msg,
			//                          icon: 'none'
			//                      });
			//                  }
			//              } catch (e) {
			//                    uni.showToast({
			//                        title: "请求错误",
			//                        icon: 'none'
			//                    });    
			//              }     
			//          },
			// //监听image加载完成
			// onImageLoad(key, index) {
			// 	this.$set(this[key][index], 'loaded', 'loaded');
			// },
			// //监听image加载失败
			// onImageError(key, index) {
			// 	this[key][index].image = '/static/errorImage.jpg';
			// },
			// navToLogin(){
			// 	uni.navigateTo({
			// 		url: '/pages/member/ucenter/signIn'
			// 	})
			// },
			//          navToShop(){
			//          	uni.navigateTo({
			//          	    url: '/pages/special/shop'
			//          	})
			//          },
			//  //选中状态处理
			// check(type, index){
			// 	if(type === 'item'){
			// 		this.cartList[index].checked = !this.cartList[index].checked;
			// 	}else{
			// 		const checked = !this.allChecked
			// 		const list = this.cartList;
			// 		list.forEach(item=>{
			// 			item.checked = checked;
			// 		})
			// 		this.allChecked = checked;
			// 	}
			// 	this.calcTotal(type);
			// },
			// //数量
			// numberChange(data){
			// 	this.cartList[data.index].number = data.number;
			// 	this.calcTotal();
			// },
			// //删除
			// deleteCartItem(index){
			// 	let list = this.cartList;
			// 	let row = list[index];
			// 	let id = row.id;
			//              this.postdelete("",id);
			// 	this.cartList.splice(index, 1);
			// 	this.calcTotal();
			// 	uni.hideLoading();
			// },
			// //清空
			// clearCart(){
			// 	uni.showModal({
			// 		content: '清空购物车？',
			// 		success: (e)=>{
			// 			if(e.confirm){
			// 				this.cartList = [];
			//                          this.postdelete("clear");
			// 			}
			// 		}
			// 	})
			// },
			// //计算总价
			// calcTotal(){
			// 	let list = this.cartList;
			// 	if(list.length === 0){
			// 		this.empty = true;
			// 		return;
			// 	}
			// 	let total = 0;
			//              let express = 0;
			// 	let checked = true;
			// 	list.forEach(item=>{
			// 		if(item.checked === true){
			// 			total += item.price * item.number;
			//                      express += parseFloat(item.price_express);
			// 		}else if(checked === true){
			// 			checked = false;
			// 		}
			// 	})
			// 	this.allChecked = checked;
			// 	this.total = Number(total.toFixed(2));
			//              this.price_express = express;                
			// },
			// //创建订单
			// createOrder(){
			// 	let list = this.cartList;
			// 	let goodsData = [];
			// 	list.forEach(item=>{
			// 		if(item.checked){
			// 			goodsData.push({
			// 				//attr_val: item.attr_val,
			//                          cartid: item.id,
			// 				goods_id: item.goods_id,
			//                          price: item.price,
			// 				goods_spec: item.goods_spec,
			// 				goods_specid: item.goods_specid,
			//                          title: item.title,
			//                          image: item.image,
			//                          number: item.number
			// 			})
			// 		}
			// 	})
			//              console.log(goodsData);
			//              //return;
			// 	uni.navigateTo({
			// 		url: `/pages/order/create/order?data=${JSON.stringify({
			// 			goodsData: goodsData
			// 		})}&total=${this.total}&price_express=${this.price_express}`
			// 	})				
			// },
			//          async postdelete(type,e){
			//              var that = this;
			//              var itmeid = e;
			//              try {
			//                  const res = await getApp().globalData.request.post('shop/deletecart', {
			//                      itmeid: itmeid,
			//                      type: type,
			//                      uid: that.$store.state.openid
			//                  });
			//                  console.log(res);                  
			//              } catch (e) {
			//                    uni.showToast({
			//                        title: "请求错误",
			//                        icon: 'none'
			//                    });    
			//              }     
			//          }

			// 000000000000
			loginOuts() {
				uni.showModal({
					content: "Confirm to exit？",
					confirmText: "Confirm",
					cancelText: "Cancel",
					success: (res) => {
						if (res.confirm) {

							uni.removeStorageSync('userInfo');
							uni.navigateTo({
								url: '/pages/userLoginRegister/login'
							});
						}
					}
				})

			},
			loginOutsMinesocket() {
				if (this.getUserInfo == null) {
					uni.navigateTo({
						url: '/pages/userLoginRegister/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/socket/chat'
				})
			},

			loginOutsMine() {
				if (this.getUserInfo == null) {
					uni.navigateTo({
						url: '/pages/userLoginRegister/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/mine/index'
				})
			},


			jumpToDescribe(num, time) {
				if (this.getUserInfo == null) { 
					uni.navigateTo({
						url: '/pages/userLoginRegister/login'
					})
					return
				}
				let params = {
					id: num,
					title: ""
				}
				uni.navigateTo({
					url: "/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(params))
				})
			},

		}
	}
</script>

<style scoped>
	.mine_list{
		width: 94%;
		margin: 0 auto;
		padding: 30upx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: .1vw solid #999;
	}
	.mine_list_left_img{
		width: 60upx;
		height: 60upx;
		overflow: hidden;
		margin-right: 20upx;
	}
	.mine_list_left_img image{
		width: 100%;
		height: 100%;
	}
	.mine_list_left{
		display: flex;
		flex-direction: row;
		align-items: center;
		
	}
	/* .container{
			padding-bottom: 134upx;
			 
			.empty{
				position:fixed;
				left: 0;
				top:0;
				width: 100%;
				height: 100vh;
				padding-bottom:100upx;
				display:flex;
				justify-content: center;
				flex-direction: column;
				align-items:center;
				background: #fff;
				image{
					width: 240upx;
					height: 160upx;
					margin-bottom:30upx;
				}
				.empty-tips{
					display:flex;
					font-size: $font-sm+2upx;
					color: $font-color-disabled;
					.navigator{
						color: $uni-color-primary;
						margin-left: 16upx;
					}
				}
			}
		} 
		.cart-item{
			display:flex;
			position:relative;
			padding:30upx 40upx;
			.image-wrapper{
				width: 230upx;
				height: 230upx;
				flex-shrink: 0;
				position:relative;
				image{
					border-radius:8upx;
	                width: 230upx;
	                height: 230upx;
				}
			}
			.checkbox{
				position:absolute;
				left:-16upx;
				top: -16upx;
				z-index: 8;
				font-size: 44upx;
				line-height: 1;
				padding: 4upx;
				color: $font-color-disabled;
				background:#fff;
				border-radius: 50px;
			}
			.item-right{
				display:flex;
				flex-direction: column;
				flex: 1;
				overflow: hidden;
				position:relative;
				padding-left: 30upx;
				.title,.price{
					font-size:$font-base + 2upx;
					color: $font-color-dark;
					height: 40upx;
					line-height: 40upx;
					
				}
				.attr{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					height: 50upx;
					line-height: 50upx;
				}
				.price{
					height: 50upx;
					line-height:50upx;
				}
			}
			.del-btn{
				padding:4upx 10upx;
				font-size:34upx; 
				height: 50upx;
				color: $font-color-light;
			}
		}
		.clamp{
			white-space:nowrap;
			width:380rpx;
			text-overflow: ellipsis;
			overflow: hidden;
		}
 
		.action-section{ 
			margin-bottom:100upx;
			 
			position:fixed;
			left: 30upx;
			bottom:30upx;
			z-index: 95;
			display: flex;
			align-items: center;
			width: 690upx;
			height: 100upx;
			padding: 0 30upx;
			background: rgba(255,255,255,.9);
			box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
			border-radius: 16upx;
			.checkbox{
				height:52upx;
				position:relative;
				image{
					width: 52upx;
					height: 100%;
					position:relative;
					z-index: 5;
				}
			}
			.clear-btn{
				position:absolute;
				left: 26upx;
				top: 0;
				z-index: 4;
				width: 0;
				height: 52upx;
				line-height: 52upx;
				padding-left: 38upx;
				font-size: $font-base;
				color: #fff;
				background: $font-color-disabled;
				border-radius:0 50px 50px 0;
				opacity: 0;
				transition: .2s;
				&.show{
					opacity: 1;
					width: 120upx;
				}
			}
			.total-box{
				flex: 1;
				display:flex;
				flex-direction: column;
				text-align:right;
				padding-right: 40upx;
				.price{
					font-size: $font-lg;
					color: $font-color-dark;
				}
				.coupon{
					font-size: $font-sm;
					color: $font-color-light;
					text{
						color: $font-color-dark;
					}
				}
			}
			.confirm-btn{
				padding: 0 38upx;
				margin: 0;
				border-radius: 100px;
				height: 76upx;
				line-height: 76upx;
				font-size: $font-base + 2upx;
				background: $uni-color-primary;
				box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
			}
		} 
		.action-section .checkbox.checked,
		.cart-item .checkbox.checked{
			color: $uni-color-primary;
		} */
	/* ::v-deep .uni-list-item {
		padding: 20rpx 0;
		background-color: #fff;
		border: none;
		position: initial;
	}

	::v-deep .uni-list--border-top {
		-webkit-transform: scaleY(0.1);
		transform: scaleY(0.1);
	}

	::v-deep .uni-list--border-bottom {
		-webkit-transform: scaleY(0.1);
		transform: scaleY(0.1);
	}

	::v-deep .uni-list-item__content-title {
		color: #9E9E9E;
	}

	.ptb-80 {
		padding: 80rpx 20rpx;
	}

	.main-two {
		width: 100%;
		height: 170px;
		position: relative;
	}

 

	.main-two image {
		width: 100%;
		height: 100%;
	} */
</style>
