<template>
    <view class="content" v-if="isShow" @click.stop="isShow=false">
        <canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"></canvas>
        <view class="save-btn" @click.stop="saveImage">保存图片</view>
    </view>
</template>

<script>
    export default{
        props:{
            headerImg:{
                type: String,
                default: 'https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF'
            },
            title:{
                type: String,
                default: '草莓千层蛋糕'
            },
            subTitle:{
                type: String,
                default: '鲜嫩多汁的草莓融合香甜奶油'
            },
            price:{
                type: Number,
                default: 36.89
            },
            content:{
                type: String,
                default: ""
            },
            abImg:{
                type: String,
                default: 'https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF'
            }
        },
        data(){
            return {
                canvasW: 0,
                canvasH: 0,
                ctx: null,
                isShow: false,
                qrcode: ''
            }
        },
        methods:{
            //显示
            showCanvas(headerImg, qrcode){
                this.isShow = true
                this.qrcode = qrcode
                this.headerImg = headerImg
                this.__init()
            },
            //初始化画布
            async __init(){
                uni.showLoading({
                    title: '加载中...',
                    mask: true
                })
                this.ctx = uni.createCanvasContext('my-canvas',this)
                this.canvasW = uni.upx2px(550);
                this.canvasH = uni.upx2px(900);
                //设置画布背景透明
                this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
                //设置画布大小
                this.ctx.fillRect(0,0,this.canvasW,this.canvasH)
                //绘制圆角背景
                this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH,uni.upx2px(18),'#FFFFFF')
                //获取标题图片
                 let headerImg = await this.getImageInfo(this.headerImg)
                let hW = uni.upx2px(500);
                let hH = uni.upx2px(500);
                //绘制标题图
                this.drawRoundImg(this.ctx,headerImg.path,((this.canvasW-hW) / 2),((this.canvasW-hW) / 2),hW,hH,uni.upx2px(16)) 

            /*     let headerImg = await this.getImageInfo(this.headerImg)
                let hW = uni.upx2px(500);
                let hH = uni.upx2px(500); */
                //绘制标题图
                /* this.drawRoundImg(this.ctx,headerImg.path,((this.canvasW-hW) / 2),((this.canvasW-hW) / 2),hW,hH,uni.upx2px(16)) */

                //绘制标题
                this.ctx.setFontSize(14); //设置标题字体大小
                this.ctx.setFillStyle('#333'); //设置标题文本颜色
                this.ctx.fillText(this.title,((this.canvasW-hW) / 2),(((this.canvasW-hW) / 2) + hH + uni.upx2px(60)))
                //绘制副标题
                // this.ctx.setFontSize(14);
                // this.ctx.setFillStyle('#858585');
                // let sWidth = this.ctx.measureText(this.subTitle).width
                // if(sWidth > hW){
                //     this.ctx.fillText(this.subTitle.slice(0,17) + '...',((this.canvasW-hW) / 2),(
                //     ((this.canvasW-hW) / 2) + hH + uni.upx2px(110)))
                // }else{
                //     this.ctx.fillText(this.subTitle,((this.canvasW-hW) / 2),(
                //     ((this.canvasW-hW) / 2) + hH + uni.upx2px(110)))
                // }
                //绘制价格
                if(this.content){        
                    //console.log(this.content)
                    this.ctx.setFontSize(14);
                    this.ctx.setFillStyle('#999');
                    /* this.ctx.fillText('￥',((this.canvasW-hW) / 2),(((this.canvasW-hW) / 2) + hH + uni.upx2px(120))) */
                    this.ctx.setFontSize(12);
                    this.ctx.fillText(this.content,(((this.canvasW-hW) / 2) + uni.upx2px(36)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(120)))
                }
                //绘制虚线
                this.drawDashLine(this.ctx,uni.upx2px(20),(((this.canvasW-hW) / 2) + hH + uni.upx2px(150)),(this.canvasW-uni.upx2px(20)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(150)),5)
                //左边实心圆
                this.drawEmptyRound(this.ctx,0,(((this.canvasW-hW) / 2) + hH + uni.upx2px(150)),uni.upx2px(20))
                //右边实心圆
                this.drawEmptyRound(this.ctx,this.canvasW,(((this.canvasW-hW) / 2) + hH + uni.upx2px(150)),uni.upx2px(20))
                //提示文案
                this.ctx.setFontSize(12);
                this.ctx.setFillStyle('#858585');
                this.ctx.fillText('测试文字',(((this.canvasW-hW) / 2) + uni.upx2px(20)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(200)))
                //底部广告
                // let BottomAdImg = await this.getImageInfo(this.abImg)
                // this.ctx.drawImage(BottomAdImg.path,(((this.canvasW-hW) / 2)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(310)),uni.upx2px(350),uni.upx2px(110))
                 let BottomAdImg = await this.getImageInfo('https://cdn.uviewui.com/uview/swiper/2.jpg')
                 this.ctx.drawImage(BottomAdImg.path, 50, 380, 50, 50)
                //小程序码
                let qrcodeImg = await this.getImageInfo('https://img.atobo.com/ProductImg/EWM/UWeb/1/9/4/0/0447/19400447/1.gif')
                this.ctx.drawImage(qrcodeImg.path,uni.upx2px(384),(((this.canvasW-hW) / 2) + hH + uni.upx2px(200)), uni.upx2px(156), uni.upx2px(156))
                //延迟渲染
                setTimeout(()=>{
                    this.ctx.draw(true,()=>{
                        uni.hideLoading()
                    })
                },500)
            },
            //绘制实心圆
            drawEmptyRound(ctx,x,y,radius){
                ctx.save()
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI,true);
                ctx.setFillStyle('rgba(0, 0, 0, .4)')
                ctx.fill();
                ctx.restore()
                ctx.closePath()
            },
            //绘制虚线
            drawDashLine(ctx,x1,y1,x2,y2,dashLength){
                ctx.setStrokeStyle("#cccccc")//设置线条的颜色
                ctx.setLineWidth(1)//设置线条宽度
                var dashLen = dashLength,
                xpos = x2 - x1, //得到横向的宽度;
                ypos = y2 - y1, //得到纵向的高度;
                numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); 
                //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
                for(var i=0; i<numDashes; i++){
                 if(i % 2 === 0){
                     ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
                     //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
                  }else{
                      ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
                  }
                }
                ctx.stroke();
            },
            //带圆角图片
            drawRoundImg(ctx, img, x, y, width, height, radius){
                ctx.beginPath()
                ctx.save()
                // 左上角
                ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
                // 右上角
                ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
                // 右下角
                ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
                // 左下角
                ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
                ctx.stroke()
                ctx.clip()
                ctx.drawImage(img, x, y, width, height);
                ctx.restore()
                ctx.closePath()
            },
            //圆角矩形
            drawRoundRect(ctx, x, y, width, height, radius, color){
                ctx.save();
                ctx.beginPath();
                ctx.setFillStyle(color); 
                ctx.setStrokeStyle(color)
                ctx.setLineJoin('round');  //交点设置成圆角
                ctx.setLineWidth(radius);
                ctx.strokeRect(x + radius/2, y + radius/2, width - radius , height - radius );
                ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
                ctx.stroke();
                ctx.closePath();
            },
            //获取图片
   async getImageInfo(imgSrc){
                // return new Promise((resolve, reject) => {
                    console.log("图片链接",imgSrc)
                    console.log("图片类型",typeof imgSrc)
                    uni.getImageInfo({
                        src: imgSrc,
                        success: (image) => {
							return image
                            // resolve(image);
                            console.log('获取图片成功1',image)
                        },
                        fail: (err) => {
                            // reject(err);
                            console.log('获取图片失败1',err)
                        }
                    });
                // });
            },
            //保存图片到相册
            saveImage(){
                //判断用户授权
                // uni.getSetting({
                //    success(res) {
                //       console.log('获取用户权限',res.authSetting)
                //       if(Object.keys(res.authSetting).length>0){
                //           //判断是否有相册权限
                //           if(res.authSetting['scope.writePhotosAlbum']==undefined){
                //               //打开设置权限
                //               uni.openSetting({
                //                 success(res) {
                //                   console.log('设置权限',res.authSetting)
                //                 }
                //               })
                //           }else{
                //               if(!res.authSetting['scope.writePhotosAlbum']){
                //                   //打开设置权限
                //                   uni.openSetting({
                //                     success(res) {
                //                       console.log('设置权限',res.authSetting)
                //                     }
                //                   })
                //               }
                //           }
                //       }else{
                //           return
                //       }
                //    }
                // })
                var that = this
                uni.showLoading({
                    title: '正在加载',
                    mask: false
                });
                uni.canvasToTempFilePath({
                    canvasId: 'my-canvas',
                    quality: 1,
                    complete: (res) => {
                        console.log('保存到相册',res);
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success(res) {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '已保存到相册',
                                    icon: 'success',
                                    duration: 2000
                                })
                                setTimeout(()=>{
                                    that.isShow = false
                                },2000)
                            }
                        })
                    }
                },this);
            }
        }
    }
</script>

<style scoped lang="scss">
.content{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999;
    background: rgba(0,0,0,.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .save-btn{
        margin-top: 35rpx;
        color: #FFFFFF;
        background: linear-gradient(to right, #FE726B , #FE956B);
        padding: 15rpx 40rpx;
        border-radius: 50rpx;
    }
}
</style>