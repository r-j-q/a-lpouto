<template>
	<view class="container">
		<echarts :option="option" style="height: 140upx;width: 200upx;" @click="echartsClick"></echarts>
	</view>
</template>

<script>
	let base = +new Date(1968, 9, 3);
	let oneDay = 24 * 3600 * 1000;
	// let date = [];
	// let data = [Math.random() * 300];
	// for (let i = 1; i < 20000; i++) {
	// 	var now = new Date((base += oneDay));
	// 	date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
	// 	data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	// }

	import echarts from '@/components/echarts/echarts.vue'
	import {

		stockIndex
	} from '@/api/index.js'
	export default {
		name: "dataLines",
		props: ['dataLines','dateline'],

		components: {
			echarts
		},
		data() {
			return {
				option: {},
			}
		},
		mounted() {

			this.myRadarEcharts()
			// this.getStockIndex()
		},
		methods: {
			echartsClick(params) {
				console.log("==日k数据=====>", params)
			},



			myRadarEcharts() {
				let base = +new Date(1968, 9, 3);
				let oneDay = 24 * 3600 * 1000;
				let date = [];
				let data = [Math.random() * 300];
				for (let i = 1; i < 20000; i++) {
					var now = new Date((base += oneDay));
					date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
					data.push(Math.round((Math.random() - 0.5) * 2 + data[i - 1]));
				}
				console.log("------>dateline", this.dateline)
				console.log("------>dataLines", this.dataLines)
				this.option = {

					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: this.dateline,
						show: false
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%'],
						show: false
					},
					dataZoom: [{
						type: 'inside',
						start: 0,
						end: 10
					}],
					radar:{
						radius:10
					},
					grid: [{
						top: '10%',
						left: '0%',
						right: '0%',
						height: '80%'
					}],
					series: [{
						name: '',
						type: 'line',
						symbol: 'none',
						sampling: 'lttb',
						itemStyle: {
							color: 'rgb(255, 70, 131)'
						},
						center: ["25%", "50%"],
						radius: 20,
						areaStyle: {
							color: 'rgb(255, 70, 131)'
							// color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							// 		offset: 0,
							// 		color: 'rgb(255, 158, 68)'
							// 	},
							// 	{
							// 		offset: 1,
							// 		color: 'rgb(255, 70, 131)'
							// 	}
							// ])
						},
						data:  this.dataLines
					}]
				};
			},

		}
	}
</script>

<style>
	.container {
		height: 140upx;width: 200upx;

	}

	.container100 {
		width: 100%;
		height: 100%;
	}
</style>
