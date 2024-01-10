<template>

	<van-dialog id="van-dialog" />
	<uni-popup ref="errorLogin" type="message">
		<uni-popup-message type="error" :message="errorMessage" :duration="2000"></uni-popup-message>
	</uni-popup>
	<view class="content" style="">

		<image class="logo" src="../../static/background2.png"
			style="position: absolute;top:0;bottom:0;margin:auto;width: 600rpx;height: 600rpx;"></image>
		<text class="title"
			style="font-size: 80rpx;color: #9B7D31; position: absolute;top: 100rpx;bottom: 0;font-family: '阿里妈妈东方大楷1';">{{title}}</text>
		<view
			style="position: absolute;display: flex;justify-content: space-between;bottom: 160px;justify-content: space-between;width: 100%;">
			<button style="position: relative;width: 250rpx;height: 80rpx;background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%, #ffecd2 100%);display:flex;align-items: center;transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* 添加过渡效果使悬浮更平滑 */
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);padding-left: 10rpx;align-items: center;" @click="gotoHomepage">
				<view class="btn" style="display: flex;width: max-content;justify-content: center;align-items: center;">
					<image src="../../static/人.svg" mode=" aspectFit" style="width: 30px;height: 40px;"></image>
					<span style="font-size: 15px; color:#100;display:flex;align-items: center; width: max-content;	">
						游客访问
					</span>
				</view>
			</button>
			<button style="position: relative;width: 250rpx;height: 80rpx;background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%, #ffecd2 100%);display:flex;align-items: center;transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* 添加过渡效果使悬浮更平滑 */
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);padding-left: 10rpx;align-items: center;" @click="wxlogin">
				<view class="btn" style="display: flex;width: max-content;justify-content: center;align-items: center;">
					<image src="../../static/wechat.svg" mode=" aspectFit" style="width: 30px;height: 40px;"></image>
					<span style="font-size: 15px; color:#100;display:flex;align-items: center; width: max-content;	">
						微信登陆
					</span>
				</view>

			</button>

		</view>



	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/vant/dist/dialog/dialog.js';
	export default {
		inject: ['urlPre'],
		data() {
			return {
				title: '封神榜',
				errorMessage: ""
			}
		},
		onLoad() {

		},
		methods: {

			gotoHomepage() {
				let id = ""
				const {
					deviceId
				} = uni.getSystemInfoSync();
				const time = new Date().getTime();
				id = time + deviceId
				uni.request({
					url: `http://${this.urlPre}:3000/loginbytour`,
					method: "POST",
					data: {
						uid: id
					},
					success: (res) => {
						uni.setStorage({
							key: "token",
							data: res.data.token
						})
						uni.setStorage({
							key: "uid",
							data: id
						})
						uni.setStorage({
							key: "who",
							data: "游客"
						})
						uni.setStorage({
							key: "pictureUrl",
							data: "../../static/人.svg"
						})
						uni.navigateTo({
							url: "/pages/homepage/index",
							animationType: "fade-in"

						})
					},
					fail: (e) => {
						console.log(e);
					}
				})

			},
			async wxlogin() {
				// try {
				// 	let {
				// 		code
				// 	} = await wx.login()
				// 	let {
				// 		userStatus
				// 	} = await wx.request({ //不知道这里返回的叫啥，暂时叫userStatus好了
				// 		url: "", //这里填后端的接口地址,
				// 		data: {
				// 			code: code
				// 		}
				// 	})

				// 	uni.setStorage({
				// 		key:"userStatus",
				// 		data:userStatus
				// 	}) //将数据加入到本地缓存
				// } catch (e) {
				// 	Dialog.alert({
				// 		title: '发生了错误',
				// 		message: e,
				// 	})
				// }

				//下面这个只是临时测试使用，正式的还是用上面被注释的
				// uni.request({
				// 	url: "http://47.98.129.119:3000/loginbyuser",
				// 	method: "POST",
				// 	data: {
				// 		uid: 1,
				// 		username: "zhanghua"
				// 	},
				// 	success: (res) => {
				// 		console.log(res);
				// 		if (res.statusCode == 200) {
				// 			uni.setStorage({
				// 				key: "token",
				// 				data: res.data.token
				// 			})
				// 			uni.setStorage({
				// 				key: "pictureUrl",
				// 				data: res.data.avatar == "" ? "../../static/人.svg" : res.data
				// 					.avatar
				// 			})
				// 			uni.setStorage({
				// 				key: "who",
				// 				data: res.data.username //这里实际放的应该是返回的数据里面用户的username
				// 			})
				// 			uni.setStorage({
				// 				key: "uid",
				// 				data: res.data.uid
				// 			})

				// 			uni.navigateTo({
				// 				url: "/pages/homepage/index",
				// 				animationType: "fade-in"
				// 			})

				// 		} else {
				// 			this.$refs.errorLogin.open()
				// 			this.errorMessage = res.data.message
				// 		}

				// 	},
				// 	fail: (e) => {
				// 		console.log(e);
				// 		this.$refs.errorLogin.open()
				// 		this.errorMessage = "服务器发生了错误，请联系管理员"
				// 	}
				// })
				// console.log("谢毅是个傻逼")
				try {
					// await (() => {
					// 	return new Promise((resolve, reject) => {
					// 		uni.authorize({
					// 			scope: "scope.userInfo",
					// 			success: () => {
					// 				console.log("已授权");
					// 				resolve()

					// 			},
					// 			fail: (err) => {
					// 				console.log(err);
					// 				reject()
					// 			}
					// 		})
					// 	})
					// })()
					wx.showModal({
						 title: '温馨提示',
						content: '使用小程序需要授权',
						success: (res) => {
							if(res.confirm){
								uni.getUserProfile({
									desc: '登录后可同步数据',
									lang: 'zh_CN',
									// provider:"weixin",
									success: (res) => {
										console.log(res);
										const {
											nickName,
											avatarUrl
										} = res.userInfo
										uni.login({
											provider: 'weixin',
											success: (res) => {
												if (res.errMsg == 'login:ok') {
													const code = res.code;
													uni.request({
														url: `http://${this.urlPre}:3000/loginbyuser`,
														method: "POST",
														data: {
															code: code,
															nickName: nickName,
															avatarUrl: avatarUrl
														},
														success: (res) => {
															if (res
																.statusCode ==
																200) {
																uni.setStorage({
																	key: "token",
																	data: res
																		.data
																		.token
																})
																console.log(res
																	.data
																	.avatar
																);
																uni.setStorage({
																	key: "pictureUrl",
																	data: res
																		.data
																		.avatar
																		.trim()
																		.length ==
																		0 ?
																		"../../static/人.svg" :
																		res
																		.data
																		.avatar
																})
																uni.setStorage({
																	key: "who",
																	data: res
																		.data
																		.username //这里实际放的应该是返回的数据里面用户的username
																})
																uni.setStorage({
																	key: "uid",
																	data: res
																		.data
																		.uid
																})
								
																uni.reLaunch({
																	url: "/pages/homepage/index",
																	animationType: "fade-in"
																})
								
															} else {
																this.$refs
																	.errorLogin
																	.open()
																this.errorMessage =
																	res.data
																	.message
															}
														},
														fail: (e) => {
															console.log(e);
															this.$refs
																.errorLogin
																.open()
															this.errorMessage =
																"服务器发生了错误，请联系管理员"
														}
													})
												}
											},
										});
									},
									fail: (err) => {
										console.log(err);
									}
								})
							}
						}
					})
					
				} catch (e) {
					console.log(e);
				}

				


			}
		}
	}
</script>

<style>
	.btn:hover {
		background-position: right center;
		/* change the direction of the change here */
	}

	.btn {
		flex: 1 1 auto;
		margin: 10px;
		text-align: center;
		text-transform: uppercase;
		transition: 0.5s;
		background-size: 200% auto;
		color: white;

		/* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url("https://z1.ax1x.com/2023/10/30/pimqjC6.png");
		background-size: contain;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}


	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
</style>