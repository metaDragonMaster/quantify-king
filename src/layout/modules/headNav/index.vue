<template>
  <div class="head">
    <div class="head-nav limit-max-width-media">
      <Logo></Logo>
      <div class="ph">
        <OpenIcon :active="active" @click="openDrawer"></OpenIcon>
      </div>
      <div class="pc">
        <!-- <UserAssets></UserAssets> -->
        <!-- <Withdraw></Withdraw> -->
        <NetWork></NetWork>
        <div
          class="nav-posi"
          @mouseenter="navActive = true"
          @mouseleave="navActive = false"
        >
          <LinkWallet></LinkWallet>
          <transition name="el-fade-in" mode="out-in">
            <div
              class="pc-nav nav-list theme-shadow-border-black"
              v-show="navActive"
            >
              <Link to="/homepage">{{ $t("导航.首页") }}</Link>
              <Link to="/explore">{{ $t("导航.量化台") }}</Link>
              <!-- <Link to="/bindFriends">{{ $t("导航.绑定好友") }}</Link> -->
              <Link to="/team/myTeam">{{ $t("导航.我的团队") }}</Link>
              <!-- <Link to="/team/teamLogs">{{ $t("导航.团队收益记录") }}</Link> -->
            </div>
          </transition>
        </div>
        <ChangeLanguage></ChangeLanguage>
      </div>
    </div>
    <el-drawer v-model="active" direction="ltr" size="80%" :with-header="false">
      <div class="drawer-flex">
        <ChangeLanguage></ChangeLanguage>
        <!-- <UserAssets></UserAssets> -->
        <!-- <Withdraw></Withdraw> -->
        <NetWork></NetWork>
        <LinkWallet></LinkWallet>
        <div class="nav-list">
          <Link to="/homepage">{{ $t("导航.首页") }}</Link>
          <Link to="/explore">{{ $t("导航.量化台") }}</Link>
          <!-- <Link to="/bindFriends">{{ $t("导航.绑定好友") }}</Link> -->
          <Link to="/team/myTeam">{{ $t("导航.我的团队") }}</Link>
          <!-- <Link to="/team/teamLogs">{{ $t("导航.团队收益记录") }}</Link> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Logo from "./logo";
import OpenIcon from "./openIcon";
import ChangeLanguage from "./changeLanguage";
import LinkWallet from "./linkWallet";
import NetWork from "./network";
// import Withdraw from "./withdraw"
// import UserAssets from './userAssets'
const active = ref(false);
function openDrawer() {
  console.log("openDrawer");
  active.value = true;
}

const navActive = ref(false);
</script>
<style lang="scss" scoped>
@import "./../../index.scss";
.head {
  height: $head-height__pc;
  @media screen and (max-width: 1280px) {
    height: $head-height__ph;
  }
}
.head-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  z-index: 500;
  display: flex;
  align-items: center;
  background-color: rgba($color: $layout-background__color, $alpha: 0.1);
  display: flex;
  justify-content: space-between;
}
.logo {
  margin-right: auto;
}
.button {
  padding: 16px 40px;
  @media screen and (max-width: 1020px) {
    padding: 8px 16px;
  }
  @media screen and (max-width: 768px) {
    padding: 4px 8px;
  }
}
.pc {
  // .button {
  //     margin-right: 10px;
  //     @media screen and (max-width: 768px) {
  //         margin-right: 6px;
  //     }
  // }
  @media screen and (min-width: 769px) {
    display: flex;
    align-items: center;
    .change-language {
      margin-left: 10px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.ph {
  @media screen and (min-width: 769px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: inline-block;
  }
}
.drawer-flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > * {
    margin-bottom: 10px;
  }
}
:deep() .el-drawer .el-drawer__body {
  background-color: $layout-background__color;
  box-shadow: 0 0 4px 0 rgba($color: #48b0fe, $alpha: 1);
}

.nav-posi {
  position: relative;
  .pc-nav {
    position: absolute;
    top: 100%;
    left: 0;
    padding: 15px 0;
  }
}
.nav-list {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  a {
    padding: 15px;
    transition: background 0.3s;
    &:hover {
      background-color: #48b0fe;
    }
    &.router-link-exact-active {
      background-color: #48b0fe;
    }
  }
}
:deep(.change-language) {
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  .icon {
    margin-right: 10px;
  }
}
</style>
