<template>
	<view class="">
		<web-view :src="openPath" :progress="true"></web-view>
	</view>
</template>

<script>
	export default {
		name: 'webView',
		data() {
			return {
				openPath: ""
			}

		},
		onLoad: function(options) {
			this.openPath = options.url
		},

	}
</script>

<style>
</style>
