<template>
	<view class="container">
		<!-- <view class="container_week fontSize13 textColorffb860">
	     <span class="mrr">{{subTitle}}</span><span> {{subTextContent}}</span>  
		</view> -->
		<echarts :option="option" style="height: 355px;width: 750upx;" @click="echartsClick"></echarts>
	</view>
</template>

<script>
	// import {
	// 	datas
	// } from "./data/index.js"
	const upColor = '#00da3c';
	const downColor = '#ec0000';
	const upBorderColor = '#8A0000';
	const downBorderColor = '#008F28';
	import echarts from '@/components/echarts/echarts.vue'
	import {
		login,
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
				s_b: [],
				newBaseData: [],
				subTitle:"",
				subTextContent: ""

			}
		},
		 
	 
		mounted() {

			this.getStockBaseList(stockHistory) 
		},
		methods: {
			echartsClick(params) {
				if(params.seriesName=='WR32' || params.seriesName=='WR64'){
					this.subTitle = params.seriesName
				    this.subTextContent = params.value.toFixed(2)
					}
				// }else{
				// this.subTextContent = params.value.toFixed(2)	
				// }
				// this.subTextContent = `WR32:${this.text1} WR64=${this.text2}`
				console.log("==日k数据=====>", params)
			},

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

			getStockBaseList(v) {

				var res = this.$request.get({
						url: `${v}?stock_no=${this.stock_no}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							let baseData = res.list.Historical;
							this.historical = baseData;
							// let baseData = datas.historical

                           console.log('baseData--------》',baseData);
							baseData.forEach((item) => {
								this.newBaseData.push(
									// [item.Date, item.Open, item.Close, item.Low, item.High]
									[item.Date.replace(/\-/g, '/'), item.Open.toFixed(2), item.Close.toFixed(
										2), item.Low.toFixed(2), item.High.toFixed(2)]
								)
							})
							 
							// [date,open,close,low,high] 
							this.data0 = this.splitDataNew(this.newBaseData)
							this.dataWR1 = this.calculateMAWR1(32);
							this.dataWR2 = this.calculateMAWR1(64);
							 console.log('this.data0=========>',this.data0);
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
							// console.log("---resultPorint32------>", this.resultPorint32)
							// console.log("---resultPorint64------>", this.resultPorint64)
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
				console.log("this.data0.categoryData",this.data0.categoryData)
				this.option = {
					animation: false,
					// legend: {
					// 	bottom: 10,
					// 	left: 'center',
					// 	// data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
					// },
					// title: {
					// 	x: 'center',
					// 	y: 'center',
					// 	top: "63%",
					// 	left: '10%',
					// 	subtext: this.subTextContent,
					// 	subtextStyle: {
					// 		color: '#e4393c',
					// 		fontWeight: 'bold'
					// 	}
					// },
					tooltip: {
						// trigger: 'axis',//隐藏了32 和 64的提示
						axisPointer: {
							type: 'cross'
						},
						borderWidth: 1,
						borderColor: '#ccc',
						padding: 10,
						textStyle: {
							color: '#999'
						},
						position: function(pos, params, el, elRect, size) {
							const obj = {
								top: 10
							};
							obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
							return obj;
						}
						// extraCssText: 'width: 170px'
					},
					axisPointer: {
						link: [{
							xAxisIndex: 'all'
						}],
						label: {
							backgroundColor: '#777'
						}
					},
					// toolbox: {
					// 	feature: {
					// 		dataZoom: {
					// 			yAxisIndex: false
					// 		},
					// 		brush: {
					// 			type: ['lineX', 'clear']
					// 		}
					// 	}
					// },
					brush: {
						xAxisIndex: 'all',
						brushLink: 'all',
						outOfBrush: {
							colorAlpha: 0.1
						}
					},
					visualMap: {
						show: false,
						seriesIndex: 5,
						dimension: 2,
						pieces: [{
								value: 1,
								color: downColor
							},
							{
								value: -1,
								color: upColor
							}
						]
					},
					grid: [{
							top: '8%',
							left: '10%',
							right: '8%',
							height: '50%'
						},
						{
							left: '10%',
							right: '8%',
							top: '73%',
							height: '16%'
						}
					],
					xAxis: [{
							type: 'category',
							data: this.data0.categoryData,
							boundaryGap: true,
							axisLine: {
								onZero: false
							},
							splitLine: {
								show: false
							},
							 // axisLine: {
							 //        onZero: false,
							 //        lineStyle: {
							 //          color:  "#f5f5f5",//X轴坐标线颜色
							 //        }
							 //      },
							 axisLabel: {
							 	textStyle: {
							 		color: '#999'
							 	},
							 	// X轴颜色 时间
							 
							 // 	formatter: function(value) {
							 
							 // 		return value;
							 
							 // 	}
							 },
							min: 'dataMin',
							max: 'dataMax',
							axisPointer: {
								z: 100
							}
						},
						{
							type: 'category',
							gridIndex: 1,
							data: this.data0.categoryData.reverse(),
							boundaryGap: false,
							axisLine: {
								onZero: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
							min: 'dataMin',
							max: 'dataMax'
						}
					],
					yAxis: [{
							scale: true,
							splitArea: {
								show: true
							},
							// axisLine: {
							//        onZero: false,
							//        lineStyle: {
							//          color:  "#f5f5f5",//X轴坐标线颜色
							//        }
							//      },
							axisLabel: {
								textStyle: {
									color: '#999'
								},
								// X轴颜色 时间
							
							// 	formatter: function(value) {
							
							// 		return value;
							
							// 	}
							},
						},
						{
							scale: true,
							gridIndex: 1,
							splitNumber: 2,
							axisLabel: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							}
						}
					],
					dataZoom: [{
							type: 'inside',
							xAxisIndex: [0, 1],
							start: 98,
							end: 100
						},
						{
							show: true,
							xAxisIndex: [0, 1],
							type: 'slider',
							top: '90%',
							start: 98,
							end: 100
						}
					],
					series: [{
							type: 'candlestick',
							data: this.newBaseData.reverse(),
							itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: undefined,
								borderColor0: undefined
							},
							markPoint: {
								label: {
									formatter: function(param) {
										return param != null ? Math.round(param.value) + '' : '';
									}
								},
								data: this.s_b,
							},
							// tooltip: {
							// 	formatter: function(param) {
							// 		param = param[0];
							// 		return [
							// 			'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
							// 			'Open: ' + param.data[0] + '<br/>',
							// 			'Close: ' + param.data[1] + '<br/>',
							// 			'Lowest: ' + param.data[2] + '<br/>',
							// 			'Highest: ' + param.data[3] + '<br/>'
							// 		].join('');
							// 	}
							// }
						},

						{
							name: 'WR32',
							type: 'line',
							showSymbol: false,
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: this.dataWR1
						},

						{
							name: 'WR32',
							type: 'line',
							showSymbol: false,
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: this.dataWR2
						}
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
