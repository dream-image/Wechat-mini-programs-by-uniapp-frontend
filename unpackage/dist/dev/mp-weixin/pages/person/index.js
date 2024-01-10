"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_person_uCharts_min = require("./u-charts.min.js");
var uChartsInstance = {};
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      nickname: "",
      questionBank: "",
      range: [],
      active: 0,
      //0是common,1是challenge
      showWhat: "普通模式",
      cWidth: 350,
      cHeight: 380,
      who: "",
      isShowPicture: true,
      //当记录为空的时候会被我的trycatch捕捉，然后这里设置为false
      nicnNameChanging: false,
      uid: "",
      isShowChoosePicture: false,
      //修改图片的界面
      pictureUrl: "../../static/搜索无结果.svg",
      changePictureError: "",
      avatar: ""
    };
  },
  onReady() {
    this.uid = common_vendor.index.getStorageSync("uid");
    common_vendor.index.createSelectorQuery().select("#main").fields({
      size: true
    }, (res) => {
      this.cWidth = res.width;
      this.cHeight = res.height;
    }).exec();
    let who = common_vendor.index.getStorageSync("who");
    this.who = who;
    common_vendor.index.request({
      url: `http://${this.urlPre}:3000/person`,
      data: {
        username: who,
        userId: this.uid
      },
      success: (res) => {
        console.log(res.data.nickname);
        this.nickname = res.data.nickname;
        this.range = res.data.range;
        this.questionBank = res.data.range[0].text;
        this.getServerData(res.data.range[0].text, "common");
      }
    });
    let avatar = common_vendor.index.getStorageSync("pictureUrl");
    this.avatar = avatar;
  },
  methods: {
    change() {
      try {
        let res = this.range.find((i) => {
          return i.text == this.questionBank;
        });
        let model = this.showWhat == "普通模式" ? "common" : "challenge";
        this.drawCharts(model, res[model], res.text);
      } catch (e) {
        this.$refs.noRecord.open();
        this.isShowPicture = false;
      }
    },
    onClickLeft() {
      common_vendor.index.navigateBack({
        animationType: "fade-out"
      });
    },
    changeMode(context) {
      this.showWhat = context.detail.title;
      this.getServerData(this.questionBank, context.detail.title == "普通模式" ? "common" : "challenge");
    },
    changeAvatar() {
      this.isShowChoosePicture = true;
      let that = this;
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        success: function(res) {
          that.pictureUrl = res.tempFilePaths[0];
          console.log(that.pictureUrl);
        }
      });
    },
    previewPicture() {
      console.log(this.pictureUrl);
      common_vendor.index.previewImage({
        urls: [this.pictureUrl],
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data) {
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    },
    changeNickname(value) {
      if (value) {
        this.nicnNameChanging = false;
        common_vendor.index.request({
          url: `http://${this.urlPre}:3000/changeNickname`,
          method: "post",
          data: {
            nickname: this.nickname,
            username: this.who,
            userId: this.uid
          },
          success: (res) => {
          }
        });
      } else {
        this.nicnNameChanging = true;
      }
    },
    cancelPicture() {
      this.isShowChoosePicture = false;
      this.pictureUrl = "../../static/搜索无结果.svg";
    },
    sureChangePicture() {
      console.log(this.pictureUrl);
      common_vendor.index.request({
        url: `http://${this.urlPre}:3000/changePicture`,
        method: "POST",
        data: {
          url: this.pictureUrl,
          userId: this.uid
        },
        success: (res) => {
          if (res.statusCode != 200) {
            this.changePictureError = res.data.message;
            this.$refs.errorPicture.open();
          } else {
            this.$refs.sucessPicture.open();
            this.avatar = this.pictureUrl;
            common_vendor.index.setStorage({
              key: "pictureUrl",
              data: this.pictureUrl
            });
            this.isShowChoosePicture = false;
          }
        },
        fail: (err) => {
          this.changePictureError = err.errMsg;
          this.$refs.errorPicture.open();
        }
      });
    },
    getServerData(questionBank, model) {
      try {
        let res = this.range.find((i) => {
          return i.text == questionBank;
        });
        this.drawCharts(model, res[model], questionBank);
      } catch (e) {
        this.$refs.noRecord.open();
        this.isShowPicture = false;
      }
    },
    drawCharts(id, data, questionBank) {
      this.isShowPicture = true;
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new pages_person_uCharts_min.uCharts({
        type: "line",
        context: ctx,
        title: {
          name: id == "common" ? `${questionBank}普通模式记录` : `${questionBank}挑战模式记录`,
          fontSize: 100
        },
        width: this.cWidth,
        height: this.cHeight,
        categories: data.categories,
        series: data.series,
        animation: true,
        color: [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
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
          data: [
            {
              title: "分数",
              max: id == "common" ? null : 300
            },
            {
              title: "时间s",
              position: "right"
            }
          ].filter((i, index) => {
            if (id == "common")
              return index == 0;
            else
              return true;
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
  }
};
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_vew = common_vendor.resolveComponent("vew");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_component_van_dialog + _easycom_uni_popup_message2 + _easycom_uni_popup2 + _component_van_button + _component_vew + _component_van_nav_bar + _easycom_uni_icons2 + _easycom_uni_data_select2 + _component_van_tab + _component_van_tabs)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_icons + _easycom_uni_data_select)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      id: "van-dialog"
    }),
    b: common_vendor.p({
      type: "error",
      message: "没有回答记录",
      duration: 2e3
    }),
    c: common_vendor.sr("noRecord", "655f3a27-1"),
    d: common_vendor.p({
      type: "message"
    }),
    e: common_vendor.p({
      type: "sucess",
      message: "修改成功",
      duration: 2e3
    }),
    f: common_vendor.sr("sucessPicture", "655f3a27-3"),
    g: common_vendor.p({
      type: "message"
    }),
    h: common_vendor.p({
      type: "error",
      message: $data.changePictureError,
      duration: 2e3
    }),
    i: common_vendor.sr("errorPicture", "655f3a27-5"),
    j: common_vendor.p({
      type: "message"
    }),
    k: $data.isShowChoosePicture
  }, $data.isShowChoosePicture ? {
    l: $data.pictureUrl,
    m: common_vendor.o((...args) => $options.previewPicture && $options.previewPicture(...args)),
    n: common_vendor.o($options.cancelPicture),
    o: common_vendor.p({
      size: "normal",
      plain: true,
      type: "primary",
      round: true,
      color: "#ff8f00"
    }),
    p: common_vendor.o($options.sureChangePicture),
    q: common_vendor.p({
      size: "normal",
      plain: true,
      type: "primary",
      round: true,
      color: "#ff8f00"
    }),
    r: common_vendor.o(($event) => $data.isShowChoosePicture = false)
  } : {}, {
    s: common_vendor.o($options.onClickLeft),
    t: common_vendor.p({
      title: "",
      leftText: "返回",
      leftArrow: true
    }),
    v: common_vendor.p({
      type: "camera-filled",
      size: "30"
    }),
    w: "url(" + $data.avatar + ")",
    x: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args)),
    y: !$data.nicnNameChanging
  }, !$data.nicnNameChanging ? {
    z: common_vendor.t($data.nickname)
  } : {}, {
    A: $data.nicnNameChanging
  }, $data.nicnNameChanging ? {
    B: common_vendor.o(($event) => $options.changeNickname(true)),
    C: $data.nickname,
    D: common_vendor.o(common_vendor.m(($event) => $data.nickname = $event.detail.value, {
      lazy: true
    }))
  } : {}, {
    E: common_vendor.o(($event) => $options.changeNickname(false)),
    F: common_vendor.p({
      type: "compose",
      size: "22"
    }),
    G: common_vendor.o($options.change),
    H: common_vendor.o(($event) => $data.questionBank = $event),
    I: common_vendor.p({
      localdata: $data.range,
      placeholder: "请选择题库信息",
      modelValue: $data.questionBank
    }),
    J: common_vendor.p({
      title: "普通模式"
    }),
    K: common_vendor.p({
      title: "挑战模式"
    }),
    L: common_vendor.o($options.changeMode),
    M: common_vendor.o(($event) => $data.active = $event),
    N: common_vendor.p({
      lazyRender: "false",
      type: "card",
      color: "#79bbff",
      active: $data.active
    }),
    O: $data.isShowPicture
  }, $data.isShowPicture ? common_vendor.e({
    P: $data.showWhat == "普通模式"
  }, $data.showWhat == "普通模式" ? {
    Q: common_vendor.o((...args) => $options.tap && $options.tap(...args))
  } : {}, {
    R: $data.showWhat == "挑战模式"
  }, $data.showWhat == "挑战模式" ? {
    S: common_vendor.o((...args) => $options.tap && $options.tap(...args))
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/person/index.vue"]]);
wx.createPage(MiniProgramPage);
