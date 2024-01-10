<template>

	<uni-popup ref="popupTop" type="message">
		<uni-popup-message type="warn" message="已经到顶了" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="popupBottom" type="message">
		<uni-popup-message type="warn" message="已经到底了" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="popupRemoveSuccess" type="message">
		<uni-popup-message type="success" message="成功移除" :duration="2000"></uni-popup-message>
	</uni-popup>
	<view style="
      display: grid;
      grid-template-rows: 6;
      width: 100%;
      height: 100%;
      position: absolute;
	  background-image:url(https://s11.ax1x.com/2024/01/09/pFpla8K.jpg)
    ">
		<view style="overflow: hidden; width: 100%; grid-row-start: 1; grid-row-end: 2" class="items">
			<view style="
          height: 46px;
          overflow: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        " class="items">
				<van-nav-bar title="收藏夹" left-text="返回" left-arrow @click-left="onClickLeft" />
			</view>
		</view>
		<view style="
		  grid-row-start: 2;
		  grid-row-end: 3;
		  width: 100%;
		  height: 100%;
		  position: relative;
		" class="items" v-if="questionList.length==0&& !isNoStar">
			<view style="
					  width: max-content;
					  height: min-content;
					  position: absolute;
					  top: 30rpx;
					  left: 0;
					  right: 0;
					  bottom: 0;
					  margin: auto auto;
					  font-size: x-large;
					height: 100%;
					  font-family: 阿里妈妈东方大楷;
					  opacity: 0.8;
					  text-align: center;
					">
				<span style="">加载中</span>
			</view>
		</view>
		<view style="
				  grid-row-start: 2;
				  grid-row-end: 3;
				  width: 100%;
				  height: 100%;
				  position: relative;
				" class="items" v-if="isNoStar">
			<view style="
							  width: max-content;
							  height: min-content;
							  position: absolute;
							  top: 30rpx;
							  left: 0;
							  right: 0;
							  bottom: 0;
							  margin: auto auto;
							  font-size: x-large;
							height: 100%;
							  font-family: 阿里妈妈东方大楷;
							  opacity: 0.8;
							  text-align: center;
							">
				<span style="">收藏夹为空</span>
			</view>
		</view>
		<view style="
        grid-row-start: 2;
        grid-row-end: 3;
        width: 100%;
        height: 100%;
        position: relative;
      " class="items">
			<view style="
			  width: max-content;
			  height: min-content;
			  position: absolute;
			  top: 30rpx;
			  left: 0;
			  right: 0;
			  bottom: 0;
			  margin: auto auto;
			  font-size: x-large;
			height: 100%;
			  font-family: 阿里妈妈东方大楷;
			  opacity: 0.8;
			  text-align: center;
			" v-if="questionList.length!=0 &&!isNoStar">
				<span style="">{{questionList[questionIndex].whatQuestionBank}}</span>
			</view>
		</view>
		<view style="grid-row-start: 3; grid-row-end:6; position: relative" class="items"
			v-if="questionList.length!=0&&!isNoStar">
			<view style="position: absolute; top: 15rpx; width: 100%; height: 80%">
				<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style="position: absolute; left: 50rpx;top:-10rpx;" size="mini">
					{{ questionList[questionIndex].questionClass=="判断题"?"判断题":questionList[questionIndex].correctAnswer.length==1?"单选题":"多选题" }}
				</van-button>
				<rich-text style="
            width: 88%;
            height: 100%;
            position: absolute;
            left: 45rpx;
            right: 0;
            font-family: '宋体';
            top: 0rpx;
            line-height: 45rpx;
            letter-spacing: 3rpx;
            font-weight: 600;
			font-family: 阿里妈妈东方大楷;
          ">
					&ensp;&ensp;&ensp;&emsp;&emsp;{{questionList[questionIndex].questionTitle}}
				</rich-text>
			</view>
		</view>
		<view style="
        grid-row-start: 6;
        grid-row-end: 13;
       
        position: relative;
      " class="items" v-if="questionList.length!=0&&!isNoStar">
			<view style=" display: flex;
        flex-direction: column;
        justify-content: space-around;
		position: absolute;
		top:0;
		bottom: 0;
		margin: auto;
		height: 100%;
		width: 100%;" v-if="questionList[questionIndex].questionClass=='选择题'">
				<button style="
            display: flex;
            align-items: center;
            width: 80%;
            height: 120rpx;
            border-radius: 9999rpx;
            border: 1px solid orange;text-align: left;font-size: 27rpx	;
			margin-bottom: 3rpx;
          " v-for="item,index in questionList[questionIndex].option.split('#')" :key="index"
					:class="isShowAnswer?questionList[questionIndex].correctAnswer.includes(item)?'corret':null:null"
					@click="showAnswer(item)">
					{{item}}

				</button>

			</view>

			<view style=" display: flex;
			flex-direction: column;
			position: absolute;
			top:0;
			margin-bottom: 20rpx;
			height: 100%;
			width: 100%;" v-else>
				<button style="
			   display: flex;
			   align-items: center;
			   width: 80%;
			   height: 120rpx;
			   border-radius: 9999rpx;
			   border: 1px solid orange;text-align: left;font-size: 27rpx	;
			   margin-bottom: 30rpx;
			  " v-for="item,index in ['正确','错误']" :key="index"
					:class="isShowAnswer?questionList[questionIndex].correctAnswer[0]==item?'corret':null:null"
					@click="showAnswer(item)">
					{{item}}


				</button>

			</view>
		</view>
		<view style="grid-row-start: 13; grid-row-end: 16;position: relative;" class="items"
			v-if="questionList.length!=0&&!isNoStar">
			<view
				style="width: 70%;display: flex;transform: translateY(20rpx); justify-content: space-between;position: absolute;left: 0;right: 0;margin:auto;">
				<view>
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="gotoPrev">上一题</van-button>
				</view>
				<view>
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="star"><van-icon name="star"
							:color="starColor" />收藏</van-button>
				</view>

				<view>
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="gotoNext">下一题</van-button>
				</view>
			</view>

		</view>
		<view style="grid-row-start: 16; grid-row-end: 18" class="items">

		</view>
	</view>
</template>

<script>
	export default {
		inject:['urlPre'],
		data() {
			return {
				questionList: [ //首次获取所有题目

				],
				questionIndex: 0,
				isShowAnswer: true,
				starColor: "#ff6d00",
				isNoStar: false, //是否收藏夹为空
				who:"",
				uid:""
			};
		},
		beforeMount() {
			
		},
		mounted() {
			this.uid=uni.getStorageSync("uid")
			uni.getStorage({
				key:"who",
				success:(res)=>{
					console.log(res);
					this.who=res.data
					uni.request({
						url:`http://${this.urlPre}:3000/starList?username=${this.who}&userId=${this.uid}`,
						method:"GET",
						success:(res)=>{
							this.questionList=res.data.questionList
							if(this.questionList.length==0){
								this.isNoStar=true
							}
						},
						fail:(err)=>{
							console.log(err);
						}
					})
				}
			})
			uni.getStorage({
				key:"uid",
				success:(res)=>{
					this.uid=res.data
				}
			})
			//模拟数据获取
			console.log(this.who);
			
			
			// setTimeout(() => {
			// 	this.questionList = [{
			// 			questionTitle: "古希腊学者欧布里德曾经提出一个悖论，其大意是：一粒谷粒不能成为谷堆，再加上一粒也不能成为谷堆；所以如果现有的谷粒数不成为谷堆，那么在这个基础上每次只加一粒谷粒，则谷堆一直不能形成，这个悖论被称为“谷堆悖论”。“谷堆悖论”的错误在于（）。",
			// 			questionClass: "选择题",
			// 			option: "只看到了主要矛盾，忽略了次要矛盾#只看到了共性，忽略了个性#只看到了量变，忽视了质变#只看到了偶然性，忽视了必然性 ", //使用#分割选项，可以让后端传过来就是这样的或者过传来后自己将他组成这样
			// 			correctAnswer: "只看到了主要矛盾，忽略了次要矛盾", //这个我随便选的一个，不一定对
			// 			isStar: true,
			// 			whatQuestionBank: "马克思主义原理",
			// 			questionId: "j9d1jdsa"
			// 		},
			// 		{
			// 			questionClass: "判断题",
			// 			questionTitle: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			correctAnswer: "正确",
			// 			isStar: true,
			// 			whatQuestionBank: "习近平新思想",
			// 			questionId: "90jdad1d1dsa"
			// 		}
			// 	]
			// }, 1000)
		},
		updated() {
			
		},
		methods: {

			onClickLeft() {
				uni.navigateBack({
					url: "/pages/homepage/index",
					animationType: "pop-out",
					animationDuration: 300
				})
			},
			gotoNext() {
				if (this.questionIndex == this.questionList.length - 1) {
					this.$refs.popupBottom.open()
				} else {
					this.questionIndex++
				}
			},
			gotoPrev() {
				if (this.questionIndex == 0) {
					this.$refs.popupTop.open()
				} else {
					this.questionIndex--
				}
			},

			//取消收藏
			star() {
					//取消收藏
				uni.request({
					url:`http://${this.urlPre}:3000/star`,
					method:"POST",
					data:{
						questionId:	this.questionList[this.questionIndex].questionId,
						username:this.who,
						addOrRemove:"remove",
						userId:this.uid
					},
					success:(res)=>{
						this.$refs.popupRemoveSuccess.open()
						this.questionList.splice(this.questionIndex,1) //将其移出去
						if(this.questionList.length==0){
							this.isNoStar=true
						}
					},
					fail:(err)=>{
						console.log(err);
					}
				})
			},

		},

	};
</script>

<style>
	.items {
		/* border: 1rpx solid black; */
	}

	@font-face {
		font-family: "阿里妈妈东方大楷";
		font-weight: 400;
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/XRzQeyqgollt.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/SYxDK94sZIe1.woff") format("woff");
		font-display: swap;
	}

	.corret {
		background-color: #48D88A;
	}

	.error {
		background-color: #FF7F82;
	}

	.hasChosen {
		background-color: #fdd835;
	}
</style>