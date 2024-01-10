<template>
	<!-- 回到顶部的粘滞按钮 -->
	<view
		style="position: fixed;right: 30rpx;bottom: 80rpx;width: 50rpx;height: 50rpx;z-index: 999;border: 1rpx solid #29b6f6;border-radius: 100%;"
		@click="gotoUp">
		<van-icon name="arrow-up" style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;" color="#29b6f6" />
	</view>
	<view style="position: absolute;width: 100%;height: 100%;background-image: url('https://s11.ax1x.com/2024/01/03/pijX60K.jpg');background-position: -70rpx 70rpx;">
		<view style="width: 100%;text-align: center;margin-top: 30rpx; font-size: 50rpx;
            font-family: '阿里妈妈东方大楷';
			color: #100;
			background-image:url('https://s11.ax1x.com/2024/01/03/pijObW9.png') ;
				background-repeat: no-repeat;background-position: 180rpx -8px;
			">
			题目查询
		</view>
		<view style="display: flex;margin-top: 30rpx;margin-bottom: 30rpx;">
			<view
				style="display: flex;width: 70%;height: 80rpx;border: 2px solid #fda085;border-radius: 9999rpx;position: relative;margin-left: 60rpx;">
				<van-icon name="search" color="#fda085" style="margin-left: 20rpx;" />
				<input type="text" v-model.lazy="searchText"
					style="padding: 12rpx 14rpx;position: relative;top: 6rpx;font-family: '宋体';" placeholder="搜索" />
			</view>
			<van-button color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style="margin-left: 10rpx; border: 20rpx;" round @click="search">搜索</van-button>
		</view>

		<view v-if="realShowList.length!=0">
			<view v-for="i in realShowList" :key="i.id" style="position: relative;">
				<view
					style="border-radius: 15rpx;border-color:#ffa000 ;height: max-content;margin-top: 20rpx;position: relative; width: 90%; left:25rpx;background-color: rgba(255, 255, 255, 0.8);border-radius: 50rpx;padding: 10rpx;">
					<van-button round color="linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)" style="position: absolute; left: 10rpx" size="mini">
						{{ i.type }}
					</van-button>
					<span style="font-family: '宋体';
						line-height: 45rpx;
						letter-spacing: 3rpx;
						font-weight: 400;
						font-family: 阿里妈妈东方大楷;;
						">
						&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{i.title}}
					</span>
					<view v-if="i.type=='单选题'||i.type=='多选题'">
						<button v-for="(j,index) in i.option.split('#')" style="
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
							" :key="index">
							{{j}}

						</button>
					</view>
					<view v-if="i.type=='判断题'">
						<button v-for="(j,index) in ['正确','错误']" style="
						  width: 80%;
						  height: fit-content;
						  border-radius: 9999rpx;
						  padding: 0 5rpx;
						  border: 1px solid orange;text-align: left;padding: 0 30rpx;font-size: small;
						  margin-top: 10rpx;
						" :key="index">
							{{j}}

						</button>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus" color="#29b6f6"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		inject:['urlPre'],
		data() {
			return {
				searchText: "",
				List: [], //题库题目的list
				searchList: [], //搜索到得到题目的list
				loadingStatus: "more", //more是还有数据可以加载 loading是在加载中 noMore是没有数据加载了
				questionBank: "", //当前是哪个题库
				page: 1, //这里1是因为我第一页的获取的页数参数是直接是写死的，后面的获取才用++page   也就是第一次获取和后面的重复触发的获取是两个部分
				searchQuestionPage: 0, //这里0开始是因为每次获取的时候我是 ++searchQuestionPage   这里的第一次获取和后面的获取都是调用同一个函数
				totalQuestionNumber: 0, //题库题目的总数
				totalSearchQuestionNumber: 0, //搜索到的题目的总数
				realShowList: [], //真正放在上面展示的list
				searchPage:1,
			}
		},
		watch: {
			searchText(newV, oldV) {
				
				if (newV == '') {
					this.realShowList.splice(0,this.realShowList.length)
					this.searchList.splice(0,this.searchList.length)
					this.List.slice(0,this.page*20>this.totalQuestionNumber?this.totalQuestionNumber:this.page*20).forEach(i => {
						this.realShowList.push(i)
					})
					if (this.List.length < this.totalQuestionNumber) {
						this.loadingStatus = 'more'
					} else {
						this.loadingStatus = 'moMore'
					}
				}
			}

		},
		onReachBottom() { //声明周期中监听到达到底部的钩子
			console.log("到底部了")
			if (this.loadingStatus != 'noMore') {
				this.loadingMore()
			}

		},
		onLoad(option) {
			//option.name是题库名字
			this.questionBank = option.name
			uni.request({
				url: `http://${this.urlPre}:3000/searchList`,
				data: {
					questionBank: option.name
				},
				success: (res) => {
					this.totalQuestionNumber = res.data.totalQuestionNumber
					let list = res.data.questionList
					list.forEach(i => {
						this.List.push(i)
					})
					
					if (this.List.length >20) {
						this.loadingStatus = "more"
						list.slice(0,20).forEach(i=>{
							this.realShowList.push(i)
						})
					} else {
						this.loadingStatus = "noMore"
						list.forEach(i=>{
							this.realShowList.push(i)
						})
					}
				},
				fail: (err) => {
					console.log(err)
				}
			})
			// //模拟数据获取
			// setTimeout(()=>{
			// 	let list=[{
			// 			id: "1",
			// 			title: "古希腊学者欧布里德曾经提出一个悖论，其大意是：一粒谷粒不能成为谷堆，再加上一粒也不能成为谷堆；所以如果现有的谷粒数不成为谷堆，那么在这个基础上每次只加一粒谷粒，则谷堆一直不能形成，这个悖论被称为“谷堆悖论”。“谷堆悖论”的错误在于（）。",
			// 			type: "选择题",
			// 			answer: "A",
			// 			option: "这是A#这是B#这是C"
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		},
			// 		{
			// 			id: "2",
			// 			title: "在社会主义建设取得了重大成就，社会主义制度有了长足进步之后，资本主义的进攻方式则往往转变为以“和平演变”为主。",
			// 			type: "判断题",
			// 			answer: "正确",
			// 			option: ""
			// 		}
			// 	]


			// },1000)
		},
		methods: {
			search() {
				console.log("触发搜索", this.searchText)
				if (this.searchText != '') {
					this.searchPage=1
					this.realShowList.splice(0,this.realShowList.length)
					this.searchList.splice(0,this.searchList.length)
					this.searchList=this.List.filter(i=>{
						return i.title.indexOf(this.searchText)!=-1
					})

					if(this.searchList.length<20){
						this.searchList.forEach(i=>{
							this.realShowList.push(i)
						})
						this.loadingStatus="noMore"
					}else{
						this.searchList.slice(0,20).forEach(i=>{
							this.realShowList.push(i)
						})
						this.loadingStatus="more"
					}

				}
			},
			loadingMore() {
				console.log("触发更新")
				if (this.searchText == '') { //如果搜索的内容不为空，说明这次更新数据是更新的搜索的
					this.loadingStatus = 'loading'
					this.page++
					if(this.List.length-this.realShowList.length>=20){
						this.List.slice((this.page-1)*20,this.page*20).forEach(i=>{
							this.realShowList.push(i)
						})
						
						this.loadingStatus="more"
					}else{
						this.List.slice((this.page-1)*20,this.List.length).forEach(i=>{
							this.realShowList.push(i)
						})
							this.loadingStatus="noMore"
					}
				} else {
					this.loadingStatus = "loading"
					this.searchPage++
					if(this.searchList.length-this.realShowList.length>=20){
						this.searchList.slice((this.page-1)*20,this.page*20).forEach(i=>{
							this.realShowList.push(i)
						})
						
						this.loadingStatus="more"
					}else{
						this.searchList.slice((this.page-1)*20,this.searchList.length).forEach(i=>{
							this.realShowList.push(i)
						})
							this.loadingStatus="noMore"
					}
				}
			},
			gotoUp() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}
		}
	}
</script>

<style>
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: "阿里妈妈东方大楷";
		font-weight: 400;
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/Tos5UqOGnmwm.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/ljznQKBn7CHU.woff") format("woff");
		font-display: swap;
	}
</style>