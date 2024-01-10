"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      questionList: [],
      //上下题目的转换就改变这个数组下标就好
      questionIndex: 0,
      isShowAllAnswer: false,
      //是否展示所有答案
      isNoErrorQuestion: false,
      //错题集是否为空，如果是空的话会有单独的恭喜提示
      whatQuestionBank: "",
      //哪个题库的
      who: "",
      uid: ""
    };
  },
  onLoad(option) {
    common_vendor.index.getStorage({
      key: "who",
      success: (res) => {
        this.who = res.data;
      }
    });
    this.uid = common_vendor.index.getStorageSync("uid");
    this.whatQuestionBank = option.name;
    common_vendor.index.getStorage({
      key: "who",
      success: (res) => {
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/correctNoteBook`,
          data: {
            username: res.data,
            questionBank: option.name,
            userId: this.uid
          },
          success: (res2) => {
            let list = res2.data.questionList;
            list.forEach((i) => {
              this.questionList.push(i);
            });
            console.log(list);
            if (list.length == 0) {
              this.isNoErrorQuestion = true;
            }
          }
        });
      }
    });
  },
  computed: {
    buttonStyle() {
      return this.questionList[this.questionIndex].isShowAnswer || this.isShowAllAnswer;
    }
  },
  watch: {},
  methods: {
    judge(a, b) {
      return a.every((i, index) => {
        return b.includes(i);
      });
    },
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    findLetterIndex(letter) {
      let a = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      return a.findIndex((i) => {
        return i == letter;
      });
    },
    showAnswer(item) {
      this.questionList[this.questionIndex].isChosen.push(item);
      let chosen = this.questionList[this.questionIndex].isChosen;
      let question = this.questionList[this.questionIndex];
      console.log(chosen, question.answer);
      if (!question.isShowAnswer) {
        if (chosen.length <= question.answer.length) {
          if (!this.judge(chosen, question.answer)) {
            setTimeout(() => {
              question.isShowAnswer = true;
            }, 300);
          } else if (chosen.length == question.answer.length) {
            setTimeout(() => {
              question.isShowAnswer = true;
            }, 300);
          }
        }
      }
    },
    star() {
      common_vendor.index.request({
        url: `http://${this.urlPre}:3000/star`,
        method: "POST",
        data: {
          questionId: this.questionList[this.questionIndex].questionId,
          addOrRemove: this.questionList[this.questionIndex].isStar == true ? "remove" : "add",
          //如果该题的已经收藏，那么就取消收藏
          username: this.who,
          userId: this.uid
        },
        success: () => {
          this.questionList[this.questionIndex].isStar = !this.questionList[this.questionIndex].isStar;
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
      type: "warning",
      message: "这是最后一题啦",
      duration: 2e3
    }),
    b: common_vendor.sr("lastQuestion", "06cbd2aa-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.p({
      type: "warning",
      message: "这已经是第一题啦",
      duration: 2e3
    }),
    e: common_vendor.sr("firstQuestion", "06cbd2aa-2"),
    f: common_vendor.p({
      type: "message"
    }),
    g: common_vendor.o(($event) => $data.isShowAllAnswer = !$data.isShowAllAnswer),
    h: common_vendor.o($options.onClickLeft),
    i: common_vendor.p({
      title: "",
      leftText: "返回",
      leftArrow: true
    }),
    j: $data.isNoErrorQuestion
  }, $data.isNoErrorQuestion ? {} : {}, {
    k: $data.questionList.length == 0 && !$data.isNoErrorQuestion
  }, $data.questionList.length == 0 && !$data.isNoErrorQuestion ? {} : {}, {
    l: $data.questionList.length != 0 && !$data.isNoErrorQuestion
  }, $data.questionList.length != 0 && !$data.isNoErrorQuestion ? {
    m: common_vendor.t($data.whatQuestionBank)
  } : {}, {
    n: $data.questionList.length != 0 && !$data.isNoErrorQuestion
  }, $data.questionList.length != 0 && !$data.isNoErrorQuestion ? common_vendor.e({
    o: common_vendor.t($data.questionList[$data.questionIndex].answer.length == 1 ? "单选题" : "多选题"),
    p: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      size: "mini"
    }),
    q: common_vendor.t($data.questionList[$data.questionIndex].title),
    r: $data.questionList[$data.questionIndex].type == "选择题"
  }, $data.questionList[$data.questionIndex].type == "选择题" ? {
    s: common_vendor.f($data.questionList[$data.questionIndex].option.split("#"), (j, index, i0) => {
      return {
        a: common_vendor.t(j),
        b: common_vendor.o(($event) => $options.showAnswer(j), index),
        c: index,
        d: common_vendor.n($options.buttonStyle ? $data.questionList[$data.questionIndex].answer.includes(j) ? "correctButton" : "errorButton" : $data.questionList[$data.questionIndex].isChosen.includes(j) ? "chosenButton" : null)
      };
    })
  } : {}, {
    t: $data.questionList[$data.questionIndex].type == "判断题"
  }, $data.questionList[$data.questionIndex].type == "判断题" ? {
    v: common_vendor.f(["正确", "错误"], (j, index, i0) => {
      return {
        a: common_vendor.t(j),
        b: common_vendor.o(($event) => $options.showAnswer(j), index),
        c: index,
        d: common_vendor.n($options.buttonStyle ? $data.questionList[$data.questionIndex].answer.includes(j) ? "correctButton" : "errorButton" : $data.questionList[$data.questionIndex].isChosen.includes(j) ? "chosenButton" : null)
      };
    })
  } : {}, {
    w: common_vendor.p({
      name: "arrow-left"
    }),
    x: common_vendor.o(($event) => $data.questionIndex != 0 ? $data.questionIndex-- : _ctx.$refs.firstQuestion.open()),
    y: common_vendor.p({
      name: "star",
      color: $data.questionList[$data.questionIndex].isStar == true ? "#f57f17" : "white"
    }),
    z: common_vendor.o($options.star),
    A: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    B: common_vendor.o(($event) => $data.questionList[$data.questionIndex].isShowAnswer = true),
    C: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)"
    }),
    D: common_vendor.p({
      name: "arrow"
    }),
    E: common_vendor.o(($event) => $data.questionIndex != $data.questionList.length - 1 ? $data.questionIndex++ : _ctx.$refs.lastQuestion.open())
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/correctionNotebook/index.vue"]]);
wx.createPage(MiniProgramPage);
