"use strict";
const uni_modules_uniPopup_components_uniPopup_popup = require("../uni-popup/popup.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniPopupMessage",
  mixins: [uni_modules_uniPopup_components_uniPopup_popup.popup],
  props: {
    /**
     * 主题 success/warning/info/error	  默认 success
     */
    type: {
      type: String,
      default: "success"
    },
    /**
     * 消息文字
     */
    message: {
      type: String,
      default: ""
    },
    /**
     * 显示时间，设置为 0 则不会自动关闭
     */
    duration: {
      type: Number,
      default: 3e3
    },
    maskShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {
    this.popup.maskShow = this.maskShow;
    this.popup.messageChild = this;
  },
  methods: {
    timerClose() {
      if (this.duration === 0)
        return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.popup.close();
      }, this.duration);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.message),
    b: common_vendor.n("uni-popup__" + $props.type + "-text"),
    c: common_vendor.n("uni-popup__" + $props.type)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23924/Desktop/小程序/program-project/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue"]]);
wx.createComponent(Component);
