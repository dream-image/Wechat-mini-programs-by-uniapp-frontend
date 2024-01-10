"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  inject: ["urlPre"],
  data() {
    return {
      searchText: "",
      List: [],
      //题库题目的list
      searchList: [],
      //搜索到得到题目的list
      loadingStatus: "more",
      //more是还有数据可以加载 loading是在加载中 noMore是没有数据加载了
      questionBank: "",
      //当前是哪个题库
      page: 1,
      //这里1是因为我第一页的获取的页数参数是直接是写死的，后面的获取才用++page   也就是第一次获取和后面的重复触发的获取是两个部分
      searchQuestionPage: 0,
      //这里0开始是因为每次获取的时候我是 ++searchQuestionPage   这里的第一次获取和后面的获取都是调用同一个函数
      totalQuestionNumber: 0,
      //题库题目的总数
      totalSearchQuestionNumber: 0,
      //搜索到的题目的总数
      realShowList: [],
      //真正放在上面展示的list
      searchPage: 1
    };
  },
  watch: {
    searchText(newV, oldV) {
      if (newV == "") {
        this.realShowList.splice(0, this.realShowList.length);
        this.searchList.splice(0, this.searchList.length);
        this.List.slice(0, this.page * 20 > this.totalQuestionNumber ? this.totalQuestionNumber : this.page * 20).forEach((i) => {
          this.realShowList.push(i);
        });
        if (this.List.length < this.totalQuestionNumber) {
          this.loadingStatus = "more";
        } else {
          this.loadingStatus = "moMore";
        }
      }
    }
  },
  onReachBottom() {
    console.log("到底部了");
    if (this.loadingStatus != "noMore") {
      this.loadingMore();
    }
  },
  onLoad(option) {
    this.questionBank = option.name;
    common_vendor.index.request({
      url: `http://${this.urlPre}:3000/searchList`,
      data: {
        questionBank: option.name
      },
      success: (res) => {
        this.totalQuestionNumber = res.data.totalQuestionNumber;
        let list = res.data.questionList;
        list.forEach((i) => {
          this.List.push(i);
        });
        if (this.List.length > 20) {
          this.loadingStatus = "more";
          list.slice(0, 20).forEach((i) => {
            this.realShowList.push(i);
          });
        } else {
          this.loadingStatus = "noMore";
          list.forEach((i) => {
            this.realShowList.push(i);
          });
        }
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  methods: {
    search() {
      console.log("触发搜索", this.searchText);
      if (this.searchText != "") {
        this.searchPage = 1;
        this.realShowList.splice(0, this.realShowList.length);
        this.searchList.splice(0, this.searchList.length);
        this.searchList = this.List.filter((i) => {
          return i.title.indexOf(this.searchText) != -1;
        });
        if (this.searchList.length < 20) {
          this.searchList.forEach((i) => {
            this.realShowList.push(i);
          });
          this.loadingStatus = "noMore";
        } else {
          this.searchList.slice(0, 20).forEach((i) => {
            this.realShowList.push(i);
          });
          this.loadingStatus = "more";
        }
      }
    },
    loadingMore() {
      console.log("触发更新");
      if (this.searchText == "") {
        this.loadingStatus = "loading";
        this.page++;
        if (this.List.length - this.realShowList.length >= 20) {
          this.List.slice((this.page - 1) * 20, this.page * 20).forEach((i) => {
            this.realShowList.push(i);
          });
          this.loadingStatus = "more";
        } else {
          this.List.slice((this.page - 1) * 20, this.List.length).forEach((i) => {
            this.realShowList.push(i);
          });
          this.loadingStatus = "noMore";
        }
      } else {
        this.loadingStatus = "loading";
        this.searchPage++;
        if (this.searchList.length - this.realShowList.length >= 20) {
          this.searchList.slice((this.page - 1) * 20, this.page * 20).forEach((i) => {
            this.realShowList.push(i);
          });
          this.loadingStatus = "more";
        } else {
          this.searchList.slice((this.page - 1) * 20, this.searchList.length).forEach((i) => {
            this.realShowList.push(i);
          });
          this.loadingStatus = "noMore";
        }
      }
    },
    gotoUp() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  }
};
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_van_icon + _component_van_button + _easycom_uni_load_more2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      name: "arrow-up",
      color: "#29b6f6"
    }),
    b: common_vendor.o((...args) => $options.gotoUp && $options.gotoUp(...args)),
    c: common_vendor.p({
      name: "search",
      color: "#fda085"
    }),
    d: $data.searchText,
    e: common_vendor.o(common_vendor.m(($event) => $data.searchText = $event.detail.value, {
      lazy: true
    })),
    f: common_vendor.o($options.search),
    g: common_vendor.p({
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      round: true
    }),
    h: $data.realShowList.length != 0
  }, $data.realShowList.length != 0 ? {
    i: common_vendor.f($data.realShowList, (i, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(i.type),
        b: "422778ba-3-" + i0,
        c: common_vendor.t(i.title),
        d: i.type == "单选题" || i.type == "多选题"
      }, i.type == "单选题" || i.type == "多选题" ? {
        e: common_vendor.f(i.option.split("#"), (j, index, i1) => {
          return {
            a: common_vendor.t(j),
            b: index
          };
        })
      } : {}, {
        f: i.type == "判断题"
      }, i.type == "判断题" ? {
        g: common_vendor.f(["正确", "错误"], (j, index, i1) => {
          return {
            a: common_vendor.t(j),
            b: index
          };
        })
      } : {}, {
        h: i.id
      });
    }),
    j: common_vendor.p({
      round: true,
      color: "linear-gradient(to right, #f6d365 0%, #fda085 100%, #f6d365 100%)",
      size: "mini"
    }),
    k: common_vendor.p({
      status: $data.loadingStatus,
      color: "#29b6f6"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/pages/search/index.vue"]]);
wx.createPage(MiniProgramPage);
