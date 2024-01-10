<template>
	<van-dialog id="van-dialog" />
	<uni-popup ref="noRecord" type="message">
		<uni-popup-message type="error" message="没有回答记录" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="sucessPicture" type="message">
		<uni-popup-message type="sucess" message="修改成功" :duration="2000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="errorPicture" type="message" >
		<uni-popup-message type="error" :message="changePictureError" style="z-index: 99999;" :duration="2000"></uni-popup-message>
	</uni-popup>
	<template v-if="isShowChoosePicture">
		<view style="position: absolute;width: 90%;height: 54%;border: 1px white solid;border-radius: 30rpx;display: flex;
			flex-direction: column;background-color: white;left: 0;right: 0;margin: auto;z-index:9999;top: 12%;">
			<image style="width: 90%;height: 54%;display: flex;margin:0 auto;margin-top: 80rpx;
			z-index: 9999;
			 border-radius: 8px;" mode='aspectFit' :src="pictureUrl"
			@click="previewPicture"
			></image>
			<vew style="width: 100%;justify-content: space-evenly;display: flex;top: 100rpx;position: relative;">
				<van-button size="normal" plain type="primary" round color="#ff8f00" @click="cancelPicture">取消</van-button>
				<van-button size="normal" plain type="primary" round color="#ff8f00" @click="sureChangePicture"> 确认</van-button>
			</vew>
		</view>
		<view style="position: absolute;width: 100%;height: 100%;background-color: #bdbdbd;opacity: 0.6;
		z-index: 9998; top: 46px;" @click="isShowChoosePicture=false" >
			
		</view>
	</template>
	

	<view style="
      display: grid;
      grid-template-rows: 4;
      position: absolute;
      width: 100%;
      height: 100%;
    ">
		<view style="height: 46px;overflow: hidden;position: absolute;width: 100%;height: 100%;" class="items">
			<van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
		</view>
		<view style="grid-row-start: 2; grid-row-end: 5; position: relative" class="items">
			<view style="
          width: 230rpx;
          height: 230rpx;
          border-radius: 100%;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: 0;
          bottom: 0;
          background-size: cover;
        "  :style="{backgroundImage:'url('+avatar+')'}"
		@click="changeAvatar">
				<uni-icons type="camera-filled" style="position: absolute; bottom: 0; right: 25rpx"
					size="30"></uni-icons>
			</view>
		</view>
		<view style="grid-row-start: 5; grid-row-end: 7; position: relative" class="items">
			<view style="
			display: grid;
			position: absolute;
			width: 100%;
			height: 100%;
			grid-template-rows: 2;
			">
				<view style="
            grid-row-start: 1;
            grid-row-end: 2;
            width: 300rpx;
            text-align: center;
            position: relative;
            left: 40rpx;
            right: 0;
            margin: auto;
			display: flex;
          ">
					<span style="width: 140rpx;">昵称：</span>
					<view v-if="!nicnNameChanging" style="width: 180rpx;text-align: left;">{{ nickname }}</view>
					<input v-if="nicnNameChanging" v-model.lazy="nickname" type="" style="width: 180rpx;
					border: solid 1px black;border-radius: 9999rpx;padding: 5rpx;text-align: left;
					" @blur="changeNickname(true)" />
					<view style="transform: translateY(5rpx);display: inline-block;">
						<uni-icons type="compose" size="22" @click="changeNickname(false)"></uni-icons>
					</view>

				</view>
				<view style="
            grid-row-start: 2;
            grid-row-end: 3;
            width: 300rpx;
            text-align: center;
            position: relative;
            left: 0;
            right: 0;
            margin: auto;
          ">
					<uni-data-select v-model="questionBank" :localdata="range" @change="change"
						placeholder="请选择题库信息"></uni-data-select>
				</view>
			</view>
		</view>

		<view style="grid-row-start: 7; grid-row-end: 17;position: relative;" class="items">
			<van-tabs v-model:active="active" lazy-render="false" type="card" color="#79bbff" @change="changeMode">
				<van-tab title="普通模式"></van-tab>
				<van-tab title="挑战模式"></van-tab>
			</van-tabs>
			<view style="height: 80%;width: 90%;position: relative;left: 0;right: 0;margin: auto;top: 20rpx;z-index:1" id="main"
				v-if="isShowPicture">
				<view v-if="showWhat == '普通模式'">

					<canvas canvas-id="common" id="common" style="position: absolute;width: 100%;height: 100%;"
						@tap="tap"></canvas>
				</view>
				<view v-if="showWhat == '挑战模式'">
					<canvas canvas-id="challenge" id="challenge" style="position: absolute;width: 100%;height: 100%;"
						@tap="tap"></canvas>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from "./u-charts.min.js";
	var uChartsInstance = {};
	export default {
		inject:['urlPre'],
		data() {
			return {
				nickname: "",
				questionBank: "",
				range: [],
				active: 0, //0是common,1是challenge
				showWhat: "普通模式",
				cWidth: 350,
				cHeight: 380,
				who: "",
				isShowPicture: true, //当记录为空的时候会被我的trycatch捕捉，然后这里设置为false
				nicnNameChanging: false,
				uid: "",
				isShowChoosePicture:false, //修改图片的界面
				pictureUrl:"../../static/搜索无结果.svg",
				changePictureError:"",
				avatar:""
			};
		},
		onReady() {
			this.uid = uni.getStorageSync("uid")
			uni.createSelectorQuery().select("#main").fields({
				size: true
			}, (res) => {
				this.cWidth = res.width
				this.cHeight = res.height
			}).exec()
			let who = uni.getStorageSync("who")
			this.who = who
			uni.request({
				url: `http://${this.urlPre}:3000/person`,
				data:{
					username:who,
					userId:this.uid
				},
				success: (res) => {
					console.log(res.data.nickname);
					this.nickname = res.data.nickname
					this.range = res.data.range
					this.questionBank = res.data.range[0].text
					this.getServerData(res.data.range[0].text, "common")
					
				}
			})
			
			let avatar=uni.getStorageSync("pictureUrl")
			this.avatar=avatar
		},
		methods: {
			change() {
				try {
					let res = this.range.find(i => {
						return i.text == this.questionBank
					})
					// console.log(res);
					let model = this.showWhat == "普通模式" ? "common" : "challenge"
					this.drawCharts(model, res[model], res.text);
				} catch (e) {
					this.$refs.noRecord.open()
					this.isShowPicture = false
				}

			},
			onClickLeft() {
				uni.navigateBack({
					animationType: "fade-out"
				})
			},
			changeMode(context) {
				this.showWhat = context.detail.title
				this.getServerData(this.questionBank, context.detail.title == '普通模式' ? "common" : "challenge")
			},
			changeAvatar() {
				this.isShowChoosePicture=true
				let that=this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						that.pictureUrl=res.tempFilePaths[0]
						console.log(that.pictureUrl);
					}
				});
			},
			previewPicture(){
				console.log(this.pictureUrl);
				uni.previewImage({
					urls: [this.pictureUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
			,
			changeNickname(value) {
				if (value) {
					this.nicnNameChanging = false
					uni.request({
						url: `http://${this.urlPre}:3000/changeNickname`,
						method: "post",
						data: {
							nickname: this.nickname,
							username: this.who,
							userId: this.uid
						},
						success: (res) => {

						}
					})
				} else {
					this.nicnNameChanging = true
				}

			},
			cancelPicture(){
				this.isShowChoosePicture=false
				this.pictureUrl="../../static/搜索无结果.svg"
			}
			,
			sureChangePicture(){
				console.log(this.pictureUrl);
				uni.request({
					url:`http://${this.urlPre}:3000/changePicture`,
					method:"POST",
					data:{
						url:this.pictureUrl,
						userId:this.uid
					},
					success: (res) => {
						if(res.statusCode!=200){
							this.changePictureError=res.data.message
							this.$refs.errorPicture.open()
						}else{
								this.$refs.sucessPicture.open()
								this.avatar=this.pictureUrl
								uni.setStorage({
									key:"pictureUrl",
									data:this.pictureUrl
								})
								this.isShowChoosePicture = false
						}
					
					},
					fail: (err) => {
						this.changePictureError=err.errMsg
						this.$refs.errorPicture.open()
						
					}
				})
			}
			,
			getServerData(questionBank, model) {
				try {

					let res = this.range.find(i => {

						return i.text == questionBank
					})

					this.drawCharts(model, res[model], questionBank);
				} catch (e) {
					this.$refs.noRecord.open()
					this.isShowPicture = false
				}

			},
			drawCharts(id, data, questionBank) { // id是渲染选择id是common还是challenge的view
				//data是数据，questionBank是哪个题库
				this.isShowPicture = true
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "line",
					context: ctx,
					title: {
						name: id == "common" ? `${questionBank}普通模式记录` : `${questionBank}挑战模式记录`,
						fontSize: 100,

					},
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272",
						"#FC8452", "#9A60B4", "#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					xAxis: {
						disableGrid: true,
						rotateAngle: 25,
						rotateLabel: true
					},
					yAxis: {
						showTitle: true,
						gridType: "dash",
						dashLength: 2,
						data: [{
								title: "分数",
								max:id == "common"?null:300
							},
							{
								title: "时间s",
								position: "right",
								
							}
						].filter((i, index) => {
							if (id == "common")
								return index == 0
							else return true
						})

					},
					extra: {
						line: {
							type: "straight",
							animation: "horizontal",
							activeType: "solid",
							width: 2
						}
					}
				});
			},
			tap(e) {
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		},
	};
</script>

<style>
	.items {
		/* border: solid 1px black; */
	}
.wrapper2 {
		top: calc(var(--status-bar-height)*2);
		position: absolute;
	}
	.content {
		border: solid 1px black;
		height: 500rpx;
		width: 100%;
	}
</style>