<template>
	<view class="content"></view>
</template>

<script>  
export default {
	onReady() {
		// #ifdef APP-PLUS 
		this.checkGuide(); 
		// #endif
		 
	},
	methods: {
		 
		checkGuide() {
 
			const launchFlag = uni.getStorageSync('launchFlag');
			if (launchFlag) {
				const launchBanner = uni.getStorageSync('launchBanner');
				var timestamp = Date.parse(new Date()) / 1000;
				if (launchBanner && launchBanner + 600 > timestamp) {
					uni.switchTab({
						url: '/pages/tab/index/index'
					});
				} else {
					var runtime = plus.runtime;
					console.log("启动页参数",runtime)
					// ajax 请求服务器 判断是否有广告
					// this.$Request
					// 	.post('config/launchBanner', {
					// 		appid: runtime.appid,
					// 		channel: runtime.channel,
					// 		launcher: runtime.launcher,
					// 		version: runtime.version,
					// 		uniVersion: runtime.uniVersion
					// 	})
					// 	.then(res => {
					// 		if (res.code == 200) {
								uni.setStorage({
									key: 'launchBannerData',
									data: {},
									success() {
										uni.switchTab({
											url: '/pages/tab/index/index'
										});
									},
									fail() {
										uni.switchTab({
											url: '/pages/tab/index/index'
										});
									}
								})
							// } else {
							// 	uni.switchTab({
							// 		url: '/pages/tab/index/index'
							// 	});
							// }
						// })
						// .catch(err => {
						// 	uni.switchTab({
						// 		url: '/pages/tab/index/index'
						// 	});
						// });
				}
			} else {
				console.log('去启动介绍页');
				uni.navigateTo({
					url: '/pages/guide/list'
				});
			}
		}
	}
};
</script>

<style></style>
