<template>
	<view class="container">
		<!-- <view class="container_week fontSize13 textColorffb860">
	     <span class="mrr">{{subTitle}}</span><span> {{subTextContent}}</span>  
		</view> -->
		<echarts :option="option" style="height: 355px;width: 750upx;" @click="echartsClick"></echarts>
	</view>
</template>

<script>
	import {
		datas,
		data1
	} from "./data/text.js";
	let data0 = []

	const upColor = '#ec0000';
	const upBorderColor = '#8A0000';
	const downColor = '#00da3c';
	const downBorderColor = '#008F28';


	// const upColor = '#00da3c';
	// const downColor = '#ec0000';
	// const upBorderColor = '#8A0000';
	// const downBorderColor = '#008F28';
	import echarts from '@/components/echarts/echarts.vue'
	import {
		login,
		stockBase,
		stockHistory
	} from '@/api/index.js'
	export default {
		name: "categoryLine",
		props: ['stock_no', 'qUrl', 'time_type'],

		components: {
			echarts
		},
		data() {
			return {


				option: {},

				activeList: {
					id: 1,
					time: "Daily"
				},
				createdTime: [{
					id: 1,
					time: "1min"
				}, {
					id: 2,
					time: "5min"
				}, {
					id: 3,
					time: "15min"
				}, {
					id: 4,
					time: "30min"
				}, {
					id: 5,
					time: "1hour"
				}, {
					id: 6,
					time: "4hour"
				}],
				data0: null,
				historical: [],
				dataWR1: [], //线32
				dataWR2: [], //线64
				dateAllPorint: [],
				resultPorint64: [],
				resultPorint32: [],
				chartData: {},
				s_b: [],
				newBaseData: [],
				subTitle: "",
				subTextContent: ""

			}
		},

		watch: {
			time_type(newV, oldV) {
				// console.log("---newVnewV----->", newV);

				this.getStockBaseList()
			}
		},

		mounted() {

			// this.getStockBaseList()
		},
		methods: {
			splitData(rawData) {
				const categoryData = [];
				const values = [];
				const volume = []
				for (var i = rawData.length - 1; i >= 0; i--) {
					categoryData.push(rawData[i].date.split(' ')[0]);
					values.push([rawData[i].open, rawData[i].close, rawData[i].low, rawData[i].high]);
					volume.push(rawData[i].volume)
				}
				return {
					categoryData,
					values,
					volume
				};
			},
			// 千位符
			numFormat(num) {
				num = num.toString().split('.')
				let arr = num[0].split('').reverse()
				var res = []
				for (let i = 0, len = arr.length; i < len; i++) {
					if (i % 3 === 0 && i !== 0) {
						res.push(',')
					}
					res.push(arr[i])
				}
				res.reverse()
				if (num[1]) {
					res = res.join('').concat('.' + num[1])
				} else {
					res = res.join('')
				}
				console.log(res)
				return res
			},
			echartsClick(params) {
				if (params.seriesName == 'WR32' || params.seriesName == 'WR64') {
					this.subTitle = params.seriesName
					this.subTextContent = params.value.toFixed(2)
				}

				console.log("==日k数据=====>", params)
			},



			getStockBaseList(v) {
				data0 = this.splitData(data1)

				// var res = this.$request.get({
				// 		url: `${stockBase}?stock_no=${this.stock_no}&time_type=${this.time_type}`,
				// 		loadingTip: 'stock...'
				// 	})
				// 	.then(
				// 		res => {
				// 			let baseData = res.list;
				// 		 console.log('baseDatabaseDatabaseData',baseData)
				// 			// this.myRadarEcharts();

				// 		},
				// 		res => {
				// 			console.log('failure');
				// 		}
				// 	);
			},
			porientFunction() {
				this.resultPorint32.forEach((item, g) => {
					if (g > 1) {

						if (item[1] == this.resultPorint64[g]) {
							if (item[1] < this.resultPorint32[g - 1][1]) {
								this.s_b.push({
									name: 'Mark',
									coord: [item[0].replace(/\-/g, '/'), item[2]],
									value: "0",
									symbolSize: 30,
									label: {
										formatter: 's' //单位
									},
									itemStyle: {
										color: '#0aab62'
									}
								})
							} else {
								this.s_b.push({
									name: 'Mark',
									coord: [item[0].replace(/\-/g, '/'), item[2]],
									value: "0",
									symbolSize: 30,
									label: {
										formatter: 'b' //单位
									},
									itemStyle: {
										color: '#0aab62'
									}
								})
							}

						}


					}

				})
				// this.s_b.push({
				// 	name: 'highest value',
				// 	type: 'max',
				// 	valueDim: 'highest'
				// }, {
				// 	name: 'lowest value',
				// 	type: 'min',
				// 	valueDim: 'lowest'
				// }, {
				// 	name: 'average value on close',
				// 	type: 'average',
				// 	valueDim: 'close'
				// })
			},
			// 去掉"-"
			deleteH() {
				this.dataWR1.forEach((item) => {
					if (item != "-") {

					}
				})
			},

			// // maxhigh  dayCount 天数32
			// maxhigh(dayCount) {
			// 	let historicalMaxHeight = this.historical;


			// },

			// WR32
			calculateMAWR1(dayCount) {
				var resultPorint = [];
				var result = [];
				var maxhigh = 0;
				var minLow = 0;
				for (var i = 0, len = data0.values.length; i < len; i++) {

					if (i < dayCount) {

						result.push('-');
						continue;
					}
					var sum = 0;
					maxhigh = 0;
					minLow = 0;
					for (var j = 0; j < dayCount; j++) {
						sum += +data0.values[i - j][1];
						if (maxhigh < this.historical[i - j]?.high) {
							maxhigh = this.historical[i - j]?.high
						}
						if (minLow > this.historical[i - j]?.low || minLow == 0) {
							minLow = this.historical[i - j]?.low
						}

					}

					// console.log("maxhigh=", maxhigh, "minLow=", minLow, "close=", this.historical[i].close)

					var dot = 100 * (maxhigh - this.historical[i]?.close) / (maxhigh - minLow);
					if (dayCount == 32) {

						if (i > 63) {
							this.resultPorint32.push([this.historical[i]?.date, dot, this.historical[i]?.close])
						}
					} else {
						this.dateAllPorint.push(this.historical[i]?.date);
						this.resultPorint64.push(dot)
						//this.resultPorint64.push(100 * (maxhigh - this.historical[i].close) / (maxhigh - minLow))
					}

					result.push(dot)

				}

				/*resultPorint.forEach((item, k) => {
					if (k > 31) {
						this.resultPorint32.push(item)
					}
				})*/
				return result;
			},

			 
			 

			// WR
			calculateMA(count) {
				var result = [];
				for (var i = 0, len = data0.values.length; i < len; i++) {
					if (i < count) {
						result.push('-');
						continue;
					}
					var sum = 0;
					for (var j = 0; j < count; j++) {
						sum += +data0.values[i - j][1];
					}
					result.push((sum / count).toFixed(2));
				}
				return result;
			},

			myRadarEcharts() {
				this.option = {
					title: {
						text: '',
						left: 0
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					legend: {
						data: ['周K', 'MA5', 'MA10', 'MA20', 'MA30']
					},
					grid: {
						left: '10%',
						right: '10%',
						bottom: "15%"
					},
					xAxis: [{
						type: 'category',
						data: data0.categoryData,
						boundaryGap: false,
						axisLine: {
							onZero: false
						},
						splitLine: {
							show: false
						},
						axisLabel: {
							formatter: function(value) {
								return echarts.format.formatTime('MM-dd', value);
							}
						},
						min: 'dataMin',
						max: 'dataMax'
					}],
					yAxis: [{
						scale: true,
						boundaryGap: [0.3],
						splitArea: {
							show: true
						}
					}, {
						scale: true,
						show: false,
						boundaryGap: [0, 5],
						splitArea: {
							show: true
						},
						axisPointer: {
							show: false
						}
					}],
					dataZoom: [{
							type: 'inside',
							start: 50,
							end: 100
						},
						{
							show: false,
							type: 'slider',
							top: '90%',
							start: 50,
							end: 100
						}
					],
					series: [{
							name: '周K',
							type: 'candlestick',
							data: data0.values,
							itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: upBorderColor,
								borderColor0: downBorderColor
							},
							// markPoint: {
							//   label: {
							//     formatter: function (param) {
							//       return param != null ? Math.round(param.value) + '' : '';
							//     }
							//   },
							//   data: [
							//     {
							//       name: 'highest',
							//       type: 'max',
							//       valueDim: 'highest'
							//     },
							//     {
							//       name: 'lowest',
							//       type: 'min',
							//       valueDim: 'lowest'
							//     },
							//     {
							//       name: 'average value on close',
							//       type: 'average',
							//       valueDim: 'close'
							//     }
							//   ],
							//   tooltip: {
							//     formatter: function (param) {
							//       return param.name + '<br>' + (param.data.coord || '');
							//     }
							//   }
							// },
							// markLine: {
							//   symbol: ['none', 'none'],
							//   data: [
							//     [
							//       {
							//         name: 'from lowest to highest',
							//         type: 'min',
							//         valueDim: 'lowest',
							//         symbol: 'circle',
							//         symbolSize: 10,
							//         label: {
							//           show: false
							//         },
							//         emphasis: {
							//           label: {
							//             show: false
							//           }
							//         }
							//       },
							//       {
							//         type: 'max',
							//         valueDim: 'highest',
							//         symbol: 'circle',
							//         symbolSize: 10,
							//         label: {
							//           show: false
							//         },
							//         emphasis: {
							//           label: {
							//             show: false
							//           }
							//         }
							//       }
							//     ],
							//     {
							//       name: 'min line on close',
							//       type: 'min',
							//       valueDim: 'close'
							//     },
							//     {
							//       name: 'max line on close',
							//       type: 'max',
							//       valueDim: 'close'
							//     }
							//   ]
							// }
						},
						{
							name: 'MA5',
							type: 'line',
							data: this.calculateMA(5),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'MA10',
							type: 'line',
							data: this.calculateMA(10),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'MA20',
							type: 'line',
							data: this.calculateMA(20),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'MA30',
							type: 'line',
							data: this.calculateMA(30),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'Volume',
							type: 'bar',
							yAxisIndex: 1,
							itemStyle: {
								color: '#7fbe9e'
							},
							emphasis: {
								itemStyle: {
									color: '#140'
								}
							},
							data: data0.volume
						},
					]
				};
			},

		}
	}
</script>

<style>
	.container {
		width: 750upx;
		height: 355px;
		margin: 0 auto;
		position: relative;

	}

	.container_week {
		position: absolute;
		top: 450upx;
		left: 82upx;
	}

	.container100 {
		width: 100%;
		height: 100%;
	}
</style>
