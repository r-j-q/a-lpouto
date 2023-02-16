<template>
	<view class="minHeight100 content_app">
		<titleReview @onHandleLike="onHandleLike" :isLike="isLike" :titleList="titleList" />
		<v-tabs v-model="current" :tabs="tabs" padding="0px" fontSize="13px" lineColor="#1296db" color="#fff"
			pillsColor="#fff" activeColor="#1296db" @change="changeTab"></v-tabs>
		<view style="height: 5px;"></view>
		<echartsT v-if="minHour==0" :option="option" style="height: 300px;" @click="echartsClick"></echartsT>
		<CategoryLine v-if="minHour==1" :stock_no="stock_no" :qUrl="qUrl" />
		<WeekIndex v-if="minHour==2" :stock_no="stock_no" :qUrl="qUrl" />
		<detail :titleList="titleList" />
		<view class="paddingAll textColor" v-if="content" style="text-justify:newspaper;">
			{{content}}
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.min.js'
	import echartsT from '@/components/echarts/echarts.vue'
	import titleReview from '@/components/titleReview/index.vue'
	import detail from '@/components/titleReview/detail.vue'
	import CategoryLine from '@/components/pluto/categoryLine/index.vue'
	import WeekIndex from '@/components/pluto/categoryLine/WeekIndex.vue'

	import {
		stockBase,
		noauthStockWeek,
		getCompanyprice,
		getCompanyinfo,
		stockHistory,
		userstockAdd,
		userstockDelete,
		userstockGetone

	} from '@/api/index.js'
	export default {
		props: ["item"],
		components: {
			echartsT,
			titleReview,
			detail,
			CategoryLine,
			WeekIndex
		},
		data() {
			return {

				isLike: false, //是否添加自选股
				minHour: 0,
				content: "",
				titleList: {
					symbol: "",
					price: 0,
					change: 0,
					changesPercentage: 0,
					dayHigh: 0,
					dayLow: 0,
					pe: 0,
					open: 0,
					volume: 0,
					previousClose:0
				},
				option: {},
				stock_no: "1min",
				current: 0,
				time_type: "1min",
				tabs: [
					'1min',
					'5min',
					'15min',
					'30min',
					'1hour',
					'4hour',
					'Day',
					'Week'
				],
				tabText: "Day",
				qUrl: ""
			};
		},

		onLoad(option) {
			self = this;
			let dataList = JSON.parse(decodeURIComponent(option.params));
			console.log("dataList9999999999999999999", dataList)
			// uni.setNavigationBarTitle({
			// 	title: dataList.item.title || "Details"
			// });
			self.stock_no = dataList?.flag?.stock_no || dataList.item.symbol;
			self.getuserstockGetone()
			self.getStockBaseList()
			self.getCompanyprices()
			self.getCompanyinfos()

		},
		methods: {
			// 千位符
			  numFormat (num) {
			    num = num.toString().split('.')
			    let arr = num[0].split('').reverse()
			    var res = []
			    for (let i = 0 , len =arr.length; i< len ; i++) {
			        if (i%3 ===0 && i!==0) {
			            res.push(',')
			        }
			        res.push(arr[i])
			    }
			    res.reverse()
			    if(num[1]){
			        res = res.join('').concat('.'+num[1])
			    }else{
			        res = res.join('')
			    }
			    console.log(res)
			    return res
			},
			getuserstockGetone(){
				self.$request.get({
						url: `${userstockGetone}?stock_no=${self.stock_no}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							self.isLike =res
							// console.log('是不是自选股', res);
						},
						res => {
							// console.log('failure是不是自选股',res);
						}
					);
			},
			onHandleLike(v) {

				self.isLike = !self.isLike;

				if (self.isLike) {
					self.addStock()
				}
				if (!self.isLike) {
					self.deleteStock()
				}
			},
			addStock() {
				let res = self.$request.post({
						url: `${userstockAdd}?stock_no=${self.stock_no}`,

						loadingTip: 'stock...'
					})
					.then(
						res => {

							this.$refs.uToast.show({
								title: "Successfully Added",
								position: 'bottom'

							})

						},
						res => {
							console.log('failure', res);
						}
					);
			},

			deleteStock() {
				self.$request.get({
						url: `${userstockDelete}?stock_no=${self.stock_no}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							 this.$refs.uToast.show({
								title: "Successfully Canceled",
								position: 'bottom'
							
							}) 
						},
						res => {
							console.log('failure');
						}
					);
			},

			changeTab(index) {
				if (self.tabs[index] == "Day" || self.tabs[index] == "Week") {

					if (self.tabs[index] == "Day") {
						self.minHour = 1
					} else if (self.tabs[index] == "Week") {
						self.minHour = 2
						self.qUrl = noauthStockWeek
					}

				} else {
					self.minHour = 0
					self.time_type = self.tabs[index]
					self.getStockBaseList()
				}

			},
			load() {
				this.$refs.uReadMore.init();
			},
			getCompanyprices() {
				var res = self.$request.get({
						url: `${getCompanyprice}?stock_no=${self.stock_no}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							console.log('++========>',  res[0].volume)
						// res[0].volume=self.numFormat(res[0].volume)
						    
							self.titleList = res[0];
							self.titleList.volume =self.numFormat(self.titleList.volume)
						},
						res => {
							console.log('failure');
						}
					);
			},
			getCompanyinfos() {
				var res = self.$request.get({
						url: `${getCompanyinfo}?stock_no=${self.stock_no}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {

							// setTimeout(() => {
							// console.log(res[0].description)	 
							// 请注意上方已在组件中添加ref-uReadMore
							self.$nextTick(() => {
								self.titleList = {
									...self.titleList,
									...res[0]
								};
								self.content = res[0]?.description
							})
							// }, 500);
							// console.log("===getCompanyinfos===>", self.titleList)
						},
						res => {
							console.log('failure');
						}
					);
			},
			onUpTimeData(item) {
				self.activeList = item
				self.getStockBaseList()
			},
			timeProcessing(str) {
				// console.log("strstrstrstrstrstrstrstrstrstr",str) //1561345728000
				// let timeDate = str;
				// let Time = new Date(timeDate);
				// let timestemp = Time.getTime();
				// console.log("timestemptimestemptimestemptimestemptimestemp",str) //1561345728000
				return str.replace(/-/g, "/")
				// console.log(timestemp) //1561345728000
			},
			getStockBaseList() {

				var res = self.$request.get({
						url: `${stockBase}?stock_no=${self.stock_no}&time_type=${self.time_type}`,
						loadingTip: 'stock...'
					})
					.then(
						res => {
							let baseData = res.list;
							baseData.forEach((item) => {
								item.time = self.timeProcessing(item.date);
								item.traNumber = "43300"
								item.avgPrice = item.open
								item.curPrice = item.high
								item.yesterdayClose = item.close
								delete item.close
								delete item.date
								delete item.high
								delete item.low
								delete item.volume


							})

							self.option = self.onChangeEchartsOptions(self.onChangeLineSplitData(
								baseData
							))



						},
						res => {
							console.log('failure');
						}
					);
			},
			toNumber(str) {
				var v = '';
				if (!str || str == '0.00' || str == '0.00%') {
					v = '-';
				} else {
					v = Number(str);
				}
				return v;
			},
			handleOnfromatDate(time, type) {
				var t = new Date(time),
					_format = type || "yyyy/MM/dd";

				function zeroRepair(num) {
					return (num < 10 ? '0' : '') + num;
				}
				return _format.replace(/yyyy|MM|dd|hh|mm|ss/g, function(a) {
					switch (a) {
						case 'yyyy':
							return zeroRepair(t.getFullYear());
							break;
						case 'MM':
							return zeroRepair(t.getMonth() + 1);
							break;
						case 'mm':
							return zeroRepair(t.getMinutes());
							break;
						case 'dd':
							return zeroRepair(t.getDate());
							break;
						case 'hh':
							return zeroRepair(t.getHours());
							break;
						case 'ss':
							return zeroRepair(t.getSeconds());
							break;
					}
				})
			},

			onChangeLineSplitData(data) {
				var avgData = [],
					curData = [],
					traData = [],
					updData = [],
					timeData = [],
					rangZoom = {},
					defaultRang = 242, //一天的采集数据，每分钟一个点
					len = data.length;
				// console.log("_format_format_format_format",data)
				for (var i = 0; i < len; i++) {

					//时间
					timeData.push((self.handleOnfromatDate(data[i].time, 'MM/dd hh:mm')));
					//1561345728000
					//当前价
					curData.push(self.toNumber(data[i].curPrice));
					//均价
					avgData.push(self.toNumber(data[i].avgPrice));
					//成交量
					traData.push(self.toNumber(data[i].traNumber));
					//涨跌幅
					var closeNum = self.toNumber(data[i].yesterdayClose),
						selfNum = self.toNumber(data[i].curPrice),
						updNum = (selfNum - closeNum) / closeNum;
					updData.push(+updNum?.toFixed(4));
				}
				//
				var prec = self.toNumber(data[0].yesterdayClose);
				//区域缩放默认值：60天的采集点
				if (len > defaultRang) {
					rangZoom.end = len;
					rangZoom.start = len - defaultRang;
				} else {
					rangZoom.end = len;
					rangZoom.start = 0;
				}
				return {
					timeData: timeData.reverse(),
					curData: curData,
					avgData: avgData,
					traData: traData,
					updData: updData,
					rangZoom: rangZoom,
					prec: prec,
					defaultRang: defaultRang
				}
			},
			onChangeEchartsOptions(data) {
				return {
					// backgroundColor: '#191224',
					animation: false,
					legend: {
						show: false
					},
					dataZoom: [{
							show: true,
							realtime: true,
							start: 30,
							end: 70,
							xAxisIndex: [0, 1]
						},
						{
							type: 'inside',
							realtime: true,
							start: 30,
							end: 70,
							xAxisIndex: [0, 1]
						}
					],
					tooltip: {
						position: [0, 20],
						padding: [10, 10],
						extraCssText: 'width:120px; white-space:pre-wrap;',
						trigger: 'axis',
						formatter: (params) => {
							var param = params[0] || params,
								idx = param.dataIndex;
							var html = '';
							html += 'date:' + param.name + '\n';
							if (data.curData[idx] && data.curData[idx] != '-') {
								html += 'open:' + data.curData[idx] + '(' + (data
									.updData[
										idx] * 100)?.toFixed(2) + '%)' + '\n';
							}
							if (data.traData[idx] && data.traData[idx] != '-') {
								html += 'volume:' + data.traData[idx] + '\n';
							}
							if (data.avgData[idx] && data.avgData[idx] != '-') {
								html += 'average price:' + data.avgData[idx] + '';
							}
							html += '';
							return html
						}
					},
					// tooltip: {
					// trigger: 'axis',
					// showContent: true,
					// transitionDuration: 0,
					// axisPointer: {
					// 	show: true,
					// 	type: 'line',
					// 	axis: 'x',
					// 	crossStyle: {
					// 		color: '#333',
					// 		type: 'solid',
					// 		shadowBlur: 0,
					// 		width: 1
					// 	}
					// },
					// position: [0, 0],
					// padding: 0,
					// backgroundColor: 'rgba(255, 255, 255, 1)',
					// extraCssText: 'padding-left:5px;width:180px;line-height:20px;margin-left:40px;opacity:1;filter:alpha(opacity=100)',
					// textStyle: {
					// 	color: '#2e333f',
					// 	fontSize: 12
					// },
					// 	formatter:  (params)=> {
					// 		var param = params[0] || params,
					// 			idx = param.dataIndex;
					// 		var html = '<div style="width: 100%">';
					// 		html += '<span style="margin:0 10px">时间:' + param.name + '</span>';
					// 		if (data.curData[idx] && data.curData[idx] != '-') {
					// 			html += '<span style="margin:0 10px">当前价:' + data.curData[idx] + '(' + (data
					// 				.updData[
					// 					idx] * 100)?.toFixed(2) + '%)</span>';
					// 		}
					// 		if (data.traData[idx] && data.traData[idx] != '-') {
					// 			html += '<span style="margin:0 10px">成交量:' + data.traData[idx] + '</span>';
					// 		}
					// 		if (data.avgData[idx] && data.avgData[idx] != '-') {
					// 			html += '<span style="margin:0 10px">均价:' + data.avgData[idx] + '</span>';
					// 		}
					// 		html += '</div>';
					// 		return html
					// 	}
					// },
					toolbox: {
						show: false
					},
					brush: {
						show: false
					},
					grid: {
						left: '0',
						top: '5px',
						right: '0',
						bottom: '26%'
					},
					xAxis: {
						type: 'category',
						data: data.timeData,
						scale: true,
						axisLine: {
							onZero: false,
							lineStyle: {
								color: '#ffffff61'
							}
						},
						splitLine: {
							show: false
						},
						z: 3,
						splitNumber: 3,
						axisLabel: {
							textStyle: {
								color: '#333'
							},

							formatter: function(value) {

								return value;

							}
						},
						axisTick: {
							show: false
						}
					},
					yAxis: [{
							scale: true,
							boundaryGap: [0.1, 0.1],
							splitNumber: 5,
							/*min:curMin,
							max:curMax,
							interval:(curMax-curMin)/5,*/
							z: 3,
							axisLabel: {
								inside: true,
								textStyle: {
									color: '#333'
								},
								formatter: function(value) {
									return value?.toFixed(2)
								}
							},
							axisTick: {
								show: false,
								inside: true
							},
							axisLine: {
								show: false
							},
							splitLine: {
								show: false,
								lineStyle: {
									color: '#E3E3E3'
								}
							},
							splitArea: {
								show: false
							}
						},
						{
							scale: true,
							boundaryGap: [0.1, 0.1],
							splitNumber: 5,
							z: 3,
							axisTick: {
								show: false,
								inside: true
							},
							axisLine: {
								show: true
							},
							splitLine: {
								show: false,
								lineStyle: {
									color: 'red'
								}
							},
							splitArea: {
								show: false
							}
						}
					],
					dataZoom: {
						show: true,
						type: 'slider',
						startValue: data.rangZoom.start,
						endValue: data.rangZoom.end,
						zoomLock: false,
						backgroundColor: "#D5E6F5",
						borderColor: "none",
						fillerColor: 'rgba(167,183,204,0.3)',

						moveOnMouseMove: true,
						zoomOnMouseWheel: true,
					},
					series: [{
							name: 'Current price ',
							type: 'line',
							data: data.curData,
							smooth: true,
							yAxisIndex: 0,
							symbol: 'circle',
							showSymbol: false,
							z: 3,
							lineStyle: {
								normal: {
									color: '#66A3AA',
									width: 1
								}
							},
							// areaStyle: {
							// 	normal: {
							// 		color: '#D5E6F5'
							// 	}
							// },
							areaStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: 'rgb(255, 158, 68)'
									},
									{
										offset: 1,
										color: 'rgb(255, 70, 131)'
									}
								])
							},
						},
						{
							name: 'Fluctuation range',
							type: 'line',
							data: data.updData,
							smooth: true,
							symbol: 'none',
							yAxisIndex: 1,
							showSymbol: false,
							lineStyle: {
								normal: {
									color: '#f40',
									width: 0
								}
							}
						}
					]
				}
			},

			echartsClick(params) {
				console.log('data', params)
			},

		}
	};
</script>
<style scoped>
	/deep/ .uni-scroll-view-content .v-tabs__container {
		background: none !important;
		background-color: none !important;
	}
</style>
