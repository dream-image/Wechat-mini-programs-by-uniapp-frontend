"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  inject: ["urlPre"],
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
      uid: "",
      correctAnswerList: [],
      noQuestion: false
    };
  },
  onLoad(option) {
    this.questionBank = option.name;
    this.uid = common_vendor.index.getStorageSync("uid");
    common_vendor.index.getStorage({
      key: "who",
      success: (res) => {
        this.userInformation.who = res.data;
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/normal?name=${option.name}&username=${res.data}&number=5&userId=${this.uid}`,
          success: (response) => {
            if (res.data == "游客") {
              this.userInformation.score = 0;
            } else {
              this.userInformation.score = response.data.score;
            }
            if (response.data.questionList.length == 0) {
              this.noQuestion = true;
              this.$refs.noQuestion.open();
              return;
            }
            response.data.questionList.forEach((i) => {
              this.questionList.push(i);
            });
            if (response.data.questionList[0].correctAnswer.includes("#")) {
              this.correctAnswerList = response.data.questionList[0].correctAnswer.split("#");
            } else {
              this.correctAnswerList = [response.data.questionList[0].correctAnswer];
            }
            this.getSartColor();
          },
          fail: (err) => {
            console.log(err);
          }
        });
      },
      fail: (err) => {
        console.log("normal who不存在");
      }
    });
  },
  methods: {
    updateCorrectionNoteBook(correctOrError) {
      common_vendor.index.request({
        url: `http://${this.urlPre}:3000/updateCorrectionNoteBook`,
        method: "POST",
        data: {
          who: this.userInformation.who,
          questionBank: this.questionBank,
          userId: this.uid,
          questionId: this.questionList[0].id,
          correctOrError
        }
      });
    },
    onClickLeft() {
      common_vendor.index.getStorage({
        key: "normalInfo",
        success: (res) => {
          let data = JSON.parse(res.data);
          console.log(data);
          if (data[0] != 0) {
            common_vendor.index.request({
              url: `http://${this.urlPre}:3000/score`,
              method: "POST",
              data: {
                normalInfo: data,
                username: this.userInformation.who,
                userId: this.uid,
                name: this.questionBank
              },
              success: () => {
                common_vendor.index.setStorage({
                  key: "normalInfo",
                  data: JSON.stringify([0, 0])
                });
              }
            });
          }
        },
        fail: (err) => {
          console.log("普通模式结算请求没发送出去");
          console.log(err);
        }
      });
      common_vendor.index.navigateBack();
    },
    gotoNext() {
      this.questionList.shift();
      this.hasAnswered = [];
      if (this.isShowAnswer == false) {
        this.userInformation.score--;
        if (this.userInformation.who != "游客") {
          common_vendor.index.getStorage({
            key: "normalInfo",
            success: (res) => {
              let data = JSON.parse(res.data);
              data[0]++;
              data[1]--;
              common_vendor.index.setStorage({
                key: "normalInfo",
                data: JSON.stringify(data)
              });
            },
            fail: () => {
              common_vendor.index.setStorage({
                key: "normalInfo",
                data: JSON.stringify([1, this.userInformation.score])
              });
            }
          });
        }
      }
      this.isShowAnswer = false;
      this.starColor = "white";
      if (this.questionList[0].correctAnswer.includes("#")) {
        this.correctAnswerList = this.questionList[0].correctAnswer.split("#");
      } else {
        this.correctAnswerList = [this.questionList[0].correctAnswer];
      }
      common_vendor.index.request({
        url: `http://${this.urlPre}:3000/normal?name=${this.questionBank}&username=${this.userInformation.who}&number=1&userId=${this.uid}`,
        success: (res) => {
          res.data.questionList.forEach((i) => {
            this.questionList.push(i);
          });
        }
      });
    },
    // 实现的效果是，选择以后，被选中的那个按钮会亮，然后再展示答案
    showAnswer(item) {
      if (!this.isShowAnswer) {
        console.log(this.correctAnswerList, item);
        if (this.correctAnswerList.includes(item)) {
          this.hasAnswered.push(item);
          if (this.hasAnswered.length == this.correctAnswerList.length) {
            this.userInformation.score++;
            this.isShowAnswer = true;
            if (this.userInformation.who != "游客") {
              this.updateCorrectionNoteBook.call(this, "correct");
              common_vendor.index.getStorage({
                key: "normalInfo",
                //number在前，分数在后
                success: (res) => {
                  let data = JSON.parse(res.data);
                  data[0]++;
                  data[1]++;
                  common_vendor.index.setStorage({
                    key: "normalInfo",
                    data: JSON.stringify(data)
                  });
                },
                fail: () => {
                  common_vendor.index.setStorage({
                    key: "normalInfo",
                    data: JSON.stringify([1, this.userInformation.score])
                  });
                }
              });
            }
            setTimeout(() => {
              this.gotoNext();
            }, 600);
          }
          return;
        } else {
          this.isShowAnswer = true;
          this.userInformation.score--;
          if (this.userInformation.who != "游客") {
            this.updateCorrectionNoteBook.call(this, "error");
            common_vendor.index.getStorage({
              key: "normalInfo",
              success: (res) => {
                let data = JSON.parse(res.data);
                data[0]++;
                data[1]--;
                common_vendor.index.setStorage({
                  key: "normalInfo",
                  data: JSON.stringify(data)
                });
              },
              fail: () => {
                common_vendor.index.setStorage({
                  key: "normalInfo",
                  data: JSON.stringify([1, this.userInformation.score])
                });
              }
            });
          }
          return;
        }
      }
    },
    //收藏或取消收藏
    star() {
      if (this.starColor == "#ff6d00") {
        this.starColor = "white";
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/star`,
          method: "POST",
          data: {
            questionId: this.questionList[0].id,
            addOrRemove: "remove",
            username: this.userInformation.who,
            userId: this.uid
          }
        });
      } else {
        this.starColor = "#ff6d00";
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/star`,
          method: "POST",
          data: {
            questionId: this.questionList[0].id,
            addOrRemove: "add",
            username: this.userInformation.who,
            userId: this.uid
          }
        });
      }
    },
    getSartColor() {
      if (this.questionList[0].isStar) {
        this.starColor = "#ff6d00";
      } else {
        this.starColor = "white";
      }
      return this.starColor;
    },
    reduce() {
      if (!this.isShowAnswer) {
        this.isShowAnswer = true;
        this.userInformation.score--;
        if (this.userInformation.who != "游客") {
          this.updateCorrectionNoteBook.call(this, "error");
          common_vendor.index.getStorage({
            key: "normalInfo",
            success: (res) => {
              let data = JSON.parse(res.data);
              data[0]++;
              data[1]--;
              common_vendor.index.setStorage({
                key: "normalInfo",
                data: JSON.stringify(data)
              });
            },
            fail: () => {
              common_vendor.index.setStorage({
                key: "normalInfo",
                data: JSON.stringify([1, this.userInformation.score])
              });
            }
          });
        }
      } else {
        this.$refs.hasShowAnswer.open();
      }
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
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "error",
      message: "发生未知错误",
      duration: 2e3
    }),
    b: common_vendor.sr("errorHappen", "68724e28-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.p({
      type: "error",
      message: "抱歉，题库没有题目咯",
      duration: 2e3
    }),
    e: common_vendor.sr("noQuestion", "68724e28-2"),
    f: common_vendor.p({
      type: "message"
    }),
    g: common_vendor.p({
      type: "warning",
      message: "这是最后一题啦",
      duration: 2e3
    }),
    h: common_vendor.sr("lastQuestion", "68724e28-4"),
    i: common_vendor.p({
      type: "message"
    }),
    j: common_vendor.p({
      type: "error",
      message: "答案已经展示了噢",
      duration: 2e3
    }),
    k: common_vendor.sr("hasShowAnswer", "68724e28-6"),
    l: common_vendor.p({
      type: "message"
    }),
    m: common_vendor.o($options.onClickLeft),
    n: common_vendor.p({
      title: "普通模式",
      leftText: "返回",
      leftArrow: true
    }),
    o: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {
    p: common_vendor.t($data.userInformation.score)
  } : {}, {
    q: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {
    r: common_vendor.t($data.questionList[0].questionClass == "判断题" ? "判断题" : $data.correctAnswerList.length == 1 ? "单选题" : "多选题"),
    s: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      size: "mini"
    }),
    t: common_vendor.t($data.questionList[0].questionTitle)
  } : {}, {
    v: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? common_vendor.e({
    w: $data.questionList[0].questionClass == "选择题"
  }, $data.questionList[0].questionClass == "选择题" ? {
    x: common_vendor.f($data.questionList[0].option.split("#"), (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.n($data.hasAnswered.includes(item) ? "hasChosen" : null),
        d: common_vendor.n($data.isShowAnswer ? $data.correctAnswerList.includes(item) ? "corret" : "error" : null),
        e: common_vendor.o(($event) => $options.showAnswer(item), index)
      };
    })
  } : {
    y: common_vendor.f(["正确", "错误"], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.n($data.hasAnswered.includes(item) ? "hasChosen" : null),
        d: common_vendor.n($data.isShowAnswer ? $data.questionList[0].correctAnswer == item ? "corret" : "error" : null),
        e: common_vendor.o(($event) => $options.showAnswer(item), index)
      };
    })
  }) : {}, {
    z: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {
    A: common_vendor.p({
      name: "star",
      color: $data.starColor
    }),
    B: common_vendor.o($options.star),
    C: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      disabled: $data.userInformation.who == "游客"
    }),
    D: common_vendor.o($options.reduce),
    E: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    F: common_vendor.o($options.gotoNext),
    G: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    })
  } : {}, {
    H: $data.questionList.length != 0
  }, $data.questionList.length != 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/startAnswer/normal/index.vue"]]);
wx.createPage(MiniProgramPage);
