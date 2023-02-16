# hongren-swiper
## 介绍
```
<template>
	<view class="content">
		<view class="swiperItem">
			<HR_swiper s_type="swiper3" :s_list="swiper3List" :s_current="6"></HR_swiper>
		</view>
		<view class="swiperItem">
			<HR_swiper s_type="swiper2" :s_list="swiper2List"></HR_swiper>
		</view>
		<view class="swiperItem">
			<HR_swiper s_type="swiper1" :s_list="swiper1List"></HR_swiper>
		</view>
	</view>
</template>

<script>
	import HR_swiper from "@/uni_modules/hongren-swiper/components/hongren-swiper/hongren-swiper.vue";
	export default {
		components:{
			HR_swiper
		},
		data() {
			return {
				swiper1List:[
					{id:1,path:"/pages/index/index",image:"https://img.pic88.com/preview/2020/08/05/15966349221445562.jpg!s640?imageView2/1/sharpen/1"},
					{id:2,path:"",image:"https://img.pic88.com/preview/2020/08/05/15966322231466713.jpg!s640?imageView2/1/sharpen/1"},
					{id:3,path:"",image:"https://img.pic88.com/preview/2020/09/02/1599053319841862.jpg!t640?imageView2/1/sharpen/1"},
					{id:4,path:"",image:"https://img.pic88.com/16056483700345.jpg?imageMogr2/quality/90!/thumbnail/640/sharpen/1/"},
					{id:5,path:"",image:"https://img.pic88.com/preview/2020/09/02/1599055345799664.jpg!t640?imageView2/1/sharpen/1"}
				],
				swiper2List:[
					{id:7,path:"",image:"https://img.pic88.com/preview/2020/09/03/1599068527521176.jpg!t640?imageView2/1/sharpen/1"},
					{id:1,path:"/pages/index/index",image:"https://img.pic88.com/preview/2020/08/05/15966330471460246.jpg!s640?imageView2/1/sharpen/1"},
					{id:2,path:"",image:"https://img.pic88.com/16056878326348.jpg?imageMogr2/quality/90!/thumbnail/640/sharpen/1/"},
					{id:3,path:"",image:"https://img.pic88.com/preview/2020/09/02/1599053970826270.jpg!t640?imageView2/1/sharpen/1"},
					{id:4,path:"",image:"https://img.pic88.com/16056541538809.jpg?imageMogr2/quality/90!/thumbnail/640/sharpen/1/"},
					{id:5,path:"",image:"https://img.pic88.com/preview/2020/09/03/1599068296522672.jpg!t640?imageView2/1/sharpen/1"},
					{id:6,path:"",image:"https://img.pic88.com/preview/2020/09/02/1599054110825720.jpg!t640?imageView2/1/sharpen/1"}
				],
				swiper3List:[
					{id:1,path:"/pages/index/index",image:"https://img.pic88.com/preview/2020/08/05/15966335151455887.jpg!s640?imageView2/1/sharpen/1"},
					{id:2,path:"",image:"https://img.pic88.com/preview/2020/08/31/15988419695f4c6471d8f94.jpg!s640?imageView2/1/sharpen/1"},
					{id:3,path:"",image:"https://img.pic88.com/preview/2020/08/02/1596407329317339.jpg!s640?imageView2/1/sharpen/1"},
					{id:4,path:"",image:"https://img.pic88.com/preview/2020/08/02/1596407366316871.jpg!s640?imageView2/1/sharpen/1"},
					{id:5,path:"",image:"https://img.pic88.com/preview/2020/08/27/15985369545f47bcfadd1da.jpg!s640?imageView2/1/sharpen/1"},
					{id:6,path:"",image:"https://img.pic88.com/preview/2020/08/31/15988435565f4c6aa48f798.jpg!s640?imageView2/1/sharpen/1"},
					{id:7,path:"",image:"https://img.pic88.com/preview/2020/08/02/1596332785734561.jpg!s640?imageView2/1/sharpen/1"},
					{id:8,path:"",image:"https://img.pic88.com/preview/2020/08/01/15962891251131599.jpg!s640?imageView2/1/sharpen/1"},
				],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.swiperItem{
		position: relative;
		width: 100%;
		min-height: 300rpx;
		margin-bottom: 30rpx;
	}
</style>
```
觉得对你有帮助记得给个`红心`加`收藏`,楼主会持续更新