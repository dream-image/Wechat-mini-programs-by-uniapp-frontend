"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  inject: ["urlPre"],
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
    };
  },
  onLoad(option) {
    this.questionBank = option.name;
    this.uid = common_vendor.index.getStorageSync("uid");
    this.userInformation.img = common_vendor.index.getStorageSync("pictureUrl");
    common_vendor.index.getStorage({
      key: "who",
      success: (res) => {
        this.who = res.data;
        if (res.data == "游客") {
          this.userInformation = {
            ...this.userInformation,
            score: "0",
            nickname: "游客",
            place: "无",
            img: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
          };
        } else {
          common_vendor.index.request({
            url: `http://${this.urlPre}:3000/rankingList`,
            data: {
              username: this.who,
              questionBank: option.name,
              mode: "challenge",
              userId: this.uid
            },
            success: (res2) => {
              this.personList = res2.data.personList;
              this.userInformation = {
                ...this.userInformation,
                ...res2.data.userInformation
              };
            }
          });
        }
      }
    });
  },
  beforeMount() {
  },
  methods: {
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    onClickRight() {
      common_vendor.index.navigateBack({
        delta: 2
      });
    }
  }
};
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  (_component_van_icon + _component_van_nav_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      name: "wap-home",
      size: "18"
    }),
    b: common_vendor.o((...args) => $options.onClickRight && $options.onClickRight(...args)),
    c: common_vendor.o($options.onClickLeft),
    d: common_vendor.p({
      title: "",
      leftText: "返回",
      leftArrow: true
    }),
    e: common_vendor.t($data.questionBank),
    f: $data.personList[1] != void 0
  }, $data.personList[1] != void 0 ? {
    g: $data.personList[1].img
  } : {}, {
    h: $data.personList[1] != void 0
  }, $data.personList[1] != void 0 ? {
    i: common_vendor.t($data.personList[1].nickname)
  } : {}, {
    j: $data.personList[0] != void 0
  }, $data.personList[0] != void 0 ? {
    k: $data.personList[0].img
  } : {}, {
    l: $data.personList[0] != void 0
  }, $data.personList[0] != void 0 ? {
    m: common_vendor.t($data.personList[0].nickname)
  } : {}, {
    n: $data.personList[2] != void 0
  }, $data.personList[2] != void 0 ? {
    o: $data.personList[2].img
  } : {}, {
    p: $data.personList[2] != void 0
  }, $data.personList[2] != void 0 ? {
    q: common_vendor.t($data.personList[2].nickname)
  } : {}, {
    r: $data.personList.length != 0
  }, $data.personList.length != 0 ? {
    s: common_vendor.f($data.personList, (i, index, i0) => {
      return {
        a: common_vendor.t(i.place),
        b: i.img,
        c: common_vendor.t(i.nickname),
        d: common_vendor.t(i.time),
        e: common_vendor.t(i.score),
        f: index
      };
    })
  } : {}, {
    t: common_vendor.t($data.userInformation.place),
    v: "url(" + $data.userInformation.img + ")",
    w: common_vendor.t($data.userInformation.nickname),
    x: common_vendor.t($data.userInformation.time),
    y: common_vendor.t($data.userInformation.score)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/RankingList/challenge/index.vue"]]);
wx.createPage(MiniProgramPage);
