
<template>
  <!-- 横竖屏旋转 -->
  <div
    id="app"
    :style="appWH"
    :class="{shu:shu}"
    @touchmove.prevent=""
  >
  </div>
</template>

<script>
import { HS, remJs, getBodyWH } from "@/tools";
export default {
  name: "app",
  data() {
    return {
      psdWH: [640, 1236], // 设计稿宽高
      appWH: null, // 动态设置宽高
      shu: false, // 动态添加class
      w: 0, // 盒子的宽度
      h: 0 // 盒子的高度
    };
  },
  created() {
    this.Hav(); // 初始化盒子宽高
    this.setWH(); // 动态设置盒子的宽高
  },
  methods: {
    Hav() {
      HS(t => {
        this.setWH();
        if (t) {
          this.shu = false;
          remJs(this.psdWH[1]);
        } else {
          this.shu = true;
          remJs(this.psdWH[0]);
        }
      });
    },
    setWH() {
      setTimeout(() => {
        let bodyWH = getBodyWH();
        this.w = bodyWH.width;
        this.h = bodyWH.height;
        if (bodyWH.width < bodyWH.height) {
          this.w = bodyWH.height;
          this.h = bodyWH.width;
        }
        this.appWH = {
          width: this.w + "px",
          height: this.h + "px"
        };
      }, 150);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/com.scss";
#app {
  // @include wh(100%, 100%);
  @include LTRBcenter;
  background: black;
}
.shu {
  transform: translate(-50%, -50%) rotate(90deg) !important;
}
</style>

