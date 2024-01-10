<template>
	<van-dialog id="van-dialog" />
	<uni-popup ref="popupTop" type="message">
		<uni-popup-message type="warn" message="已经到顶了" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="popupBottom" type="message">
		<uni-popup-message type="warn" message="已经到底了" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="submit" type="message">
		<uni-popup-message type="success" message="成功提交" :duration="2000"></uni-popup-message>
	</uni-popup>

	<template class="wrapper2">


		<!-- 这是总览界面 -->



		<view style="position: absolute;width: 100%;height: 100%;display: flex;overflow: auto;z-index: 99;background-color: #fbfbfb;
			top: calc(var(--status-bar-height)*3.6);flex-direction: column;" v-if="isShowGlobal" id="overview">
			<view v-for="i in Math.ceil(questionList.length/5)" style="display: flex;width: 100%;margin-bottom: 10rpx;"
				:key="i">
				<view style="border-radius: 100%;width: 100rpx;height: 100rpx;border: 1px solid black;
			margin-left: 40rpx;position: relative;"
					v-for="(item,index) in 5>(this.questionList.length-(i-1)*5)?(this.questionList.length-(i-1)*5):5"
					:key="index" :class="questionList[(i-1)*5+index].hasAnswered.length==0?null:'hasChosen'"
					@click="gotoQuestion((i-1)*5+index)">
					<span
						style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: max-content;height: max-content;">{{(i-1)*5+index+1}}</span>
				</view>
			</view>

		</view>
		<!-- 下面的是结算界面 -->

		<view style="position: absolute;width: 100%;height: 80%;" id="resultPage" v-if="isShowResult" class="wrapper2">
			<view
				style="position: absolute;width: 90%;height: 70%;left: 0;right: 0;top: 300rpx;bottom: 0;margin: auto;background-color: #FFF6E9; border-radius: 50rpx;display: flex;flex-direction: column;align-items: center;">
				<view style="border-radius: 999px;border: 1px solid white;width: 200rpx;height: 200rpx;border-radius: 50rpx;
			background-repeat: no-repeat;background-size: cover;left: 0;right: 0;transform: translateY(-100rpx);
			" :style="{backgroundImage: 'url('+pictureUrl+')'}">
					<!-- 这是头像 -->
				</view>
				<view style="position: absolute;top: 150rpx	;">
					<img src="../../../static/烟花.svg" alt=""
						style="width: 100rpx;height: 100rpx;position: absolute;left: -100rpx;">
					<span style="text-align: center;font-size: 70rpx;width: 100%;font-family: 'STKaiti';">挑战完成</span>
				</view>
				<view
					style="display: flex;align-items:center;flex-direction: column;border: 1px solid white;height: 55%;width:80%;position: relative;border-radius: 50rpx;transform: translateY(100rpx);">
					<span style="text-align: center;font-size: 80rpx;font-family:'STKaiti';background-color:#EFCFC5; border-radius: 25rpx;padding: 10rpx;margin: 10rpx;">共
					<span style="color:#5F4737 ;font-weight: 700;font-size: 90rpx;">{{questionList.length}} </span> 题</span>
					<span style="text-align: center;font-size: 80rpx;font-family:'STKaiti';background-color:#EFCFC5; border-radius: 25rpx;padding: 10rpx;margin: 10rpx;">答对 <span style="color:#5F4737 ;font-weight: 700;font-size: 90rpx;">{{correctNumber}}</span> 题</span>
					<span style="text-align: center;font-size: 80rpx;font-family:'STKaiti';background-color:#EFCFC5; border-radius: 25rpx;padding: 10rpx;margin: 10rpx;">答错 <span style="color:#5F4737 ;font-weight: 700;font-size: 90rpx;">{{questionList.length-correctNumber}}</span> 题</span>
				</view>
				<view style="display: flex;justify-content: space-evenly;transform: translateY(100rpx);">
					<van-button round icon="wap-home" plain color="#fb8c00" @click="gotoHome"></van-button>
					<van-button round plain color="#fb8c00" @click='share' open-type="share">分享</van-button>
				</view>
			</view>
		</view>

		<!-- 这个才是主体的答题界面 -->
		<view style="
      display: grid;
      grid-template-rows: 6;
      width: 100%;
      height: 100%;
      position: absolute;
	 background-image: url('https://s11.ax1x.com/2024/01/09/pFpla8K.jpg');
    " v-if="!isShowResult" class="wrapper2">
			<!-- 看上面一行，这里给我设置成不渲染了 -->
			<van-overlay :show="isShowTip" @click="isShowTip = false">
				<div class="wrapper">
					<div class="block" style="position: relative;border-radius: 30rpx;opacity: 0.8;">
						<span style="position: absolute;width: inherit;top: 0;bottom: 0;margin: auto;height: inherit;text-align: center;
				font-size: 40rpx;display: flex;flex-direction: column;
				font-family: 结束提示字体;justify-content:space-evenly;
				color: white;
				">
							<span>时间已到</span>
							<span>自动提交</span>
						</span>

					</div>
				</div>
			</van-overlay>

			<view style="overflow: hidden; width: 100%; grid-row-start: 1; grid-row-end: 2" class="items">
				<view style="
          height: 46px;
          overflow: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        " class="items">
					<van-nav-bar title="挑战模式" left-text="返回" left-arrow @click-left="onClickLeft"
						@click-right="gotoGlobal"
						:right-text="(isShowGlobal?'取消':'总览')+'&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'" />
				</view>
			</view>
			<view style="
        grid-row-start: 2;
        grid-row-end: 3;
        width: 100%;
        height: 100%;
        position: relative;
		background-image:url('https://s11.ax1x.com/2024/01/03/pijObW9.png') ;
			background-size:600rpx 120rpx ;
			background-position: 80rpx -24rpx;
			background-repeat: no-repeat;
      " class="items" v-if="questionList.length!=0">
				<view style="
          width: 210rpx;
          height: max-content;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto auto;
		  font-size: x-large;
			height: 100%;
		  font-family: '阿里妈妈东方大楷2';
		  opacity: 0.8;
		  text-align: center;
        ">
					<span style="position: absolute;top: 0;bottom: 0; left: 0;right: 0;margin:auto;width: max-content;height: min-content;
					font-family: '阿里妈妈东方大楷';font-weight:bold;
					">封神榜</span>
				</view>
				<view style="position: absolute;left: 0;right: 0;bottom: -35rpx;margin: auto;width: 250rpx;text-align: center;
			font-family: '阿里妈妈东方大楷';color: #e64a19;z-index: 1;
			">倒计时：{{time}}s</view>
			</view>
			<view style="grid-row-start: 3; grid-row-end: 7; position: relative;border-radius:50rpx 50rpx 0rpx 0rpx;" class="items"
				v-if="questionList.length==0">
				<!-- 这个长度判断是处理题目还没获取到的时候就开始读取数据导致的报错 -->
				<view style="font-size: 100rpx;">
					加载中
				</view>
			</view>
			<view style="grid-row-start: 3; grid-row-end: 7; position: relative; border-radius:50rpx 50rpx 0rpx 0rpx;" class="items"
				v-if="questionList.length!=0">
				<view style="position: absolute;width: 250rpx;height: max-content;left: 35rpx;top: rpx;
			font-family: 第几题字体;font-size: 50rpx;align-items: center;
			">第{{questionIndex+1}}题</view>
				<view style="position: absolute; top: 70rpx; width: 100%; height: 80%">
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style="position: absolute; left: 44rpx;transform: translateY(-3rpx);" size="mini">
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
			font-family: '阿里妈妈东方大楷1';overflow: auto;
          ">
						&ensp;&ensp;&ensp;&emsp;&emsp;{{questionList[questionIndex].questionTitle}}
					</rich-text>
				</view>
			</view>
			<view style="
        grid-row-start: 7;
        grid-row-end: 14;
        position: relative;
		top:-60rpx;
		
		height: 100%;
      " class="items" v-if="questionList.length!=0">
				<view style=" display: flex;
        flex-direction: column;
		position: absolute;
		top:0;
		bottom: 300rpx;
		height: 100%;
		text-align: center;
		width: 100%;" v-if="questionList[questionIndex].questionClass=='选择题'">
					<button style="
					width: 80%;
					height: 120rpx;
					border-radius: 9999rpx;
					align-items: center;
					display: flex;
					padding: 0 2rpx;
					border: 1px solid orange;text-align: left;padding: 0 50rpx;font-size: 27rpx;
					color: #100;line-height: 1.2em;overflow: auto;
					margin-bottom: 30rpx;
          " v-for="(item,index) in questionList[questionIndex].option.split('#')" @click="clickAnswer(item)"
						:class="questionList[questionIndex].hasAnswered.includes(item)?'answer':null" :key="index">
						{{item}}
					</button>
				</view>
				<view v-else style=" display: flex;
        flex-direction: column;
		position: absolute;
		top:0;
		bottom: 300rpx;
		margin:20rpx 0px;
		height: 100%;
		text-align: center;
		width: 100%;">
					<button style="
				display: flex;
				align-items: center;
				margin-bottom: 60rpx;
				width: 80%;
				height: 120rpx;
				border-radius: 9999rpx;
				border: 1px solid orange;text-align: left;font-size: 27rpx	;
          " v-for="(item,index) in ['正确','错误']" @click="clickAnswer(item)"
						:class="questionList[questionIndex].hasAnswered[0]==item?'answer':null" :key="index">
						{{item}}


					</button>

				</view>
			</view>
			<view style="grid-row-start: 14; grid-row-end: 17;position: relative;top:-60rpx ;z-index: 0;border-radius: 0rpx 0rpx 50rpx 50rpx;" v-if="questionList.length!=0"
				class="items">
				<view
					style="width: 50%;display: flex;transform: translateY(20rpx); justify-content: space-between;position: absolute;left: 0;right: 0;margin:auto;">
					<view>

						<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="goto('prev')"
							class="navigateQuestion">上一题</van-button>
					</view>
					<view>
						<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="goto('next')"
							class="navigateQuestion">下一题</van-button>
					</view>
				</view>
				<view style="position: absolute;left: 0;right: 0;margin: auto auto;bottom: 20rpx;width: max-content;">
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="submit('主动')">&ensp;&ensp;提交&ensp;&ensp;</van-button>
				</view>

			</view>
			<view style="grid-row-start: 17; grid-row-end: 18;position: relative;" class="items">

			</view>
		</view>
	</template>

</template>

<script>
	import {Dialog} from '@/wxcomponents/vant/dist/dialog/dialog.js';
	import Notify from '@/wxcomponents/vant/dist/notify/notify.js';
	export default {
		inject:['urlPre'],
		data() {
			return {
				questionList: [],
				questionIndex: 0, //当前题目的索引，下一题和上一题的时候直接修改这个
				questionPrevColor: "#ffc400",
				questionNextColor: "#ffc400",
				totalTime: 300,
				time: 300,
				isShowTip: false,
				isShowGlobal: false,
				who: "",
				questionBank: "",
				isShowResult: false, //是否展示结算界面 
				correctNumber: 0, //正确题数
				uid: "",
				delaySubmitTimeout: "",
				countDownInterval: "",
				pictureUrl:""
			};
		},
		onLoad: function(option) {
			//option.name可以获取得到url路径里面的name参数，也就是这是什么题库
			this.pictureUrl=uni.getStorageSync("pictureUrl")
			this.uid = uni.getStorageSync("uid")
			this.questionBank = option.name
			this.who = uni.getStorageSync("who") //这个是阻塞获取缓存who
			uni.request({
				url: `http://${this.urlPre}:3000/challenge?username=${this.who}&number=300&name=${this.questionBank}&userId=${this.uid}`,
				success: (res) => {
					res.data.questionList.forEach(i => {
						this.questionList.push(i)
					})
					// console.log(this.questionList);
					this.time = 300
					this.totalTime = 300
					//页面加载完毕后就开启定时器和延时器，定时器是将数据每秒减1，延时器是在到达规定的时间后退出

					this.countDownInterval = setInterval(() => {
						this.time--
					}, 1000)
					this.delaySubmitTimeout = setTimeout(() => {
						this.isShowTip = true
						clearInterval(this.countDownInterval)
						setTimeout(() => {
							this.isShowTip = false
							uni.redirectTo({
								url: "/pages/homepage/index"
							})
							this.submit.call(this,"强制")
						}, 2000)
					}, this.totalTime * 1000)

				}

			})





		},
		mounted() {


		},
		methods: {
			gotoGlobal() {
				console.log(this.isShowGlobal)
				this.isShowGlobal = !this.isShowGlobal
			},
			onClickLeft() {
				Dialog.confirm({
					title: '是否回到主页?',
					message: '当前数据会被销毁',
				}).then(() => {
					uni.navigateBack()
				})
			},
			goto(positon) {
				if (positon == "prev") {
					this.questionPrevColor = "#f57f17"
					setTimeout(() => {
						this.questionPrevColor = "#ffc400"

						if (this.questionIndex == 0) {
							this.$refs.popupTop.open()
						} else {
							this.questionIndex--
						}
					}, 100)

					//前一题

				} else {
					this.questionNextColor = "#f57f17"
					setTimeout(() => {
						this.questionNextColor = "#ffc400"
						if (this.questionIndex == this.questionList.length - 1) {
							this.$refs.popupBottom.open()
						} else {
							this.questionIndex++
						}

					}, 100)

					//前往下一题
				}
			},
			clickAnswer(item) {
				//这里是记录选择
				if (this.questionList[this.questionIndex].questionClass == "选择题") {
					if (this.questionList[this.questionIndex].correctAnswer.length == 1) {
						this.questionList[this.questionIndex].hasAnswered[0] = item
					} else {
						if (!this.questionList[this.questionIndex].hasAnswered.includes(item)) {
							this.questionList[this.questionIndex].hasAnswered.push(item)
						} else {
							let index = this.questionList[this.questionIndex].hasAnswered.indexOf(item)
							this.questionList[this.questionIndex].hasAnswered.splice(index, 1)
						}
					}
				} else {
					this.questionList[this.questionIndex].hasAnswered[0] = item
				}

			},
			gotoQuestion(index) {
				this.questionIndex = index
				this.isShowGlobal = false
			},
			submit(type) {
				function calculateScore(){
					function judge(a, b) {
						return a.every((i, index) => {
								return b.includes(i)
							}) &&
							b.every((i, index) => {
								return a.includes(i)
							})

					}
					let score = 0
					this.questionList.forEach(i => {
						if (judge(i.hasAnswered, i.correctAnswer)) {
							score++
						}
					})


					return score
				}
				if (type == "主动") {
					Dialog.confirm({
						title: '是否提交?',
						message: '提交后将无法撤销',

					}).then(() => {
						// on close
						this.$refs.submit.open()
						this.correctNumber = calculateScore.call(this)
						setTimeout(() => {
							this.isShowResult = true
						}, 1000)
						//告诉后端这次结果
						
						if (this.who != '游客') {//别把这里和下面else里面的这个删掉然后放外面，会有bug，this.correctNumber一直为0
								uni.request({
									url: `http://${this.urlPre}:3000/challengeResult`,
									method: "POST",
									data: {
										username: this.who,
										totalNumber: this.questionList.length,
										correctNumber: this.correctNumber,
										spendTime: this.totalTime - this.time,
										name: this.questionBank,
										userId: this.uid
									}
								})
						}
						clearTimeout(this.delaySubmitTimeout)
						clearInterval(this.countDownInterval)
						// setTimeout(() => {
						// 	uni.navigateBack()
						// }, 300)
					});
				} else {
					this.$refs.submit.open()
					this.correctNumber = calculateScore.apply(this)

					setTimeout(() => {
						this.isShowResult = true
					}, 1000)
					//告诉后端这次结果
					if (this.who != '游客') {
							uni.request({
								url: `http://${this.urlPre}:3000/challengeResult`,
								method: "POST",
								data: {
									username: this.who,
									totalNumber: this.questionList.length,
									correctNumber: this.correctNumber,
									spendTime: this.totalTime - this.time,
									name: this.questionBank,
									userId: this.uid
								}
							})
					}
				}
				
				
				
				

			},

			gotoHome() {
				uni.navigateBack()
			},
			share(){
				
			}
		}
	};
</script>

<style>
	.items {
		/* border: 1rpx solid black; */
	}

	.wrapper2 {
		top: calc(var(--status-bar-height)*2);
		position: absolute;
	}

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: "阿里妈妈东方大楷";
		font-weight: 400;
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/gGWF5PhM8QqM.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/cAvkfwZ8kilv.woff") format("woff");
		font-display: swap;
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.block {
		width: 120px;
		height: 120px;
		background-color: #ffca28;
	}

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: "结束提示字体";
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/k5AD4SRwhmSm.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/2UbvD6rB2mNh.woff") format("woff");
		font-display: swap;
	}

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: "第几题字体";
		font-weight: 400;
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/8cp6HiyZRX9y.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/AMtt9uAQjqQC.woff") format("woff");
		font-display: swap;
	}

	.answer {
		/* 设置被选中的按钮的颜色 */
		background-color: #ffab00;
	}



	#overview {
		animation-name: show;
		animation-duration: 0.3s;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	@keyframes show {
		from {
			right: -1000rpx;
		}

		to {
			right: 0;
		}
	}

	.hasChosen {
		background-color: #fdd835;
	}

	#resultPage {
		opacity: 1;
		transition: opacity 1s;
	}
</style>