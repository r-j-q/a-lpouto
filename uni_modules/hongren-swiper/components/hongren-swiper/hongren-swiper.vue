<template name="HR_swiper">
	<view class="">
		<block v-if="type=='swiper1'">
			<swiper class="swiper1" indicator-dots circular :duration="1000" :current="current">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<navigator class="swiper1_item" :url="item.path" hover-class="none" v-if="item.path && item.path.length>0">
						<image class="autoImage" :src="item.image" mode="widthFix"></image>
					</navigator>
					<view class="swiper1_item" v-else>
						<image class="autoImage" :src="item.image" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</block>
		<block v-if="type=='swiper2'">
			<swiper class="swiper2" :duration="1000" autoplay circular :current="current" previous-margin="175rpx" next-margin="175rpx" @change="change">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<navigator class="swiper2_item" :url="item.path" hover-class="none" v-if="item.path && item.path.length>0" :class="current==index?'swiper2_active':''">
						<image class="" :src="item.image" mode="aspectFill"></image>
					</navigator>
					<view class="swiper2_item" v-else  :class="current==index?'swiper2_active':''">
						<image class="" :src="item.image" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</block>
		<block v-if="type=='swiper3'">
			<swiper class="swiper3" :duration="1000" autoplay circular :current="current" previous-margin="175rpx" next-margin="175rpx" @change="change">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<navigator class="swiper3_item" :url="item.path" hover-class="none" v-if="item.path && item.path.length>0" :class="current==index?'swiper3_active':''">
						<image class="" :src="item.image" mode="widthFix"></image>
					</navigator>
					<view class="swiper3_item" v-else  :class="current==index?'swiper2_active':''">
						<image class="" :src="item.image" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</block>
	</view>
</template>
<script>
	/**
	 * 方法说明
	 * author: ywg
	 * description: Fevering lei
	 * @param 
	 * @return 
	 * @createTime: 2021-6-22 10:11:20 ?F10: AM?
	 */
	export default {
		name: "HR_swiper",
		props: ["s_type","s_list","s_current"],
		computed: {
			style() {
				return {}
			}
		},
		data() {
			return {
				type: this.s_type,//控制弹窗模板、控制弹窗显示隐藏true/false
				swiperList:this.s_list,
				current:this.s_current?this.s_current:0,
			};
		},
		methods: {
			change(e) {
				this.current = e.target.current
			}
		}
	}
</script>

<style lang="scss">
	.swiper2_active,.swiper3_active{
		transform: scale(1.4);
	}
	.swiper3{
		position: relative;
		width: 100%;
		height: 400rpx;
		display: flex;
		align-items: center;
		swiper-item{
			.swiper3_item{
				position: absolute;
				top: 100rpx;
				bottom: 100rpx;
				left: 100rpx;
				right: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				transition: all 0.5s ease;
				overflow: hidden;
				border-radius: 400rpx;
				// image{
				// 	display: flex;
				// 	align-items: center;
				// 	justify-content: center;
				// 	flex-wrap: wrap;
				// }
			}
		}
	}
	.swiper2{
		position: relative;
		width: 100%;
		height: 600rpx;
		display: flex;
		align-items: center;
		swiper-item{
			.swiper2_item{
				position: absolute;
				top: 50rpx;
				bottom: 50rpx;
				left: 50rpx;
				right: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				transition: all 0.5s ease;
				overflow: hidden;
				image{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;
				}
			}
		}
	}
	.swiper1{
		position: relative;
		width: 100%;
		height: 500rpx;
		swiper-item{
			.swiper1_item{
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
			}
		}
	}
	.autoImage {
		position: relative;
		width: auto;
		height: auto;
		min-width: 100%;
		min-height: 100%;
		border-radius: 2rpx;
		/* 小程序image与image之间的空隙解决 */
		vertical-align: top;
	}
</style>
<!-- 
 indicator-dots	Boolean	false	是否显示面板指示点	
 indicator-color	Color	rgba(0, 0, 0, .3)	指示点颜色	
 indicator-active-color	Color	#000000	当前选中的指示点颜色	
 active-class	String		swiper-item 可见时的 class	支付宝小程序
 changing-class	String		acceleration 设置为 {{true}} 时且处于滑动过程中，中间若干屏处于可见时的class	支付宝小程序
 autoplay	Boolean	false	是否自动切换	
 current	Number	0	当前所在滑块的 index	
 current-item-id	String		当前所在滑块的 item-id ，不能与 current 被同时指定	支付宝小程序不支持
 interval	Number	5000	自动切换时间间隔	
 duration	Number	500	滑动动画时长	app-nvue不支持
 circular	Boolean	false	是否采用衔接滑动，即播放到末尾后重新回到开头	
 vertical	Boolean	false	滑动方向是否为纵向	
 previous-margin	String	0px	前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值	app-nvue、字节跳动小程序不支持
 next-margin	String	0px	后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值	app-nvue、字节跳动小程序不支持
 acceleration	Boolean	false	当开启时，会根据滑动速度，连续滑动多屏	支付宝小程序
 disable-programmatic-animation	Boolean	false	是否禁用代码变动触发 swiper 切换时使用动画。	支付宝小程序
 display-multiple-items	Number	1	同时显示的滑块数量	app-nvue、支付宝小程序不支持
 skip-hidden-item-layout	Boolean	false	是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息	App、微信小程序
 disable-touch	Boolean	false	是否禁止用户 touch 操作	App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序（只在初始化时有效，不能动态变更）
 touchable	Boolean	true	是否监听用户的触摸事件，只在初始化时有效，不能动态变更	字节跳动小程序（uni-app 2.5.5+ 推荐统一使用 disable-touch）
 easing-function	String	default	指定 swiper 切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic	微信小程序
 @change	EventHandle		current 改变时会触发 change 事件，event.detail = {current: current, source: source}	
 @transition	EventHandle		swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}，支付宝小程序暂不支持dx, dy	App、H5、微信小程序、支付宝小程序、字节跳动小程序、QQ小程序
 @animationfinish	EventHandle		动画结束时会触发 animationfinish 事件，event.detail = {current: current, source: source}	字节跳动小程序不支持
 -->