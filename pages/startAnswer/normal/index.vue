<template>
	<uni-popup ref="errorHappen" type="message">
		<uni-popup-message type="error" message="发生未知错误" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="noQuestion" type="message">
		<uni-popup-message type="error" message="抱歉，题库没有题目咯" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="lastQuestion" type="message">
		<uni-popup-message type="warning" message="这是最后一题啦" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="hasShowAnswer" type="message">
		<uni-popup-message type="error" message="答案已经展示了噢" :duration="2000"></uni-popup-message>
	</uni-popup>
	<template >
		<view style="
      display: grid;
      grid-template-rows: 6;
      width: 100%;
      height: 100%;
      position: absolute;
	  background-image:linear-gradient(180deg,#fbfbfb,#faf0e4)
	  
    " id="wrapper">

			<view style="overflow: hidden; width: 100%; grid-row-start: 1; grid-row-end: 2" class="items">
				<view style="
					height: 46px;
					overflow: hidden;
					position: absolute;
					width: 100%;
					height: 100%;
					background-image: url('https://s11.ax1x.com/2024/01/09/pFpla8K.jpg');
					background-position: -70px 160rpx;
					" class="items">
					<van-nav-bar title="普通模式" left-text="返回" left-arrow @click-left="onClickLeft" />
				</view>
			</view>
			<view style="
        grid-row-start: 2.5;
        grid-row-end: 3;
        width: 100%;
        height: 100%;
        position: relative;
		background-image:url('https://s11.ax1x.com/2024/01/03/pijObW9.png') ;
			background-size:600rpx 120rpx ;
			background-position: 80rpx -24rpx;
			background-repeat: no-repeat;
      " class="items" v-if="questionList.length != 0">
				<view style="
          width: 190rpx;
          height: min-content;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto auto;
		  font-size: x-large;
			height: 100%;
		  font-family: 阿里妈妈东方大楷;
		  background-repeat: no-repeat;
		  background-size: cover;
		  opacity: 0.8;
		  text-align: center;
		  
        ">

					<span
						style="position: absolute;top: 0;bottom: 0; left: 0;right: 0;margin:auto;width: max-content;height: min-content;font-weight: bold;">封神榜</span>
				</view>
				<view style="position: absolute;left: 0;right: 0;bottom: -35rpx;margin: auto;width: 250rpx;text-align: center;
			font-family: '阿里妈妈东方大楷';color: #8d18cc;z-index: 1;
			">分数：{{ userInformation.score }}分</view>
			</view>
			<view style="grid-row-start: 4; grid-row-end: 7; position: relative; 
			" class="items" v-if="questionList.length != 0">
				<view style="position: absolute; top: 0rpx; width: 100%;height: 80% ; border-radius: 50rpx 50rpx 0px 0px;">
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style="position: absolute; left: 50rpx;
              top:20rpx;
			  color: white;
			  " size="mini">
						{{ questionList[0].questionClass == "判断题" ? "判断题" : correctAnswerList.length == 1 ? "单选题" : "多选题" }}
					</van-button>
					<rich-text style="
            width: 88%;
            height: 100%;
            position: absolute;
            left: 45rpx;
            right: 0;
            font-family: '宋体';
            top: 25rpx;
            line-height: 45rpx;
            letter-spacing: 3rpx;
            font-weight: 600;
			
			overflow: auto;
          ">
						&ensp;&ensp;&ensp;&emsp;&emsp;{{ questionList[0].questionTitle }}
					</rich-text>
				</view>
			</view>
			<view style="
        grid-row-start: 7;
        grid-row-end: 14;
       
        position: relative;
      " class="items" v-if="questionList.length != 0">
				<view style=" display: flex;
        flex-direction: column;
        justify-content: space-around;
		position: absolute;
		top:-60rpx;
		bottom: 0;
		margin:10rpx 0rpx ;
		height: 100%;
		border-radius:  0rpx 0rpx 50rpx 50rpx;
		
		width: 100%;" v-if="questionList[0].questionClass == '选择题'">
					<button style="
            width: 80%;
            height: 120rpx;
            border-radius: 9999rpx;
			align-items: center;
			display: flex;
            padding: 0 2rpx;
            border: 1px solid orange;text-align: left;padding: 0 50rpx;font-size: 27rpx;
			color: #100;line-height: 1.2em;overflow: auto;
          " v-for="item, index in questionList[0].option.split('#')" :key="index"
						:class="[hasAnswered.includes(item) ? 'hasChosen' : null, isShowAnswer ? correctAnswerList.includes(item) ? 'corret' : 'error' : null]"
						@click="showAnswer(item)">
						{{ item }}
						<!-- 	<template v-if="item==hasAnswered">

							<van-icon name="success" v-if="hasAnswered==questionList[0].correctAnswer"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#67C23A" />
							<van-icon name="cross" v-if="hasAnswered!=questionList[0].correctAnswer"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#F56C6C" />
						</template> -->
					</button>

				</view>

				<view style=" display: flex;
        flex-direction: column;
		position: absolute;
		top:0;
		bottom: 300rpx;
		margin:20rpx 0px;
		height: 100%;
		text-align: center;
		width: 100%;" v-else>
					<button style="
			    display: flex;
			    align-items: center;
			    margin-bottom: 60rpx;
			    width: 80%;
			    height: 120rpx;
			    border-radius: 9999rpx;
			    border: 1px solid orange;text-align: left;font-size: 27rpx	;
			  " v-for="item, index in ['正确', '错误']" :key="index"
						:class="[hasAnswered.includes(item) ? 'hasChosen' : null, isShowAnswer ? questionList[0].correctAnswer == item ? 'corret' : 'error' : null]"
						@click="showAnswer(item)">
						{{item}}
						<!-- 
						<template v-if="item==hasAnswered">

							<van-icon name="success" v-if="hasAnswered==questionList[0].correctAnswer"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#67C23A" />
							<van-icon name="cross" v-if="hasAnswered!=questionList[0].correctAnswer"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#F56C6C" />
						</template> -->
					</button>

				</view>
			</view>
			<view style="grid-row-start: 14; grid-row-end: 16;position: relative;" class="items" v-if="questionList.length != 0">
				<view
					style="width: 60%;display: flex;transform: translateY(20rpx); justify-content: space-between;position: absolute;left: 0;right: 0;margin:auto;">
					<view>
						<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style=""
							@click="star" :disabled="userInformation.who == '游客'"><van-icon name="star"
								:color="starColor" />收藏</van-button>
					</view>
					<view>
						<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
							@click="reduce">不会</van-button>
					</view>
					<view>
						<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
							@click="gotoNext">下一题</van-button>
					</view>
				</view>

			</view>
			<view style="grid-row-start: 16; grid-row-end: 18" class="items" v-if="questionList.length != 0">

			</view>
		</view>
	</template>
</template>

<script>
export default {
	inject:['urlPre'],
	data() {
		return {

			//首次获取5个题目，然后每做一题就把首个题目移出去，再去获取一个,这样后面的4个题目相当于缓存
			questionList: [],
			hasAnswered: [],
			isShowAnswer: false,
			starColor: "white",
			userInformation: {
				who: "",
				score: 0
			},
			questionBank: "",
			uid: '',
			correctAnswerList: [],
			noQuestion:false
		};
	},
	onLoad(option) {
		//option.name可以获取当前的题库名字
		this.questionBank = option.name
		this.uid = uni.getStorageSync("uid")
		uni.getStorage({
			key: "who",
			success: (res) => {
				this.userInformation.who = res.data
				uni.request({
					url: `http://${this.urlPre}:3000/normal?name=${option.name}&username=${res.data}&number=5&userId=${this.uid}`,
					success: (response) => {
						if (res.data == '游客') {
							this.userInformation.score = 0
						} else {
							this.userInformation.score = response.data.score
						}
						// console.log(response.data.questionList);
						if(response.data.questionList.length==0){
							this.noQuestion=true
							this.$refs.noQuestion.open()
							return 
						}
						response.data.questionList.forEach(i => {
							this.questionList.push(i)
						})
						if (response.data.questionList[0].correctAnswer.includes("#")) {
							this.correctAnswerList = response.data.questionList[0].correctAnswer
								.split("#")
						} else {
							this.correctAnswerList = [response.data.questionList[0].correctAnswer]
						}

						this.getSartColor() //收藏的星星的初始化
					},
					fail: (err) => {
						console.log(err);
					}
				})

			},
			fail: (err) => {
				console.log("normal who不存在");
			}
		})

	},
	methods: {
		updateCorrectionNoteBook(correctOrError) {
			uni.request({
				url: `http://${this.urlPre}:3000/updateCorrectionNoteBook`,
				method: "POST",
				data: {
					who: this.userInformation.who,
					questionBank: this.questionBank,
					userId: this.uid,
					questionId: this.questionList[0].id,
					correctOrError: correctOrError
				}
			})
		},

		onClickLeft() {
			uni.getStorage({
				key: "normalInfo",
				success: (res) => {
					let data = JSON.parse(res.data)
					console.log(data);
					if (data[0] != 0) {
						uni.request({
							url: `http://${this.urlPre}:3000/score`,
							method: "POST",
							data: {
								normalInfo: data,
								username: this.userInformation.who,
								userId: this.uid,
								name: this.questionBank,

							},
							success: () => {
								uni.setStorage({
									key: "normalInfo",
									data: JSON.stringify([0, 0])
								})
							}
						})
					}
				},
				fail: (err) => {
					console.log("普通模式结算请求没发送出去");
					console.log(err);
				}
			})

			uni.navigateBack()
		},
		gotoNext() {
			this.questionList.shift()
			this.hasAnswered = []
			if (this.isShowAnswer == false) { //说明问题还没回答就点下一题了
				this.userInformation.score--
				if (this.userInformation.who != "游客") {
					uni.getStorage({
						key: "normalInfo",
						success: (res) => {
							let data = JSON.parse(res.data)
							data[0]++
							data[1]--
							uni.setStorage({
								key: "normalInfo",
								data: JSON.stringify(data)
							})
						},
						fail: () => {
							uni.setStorage({
								key: "normalInfo",
								data: JSON.stringify([1, this.userInformation.score])
							})
						}
					})
				}
			}
			this.isShowAnswer = false
			this.starColor = "white"
			if (this.questionList[0].correctAnswer.includes("#")) {
				this.correctAnswerList = this.questionList[0].correctAnswer
					.split("#")
			} else {
				this.correctAnswerList = [this.questionList[0].correctAnswer]
			}
			uni.request({
				url: `http://${this.urlPre}:3000/normal?name=${this.questionBank}&username=${this.userInformation.who}&number=1&userId=${this.uid}`,
				success: (res) => {
					res.data.questionList.forEach(i => {
						this.questionList.push(i)
					})
				}
			})
			//模拟数据获取
			// setTimeout(() => {

			// 	this.questionList.push({
			// 		questionClass: "判断题",
			// 		questionTitle: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 		correctAnswer: "true"
			// 	})
			// }, 100)
		},

		// 实现的效果是，选择以后，被选中的那个按钮会亮，然后再展示答案
		showAnswer(item) {

			if (!this.isShowAnswer) {
				console.log(this.correctAnswerList, item);
				if (this.correctAnswerList.includes(item)) {
					this.hasAnswered.push(item)
					if (this.hasAnswered.length == this.correctAnswerList.length) {
						this.userInformation.score++
						this.isShowAnswer = true
						if (this.userInformation.who != "游客") {
							this.updateCorrectionNoteBook.call(this, "correct")
							uni.getStorage({
								key: "normalInfo", //number在前，分数在后
								success: (res) => {
									let data = JSON.parse(res.data)
									data[0]++
									data[1]++
									uni.setStorage({
										key: "normalInfo",
										data: JSON.stringify(data)
									})
								},
								fail: () => {
									uni.setStorage({
										key: "normalInfo",
										data: JSON.stringify([1, this.userInformation.score])
									})
								}
							})
						}
						setTimeout(() => {
							this.gotoNext()
						}, 600)

					}
					return
				} else {
					this.isShowAnswer = true
					this.userInformation.score--
					if (this.userInformation.who != "游客") {
						this.updateCorrectionNoteBook.call(this, "error")
						uni.getStorage({
							key: "normalInfo",
							success: (res) => {
								let data = JSON.parse(res.data)
								data[0]++
								data[1]--
								uni.setStorage({
									key: "normalInfo",
									data: JSON.stringify(data)
								})
							},
							fail: () => {
								uni.setStorage({
									key: "normalInfo",
									data: JSON.stringify([1, this.userInformation.score])
								})
							}
						})
					}
					return
				}
			}



		},
		//收藏或取消收藏
		star() {
			if (this.starColor == "#ff6d00") {
				//取消收藏
				this.starColor = "white"

				//发送取消请求
				uni.request({
					url: `http://${this.urlPre}:3000/star`,
					method: "POST",
					data: {
						questionId: this.questionList[0].id,
						addOrRemove: 'remove',
						username: this.userInformation.who,
						userId: this.uid
					}
				})
			} else {
				this.starColor = "#ff6d00"
				//发送收藏请求
				uni.request({
					url: `http://${this.urlPre}:3000/star`,
					method: "POST",
					data: {
						questionId: this.questionList[0].id,
						addOrRemove: 'add',
						username: this.userInformation.who,
						userId: this.uid
					}
				})
			}
		},
		getSartColor() {
			if (this.questionList[0].isStar) {
				this.starColor = "#ff6d00"

			} else {
				this.starColor = "white"
			}
			return this.starColor
		},
		reduce() {
			if (!this.isShowAnswer) {
				this.isShowAnswer = true
				this.userInformation.score--
				if (this.userInformation.who != "游客") {
					this.updateCorrectionNoteBook.call(this, "error")
					uni.getStorage({
						key: "normalInfo",
						success: (res) => {
							let data = JSON.parse(res.data)
							data[0]++
							data[1]--
							uni.setStorage({
								key: "normalInfo",
								data: JSON.stringify(data)
							})
						},
						fail: () => {
							uni.setStorage({
								key: "normalInfo",
								data: JSON.stringify([1, this.userInformation.score])
							})
						}
					})
				}
			} else {
				this.$refs.hasShowAnswer.open()
			}

		}
	},

};
</script>

<style>
.items {
	/* border: 1rpx solid black; */
}

#wrapper {
	top: calc(var(--status-bar-height)*2);
}

@font-face {
	font-family: "阿里妈妈东方大楷";
	font-weight: 400;
	src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/XRzQeyqgollt.woff2") format("woff2"),
		url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/SYxDK94sZIe1.woff") format("woff");
	font-display: swap;
}

.corret {
	background-color: #48D88A !important;
	color: white !important;
	border: none !important;
}

.error {
	background-color: #FF7F82 !important;
	color: white !important;
	border: none !important;
}

.hasChosen {
	background-color: #fdd835;
}
</style>