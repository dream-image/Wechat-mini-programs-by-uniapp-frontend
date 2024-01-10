"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../wxcomponents/vant/dist/dialog/dialog.js");
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      title: "封神榜",
      errorMessage: ""
    };
  },
  onLoad() {
  },
  methods: {
    gotoHomepage() {
      let id = "";
      const {
        deviceId
      } = common_vendor.index.getSystemInfoSync();
      const time = (/* @__PURE__ */ new Date()).getTime();
      id = time + deviceId;
      common_vendor.index.request({
        url: `http://${this.urlPre}:3000/loginbytour`,
        method: "POST",
        data: {
          uid: id
        },
        success: (res) => {
          common_vendor.index.setStorage({
            key: "token",
            data: res.data.token
          });
          common_vendor.index.setStorage({
            key: "uid",
            data: id
          });
          common_vendor.index.setStorage({
            key: "who",
            data: "游客"
          });
          common_vendor.index.setStorage({
            key: "pictureUrl",
            data: "../../static/人.svg"
          });
          common_vendor.index.navigateTo({
            url: "/pages/homepage/index",
            animationType: "fade-in"
          });
        },
        fail: (e) => {
          console.log(e);
        }
      });
    },
    async wxlogin() {
      try {
        common_vendor.wx$1.showModal({
          title: "温馨提示",
          content: "使用小程序需要授权",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.getUserProfile({
                desc: "登录后可同步数据",
                lang: "zh_CN",
                // provider:"weixin",
                success: (res2) => {
                  console.log(res2);
                  const {
                    nickName,
                    avatarUrl
                  } = res2.userInfo;
                  common_vendor.index.login({
                    provider: "weixin",
                    success: (res3) => {
                      if (res3.errMsg == "login:ok") {
                        const code = res3.code;
                        common_vendor.index.request({
                          url: `http://${this.urlPre}:3000/loginbyuser`,
                          method: "POST",
                          data: {
                            code,
                            nickName,
                            avatarUrl
                          },
                          success: (res4) => {
                            if (res4.statusCode == 200) {
                              common_vendor.index.setStorage({
                                key: "token",
                                data: res4.data.token
                              });
                              console.log(
                                res4.data.avatar
                              );
                              common_vendor.index.setStorage({
                                key: "pictureUrl",
                                data: res4.data.avatar.trim().length == 0 ? "../../static/人.svg" : res4.data.avatar
                              });
                              common_vendor.index.setStorage({
                                key: "who",
                                data: res4.data.username
                                //这里实际放的应该是返回的数据里面用户的username
                              });
                              common_vendor.index.setStorage({
                                key: "uid",
                                data: res4.data.uid
                              });
                              common_vendor.index.reLaunch({
                                url: "/pages/homepage/index",
                                animationType: "fade-in"
                              });
                            } else {
                              this.$refs.errorLogin.open();
                              this.errorMessage = res4.data.message;
                            }
                          },
                          fail: (e) => {
                            console.log(e);
                            this.$refs.errorLogin.open();
                            this.errorMessage = "服务器发生了错误，请联系管理员";
                          }
                        });
                      }
                    }
                  });
                },
                fail: (err) => {
                  console.log(err);
                }
              });
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_van_dialog + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      id: "van-dialog"
    }),
    b: common_vendor.p({
      type: "error",
      message: $data.errorMessage,
      duration: 2e3
    }),
    c: common_vendor.sr("errorLogin", "2f870ed4-1"),
    d: common_vendor.p({
      type: "message"
    }),
    e: common_vendor.t($data.title),
    f: common_vendor.o((...args) => $options.gotoHomepage && $options.gotoHomepage(...args)),
    g: common_vendor.o((...args) => $options.wxlogin && $options.wxlogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
