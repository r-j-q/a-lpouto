<template>
	<view class="container">
		<view class="container_week fontSize13 textColorffb860">
			<span class="mrr">{{subTitle}}:</span><span> {{subTextContent}}</span>
		</view>
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
		noauthStockWeek
	} from '@/api/index.js'
	export default {
		name: "categoryLine",
		props: ['stock_no', 'qUrl','time_type'],

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
				console.log("---newVnewV----->", newV)
				this.getStockBaseList(newV)
			}
		},
		mounted() {

			this.getStockBaseList(noauthStockWeek)
		},
		methods: {
			echartsClick(params) {
				console.log("==日k数据=====>", params)
				if (params.seriesName == 'WR32' || params.seriesName == 'WR64') {
					this.subTitle = params.seriesName
					this.subTextContent = params.value.toFixed(2)
				}
				// }else{
				// this.subTextContent = params.value.toFixed(2)	
				// }
				// this.subTextContent = `WR32:${this.text1} WR64=${this.text2}`
				 
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
			// 涨跌幅计算

			function_close_pct(baseData) {
				// 涨跌额:本周收盘价-上周收盘价 riseAndFall
				// 涨跌幅:涨跌额/上周收盘价

				if (baseData.length > 1) {
					baseData.forEach((item, i) => { 
						item.riseAndFall = (baseData[i + 1]?.close - baseData[i]?.close).toFixed(2);
						item.Chg = ((baseData[i + 1]?.close - baseData[i]?.close) / baseData[i]?.close).toFixed(2) + "%";
					})
				} else if (baseData.length == 1)  {
					baseData[0].riseAndFall = (baseData[0].close - baseData[0].open).toFixed(2);
					baseData[0].riseAndChg = (baseData[0].open).toFixed(2) + "%";
				}  
				return baseData;
				console.log("涨跌额", baseData)   

			},
			// data['close_pct'] = (data['close'] - data['close'].shift(1)) / data['close'].shift(1)
			getStockBaseList(v) {

				var res = this.$request.get({
						url: `${v}?stock_no=${this.stock_no}&time_type=${this.time_type}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							let baseData = res.list;
							this.historical = baseData;
							// let baseData = datas.historical

							let baseDatas = this.function_close_pct(baseData);
							console.log("baseDatas>", baseDatas)
							baseDatas.forEach((item) => {
							// 	var years = "",
							// 		months = "",
							// 		days = "";
							// 	years = item.date.toString().slice(0, 4);
							// 	months = item.date.toString().slice(5, 7);
							// 	days = item.date.toString().slice(8, 10);
							// let dates=`${years}/${months}/${days}`;
							// console.log("this.days=========>", days)
								this.newBaseData.push(
									// [item.Date, item.Open, item.Close, item.Low, item.High]
									// , item.riseAndFall, item.riseAndChg
									[item.date.replace(/-/g,'/').slice(0,10), item.open.toFixed(2), item.close.toFixed(
										2), item.low.toFixed(2), item.high.toFixed(2),item.riseAndFall ,item.riseAndChg]
								)
							}) 
							  
							 
							// [date,open,close,low,high] 
							this.data0 = this.splitDataNew(this.newBaseData)
							 console.log("this.data0=========>", this.data0)
							this.dataWR1 = this.calculateMAWR1(32);
							this.dataWR2 = this.calculateMAWR1(64);
							// console.log("this.data0-------->", this.data0)
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
				console.log("=rawData=11=====>", rawData)
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
						if (maxhigh < this.historical[i - j].high) {
							maxhigh = this.historical[i - j].high
						}
						if (minLow > this.historical[i - j].low || minLow == 0) {
							minLow = this.historical[i - j].low
						}

					}

					// console.log("maxhigh=", maxhigh, "minLow=", minLow, "close=", this.historical[i].close)

					var dot = 100 * (maxhigh - this.historical[i].close) / (maxhigh - minLow);
					if (dayCount == 32) {

						if (i > 63) {
							this.resultPorint32.push([this.historical[i].date, dot, this.historical[i].close])
						}
					} else {
						this.dateAllPorint.push(this.historical[i].date);
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
				console.log(' this.data0.categoryData', this.data0.categoryData)
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
					// tooltip: {
					// 	trigger: 'axis',
					// 		 axisPointer: {
					// 			type: 'cross'
					// 		},
					// 		borderWidth: 1,
					// 		borderColor: '#ccc',
					// 		padding: 10,
					// 		textStyle: {
					// 			color: '#000'
					// 		},
					// 		position:[20,20],
					// 		// extraCssText: 'width: 170px',
					// 	formatter:  (param) =>{
					// 	// 	param = param[0];
					//  console.log("==param=======>",param  )
					// 		  for(x in param){
					// 		                return param[x].data[0] ;
					// 		            }
					// 		// return  
					// 		// 	'Date:' + param.data[0]+'/n',
					// 		// 	 'Open: ' + param.data[1] + '/n',
					// 		// 	'Close: ' + param.data[2] + '/n',
					// 		// 	'Lowest: ' + param.data[3] + '/n',
					// 		// 	'Highest: ' + param.data[4] + '/n',
					// 		// 	'涨跌额: ' + param.data[5] + '/n',
					// 		// 	'涨跌幅: ' + param.data[6]  
						 
					// 	}
					// },
					
					
					// [`${year}/${month}/${day}`, item.open.toFixed(2), item.close.toFixed(
					// 	2), item.low.toFixed(2), item.high.toFixed(2), item.riseAndFall, item.riseAndChg]
					tooltip: { 
						trigger: 'axis',
						// axisPointer: {
						//   type: 'cross'
						// },
						borderWidth: 1,
						borderColor: 'red',
						backgroundColor: '#fff',
						padding: 10,
						textStyle: {
							color: '#000'
						},
						textStyle: { //文字样式
							color: '#6A6A6A',
							decoration: 'none',
							fontFamily: 'Verdana,sans-serif',
						
						},
						// [item.Date, item.Open, item.Close, item.Low, item.High]
						formatter(params) {
							console.log("==params=====>",params)
							let val = '';
							 
							for (var x in params) {
								val += "Date:" + params[x].value[0] + "\n"
								 val +=
									"Open:" + params[x].value[1] + "\n"
								val +=
									"Close:" + params[x].value[2] + "\n"
								val +=
										"Low:" + params[x].value[4] + "\n"
								val +=
									"High:" + params[x].value[3] + "\n"
							 
								// val +=
								// 	"Volume:" + params[x].value[5] + "\n"
						
								return val
							}
						
						},
						// position: function(pos, params, el, elRect, size) {
						// 	const obj = {
						// 		top: 10
						// 	};
						// 	obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
						// 	return obj;
						// }
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
							right: '1%',
							height: '50%'
						},
						{
							left: '10%',
							right: '1%',
							top: '73%',
							height: '16%'
						}
					],
					xAxis: [{
							type: 'category',
							data: this.data0.categoryData,
							boundaryGap: false,
							axisLine: {
								onZero: false
							},
							splitLine: {
								show: false
							},
							axisLabel:{
								textStyle: {
									color: '#999'
								},
							},
							// axisLine: {
							//        onZero: false,
							//        lineStyle: {
							//          color:  "#f5f5f5",//X轴坐标线颜色
							//        }
							//      },
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
							axisLabel:{
								textStyle: {
									color: '#999'
								},
							},
							// axisLine: {
							//        onZero: false,
							//        lineStyle: {
							//          color:  "#f5f5f5",//X轴坐标线颜色
							//        }
							//      },
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
							start: 50,
							end: 100
						},
						{
							show: true,
							xAxisIndex: [0, 1],
							type: 'slider',
							top: '90%',
							start: 50,
							end: 100
						}
					],
					series: [{
							type: 'candlestick',
							data: this.newBaseData,
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
