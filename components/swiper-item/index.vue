<template>
<view class="wrap">
        <btnIndex :dataList="list" class="rotaBtn" :leftAndright1Deg="15" :leftAndright2Deg="25"
         @change="changeHandle" @gotoHandle="gotoHandle"/>
    </view>
	
	<!-- 
	<div class="wrapper">
			<text class="title">{{title}}</text>
			<scroller class="scroller">
				<div>
					<text class="content">{{content}}</text>
				</div>
				<div>
					<text style="color: red; font-size: 30upx;">以下为 Popup 内部滚动示例：</text>
				</div>
				<div class="cell" v-for="(item, index) in lists" @click="handle(item)" :key="index">
					<text class="text">{{item}}</text>
				</div>
			</scroller>
			<div class="message-wrapper">
				<text class="send-message" @click="sendMessage">向页面发送消息</text>
			</div>
		</div> -->
</template>

 <script>
    import btnIndex from '@/components/peng-3DRotateBtn/peng-3DRotateBtn.vue'
    export default {
        components:{btnIndex},
        data() {
            return {
                list: []
            }
        },
        methods: {
			
			
			// created() {
			// 			const vm = this;
			// 			for (let i = 1; i < 20; i++) {
			// 				this.lists.push('item' + i);
			// 			}
			// 			uni.$on('page-popup', (data) => {
			// 				vm.title = data.title;
			// 				vm.content = data.content;
			// 			})
			// 		},
			// 		beforeDestroy() {
			// 			uni.$off('drawer-page')
			// 		},
			// 		methods: {
			// 			sendMessage() {
			// 				const subNVue = uni.getCurrentSubNVue()
			// 				uni.$emit('popup-page', {
			// 					title: '已读完!',
			// 				})
			// 			},
			// 			handle(item, index) {
			// 				const subNVue = uni.getCurrentSubNVue()
			// 				uni.$emit('popup-page', {
			// 					type: 'interactive',
			// 					info: item + ' 该元素被点击了!',
			// 				})
			// 			}
			// 		}
            // 旋转事件
            changeHandle(index){
                console.log(index, 'index')
            },
            // 点击事件
            gotoHandle(index){
                console.log(index, 'index')
            },
        }
    }
 </script>
<style scoped lang="scss">
 
	
</style>

