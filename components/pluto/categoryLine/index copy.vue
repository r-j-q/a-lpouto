<template>
	<view class="container">
		<echarts :option="option" style="height: 355px;width: 750upx;" @click="echartsClick"></echarts>
	</view>
</template>

<script>
	// import {
	// 	datas
	// } from "./data/index.js"
	const upColor = '#ec0000';
	const upBorderColor = '#8A0000';
	const downColor = '#00da3c';
	const downBorderColor = '#008F28';
	import echarts from '@/components/echarts/echarts.vue'
	import {
		stockBase,
		stockHistory
	} from '@/api/index.js'
	export default {
		name: "categoryLine",
		props: ['stock_no'],

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
				s_b: []

			}
		},
		mounted() {

			this.getStockBaseList()
		},
		methods: {
			echartsClick() {},
			// 求两条线段交点，a,b 为第一条线段的始末点，c,d 为第二条线段的始末点。x，y 为点的横纵坐标
			segmentsIntr({
				a,
				b,
				c,
				d
			} = {}) {
				var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y)
				var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) +
					(b.y - a.y) * (d.x - c.x) * a.x -
					(d.y - c.y) * (b.x - a.x) * c.x) / denominator
				var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x) +
					(b.x - a.x) * (d.y - c.y) * a.y -
					(d.x - c.x) * (b.y - a.y) * c.y) / denominator
				console.log(y);
				return [x, y]
			},

			getStockBaseList() {

				var res = this.$request.get({
						url: `${stockHistory}?stock_no=${this.stock_no}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
				let baseData = res.list.Historical;
				this.historical = baseData;
				// let baseData = datas.historical
				let newBaseData = [];

				baseData.forEach((item) => {
					newBaseData.push(
						// [item.Date, item.Open, item.Close, item.Low, item.High]
						[item.Date.replace(/\-/g, '/'), item.Open.toFixed(2), item.Close.toFixed(2), item.Low.toFixed(2), item.High.toFixed(2)]
					)
				})
				// [date,open,close,low,high] 
				this.data0 = this.splitDataNew(newBaseData)
				this.dataWR1 = this.calculateMAWR1(32);
				this.dataWR2 = this.calculateMAWR1(64);
				this.myRadarEcharts();
				this.chartData = {
					line1: this.resultPorint32,
					line2: this.resultPorint64,
					date: this.dateAllPorint
					// date: this.data0.categoryData
				}



				// console.log("---32------>", this.dataWR1)
				// console.log("---64------>", this.dataWR2)
				// 锚点数据 start
				// console.log("---坐标------>", this.dateAllPorint)
				console.log("---resultPorint32------>", this.resultPorint32)
				console.log("---resultPorint64------>", this.resultPorint64)
				this.porientFunction()
				// 锚点数据 end
					},
					res => {
						console.log('failure');
					}
				);
			},
			porientFunction() {
				this.resultPorint32.forEach((item, g) => {
					if (g > 1) {

						if (item[1] == this.resultPorint64[g] ) {
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
				this.s_b.push({
					name: 'highest value',
					type: 'max',
					valueDim: 'highest'
				}, {
					name: 'lowest value',
					type: 'min',
					valueDim: 'lowest'
				}, {
					name: 'average value on close',
					type: 'average',
					valueDim: 'close'
				})
			},
			// 去掉"-"
			deleteH() {
				this.dataWR1.forEach((item) => {
					if (item != "-") {

					}
				})
			},
			splitDataNew(rawData) {
				const categoryData = [];
				const values = [];
				for (var i = 0; i < rawData.length; i++) {
					categoryData.push(rawData[i].splice(0, 1)[0]);
					values.push(rawData[i]);
				}
				// console.log("=categoryData======>", categoryData)
				return {
					categoryData: categoryData,
					values: values
				};
			},
			// maxhigh  dayCount 天数32
			maxhigh(dayCount) {
				let historicalMaxHeight = this.historical;


			},
			// WR32
			calculateMAWR1(dayCount) {
				var resultPorint = [];
				var result = [];
				var maxhigh = 0;
				var minLow = 0;
				for (var i = 0, len = this.data0.values.length; i < len; i++) {

					if (i < dayCount) {

						result.push('-');
						continue;
					}
					var sum = 0;
					maxhigh = 0;
					minLow = 0;
					for (var j = 0; j < dayCount; j++) {
						sum += +this.data0.values[i - j][1];
						if (maxhigh < this.historical[i - j].High) {
							maxhigh = this.historical[i - j].High
						}
						if (minLow > this.historical[i - j].Low || minLow == 0) {
							minLow = this.historical[i - j].Low
						}

					}

					// console.log("maxhigh=", maxhigh, "minLow=", minLow, "close=", this.historical[i].close)

					var dot = 100 * (maxhigh - this.historical[i].Close) / (maxhigh - minLow);
					if (dayCount == 32) {

						if (i > 63) {
							this.resultPorint32.push([this.historical[i].Date, dot, this.historical[i].Close])
						}
					} else {
						this.dateAllPorint.push(this.historical[i].Date);
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

			dateAllPorintFunction() {
				var dateAllPorint = [];
				for (var i = 0, len = this.data0.values.length; i < len; i++) {
					dateAllPorint.push(this.historical[i].date);
				}
				return dateAllPorint;
			},
			resultPorintFunction(dayCount) {
				var resultPorintData = [];
				var result = [];
				var maxhigh = 0;
				var minLow = 0;
				for (var i = 0, len = this.data0.values.length; i < len; i++) {

					if (i < dayCount) {

						result.push('-');
						continue;
					}
					var sum = 0;
					maxhigh = 0;
					minLow = 0;
					for (var j = 0; j < dayCount; j++) {
						sum += +this.data0.values[i - j][1];
						if (maxhigh < this.historical[i - j].high) {
							maxhigh = this.historical[i - j].high
						}
						if (minLow > this.historical[i - j].low || minLow == 0) {
							minLow = this.historical[i - j].low
						}

					}
					resultPorintData.push(100 * (maxhigh - this.historical[i].close) / (maxhigh - minLow))

				}
				return resultPorintData;
			},


			// WR
			calculateMA(dayCount) {
				var result = [];
				for (var i = 0, len = this.data0.values.length; i < len; i++) {
					if (i < dayCount) {
						result.push('-');
						continue;
					}

					var sum = 0;
					for (var j = 0; j < dayCount; j++) {
						sum += +this.data0.values[i - j][1];
					}
					result.push(sum / dayCount);
				}
				return result;
			},
			myRadarEcharts() {
				this.option = {
					title: {
						// text: '上证指数',
						left: 0
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					// legend: {
					//   data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
					// },
					grid: {
						top: '3%',
						left: '10%',
						right: '13%',
						bottom: '20%'
					},
					xAxis: {
						type: 'category',
						// data: this.chartData.date  ,
						data: this.data0.categoryData,
						boundaryGap: false,
						axisLine: {
							onZero: false
						},

						splitLine: {
							show: false
						},
						min: 'dataMin',
						max: 'dataMax'
					},
					yAxis: {
						scale: true,
						splitArea: {
							show: true
						}
					},
					dataZoom: [{
							type: 'inside',
							start: 50,
							end: 100
						},
						{
							show: true,
							type: 'slider',
							top: '90%',
							start: 50,
							end: 100
						}
					],
					series: [{
							name: 'Day K',
							type: 'candlestick',
							data: this.data0.values,

							itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: upBorderColor,
								borderColor0: downBorderColor
							},
							markPoint: {
								label: {
									formatter: function(param) {
										return param != null ? Math.round(param.value) + '' : '';
									}
								},
								data: this.s_b, 
								tooltip: {
									trigger: 'axis', // 设置提示框为：坐标轴触发。此项主要用于柱图、折线图的配置。
									formatter: function(
										params
									) { // params 为一个数组，数组的每个元素 包含了 该折线图的点 所有的参数信息，比如 value(数值)、seriesName（系列名）、dataIndex（数据项的序号）
										let dateIndex = 0; // 当前指示点的 日期序号
										let tipList = params.map((seg) => {
											let {
												value,
												seriesName,
												dataIndex
											} = seg;
											dateIndex = dataIndex;
											return `${seriesName}：${value}`
										})
										tipList.unshift(`${this.chartData.date[dateIndex]}`)
										return tipList.join('<br/>')
									}
								},
							},
							markLine: {
								symbol: ['none', 'none'],
								data: [
									[{
											name: 'from lowest to highest',
											type: 'min',
											valueDim: 'lowest',
											symbol: 'false', //线上圆点
											symbolSize: 10,
											label: {
												show: false
											},
											emphasis: {
												label: {
													show: false
												}
											},

										},
										{
											type: 'max',
											valueDim: 'highest',
											symbol: 'true',
											symbolSize: 10,
											label: {
												show: false
											},
											emphasis: {
												label: {
													show: false
												}
											}
										}
									],
									{
										name: 'min line on close',
										type: 'min',
										valueDim: 'close'
									},
									{
										name: 'max line on close',
										type: 'max',
										valueDim: 'close'
									}
								]
							}
						},

						// {
						// 	name: 'WR1',
						// 	type: 'line',
						// 	showSymbol: false,
						// 	data: this.calculateMA(5),
						// 	smooth: true,
						// 	lineStyle: {
						// 		opacity: 0.5
						// 	}
						// },
						// {
						// 	name: 'WR2',
						// 	type: 'line',
						// 	showSymbol: false, //线上圆点
						// 	data: this.calculateMA(15),
						// 	smooth: true,
						// 	lineStyle: {
						// 		opacity: 0.5
						// 	}
						// },
						{
							name: 'WR32',
							type: 'line',
							showSymbol: false, //线上圆点
							data: this.dataWR1,
							smooth: true,
							lineStyle: { 
								color:"#faa90e"
							}
						},
						
						// {
						// 	name: 'WR64',
						// 	type: 'line',
						// 	showSymbol: false, //线上圆点
						// 	data: this.dataWR2,
						// 	smooth: true,
						// 	lineStyle: { 
						// 		color:"#416df9"
						// 	}
						// }
						 


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

	}

	.container100 {
		width: 100%;
		height: 100%;
	}
</style>
