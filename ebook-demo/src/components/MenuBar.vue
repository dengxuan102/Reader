<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="
      ifSettingShow">
        <!-- 设置字体 -->
        <div class="setting-font-size" v-if="showTag===0">
          <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+ 'px'}">A</div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item,index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize===item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+ 'px'}"
          >A</div>
        </div>
        <!-- 设置字体 end -->
        <!-- 设置主题 -->
        <div class="setting-theme" v-else-if="showTag===1">
          <div
            class="setting-theme-item"
            v-for="(item,index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :class="{'no-border':item.style.body.background !=='#fff'}"
              :style="{background:item.style.body.background}"
            ></div>
            <div class="text" :class="{'selected':index===defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <!-- 设置主题 end -->
        <!-- 设置读书进度 -->
        <div class="setting-progress" v-else-if="showTag==2">
          <div class="progress-wrapper">
            <input
              type="range"
              class="progress"
              max="100"
              min="0"
              step="1"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
            />
          </div>
          <div class="text-wrapper">
            <span>{{bookAvailable ? `${progress}%` : '加载中'}}</span>
          </div>
        </div>
        <!-- 设置读书进度 end -->
      </div>
    </transition>
    <!-- 目录 -->
    <content-view
      :ifShowContent="ifShowContent"
      v-show="ifShowContent"
      :navigation="navigation"
      :bookAvialable="bookAvailable"
      @jumpTo="jumpTo"
    ></content-view>
    <transition name="fade">
      <div class="content-mask" v-show="ifShowContent" @click="hideContent"></div>
    </transition>
    <!-- 目录 end -->
  </div>
</template>

<script>
import ContentView from "@/components/Content";
export default {
  data() {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false
    };
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: Object
  },
  components: {
    ContentView
  },
  methods: {
    hideContent() {
      this.ifShowContent = false;
    },
    jumpTo(target) {
      this.$emit("jumpTo", target);
    },
    //拖动进度条时触发事件
    onProgressInput(progress) {
      this.progress = progress;
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    //进度条松开后触发事件，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
      this.$emit("onProgressChange", progress);
    },
    setTheme(index) {
      this.$emit("setTheme", index);
    },
    showSetting(tag) {
      this.showTag = tag;
      if (this.showTag === 3) {
        this.ifSettingShow = false;
        this.ifShowContent = true;
      } else {
        this.ifSettingShow = true;
      }
    },
    hideSetting() {
      this.ifSettingShow = false;
      // this.ifSettingShow = !this.ifSettingShow;
    },
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(80);
    background: white;
    box-shadow: 0 px2rem(-5) px2rem(5) rgba(0, 0, 0, 0.15);
    // justify-content: space-around;
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    z-index: 102;
    bottom: px2rem(60);
    left: 0;
    width: 100%;
    height: px2rem(80);
    // background: yellow;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        // background: orange;
        @include center;
      }
      .select {
        flex: 1;
        display: flex;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          // background: yellow;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-5);
              left: px2rem(-10);
              width: px2rem(40);
              height: px2rem(40);
              border-radius: 50%;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: #000;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }

    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        padding: px2rem(5) px2rem(10);
        box-sizing: border-box;
        flex: 1;
        display: flex;
        flex-direction: column;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(2);
          font-size: px2rem(14);
          color: #ccc;
          &.selected {
            color: #333;
          }
          @include center;
        }
      }
    }

    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          // background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slide-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>
