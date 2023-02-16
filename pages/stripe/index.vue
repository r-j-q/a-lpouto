<template>
 	<view>
 		<web-view class="webview" src="/hybrid/html/local.html" ref="webview" @message="handleMessage"></web-view>
 	</view>
 </template>
 
 <script>
	 import {
	 	mapGetters
	 } from "vuex";
 	export default {
 		data() {
 			return {
 				wv: null, // 定义(app)webview对象节点
 				webV:{}, // 定义(H5)webview对象节点
 				sendData: [{name:"张三"}],  // 发送数据对象
				handleMessage:"1234567890"
 			}
 		},
		computed: {
			...mapGetters(["userInfo"]),
		},
 		onLoad() {
 			// this.getRequest()
 			uni.showLoading({ 
				title:"loading",
				duration:3000
 			})
 			// App端
 			// #ifdef APP-PLUS
 	
 			// 页面栈最顶层就是当前webview
 			let currentWebview = this.$scope.$getAppWebview();
 			setTimeout(() => {
 				this.wv = currentWebview.children()[0]
 			}, 1000)
 			
 			setTimeout(() => {
				
 				this.sendRequestData(this.userInfo)
 			}, 1100)
 			
 			// #endif
 			
 			// H5端
 			// #ifdef H5
 			
 			window.addEventListener('message',e => {
 				this.webV = e.source  // window的对象
 				// console.log(e.data.data.arg,'接收h5页面发来的消息'); // 接收h5页面发来的消息(11)  ====>H5端
 			},false)
 			
 			setTimeout(() => {
 				this.sendRequestData(this.sendData,1)
 			}, 1000)
 
 			// #endif
 		},
 		mounted() {},
 		methods: {
 			// 发送消息到 HTML
 			sendRequestData(res,plt=0) {
 				let param = JSON.stringify(res)
 				// console.log(param);
 				if(plt == 1){
 					this.webV.postMessage({type:'new',data:param})
 				}else{
 					this.wv.evalJS(`requestData(${param})`);
 				}
 			},
 			
 			// 请求接口
 			getRequest(){
 				uni.request({
 					url: 'http://api.bixiaoe.com/api/homepage/index',
 					data: {},
 					success: (res) => {
 						this.sendData = res.data.data
 					}
 				});
 			},
 		}
 	}
 </script>
