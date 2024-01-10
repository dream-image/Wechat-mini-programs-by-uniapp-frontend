<template>
	<uni-popup ref="pleaseLogin" type="message">
		<uni-popup-message type="error" message="抱歉游客不可使用,请登陆再试" :duration="2000"></uni-popup-message>
	</uni-popup>
  <view
    style="
      display: grid;
      grid-template-rows: 3;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #faf1e6;
    "
  >
    <view
      style="
        grid-row-start: 1;
        grid-row-end: 2;
        position: relative;
        width: 100%;
        border-bottom: 1px solid #FFE9BF;
		background-color: #FFE9BF;
      "
    >
	<view style="
	background-repeat: no-repeat;background-size: cover; width: 50rpx;height: 50rpx;position: absolute;
	top: 0;bottom: 0;margin: auto;left: 30rpx;border: 1px #faf1e6 solid;
	" id='star' @click="gotoStar" >
		
	</view>
      <image
        style="
          position: absolute;
		  color: #837881;
          border-radius: 100%;
          width: 90rpx;
          height: 90rpx;
          top: 0;
          bottom: 0;
          margin: auto 0;
          right: 90rpx;
          background-size: cover;
		  border: 2px solid white;
        " :src="pictureUrl" mode="aspectFill"
        @click="gotoPerson"
      ></image>
    </view>

    <!-- 内容主体 -->

    <view style="grid-row-start: 2; grid-row-end: 9">
      <view
        class="img"
        v-for="(i, index) in questionBankList"
        :id="content[index]"
        @click="move"
        style="
		top:80px;
		height: 180px;
		width: 120px;
		background-color: #ffe9bf; 
		border-radius: 15rpx;
		background-image: url('https://s11.ax1x.com/2024/01/08/pFSJ7J1.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 15px 18px;
		transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* 添加过渡效果使悬浮更平滑 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		"
		
		:key="index"
		:data-name="i" 
      >
	  <!-- 这里的data-name只是为了给点击普通模式或者挑战模式时候获取这个dom节点知道目前是哪个题库被点击 -->
        <view
          style="
            font-size: 11px;
            display: flex;
            color: #101;
            position: relative;
            left: 80rpx;
            top: 15rpx;
          "
        >
          <view @click="gotoSearch(i, content[index])">搜题</view>
          <span>&nbsp;/&nbsp;</span>
          <view @click="gotoCN(i,content[index])">错题集</view>
        </view>
        <view
          style="
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 80rpx;
            font-size: 30rpx;
            text-align: center;
            color: #edb54c;
            font-family: '阿里妈妈东方大楷';
          "
        >
          {{ i }}
        </view>
        <button
          style="
            position: absolute;
            bottom: 10px;
			
            left: 0;
            right: 0;
            
            transform: scale(0.7);
			background-color: rgba(0, 0, 0, 0);
          "
          @click="gotoRankingList(i, content[index])"
		  
        >
          排行榜
        </button>
      </view>

      <!-- <view class="img" :id="content[0]" @click="move" style="background-color: #ffe9bf;border-radius: 15rpx;">
				<view style="font-size: 20rpx;display: flex;color: #e3c830;position: relative;left: 70rpx;top: 15rpx;">
					<view @click="gotoSearch('马克思主义原理',content[0])">搜题</view>
					<span>&nbsp;/&nbsp;</span>
					<view>错题集</view>
				</view>
				<view style="
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 80rpx;
            font-size: 30rpx;
            text-align: center;
			color: #edb54c;
			font-family: '阿里妈妈东方大楷';
          ">
					马克思主义原理
				</view>
				<button style="
            position: absolute;
            bottom: 50rpx;
            left: 0;
            right: 0;
            margin: auto;
            transform: scale(0.7);
			border-radius: 9999rpx;
          " @click="gotoRankingList('马克思主义原理',content[0])">
					排行榜
				</button>
			</view>
			<view class="img" :id="content[1]" @click="move" style="background-color: #ffe9bf;border-radius: 15rpx;">
				<view style="font-size: 20rpx;display: flex;color: #e3c830;position: relative;left: 70rpx;top: 15rpx;">
					<view @click="gotoSearch('毛泽东思想',content[1])">搜题</view>
					<span>&nbsp;/&nbsp;</span>
					<view @click="gotoCN('毛泽东思想',content[1])">错题集</view>
				</view>
				<view style="
			  position: absolute;
			  left: 0;
			  right: 0;
			  margin: auto;
			  top: 80rpx;
			  font-size: 30rpx;
			  text-align: center;
			  color: #edb54c;
			  font-family: '阿里妈妈东方大楷';
			">
					毛泽东思想
				</view>
				<button style="
			  position: absolute;
			  bottom: 50rpx;
			  left: 0;
			  right: 0;
			  margin: auto;
			  transform: scale(0.7);
			 border-radius: 9999rpx;
			" @click="gotoRankingList('毛泽东思想',content[1])">
					排行榜
				</button>
			</view>
			<image src="https://picsum.photos/200/106" class="img" :id="content[2]" @click="move"></image>
			<image src="https://picsum.photos/200/138" class="img" :id="content[3]" @click="move"></image>
			<image src="https://picsum.photos/200/122" class="img" :id="content[4]" @click="move"></image> -->
    </view>
    <view style="grid-row-start: 9; grid-row-end: 11">
      <view>
        <view style="display: flex; justify-content: space-between">
          <button class="btn"
            style="
              background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%);
              width: 250rpx;
              height: 80rpx;
              color: white;
			  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
			  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            "
            @click="gotoAnswer('normal')"
          >
            普通模式
          </button>
          <button class="btn"
            style="
              background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%);
              width: 250rpx;
              height: 80rpx;
              color: white;
			  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
			  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            "
	
            @click="gotoAnswer('challenge')"
          >
            挑战模式 
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	inject:['urlPre'],
	data() {
		return {
			questionBankList:[],
			imgs: [],
		
			content: ["first","left", "middle", "right","last"],
			who:"",
			pictureUrl:"../../static/人.svg"
		};
	},
	onShow() {
		console.log("生命钩子触发");
		let pictureUrl=uni.getStorageSync("pictureUrl")
		if(pictureUrl!=""){
			this.pictureUrl=pictureUrl
		}
	},
	onLoad(){
	
	},
	beforeMount(){
		uni.getStorage({
			key:"who",
			success:(res)=>{
				this.who=res.data
			}
		})
		
		uni.getStorage({
			key:"token",
			success:(res) =>{
				console.log(res)
				//说明！！！！！！回调函数务必使用箭头函数比如 success:()=>{}这样的格式，不要使用success()=>{}这样的格式，这样会
				 // 出现this指向不为该页的vue实例而是的this.XXX拿不到对应的数据
				uni.request({
					url:`http://${this.urlPre}:3000/questionBankList`,
					method:"GET",
					header:{
						token:res.data
					},
					success:(res)=> {
						console.log(res);
						this.questionBankList=res.data.questionBankList
						if(this.questionBankList.length<=3){
							this.content= ["left", "middle", "right"]
						}else{
							this.content= ["first","left", "middle", "right","last"]
						}
					},
					fail(err) {
						console.log(err);
					}
				})
			}
		})
		
		// setTimeout(()=>{
		// 	this.questionBankList=["毛泽东思想","马克思主义原理","习近平新思想"]
			// if(this.questionBankList.length<=3){
			// 	this.content= ["left", "middle", "right"]
			// }else{
			// 	this.content= ["first","left", "middle", "right","last"]
			// }
		// },100)
	},

	methods: {
		move(current) {
			if (current.currentTarget.id == "left") {
				let a = this.content.shift();
				this.content.push(a);
			} else if (current.currentTarget.id == "right") {
				let a = this.content.pop();
				this.content.unshift(a);
			}
		},
		gotoPerson() {
			if(this.who=="游客"){
				this.$refs.pleaseLogin.open()
			}else{
				uni.navigateTo({
					url: "/pages/person/index",
					animationType: "fade-in"
				})
			}
			
		},
		gotoRankingList(topic, position) {
			console.log(topic);
			if (position == "middle") {
				console.log("允许跳转");
				uni.navigateTo({
					url: "/pages/RankingList/normal/index?name="+topic,
					animationType: "pop-in"
				})
			}
		},
		gotoAnswer(target) {
				
			uni.createSelectorQuery().select("#middle").fields({dataset:true},(context)=>{
				console.log(context.dataset.name);
				uni.navigateTo({
					url: `/pages/startAnswer/${target}/index?name=${context.dataset.name}`,
					animationType: "pop-in"
				})
			}).exec()
		
		},
		gotoSearch(topic, position) {
			console.log(topic);
			if (position == "middle") {
				console.log("允许跳转");
				uni.createSelectorQuery().select("#middle").fields({dataset:true},(context)=>{
					uni.navigateTo({
						url: "/pages/search/index?name="+context.dataset.name,
						animationType: "fade-in"
					})
				}).exec()
				
			}

		},
		gotoCN(topic, position) {
			if(this.who=="游客"){
				this.$refs.pleaseLogin.open()
			}else{
				console.log(topic);
				if (position == "middle") {
					console.log("允许跳转");
					uni.navigateTo({
						url: "/pages/correctionNotebook/index?name="+topic,
						animationType: "fade-in"
					})
				}
			}

		},
		gotoStar(){
			if(this.who=="游客"){
				this.$refs.pleaseLogin.open()
			}else{
				uni.navigateTo({
					url:"/pages/starList/index"
				})
			}

		}

	},
};
</script>

<style lang="css">
.img {
  position: absolute;
  width: 200rpx;
  height: 360rpx;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(100rpx);
}
.img:hover{
	transform: scale(1.1); /* 改变元素大小或其它属性，这里以放大为例 */
	    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 悬浮时添加更明显的阴影 */
}
.btn:hover {
	  background-position: right center; /* change the direction of the change here */
	}

.btn {
	  flex: 1 1 auto;
	  margin: 30px;
	  text-align: center;
	  text-transform: uppercase;
	  transition: 0.5s;
	  background-size: 100% auto;
	  color: #100;
	 /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
	}
#middle {
  transform: scale(1.3) translateY(100rpx);
  z-index: 99;
  opacity: 1;
  transition-timing-function: ease-in;
  transition: 1s transform;
}

#left {
  transform: translateX(-200rpx) translateY(100rpx);
  z-index: 9;
  opacity: 1;
  transition: 1s transform;
}

#right {
  transform: translateX(200rpx) translateY(100rpx);
  z-index: 8;
  opacity: 1;
  transition: 1s transform;
}
.low-z-index{
	z-index:1
}

#first {
  transform: translateX(-300rpx) translateY(100rpx);
  z-index: 1;
  opacity: 0;
  transition: 1s opacity;
}

#last {
  transform: translateX(300rpx) translateY(100rpx);
  z-index: 1;
  opacity: 0;
  transition: 1s opacity;
}
#star{
	background-image: url("data:image/svg+xml,%3C?xml version='1.0' standalone='no'?%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg t='1700379022836' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2762' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='200'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='%23202425' opacity='.01' p-id='2763'%3E%3C/path%3E%3Cpath d='M170.666667 68.266667a136.533333 136.533333 0 0 0-136.533334 136.533333v273.066667c0 50.517333 27.4432 94.651733 68.266667 118.272V273.066667a68.266667 68.266667 0 0 1 68.266667-68.266667h682.666666a68.266667 68.266667 0 0 1 68.266667 68.266667v323.072A136.465067 136.465067 0 0 0 989.866667 477.866667V273.066667a136.533333 136.533333 0 0 0-136.533334-136.533334h-303.172266A61.7472 61.7472 0 0 1 494.933333 102.4c-10.4448-20.923733-31.8464-34.133333-55.227733-34.133333H170.666667z' fill='%23FFAA44' p-id='2764'%3E%3C/path%3E%3Cpath d='M34.133333 341.333333a68.266667 68.266667 0 0 1 68.266667-68.266666h819.2a68.266667 68.266667 0 0 1 68.266667 68.266666v477.866667a136.533333 136.533333 0 0 1-136.533334 136.533333H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533333V341.333333z' fill='%23FF7744' p-id='2765'%3E%3C/path%3E%3Cpath d='M496.605867 407.7568a17.066667 17.066667 0 0 1 30.788266 0L576.853333 511.317333a17.066667 17.066667 0 0 0 13.175467 9.557334l113.800533 15.018666a17.066667 17.066667 0 0 1 9.5232 29.2864l-83.2512 79.018667a17.066667 17.066667 0 0 0-5.051733 15.496533l20.923733 112.8448a17.066667 17.066667 0 0 1-24.917333 18.090667l-100.864-54.715733a17.066667 17.066667 0 0 0-16.315733 0l-100.864 54.715733a17.066667 17.066667 0 0 1-24.917334-18.090667l20.8896-112.8448a17.066667 17.066667 0 0 0-5.0176-15.496533l-83.217066-79.018667a17.066667 17.066667 0 0 1 9.489066-29.2864l113.800534-15.018666a17.066667 17.066667 0 0 0 13.175466-9.557334l49.425067-103.560533z' fill='%23FFFFFF' p-id='2766'%3E%3C/path%3E%3C/svg%3E");
}
</style>
