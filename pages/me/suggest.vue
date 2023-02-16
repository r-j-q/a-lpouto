<template>
	<view>
		<suggest @submit="submit"></suggest>
		<u-toast ref="uToast"></u-toast>
	</view>

</template>

<script>
	import {
		usersFeedbackAdd
	} from "@/api/index.js"

	import suggest from "@/components/bert-suggest/suggest.vue"
	export default {
		components: {
			suggest
		},
		methods: {
			submit(v) {
				let _this = this;
				if (v.content == "") {
					uni.showToast({
						title: "Content cannot be empty"
					})
					return
				}
				 
				_this.$request
					.post({
						url: usersFeedbackAdd, 
						 header:{
						       'Content-Type': 'application/x-www-form-urlencoded'
						 	},
						  data:{
							  content:v.content
						  }
					 })
					.then(
                     res => {
						_this.$refs.uToast.show({
							title: 'Submitted successfully',
							callback() {
								uni.switchTab({
									url: "/pages/tab/mine/index"
								})
							}
						})
                      },

					)

				 
			}
		}
	}
</script>

<style>
</style>
