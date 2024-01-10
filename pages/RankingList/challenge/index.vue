<template>
	<view
		style="position: absolute;width: 100%;height: 100%;display: grid;background-image: url('https://s11.ax1x.com/2024/01/03/pijOXsx.jpg');background-repeat: no-repeat;background-size: cover;">
		<view style="height: 46px;overflow: hidden;position: absolute;width: 100%;height: 100%;" class="items">
			<van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft">
				<template #right>
					<view style="position: relative;width: max-content;color: #6389fa;" @click="onClickRight">
						<van-icon name="wap-home" size="18"
							style="top: 4rpx;bottom: 0;margin: auto;position: relative;" />
					</view>
				</template>
			</van-nav-bar>

		</view>
		<view style="grid-row-start: 2;grid-row-end: 3;position: relative;background-image:url('https://s11.ax1x.com/2024/01/03/pijObW9.png');
			background-size:600rpx 120rpx ;
			background-position: 80rpx -24rpx;
			background-repeat: no-repeat;
		" class="items">
			<span class="items" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;
			width: 90%;text-align: center;font-size:35rpx;line-height: 70rpx;color: #100;
			font-family: '阿里妈妈东方大楷';
			">
				{{questionBank}}挑战模式排行榜
			</span>

		</view>
		<view style="position: relative;">

			<view
				style="left:30rpx;position:absolute;top:400rpx; align-items: center;display: flex;flex-direction: column;">
				<image v-if="personList[1]!=undefined" style="
				    position: absolute;
						  color: white;
				    border-radius: 100%;
				    width: 90rpx;
				    height: 90rpx;
				    top: -250rpx;
					left: 55rpx;
				    bottom: 0;
				    margin: auto 0;
				    right: 90rpx;
				    background-size: cover;
					border: 2px solid white;
					
					" mode="aspectFill" :src="personList[1].img" ></image>
				<image src="../../../static/领奖台.png" style="width: 200rpx;height: 200rpx;" />
				<span style="color: white;top:-110rpx;position:relative;"
					v-if="personList[1]!=undefined">{{personList[1].nickname}}</span>
			</view>
			<view
				style="left:240rpx;position:absolute;top:300rpx; align-items: center;display: flex;flex-direction: column;">
				<image v-if="personList[0]!=undefined" style="
				    position: absolute;
						  color: white;
				    border-radius: 100%;
				    width: 90rpx;
				    height: 90rpx;
				    top: -340rpx;
					left: 95rpx;
				    bottom: 0;
				    margin: auto 0;
				    right: 90rpx;
				    background-size: cover;
						  border: 2px solid white;
						  
						  " mode="aspectFill" :src="personList[0].img"></image>
				<image src="../../../static/领奖台.png" style="width: 280rpx;height: 280rpx;" />
				<span style="color: white;z-index: 100;top:-150rpx;position:relative;"
					v-if="personList[0]!=undefined">{{personList[0].nickname}}</span>
			</view>
			<view
				style="left:530rpx;position:absolute;top:400rpx;text-align: center; align-items: center;display: flex;flex-direction: column;">
				<image v-if="personList[2]!=undefined" style="
				    position: absolute;
					color: white;
				    border-radius: 100%;
				    width: 90rpx;
				    height: 90rpx;
				    top: -270rpx;
					left: 55rpx;
				    bottom: 0;
				    margin: auto 0;
				    right: 90rpx;
				    background-size: cover;
				    border: 2px solid white;
					
						  " mode="aspectFill" :src="personList[2].img"></image>
				<image src="../../../static/领奖台.png" style="width: 200rpx;height: 200rpx;" />
				<span style="color: white;top:-110rpx;position:relative;"
					v-if="personList[2]!=undefined">{{personList[2].nickname}}</span>
				<span style="background-image:url('../../../static/横幅.png') ;
			background-size:600rpx 120rpx ;
			background-position: 80rpx -24rpx;
			background-repeat: no-repeat;z-index: 100;"></span>
			</view>

		</view>
		<view style="grid-row-start: 3;grid-row-end: 16	;position: relative;
				position: relative;
				transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
					  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
					  background-color: rgba(255, 255,255, 0.7);
					  top: 200px;
					  border-radius: 20px 20px 0px 0px;
		" class="items">
			<view
				style="width: 95%; height: 98%;position: absolute;left: 0;right: 0;margin: auto;top: 0;bottom: 0;overflow: auto;"
				class="item">
				<view v-for="i,index in personList" :key="index" v-if="personList.length!=0"
					style="display: flex;width: 90%;justify-content: space-around;font-size: 27rpx;position: relative;left: 0;right: 0;margin:15rpx 20rpx;border-radius: 50rpx; background-color: aliceblue;"
					class="items">
					<span style="white-space: nowrap;width: 35rpx;text-align: center;height: 80rpx;line-height: 80rpx;"
						class="items">{{i.place}}</span>
					<image
						style="height: 60rpx;width: 60rpx;border-radius: 100%;border: 2px solid black;position: relative;top: 0;bottom: 0;margin-top: auto;margin-bottom: auto;
						background-repeat: no-repeat;background-size: cover;
						"
						mode="aspectFill" :src="i.img">
					</image>
					<span
						style="width: 300rpx;height: max-content;position: relative;top: 0;bottom: 0;margin: auto;margin-left: 0;margin-right: 0;"
						class="items">{{i.nickname}}</span>
					<span class="items"
						style="height: 80rpx;line-height: 80rpx;width: 100rpx;text-align: center;">{{i.time}}秒</span>
					<span class="items"
						style="height: 80rpx;line-height: 80rpx;width: 100rpx;text-align: center;">{{i.score}}分</span>

				</view>
			</view>
		</view>
		<view style="grid-row-start: 16;grid-row-end: 18;position: relative;" class="items">
			<view style="width: 95%; height: 98%;position: absolute;left: 0;right: 0;margin: auto;top: 0;bottom: 0;"
				class="item">
				<view
					style="position: absolute;background-color: #fbefda;width: 100%;height: 100rpx;transform: translateY(-13rpx);">
				</view>
				<view
					style="display: flex;width: 90%;justify-content: space-around;font-size: 27rpx;position: relative;left: 0;right: 0;top:0;bottom:0;margin: auto;"
					class="items">
					<span style="white-space: nowrap;width: 35rpx;text-align: center;height: 80rpx;line-height: 80rpx;"
						class="items">{{ userInformation.place }}</span>
					<view style="height: 60rpx;width: 60rpx;border-radius: 100%;border: 2px solid black;position: relative;top: 0;bottom: 0;margin-top: auto;margin-bottom: auto;
					background-repeat: no-repeat;
					background-size: cover;" :style="{backgroundImage: 'url('+userInformation.img+')'}"></view>
					<span
						style="width: 300rpx;height: max-content;position: relative;top: 0;bottom: 0;margin: auto;margin-left: 0;margin-right: 0;"
						class="items">{{userInformation.nickname}}</span>
					<span class="items"
						style="height: 80rpx;line-height: 80rpx;width: 100rpx;text-align: center;">{{userInformation.time}}秒</span>
					<span class="items"
						style="height: 80rpx;line-height: 80rpx;width: 100rpx;text-align: center;">{{userInformation.score}}分</span>

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
				personList: [],
				userInformation: {
					img: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
					time: "0",
					score: "0",
					nickname: "游客",
					place: "无"
				},
				uid: "",
				questionBank: ""
			}
		},
		onLoad(option) {
			//option.name获取题库名字
			this.questionBank = option.name
			this.uid = uni.getStorageSync("uid")
			this.userInformation.img = uni.getStorageSync("pictureUrl")
			uni.getStorage({
				key: "who",
				success: (res) => {
					this.who = res.data
					if (res.data == "游客") {
						this.userInformation = {
							...this.userInformation,
							score: "0",
							nickname: "游客",
							place: "无",
							img:"https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
						}
					} else {
						uni.request({
							url: `http://${this.urlPre}:3000/rankingList`,
							data: {
								username: this.who,
								questionBank: option.name,
								mode: "challenge",
								userId: this.uid
							},
							success: (res) => {
								this.personList = res.data.personList
								this.userInformation={
									...this.userInformation,
									...res.data.userInformation
								} 
							}
						})
					}

				}
			})
		},
		beforeMount() {

		},
		methods: {
			onClickLeft() {
				uni.navigateBack()

			},
			onClickRight() {
				uni.navigateBack({
					delta: 2
				})
			}
		}
	}
</script>

<style>
	.items {
		/* border: 1px solid black; */
	}

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
		font-family: "阿里妈妈东方大楷";
		font-weight: 400;
		src: url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/pkkGqnSNlJje.woff2") format("woff2"),
			url("//at.alicdn.com/wf/webfont/f2wEXLd1xeef/yuNIM3BDJh6A.woff") format("woff");
		font-display: swap;
	}
</style>