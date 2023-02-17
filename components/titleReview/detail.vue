<template>
	<view class="paddingAll" v-if="titleList">
		<view class="  fontSize24 rowBetween paddingAll">
			<view class="phcolor fontSize15 rowBetween " style="width:100%" >
				<view class="">
					Company Name
				</view>
				<view class="phcolor">
					{{titleList.name}}
				</view>
			</view>
<!-- 23 -->
	<!-- <div class="wrapper">
		<div class="top" @click="hideXuanze()"></div>
		<div class="buttom" @click="clickitem()">


			<div class="li">
				<view class="scroll-view_H">
					<view class="scroll-view-item_H uni-bg-red" v-for="(item,index) in filter" :key="index" @click="xuanze(item)">
						<image class="cur_H_image" :src="item.src"></image>
						<text class="bottom-title">{{item.title}}</text>
					</view>
				</view>
			</div>
		</div>
	</div>
	 <div class="wrapper">
	 	<div class="top" @click="hideXuanze()"></div>
	 	<div class="buttom" @click="clickitem()">
	 
	 
	 		<div class="li">
	 			<view class="scroll-view_H">
	 				<view class="scroll-view-item_H uni-bg-red" v-for="(item,index) in filter" :key="index" @click="xuanze(item)">
	 					<image class="cur_H_image" :src="item.src"></image>
	 					<text class="bottom-title">{{item.title}}</text>
	 				</view>
	 			</view>
	 		</div>
	 	</div>
	 </div>
	 <div class="wrapper">
	 	<div class="top" @click="hideXuanze()"></div>
	 	<div class="buttom" @click="clickitem()">
	 
	 
	 		<div class="li">
	 			<view class="scroll-view_H">
	 				<view class="scroll-view-item_H uni-bg-red" v-for="(item,index) in filter" :key="index" @click="xuanze(item)">
	 					<image class="cur_H_image" :src="item.src"></image>
	 					<text class="bottom-title">{{item.title}}</text>
	 				</view>
	 			</view>
	 		</div>
	 	</div>
	 </div>-->
<!-- 23 -->
		</view>
		<view class="  fontSize24 rowBetween paddingAll">
			<view class=" phcolor fontSize15 rowBetween " style="width:100%" >
				<view class="">
					Industry
				</view>
				<view class="phcolor">
					{{titleList.industry}}
				</view>
			</view>
		</view>
		<view class="textColor5a fontSize24 rowBetween paddingAll">
			<view class="phcolor fontSize15 rowBetween mrr" style="flex:1">
				<view class="">
					High
				</view>
				<view class="">
					{{titleList.dayHigh.toFixed(2)}}
				</view>
			</view>
			<view class=" phcolor fontSize15 rowBetween mrl" style="flex:1">
				<view class="">
					Low
				</view>
				<view class="">
					{{titleList.dayLow.toFixed(2)}}
				</view>
			</view>
 
  
		</view>
		<view class="textColor5a fontSize24 rowBetween paddingAll">
			<view class="phcolor fontSize15 rowBetween mrr" style="flex:1">
				<view class="">
					Open
				</view>
				<view class="">
					{{titleList.open.toFixed(2)}}
				</view>
			</view>
			<view class=" phcolor fontSize15 rowBetween mrl" style="flex:1">
				<view class="">
					Volume
				</view>
				<view class="">
					{{titleList.volume}}
				</view>
			</view>

		</view>
		<view class="textColor5a fontSize24 rowBetween paddingAll">
			<view class="phcolor fontSize15 rowBetween mrr" style="flex:1">
				<view class="">
					Previous Close
				</view>
				<view class="">
					{{titleList.previousClose.toFixed(2)}}
				</view>
			</view>
			 <view class=" phcolor fontSize15 rowBetween mrl" style="flex:1">
			 	<view class="">
			 		 
			 	</view>
			 	<view class="">
			 		 
			 	</view>
			 </view>
		
		</view>
 
	</view>
</template>
<script>
	export default {
		props: ['titleList'],
		 
	}
	
	
		// hideXuanze() {
		// 			uni.getCurrentSubNVue().hide('auto')
		// 		},
		// 		clickitem() {},
		// 		xuanze(e) {
		// 			console.log(e)
		// 			if (!this.$store.state.openid) {
		// 				uni.navigateTo({
		// 					url: '/pages/member/ucenter/signIn'
		// 				});
		// 				return;
		// 			}
		// 			if(e.name=='luzhi'){
		// 				var url='/pages/duanshipin/index/index?type=1';
		// 			}else if(e.name=='shangchuan'){
		// 				var url='/pages/duanshipin/index/index?type=2';
		// 			}
		// 			uni.navigateTo({
		// 				url: url
		// 			})
		// 		},
</script>
 
