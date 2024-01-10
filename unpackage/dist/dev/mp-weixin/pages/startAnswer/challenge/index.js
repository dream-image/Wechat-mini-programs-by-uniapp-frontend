"use strict";
const common_vendor = require("../../../common/vendor.js");
const wxcomponents_vant_dist_dialog_dialog = require("../../../wxcomponents/vant/dist/dialog/dialog.js");
require("../../../wxcomponents/vant/dist/notify/notify.js");
require("../../../wxcomponents/vant/dist/common/color.js");
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      questionList: [],
      questionIndex: 0,
      //当前题目的索引，下一题和上一题的时候直接修改这个
      questionPrevColor: "#ffc400",
      questionNextColor: "#ffc400",
      totalTime: 300,
      time: 300,
      isShowTip: false,
      isShowGlobal: false,
      who: "",
      questionBank: "",
      isShowResult: false,
      //是否展示结算界面 
      correctNumber: 0,
      //正确题数
      uid: "",
      delaySubmitTimeout: "",
      countDownInterval: "",
      pictureUrl: ""
    };
  },
  onLoad: function(option) {
    this.pictureUrl = common_vendor.index.getStorageSync("pictureUrl");
    this.uid = common_vendor.index.getStorageSync("uid");
    this.questionBank = option.name;
    this.who = common_vendor.index.getStorageSync("who");
    common_vendor.index.request({
      url: `http://${this.urlPre}:3000/challenge?username=${this.who}&number=300&name=${this.questionBank}&userId=${this.uid}`,
      success: (res) => {
        res.data.questionList.forEach((i) => {
          this.questionList.push(i);
        });
        this.time = 300;
        this.totalTime = 300;
        this.countDownInterval = setInterval(() => {
          this.time--;
        }, 1e3);
        this.delaySubmitTimeout = setTimeout(() => {
          this.isShowTip = true;
          clearInterval(this.countDownInterval);
          setTimeout(() => {
            this.isShowTip = false;
            common_vendor.index.redirectTo({
              url: "/pages/homepage/index"
            });
            this.submit.call(this, "强制");
          }, 2e3);
        }, this.totalTime * 1e3);
      }
    });
  },
  mounted() {
  },
  methods: {
    gotoGlobal() {
      console.log(this.isShowGlobal);
      this.isShowGlobal = !this.isShowGlobal;
    },
    onClickLeft() {
      wxcomponents_vant_dist_dialog_dialog.Dialog.confirm({
        title: "是否回到主页?",
        message: "当前数据会被销毁"
      }).then(() => {
        common_vendor.index.navigateBack();
      });
    },
    goto(positon) {
      if (positon == "prev") {
        this.questionPrevColor = "#f57f17";
        setTimeout(() => {
          this.questionPrevColor = "#ffc400";
          if (this.questionIndex == 0) {
            this.$refs.popupTop.open();
          } else {
            this.questionIndex--;
          }
        }, 100);
      } else {
        this.questionNextColor = "#f57f17";
        setTimeout(() => {
          this.questionNextColor = "#ffc400";
          if (this.questionIndex == this.questionList.length - 1) {
            this.$refs.popupBottom.open();
          } else {
            this.questionIndex++;
          }
        }, 100);
      }
    },
    clickAnswer(item) {
      if (this.questionList[this.questionIndex].questionClass == "选择题") {
        if (this.questionList[this.questionIndex].correctAnswer.length == 1) {
          this.questionList[this.questionIndex].hasAnswered[0] = item;
        } else {
          if (!this.questionList[this.questionIndex].hasAnswered.includes(item)) {
            this.questionList[this.questionIndex].hasAnswered.push(item);
          } else {
            let index = this.questionList[this.questionIndex].hasAnswered.indexOf(item);
            this.questionList[this.questionIndex].hasAnswered.splice(index, 1);
          }
        }
      } else {
        this.questionList[this.questionIndex].hasAnswered[0] = item;
      }
    },
    gotoQuestion(index) {
      this.questionIndex = index;
      this.isShowGlobal = false;
    },
    submit(type) {
      function calculateScore() {
        function judge(a, b) {
          return a.every((i, index) => {
            return b.includes(i);
          }) && b.every((i, index) => {
            return a.includes(i);
          });
        }
        let score = 0;
        this.questionList.forEach((i) => {
          if (judge(i.hasAnswered, i.correctAnswer)) {
            score++;
          }
        });
        return score;
      }
      if (type == "主动") {
        wxcomponents_vant_dist_dialog_dialog.Dialog.confirm({
          title: "是否提交?",
          message: "提交后将无法撤销"
        }).then(() => {
          this.$refs.submit.open();
          this.correctNumber = calculateScore.call(this);
          setTimeout(() => {
            this.isShowResult = true;
          }, 1e3);
          if (this.who != "游客") {
            common_vendor.index.request({
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
            });
          }
          clearTimeout(this.delaySubmitTimeout);
          clearInterval(this.countDownInterval);
        });
      } else {
        this.$refs.submit.open();
        this.correctNumber = calculateScore.apply(this);
        setTimeout(() => {
          this.isShowResult = true;
        }, 1e3);
        if (this.who != "游客") {
          common_vendor.index.request({
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
          });
        }
      }
    },
    gotoHome() {
      common_vendor.index.navigateBack();
    },
    share() {
    }
  }
};
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  (_component_van_dialog + _easycom_uni_popup_message2 + _easycom_uni_popup2 + _component_van_button + _component_van_overlay + _component_van_nav_bar)();
}
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      id: "van-dialog"
    }),
    b: common_vendor.p({
      type: "warn",
      message: "已经到顶了",
      duration: 2e3
    }),
    c: common_vendor.sr("popupTop", "28e619d0-1"),
    d: common_vendor.p({
      type: "message"
    }),
    e: common_vendor.p({
      type: "warn",
      message: "已经到底了",
      duration: 2e3
    }),
    f: common_vendor.sr("popupBottom", "28e619d0-3"),
    g: common_vendor.p({
      type: "message"
    }),
    h: common_vendor.p({
      type: "success",
      message: "成功提交",
      duration: 2e3
    }),
    i: common_vendor.sr("submit", "28e619d0-5"),
    j: common_vendor.p({
      type: "message"
    }),
    k: $data.isShowGlobal
  }, $data.isShowGlobal ? {
    l: common_vendor.f(Math.ceil($data.questionList.length / 5), (i, k0, i0) => {
      return {
        a: common_vendor.f(5 > this.questionList.length - (i - 1) * 5 ? this.questionList.length - (i - 1) * 5 : 5, (item, index, i1) => {
          return {
            a: common_vendor.t((i - 1) * 5 + index + 1),
            b: index,
            c: common_vendor.n($data.questionList[(i - 1) * 5 + index].hasAnswered.length == 0 ? null : "hasChosen"),
            d: common_vendor.o(($event) => $options.gotoQuestion((i - 1) * 5 + index), index)
          };
        }),
        b: i
      };
    })
  } : {}, {
    m: $data.isShowResult
  }, $data.isShowResult ? {
    n: "url(" + $data.pictureUrl + ")",
    o: common_vendor.t($data.questionList.length),
    p: common_vendor.t($data.correctNumber),
    q: common_vendor.t($data.questionList.length - $data.correctNumber),
    r: common_vendor.o($options.gotoHome),
    s: common_vendor.p({
      round: true,
      icon: "wap-home",
      plain: true,
      color: "#fb8c00"
    }),
    t: common_vendor.o($options.share),
    v: common_vendor.p({
      round: true,
      plain: true,
      color: "#fb8c00",
      openType: "share"
    })
  } : {}, {
    w: !$data.isShowResult
  }, !$data.isShowResult ? common_vendor.e({
    x: common_vendor.o(($event) => $data.isShowTip = false),
    y: common_vendor.p({
      show: $data.isShowTip
    }),
    z: common_vendor.o($options.onClickLeft),
    A: common_vendor.o($options.gotoGlobal),
    B: common_vendor.p({
      title: "挑战模式",
      leftText: "返回",
      leftArrow: true,
      rightText: ($data.isShowGlobal ? "取消" : "总览") + "      "
    }),
    C: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {
    D: common_vendor.t($data.time)
  } : {}, {
    E: $data.questionList.length == 0
  }, $data.questionList.length == 0 ? {} : {}, {
    F: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {
    G: common_vendor.t($data.questionIndex + 1),
    H: common_vendor.t($data.questionList[$data.questionIndex].questionClass == "判断题" ? "判断题" : $data.questionList[$data.questionIndex].correctAnswer.length == 1 ? "单选题" : "多选题"),
    I: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      size: "mini"
    }),
    J: common_vendor.t($data.questionList[$data.questionIndex].questionTitle)
  } : {}, {
    K: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? common_vendor.e({
    L: $data.questionList[$data.questionIndex].questionClass == "选择题"
  }, $data.questionList[$data.questionIndex].questionClass == "选择题" ? {
    M: common_vendor.f($data.questionList[$data.questionIndex].option.split("#"), (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.clickAnswer(item), index),
        c: common_vendor.n($data.questionList[$data.questionIndex].hasAnswered.includes(item) ? "answer" : null),
        d: index
      };
    })
  } : {
    N: common_vendor.f(["正确", "错误"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.clickAnswer(item), index),
        c: common_vendor.n($data.questionList[$data.questionIndex].hasAnswered[0] == item ? "answer" : null),
        d: index
      };
    })
  }) : {}, {
    O: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {
    P: common_vendor.o(($event) => $options.goto("prev")),
    Q: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    R: common_vendor.o(($event) => $options.goto("next")),
    S: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    T: common_vendor.o(($event) => $options.submit("主动")),
    U: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    })
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/startAnswer/challenge/index.vue"]]);
wx.createPage(MiniProgramPage);
