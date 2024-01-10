"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      questionBankList: [],
      imgs: [],
      content: ["first", "left", "middle", "right", "last"],
      who: "",
      pictureUrl: "../../static/人.svg"
    };
  },
  onShow() {
    console.log("生命钩子触发");
    let pictureUrl = common_vendor.index.getStorageSync("pictureUrl");
    if (pictureUrl != "") {
      this.pictureUrl = pictureUrl;
    }
  },
  onLoad() {
  },
  beforeMount() {
    common_vendor.index.getStorage({
      key: "who",
      success: (res) => {
        this.who = res.data;
      }
    });
    common_vendor.index.getStorage({
      key: "token",
      success: (res) => {
        console.log(res);
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/questionBankList`,
          method: "GET",
          header: {
            token: res.data
          },
          success: (res2) => {
            console.log(res2);
            this.questionBankList = res2.data.questionBankList;
            if (this.questionBankList.length <= 3) {
              this.content = ["left", "middle", "right"];
            } else {
              this.content = ["first", "left", "middle", "right", "last"];
            }
          },
          fail(err) {
            console.log(err);
          }
        });
      }
    });
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
      if (this.who == "游客") {
        this.$refs.pleaseLogin.open();
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/person/index",
          animationType: "fade-in"
        });
      }
    },
    gotoRankingList(topic, position) {
      console.log(topic);
      if (position == "middle") {
        console.log("允许跳转");
        common_vendor.index.navigateTo({
          url: "/pages/RankingList/normal/index?name=" + topic,
          animationType: "pop-in"
        });
      }
    },
    gotoAnswer(target) {
      common_vendor.index.createSelectorQuery().select("#middle").fields({ dataset: true }, (context) => {
        console.log(context.dataset.name);
        common_vendor.index.navigateTo({
          url: `/pages/startAnswer/${target}/index?name=${context.dataset.name}`,
          animationType: "pop-in"
        });
      }).exec();
    },
    gotoSearch(topic, position) {
      console.log(topic);
      if (position == "middle") {
        console.log("允许跳转");
        common_vendor.index.createSelectorQuery().select("#middle").fields({ dataset: true }, (context) => {
          common_vendor.index.navigateTo({
            url: "/pages/search/index?name=" + context.dataset.name,
            animationType: "fade-in"
          });
        }).exec();
      }
    },
    gotoCN(topic, position) {
      if (this.who == "游客") {
        this.$refs.pleaseLogin.open();
      } else {
        console.log(topic);
        if (position == "middle") {
          console.log("允许跳转");
          common_vendor.index.navigateTo({
            url: "/pages/correctionNotebook/index?name=" + topic,
            animationType: "fade-in"
          });
        }
      }
    },
    gotoStar() {
      if (this.who == "游客") {
        this.$refs.pleaseLogin.open();
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/starList/index"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "error",
      message: "抱歉游客不可使用,请登陆再试",
      duration: 2e3
    }),
    b: common_vendor.sr("pleaseLogin", "053ba1c0-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.o((...args) => $options.gotoStar && $options.gotoStar(...args)),
    e: $data.pictureUrl,
    f: common_vendor.o((...args) => $options.gotoPerson && $options.gotoPerson(...args)),
    g: common_vendor.f($data.questionBankList, (i, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.gotoSearch(i, $data.content[index]), index),
        b: common_vendor.o(($event) => $options.gotoCN(i, $data.content[index]), index),
        c: common_vendor.t(i),
        d: common_vendor.o(($event) => $options.gotoRankingList(i, $data.content[index]), index),
        e: $data.content[index],
        f: common_vendor.o((...args) => $options.move && $options.move(...args), index),
        g: index,
        h: i
      };
    }),
    h: common_vendor.o(($event) => $options.gotoAnswer("normal")),
    i: common_vendor.o(($event) => $options.gotoAnswer("challenge"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/homepage/index.vue"]]);
wx.createPage(MiniProgramPage);
