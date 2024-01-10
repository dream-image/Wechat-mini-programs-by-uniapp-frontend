<template>
	<uni-popup ref="lastQuestion" type="message">
		<uni-popup-message type="warning" message="这是最后一题啦" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="firstQuestion" type="message">
		<uni-popup-message type="warning" message="这已经是第一题啦" :duration="2000"></uni-popup-message>
	</uni-popup>
	<view
		style="position: absolute;width: 100%;height: 100%;display: grid;background-image: url('https://s11.ax1x.com/2024/01/09/pFpla8K.jpg')">
		<view style="height: 46px;overflow: hidden;position: absolute;width: 100%;height: 100%;" class="items">
			<van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft">
				<template #right>
					<view style="color:#1989fa;">
						<switch @change="isShowAllAnswer=!isShowAllAnswer" color="#1989fa"
							style="transform:scale(0.7)" />答案
					</view>
				</template>
			</van-nav-bar>

		</view>
		<view style="grid-row-start: 2;grid-row-end: 3;position: relative;" class="items" v-if="isNoErrorQuestion">
			<span class="items" style="position: absolute;left: 0;right: 0;bottom: 30rpx;margin: auto;
			width: 90%;text-align: center;font-size:35rpx;color: #f57f17;
			font-family: '阿里妈妈东方大楷';transform: translateY(1em);
			">
				<view>
					恭喜你，没有错题噢
					<view style="font-size: 16rpx;">注：只记录普通模式错题，且做对三次后会被移除</view>
				</view>
			</span>
		</view>
		<view style="grid-row-start: 3;grid-row-end: 4;position: relative;" class="items"
			v-if="questionList.length==0&& !isNoErrorQuestion">
			<span class="items" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;
			width: 90%;text-align: center;font-size:55rpx;color: #f57f17;
			font-family: '阿里妈妈东方大楷';
			">
				<view>
					加载中
					<view style="font-size: 16rpx;"></view>
				</view>
			</span>
		</view>
		<view style="grid-row-start: 3;grid-row-end: 4;position: relative;" class="items"
			v-if="questionList.length!=0 && !isNoErrorQuestion">
			<span class="items" style="position: absolute;left: 0;right: 0;bottom: 60rpx;margin: auto;
			width: 90%;text-align: center;font-size:40rpx;color: #100;
			
			">
				<view style="background-image:url('../../../static/横幅.png') ; background-repeat: no-repeat;background-position: 130rpx -10px;font-weight: bold;background-size: 420rpx;">
					{{whatQuestionBank}}题库错题本
					<view style="font-size: 30rpx; position: absolute;top:65rpx">注：只记录普通模式错题，且做对三次后会被移除</view>
				</view>
			</span>
		</view>
		<view style="grid-row-start: 4;grid-row-end: 16	;width: 90%;margin:0rpx 45rpx;position: relative;background-color: rgba(255, 255, 255, 0.8);border-radius: 50rpx;" class="items"
			v-if="questionList.length!=0 && !isNoErrorQuestion">

			<view
				style="border-radius: 15rpx;border-color:#ffa000 ;height: max-content;position: absolute;width: 100%;">
				<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style="position: absolute; left: 30rpx;top: 35rpx;" size="mini">
					{{ questionList[questionIndex].answer.length==1?"单选题":"多选题" }}
					
				</van-button>
				<span style="
					font-family: '宋体';
						line-height: 45rpx;
						letter-spacing: 3rpx;
						font-weight: 400;
						width: 650rpx;
						position: relative;
						display: block;
						left: 0;
						right: 0;
						margin: auto;
						top: 40rpx;
						font-family: '阿里妈妈东方大楷1';overflow: auto;
						">
					&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{questionList[questionIndex].title}}
				</span>
				<view v-if="questionList[questionIndex].type=='选择题'"
					style="position: absolute;width: 100%; top: 160rpx;">
					<button v-for="(j,index) in questionList[questionIndex].option.split('#')" @click="showAnswer(j)"
						style="
							  width: 80%;
							  height: fit-content;	
							  min-height: 120rpx;
							  border-radius: 9999rpx;							  
							  align-items: center;
							  display: flex;
							  padding: 2rpx 2rpx;
							  margin:40rpx 60rpx ;
							  border: 1px solid orange;text-align: left;padding: 0 50rpx;font-size: 4vw;
							  color: #100;
							  line-height: 1.5;
							" :key="index"
						:class="buttonStyle?questionList[questionIndex].answer.includes(j)?'correctButton':'errorButton':questionList[questionIndex].isChosen.includes(j)?'chosenButton':null ">

						{{j}}
						<!-- <template v-if="questionList[questionIndex].isChosen==index">
							<van-icon name="success" v-if="findLetterIndex(questionList[questionIndex].answer)==index"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#67C23A" />
							<van-icon name="cross" v-if="findLetterIndex(questionList[questionIndex].answer)!=index"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#F56C6C" />
						</template> -->

					</button>
				</view>
				<view v-if="questionList[questionIndex].type=='判断题'"
					style="position: absolute;top: 60rpx;width: 100%;top: 330rpx;">
					<button v-for="(j,index) in ['正确','错误']" @click="showAnswer(j)" style="
						  display: flex;
						  align-items: center;
						  margin-bottom: 60rpx;
						  width: 80%;
						  height: 120rpx;
						  border-radius: 9999rpx;
						  border: 1px solid orange;text-align: left;font-size: 27rpx	;
						" :key="index"
						:class="buttonStyle?questionList[questionIndex].answer.includes(j)?'correctButton':'errorButton':questionList[questionIndex].isChosen.includes(j)?'chosenButton':null ">
						{{j}}
						<!-- 	
						<template v-if="questionList[questionIndex].isChosen==index">
							<van-icon name="success" v-if="j=='正确'"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#67C23A" />
							<van-icon name="cross" v-if="j=='错误'"
								style="position: absolute;right: 30rpx;top: 0;bottom: 0;margin: auto;"
								color="#F56C6C" />
						</template>
						 -->
					</button>
				</view>
			</view>
			<view
				style="position: absolute;bottom: 70rpx;width: 100%;height: 100rpx;display: flex;justify-content: space-around;"
				class="items">
				<button class="mini-btn"  size="mini" style="height: 73rpx;padding: 10rpx 10rpx;
				width: 73rpx;margin-right: 20rpx;color: linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%);
				" @click="questionIndex!=0?questionIndex--:$refs.firstQuestion.open()"><van-icon name="arrow-left" /></button>

				<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="star" style="margin-right: 10rpx;">
					<van-icon name="star" :color="questionList[questionIndex].isStar==true?'#f57f17':'white'" />
				</van-button>

				<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" @click="questionList[questionIndex].isShowAnswer=true">不会</van-button>

				<button class="mini-btn" size="mini" style="height: 73rpx;padding: 10rpx 10rpx;
				width: 73rpx;margin-left: 20rpx;background-color: linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%);"
					@click="questionIndex!=questionList.length-1?questionIndex++:$refs.lastQuestion.open()"><van-icon
						name="arrow" /></button>
			</view>
		</view>
		<view style="grid-row-start: 16;grid-row-end: 18;position: relative;" class="items">

		</view>
	</view>
</template>

<script>
	export default {
		inject:['urlPre'],
		data() {
			return {

				questionList: [],
				//上下题目的转换就改变这个数组下标就好
				questionIndex: 0,
				isShowAllAnswer: false, //是否展示所有答案
				isNoErrorQuestion: false, //错题集是否为空，如果是空的话会有单独的恭喜提示
				whatQuestionBank: "", //哪个题库的
				who: "",
				uid: "",

			}
		},

		onLoad(option) {
			//option.name 获取题库名称
			uni.getStorage({
				key: "who",
				success: (res) => {
					this.who = res.data
				}
			})
			this.uid = uni.getStorageSync("uid")
			this.whatQuestionBank = option.name
			uni.getStorage({
				key: "who",
				success: (res) => {
					uni.request({
						url: `http://${this.urlPre}:3000/correctNoteBook`,
						data: {
							username: res.data,
							questionBank: option.name,
							userId: this.uid
						},
						success: (res) => {
							let list = res.data.questionList
							list.forEach(i => {
								this.questionList.push(i)
							})
							console.log(list);
							if (list.length == 0) {
								this.isNoErrorQuestion = true //如果长度为0那就说明没有错题
							}

						}
					})
				}
			})

			// setTimeout(()=>{
			// 	let list =[{
			// 			title: "古希腊学者欧布里德曾经提出一个悖论，其大意是：一粒谷粒不能成为谷堆，再加上一粒也不能成为谷堆；所以如果现有的谷粒数不成为谷堆，那么在这个基础上每次只加一粒谷粒，则谷堆一直不能形成，这个悖论被称为“谷堆悖论”。“谷堆悖论”的错误在于（）。",
			// 			type: "选择题",
			// 			answer: "A",
			// 			option: "这是A#这是B#这是C#这是DDDD",
			// 			isStar: false,
			// 			isShowAnswer: false,
			// 			isChosen: "null",
			// 			questionId: "9dj1p0d1"
			// 		},
			// 		{
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			isStar: false,
			// 			isShowAnswer: false,
			// 			isChosen: "null",
			//			questionId: "9dj10-1jddxmalosp0d1"
			// 		}
			// 	]

			// 	this.questionList=list
			// 	if(list.length==0){
			// 		this.isNoErrorQuestion=true
			// 	}
			// 	this.isNoErrorQuestion=true
			// },1000)
		},
		computed: {
			buttonStyle() {
				return this.questionList[this.questionIndex].isShowAnswer || this.isShowAllAnswer
			},

		},
		watch: {

		},
		methods: {
			judge(a, b) {
				//判断a数组是否被b数组包含
				return a.every((i, index) => {
						return b.includes(i)
					}) 
			},
			onClickLeft() {
				uni.navigateBack()
			},
			findLetterIndex(letter) {
				let a = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
				return a.findIndex((i) => {
					return i == letter
				})
			},
			showAnswer(item) {
				this.questionList[this.questionIndex].isChosen.push(item)
				let chosen=this.questionList[this.questionIndex].isChosen
				let question=this.questionList[this.questionIndex]
				console.log(chosen,question.answer);
				if (!question.isShowAnswer) {
					if (chosen.length <= question.answer.length) {
						if (!this.judge(chosen,question.answer)) {
							setTimeout(()=>{
								question.isShowAnswer = true
							},300)
							
						} else if (chosen.length == question.answer.length) {
							setTimeout(()=>{
								question.isShowAnswer = true
							},300)
						}
					}
				}
			},
			star() {
				uni.request({
					url: `http://${this.urlPre}:3000/star`,
					method: "POST",
					data: {

						questionId: this.questionList[this.questionIndex].questionId,
						addOrRemove: this.questionList[this.questionIndex].isStar == true ? "remove" :
						"add", //如果该题的已经收藏，那么就取消收藏
						username: this.who,
						userId: this.uid
					},
					success: () => {
						this.questionList[this.questionIndex].isStar = !this.questionList[this.questionIndex]
							.isStar
					}
				})
			},
		}
	}
</script>

<style>
	.items {
		/* border: 1px solid black; */
	}

	.correctButton {
		background-color: #48D88A;
	}

	.errorButton {
		background-color: #FF7F82;
	}
	.chosenButton{
		background-color: #ffb300;
	}

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: "阿里妈妈东方大楷";
		font-weight: 400;
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/pkkGqnSNlJje.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/yuNIM3BDJh6A.woff") format("woff");
		font-display: swap;
	}

	.icon-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		font-size: 18rpx;
	}

	.icon-wrapper .van-icon-success {
		line-height: 32rpx;
		color: "#67C23A";
	}

	.icon-wrapper .van-icon-cross {
		line-height: 32rpx;
		color: "Danger";
	}
</style>