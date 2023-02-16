### 组件开篇
<h4>
	3D旋转木马Btn
	支持： 目前仅支持uni-App
	支持btn数量： 目前仅支持6个； 可以自己扩展，需要修改setStyle方法，自己计算元素位置及偏移度数
</h4>
### 使用方法
```html
<template>
	<view class="wrap">
		<btnIndex :dataList="list" class="rotaBtn" :leftAndright1Deg="15" :leftAndright2Deg="25"
		 @change="changeHandle" @gotoHandle="gotoHandle"/>
	</view>
</template>

```
```javascript
 <script>
 	import btnIndex from '@/components/peng-3DRotateBtn'
 	export default {
 		components:{btnIndex},
 		data() {
 			return {
 				list: []
 			}
 		},
 		methods: {
 			// 旋转事件
			changeHandle(index){
				console.log(index, 'index')
				this.current = 0
				this.getAdList(index)
				this.swiperIndex = index
			},
			// 点击事件
			gotoHandle(index){
				console.log(index, 'index')
			},
 		}
 	}
 </script>
```
```css
<style scoped>

</style>
```

