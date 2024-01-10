"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      questionList: [
        //首次获取所有题目
      ],
      questionIndex: 0,
      isShowAnswer: true,
      starColor: "#ff6d00",
      isNoStar: false,
      //是否收藏夹为空
      who: "",
      uid: ""
    };
  },
  beforeMount() {
  },
  mounted() {
    this.uid = common_vendor.index.getStorageSync("uid");
    common_vendor.index.getStorage({
      key: "who",
      success: (res) => {
        console.log(res);
        this.who = res.data;
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/starList?username=${this.who}&userId=${this.uid}`,
          method: "GET",
          success: (res2) => {
            this.questionList = res2.data.questionList;
            if (this.questionList.length == 0) {
              this.isNoStar = true;
            }
          },
          fail: (err) => {
            console.log(err);
          }
        });
      }
    });
    common_vendor.index.getStorage({
      key: "uid",
      success: (res) => {
        this.uid = res.data;
      }
    });
    console.log(this.who);
  },
  updated() {
  },
  methods: {
    onClickLeft() {
      common_vendor.index.navigateBack({
        url: "/pages/homepage/index",
        animationType: "pop-out",
        animationDuration: 300
      });
    },
    gotoNext() {
      if (this.questionIndex == this.questionList.length - 1) {
        this.$refs.popupBottom.open();
      } else {
        this.questionIndex++;
      }
    },
    gotoPrev() {
      if (this.questionIndex == 0) {
        this.$refs.popupTop.open();
      } else {
        this.questionIndex--;
      }
    },
    //取消收藏
    star() {
      common_vendor.index.request({
        url: `http://${this.urlPre}:3000/star`,
        method: "POST",
        data: {
          questionId: this.questionList[this.questionIndex].questionId,
          username: this.who,
          addOrRemove: "remove",
          userId: this.uid
        },
        success: (res) => {
          this.$refs.popupRemoveSuccess.open();
          this.questionList.splice(this.questionIndex, 1);
          if (this.questionList.length == 0) {
            this.isNoStar = true;
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _component_van_nav_bar + _component_van_button + _component_van_icon)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "warn",
      message: "已经到顶了",
      duration: 2e3
    }),
    b: common_vendor.sr("popupTop", "627c7d3c-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.p({
      type: "warn",
      message: "已经到底了",
      duration: 2e3
    }),
    e: common_vendor.sr("popupBottom", "627c7d3c-2"),
    f: common_vendor.p({
      type: "message"
    }),
    g: common_vendor.p({
      type: "success",
      message: "成功移除",
      duration: 2e3
    }),
    h: common_vendor.sr("popupRemoveSuccess", "627c7d3c-4"),
    i: common_vendor.p({
      type: "message"
    }),
    j: common_vendor.o($options.onClickLeft),
    k: common_vendor.p({
      title: "收藏夹",
      leftText: "返回",
      leftArrow: true
    }),
    l: $data.questionList.length == 0 && !$data.isNoStar
  }, $data.questionList.length == 0 && !$data.isNoStar ? {} : {}, {
    m: $data.isNoStar
  }, $data.isNoStar ? {} : {}, {
    n: $data.questionList.length != 0 && !$data.isNoStar
  }, $data.questionList.length != 0 && !$data.isNoStar ? {
    o: common_vendor.t($data.questionList[$data.questionIndex].whatQuestionBank)
  } : {}, {
    p: $data.questionList.length != 0 && !$data.isNoStar
  }, $data.questionList.length != 0 && !$data.isNoStar ? {
    q: common_vendor.t($data.questionList[$data.questionIndex].questionClass == "判断题" ? "判断题" : $data.questionList[$data.questionIndex].correctAnswer.length == 1 ? "单选题" : "多选题"),
    r: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      size: "mini"
    }),
    s: common_vendor.t($data.questionList[$data.questionIndex].questionTitle)
  } : {}, {
    t: $data.questionList.length != 0 && !$data.isNoStar
  }, $data.questionList.length != 0 && !$data.isNoStar ? common_vendor.e({
    v: $data.questionList[$data.questionIndex].questionClass == "选择题"
  }, $data.questionList[$data.questionIndex].questionClass == "选择题" ? {
    w: common_vendor.f($data.questionList[$data.questionIndex].option.split("#"), (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.n($data.isShowAnswer ? $data.questionList[$data.questionIndex].correctAnswer.includes(item) ? "corret" : null : null),
        d: common_vendor.o(($event) => _ctx.showAnswer(item), index)
      };
    })
  } : {
    x: common_vendor.f(["正确", "错误"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.n($data.isShowAnswer ? $data.questionList[$data.questionIndex].correctAnswer[0] == item ? "corret" : null : null),
        d: common_vendor.o(($event) => _ctx.showAnswer(item), index)
      };
    })
  }) : {}, {
    y: $data.questionList.length != 0 && !$data.isNoStar
  }, $data.questionList.length != 0 && !$data.isNoStar ? {
    z: common_vendor.o($options.gotoPrev),
    A: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    B: common_vendor.p({
      name: "star",
      color: $data.starColor
    }),
    C: common_vendor.o($options.star),
    D: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    E: common_vendor.o($options.gotoNext),
    F: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/starList/index.vue"]]);
wx.createPage(MiniProgramPage);
