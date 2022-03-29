<template>
  <div class="explore limit-max-width-media">
    <section class="model-1 model-grid">
      <ul class="wallet">
        <li
          class="theme-box-shadow balance"
          v-loading="userInfo.Load"
          element-loading-text="Loading..."
          :element-loading-spinner="LoadSvg"
          :element-loading-svg-view-box="svgViewBox"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <img class="icon" src="@/assets/explore/m-1-t.png" />
          <div class="info theme-box-shadow">
            <div class="flex">
              <h3>{{ $t("勘察.量化本金") }}</h3>
              <p class="refresh" @click="join">
                <img
                  :class="{ active: joinActive }"
                  src="@/assets/icons/icon-refresh.png"
                  alt
                />
                <u>{{ $t("勘察.更新量化本金") }}</u>
              </p>
            </div>
            <div class="cell">
              <div class="type">
                <img src="@/assets/icons/b-t.png" alt />
                <span class="font-o">USDT</span>
              </div>
              <span class="font-o color-green">
                {{ textFromWei(userInfo.interest_bearing_principal) }}
              </span>
            </div>
            <div class="cell font-o">
              <span class="color-grey">USDT</span>
              <span>
                ≈ ￥{{ textFromWei(userInfo.interest_bearing_principal) * 6.3 }}
              </span>
            </div>
          </div>
        </li>
        <li
          class="theme-box-shadow"
          v-loading="earning.Load"
          element-loading-text="Loading..."
          :element-loading-spinner="LoadSvg"
          :element-loading-svg-view-box="svgViewBox"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <h3>{{ $t("勘察.利息余额") }}</h3>
          <div class="cell">
            <p>
              <img class="icon" src="@/assets/icons/b-t.png" alt />
              <span class="color-green font-o">{{ earning.interest }}</span>
            </p>
            <!-- <p class="color-grey">
                            <span>提取中：</span>
                            <span class="font-o">0</span>
            </p>-->
          </div>
        </li>
        <li
          class="theme-box-shadow"
          v-loading="earning.Load"
          element-loading-text="Loading..."
          :element-loading-spinner="LoadSvg"
          :element-loading-svg-view-box="svgViewBox"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <h3>
            <span>{{ $t("勘察.利率") }}</span>
            <span class="color-green font-o">{{ earning.interestRate }} %</span>
          </h3>
          <div class="cell">
            <p>{{ $t("勘察.每*分钟可以领取", { n: timeTampMinutes }) }}</p>
            <!-- <span class="color-grey font-o">~ ￥0.96 （ 0.5% ）</span> -->
            <span class="color-grey font-o">{{ earnEveryTime }}</span>
          </div>
        </li>
        <li
          class="theme-box-shadow"
          v-loading="userInfo.Load"
          element-loading-text="Loading..."
          :element-loading-spinner="LoadSvg"
          :element-loading-svg-view-box="svgViewBox"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <h3>
            <span>{{ $t("勘察.累积获取利息") }}</span>
            <span class="color-green font-o">
              {{ textFromWei(userInfo.quantity) }}
            </span>
          </h3>
          <div class="cell">
            <span>
              {{ $t("勘察.共计产出利息") }}{{ userInfo.withdraw_times
              }}{{ $t("勘察.次") }}
            </span>
            <span class="color-grey font-o"
              >~ ￥{{ textFromWei(userInfo.quantity) * 6.3 }}</span
            >
          </div>
        </li>
      </ul>
      <div class="right">
        <img class="pc-image" src="@/assets/explore/m-1.png" alt />
        <button class="theme-button-clip font-o button" @click="withdraw">
          Receive --->
        </button>
      </div>
    </section>
    <section class="model-2">
      <p class="model-title">
        <span class="theme-text-shadow-green">{{ $t("勘察.利息") }}</span>
        {{ $t("勘察.计算规则") }}
      </p>
      <div class="model-grid">
        <div class="content">
          <div
            class="s-1 theme-box-shadow"
            v-loading="userCalcData.Load"
            element-loading-text="Loading..."
            :element-loading-spinner="LoadSvg"
            :element-loading-svg-view-box="svgViewBox"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <!-- <p class="cell"> -->
            <!-- <span>{{ $t("勘察.余额达到") }}</span> -->
            <!-- <span>{{ $t("勘察.利息利率") }}</span> -->
            <!-- </p> -->
            <p class="cell font-o">
              <!-- <span>≥ 30 USDT</span> -->
              <el-input
                v-model.number="userCalcData.modelValue"
                @change="userCalc"
              >
                <template #append>USDT</template>
              </el-input>
              <span class="color-green">{{ userCalcData.interestRate }} %</span>
            </p>
            <div class="bg-green color-green font-o">
              <p>{{ $t("勘察.每*分钟可以领取", { n: timeTampMinutes }) }}</p>
              <p>
                <span class="usdt-num">{{ userCalcEveryTime }}</span>
                USDT
              </p>
            </div>
          </div>
          <p class="ps">{{ $t("勘察.ps1") }}</p>
          <div
            class="s-2 theme-box-shadow font-o"
            v-loading="userInfo.Load"
            element-loading-text="Loading..."
            :element-loading-spinner="LoadSvg"
            :element-loading-svg-view-box="svgViewBox"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <p class="cell title">
              <span>USDT {{ $t("勘察.余额") }}</span>
              <span>{{ $t("勘察.利息") }}</span>
            </p>
            <ul>
              <li
                class="cell"
                v-for="item in InterestReveal.ICArray"
                :key="item.id"
              >
                <span>≥ {{ item.conditional }} USDT</span>
                <span>{{ item.interest }} % USDT {{ $t("勘察.利息") }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img class="pc-image" src="@/assets/explore/m-2.png" alt />
        </div>
      </div>
    </section>
    <section class="model-3">
      <p class="model-title">
        <span class="theme-text-shadow-green"
          >{{ $t("勘察.好友") }} {{ $t("勘察.邀请") }}</span
        >
        {{ $t("勘察.规则") }}
      </p>
      <div class="model-grid">
        <div class="content">
          <div
            class="theme-box-shadow proportion"
            v-loading="ReFees.Load"
            element-loading-text="Loading..."
            :element-loading-spinner="LoadSvg"
            :element-loading-svg-view-box="svgViewBox"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <p class="cell">
              <span>{{ $t("勘察.一级好友的分红比例") }}</span>
              <span class="font-o">{{ ReFees.List[0] }}%</span>
            </p>
            <p class="cell">
              <span>{{ $t("勘察.二级好友的分红比例") }}</span>
              <span class="font-o">{{ ReFees.List[1] }}%</span>
            </p>
            <p class="cell">
              <span>{{ $t("勘察.三级好友的分红比例") }}</span>
              <span class="font-o">{{ ReFees.List[2] }}%</span>
            </p>
          </div>
          <!-- <div class="theme-box-shadow qrcode flex-column">
                        <img src="@/assets/explore/m-3-t.png" alt />
                        <span>登录后可获取您的二维码</span>
          </div>-->
          <ul class="invitation">
            <li class="theme-box-shadow">
              <p>{{ $t("勘察.邀请链接") }}</p>
              <p>{{ slocationLink }}</p>
              <button class="bg-green" @click="copy(locationLink)">
                {{ $t("勘察.复制") }}
              </button>
            </li>
            <li class="theme-box-shadow">
              <p>{{ $t("勘察.邀请码") }}</p>
              <p>{{ truncationAddress(userAddress) }}</p>
              <button class="bg-green" @click="copy(userAddress)">
                {{ $t("勘察.复制") }}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <img class="pc-image" src="@/assets/explore/m-3.png" alt />
        </div>
      </div>
    </section>
    <section class="model-4">
      <p class="model-title">
        <span class="theme-text-shadow-green">{{ $t("勘察.利息收益") }}</span>
        {{ $t("勘察.排行榜") }}
      </p>
      <div class="model-grid">
        <div
          class="content theme-box-shadow"
          v-loading="KingSortData.Load"
          element-loading-text="Loading..."
          :element-loading-spinner="LoadSvg"
          :element-loading-svg-view-box="svgViewBox"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <p class="cell title">
            <span class="font-o">Address</span>
            <span>{{ $t("勘察.累积收益") }} {{ $t("勘察.利息") }}</span>
          </p>
          <ul class="font-o address-list">
            <li class="cell" v-for="item in KingSortData.List" :key="item.id">
              <p>
                <img src="@/assets/icons/icon-erc.png" alt />
                <span>{{ item._us }}</span>
              </p>
              <p>{{ item._released }}</p>
            </li>
          </ul>
        </div>
        <div>
          <img class="pc-image" src="@/assets/explore/m-4.png" alt />
        </div>
      </div>
    </section>
    <section class="model-5">
      <p class="model-title">{{ $t("勘察.合作方") }}</p>
      <img class="banner" src="@/assets/explore/m-5.png" alt />
      <div class="cell">
        <div class="color-grey">
          <!-- <p>
            <img src="@/assets/icons/icon-i18n-grey.png" alt />
            <span>{{ $t("语言") }}</span>
          </p>-->
          <changeLanguageVue></changeLanguageVue>
          <p>
            <img class="icon" src="@/assets/icons/icon-reserved.png" alt />
            <span>Quantify king</span>
          </p>
        </div>
        <!-- <Link to="/explore">
          <button class="theme-button-clip font-o button">
            {{ $t("勘察.联系我们") }}
          </button>
        </Link> -->
      </div>
    </section>
  </div>
</template>

<script setup>
import changeLanguageVue from "@/layout/modules/headNav/changeLanguage.vue";
import { ref, reactive, unref, onMounted, computed } from "vue";
import {
  PlusElMessage,
  lockLoadHandler,
  LoadSvg,
  svgViewBox,
} from "@/utils/PlusElement";
import {
  ArrayKeysToObject,
  truncationAddress,
  deepClone,
  copy,
} from "@/utils/tools";
import { userInfoInterface, kingSortInterface } from "@/abis/interface";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT } from "@/abis/index";
import { debounce } from "lodash";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress, web3 } = storeToRefs(storeWeb3js);
const locationLink = computed(
  () => `${window.location.origin}/#/bindFriends?bind=${userAddress.value}`
);
const slocationLink = computed(() =>
  truncationAddress(unref(locationLink), 4, 8)
);

onMounted(init);
async function init() {
  await getUserInfo();
  //   await calculateEarnings();
  await startEarning();
  await getReFee();
  await startICArray();
  await getKingSort();
  await getTimeTamp();
  if (!userInfo.f) {
    console.log(userInfo.f);
    await join();
  }
}

function textFromWei(str) {
  return web3.value.utils.fromWei(str) || str;
}
function textToWei(str) {
  return web3.value.utils.toWei(str.toString()) || str;
}
const joinActive = ref(false); // 刷新动画状态
async function join() {
  const load = lockLoadHandler("join loading...");
  joinActive.value = true;
  try {
    const { QKContract, USDTContract } = Contracts.value;
    const balanceOf = await USDTContract.methods
      .balanceOf(userAddress.value)
      .call();
    const fWeiBalanceOf = textFromWei(balanceOf);
    console.log("balanceOf", fWeiBalanceOf);
    if (Number(fWeiBalanceOf) <= 0) {
      PlusElMessage({
        type: "error",
        message: "Your wallet balance is insufficient!",
      });
    } else {
      const res = await QKContract.methods
        .join(AbiAddressUSDT, balanceOf)
        .send({
          from: userAddress.value,
        });
      if (res.status) {
        PlusElMessage({
          type: "success",
          message: "join success",
        });
      }
      console.log("join-->", res);
    }

    joinActive.value = false;
    load.close();
  } catch (e) {
    console.error(e);
    joinActive.value = false;
    load.close();
    PlusElMessage({
      type: "error",
      message: e.message,
    });
  }
}

const userInfo = reactive({
  Load: false,
  end_time: "0", //上次提取时间
  f: false, //是否join过
  interest_bearing_principal: "0", //本金
  quantity: "0", //已提取
  withdraw_times: "0", //提取次数
});
async function getUserInfo() {
  // const load = lockLoadHandler('loading...')
  userInfo.Load = true;
  try {
    const { QKContract } = Contracts.value;
    // console.log(AbiAddresUSDT);
    const res = await QKContract.methods
      .get_user_info(AbiAddressUSDT, userAddress.value)
      .call();
    // console.log(AbiAddressUSDT);
    const _userInfo = ArrayKeysToObject(res, userInfoInterface);
    console.log(res, _userInfo);
    userInfo.end_time = _userInfo.end_time;
    userInfo.f = _userInfo.f;
    userInfo.interest_bearing_principal = _userInfo.interest_bearing_principal;
    userInfo.quantity = _userInfo.quantity;
    userInfo.withdraw_times = _userInfo.withdraw_times;
    // console.log(_userInfo)
    // load.close()
    userInfo.Load = false;
  } catch (e) {
    console.error(e);
    // load.close()
    userInfo.Load = false;
  }
}

const earning = reactive({
  Load: false,
  second: "0", //产生利息次数
  interest: "0", //formwei
  interestRate: "0", //利率 15/100 %
});
const earnEveryTime = computed(
  () => earning.interest / earning.second || "Interest bearing..."
);

async function startEarning() {
  earning.Load = true;
  try {
    console.log("startEarning -->", userInfo.interest_bearing_principal);
    const res = await calculateEarnings(
      userInfo.interest_bearing_principal,
      userAddress.value
    );
    console.log("startEarning calculateEarnings", res);
    earning.second = res[0];
    earning.interest = textFromWei(res[1]);
    earning.interestRate = (res[2] / 10).toString();
    earning.Load = false;
  } catch (e) {
    console.error(e);
    // load.close()
    earning.Load = false;
  }
}

const userCalcData = reactive({
  Load: false,
  modelValue: "",
  second: "0", //产生利息次数
  interest: "0", //formwei
  interestRate: "0", //利率 15/100 %
});

const userCalcEveryTime = computed(
  () => userCalcData.interest / userCalcData.second || "Interest bearing..."
);
const userCalc = debounce(async () => {
  // userCalcData.Load = true;
  userCalcData.Load = true;
  try {
    // console.log(userCalcData.modelValue)
    if (userCalcData.modelValue.toString() == "0" || !userCalcData.modelValue) {
      userCalcData.second = "0";
      userCalcData.interest = "0";
      userCalcData.interestRate = "0";
    } else {
      // console.log(textToWei(userCalcData.modelValue))
      const res = await calculateEarnings(
        textToWei(userCalcData.modelValue),
        "0x0000000000000000000000000000000000000000"
      );
      // console.log('userCalc', res)
      userCalcData.second = res[0];
      userCalcData.interest = web3.value.utils.fromWei(res[1]);
      userCalcData.interestRate = (res[2] / 10).toString();
    }

    userCalcData.Load = false;
  } catch (e) {
    console.error(e);
    userCalcData.Load = false;
  }
}, 1000);
async function calculateEarnings(val, address) {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods
      .calculate_earnings(AbiAddressUSDT, address, val)
      .call();
    console.log("calculateEarnings", res);
    return res;
  } catch (e) {
    console.error(e);
    // load.close()
    // earning.Load = false;
    return [];
  }
}
// earning.modelValue

// const ReFees = ref([0, 0, 0])
const ReFees = reactive({
  Load: false,
  List: [0, 0, 0],
});
async function getReFee() {
  // const load = lockLoadHandler('loading...')
  ReFees.Load = true;
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_Re_fee().call();
    // console.log("getReFee", res)
    ReFees.List = res;
    // load.close()
    ReFees.Load = false;
  } catch (e) {
    console.error(e);
    // load.close()
    ReFees.Load = false;
  }
}

// const ConditionalValue = ref([])
// const Interest = ref([])
// const ICArray = ref([])
const InterestReveal = reactive({
  Load: false,
  ICArray: [],
});

async function startICArray() {
  // const load = lockLoadHandler('loading...')
  InterestReveal.Load = true;
  try {
    const Conditionals = await getConditionalValue();
    const Interests = await getInterest();
    // load.close()
    if (Conditionals.length == Interests.length) {
      let list = [];
      for (let i = 0; i < Conditionals.length; i++) {
        list.push({
          id: i,
          conditional: Conditionals[i],
          interest: (Interests[i] / 10).toString(),
        });
      }
      InterestReveal.ICArray = list;
    }
    InterestReveal.Load = false;
    // console.log(InterestReveal.ICArray)
  } catch (e) {
    console.error(e);
    // load.close()
    InterestReveal.Load = false;
    PlusElMessage({
      type: "error",
      message: "invalid",
    });
  }
}
async function getConditionalValue() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_conditional_value().call();
    // console.log("conditionalValue", res)
    return res;
  } catch (e) {
    console.error(e);
  }
}
async function getInterest() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_interest().call();
    // console.log("conditionalValue", res)
    return res;
  } catch (e) {
    console.error(e);
  }
}

async function withdraw() {
  //提现
  const load = lockLoadHandler("loading...");
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods
      .withdraw(
        AbiAddressUSDT,
        userAddress.value,
        userInfo.interest_bearing_principal
      )
      .send({
        from: userAddress.value,
      });
    // console.log("withdraw", res)
    if (res.status) {
      init();
    }
    load.close();
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
    load.close();
  }
}

const KingSortData = reactive({
  Load: false,
  List: [],
});
async function getKingSort() {
  // const load = lockLoadHandler('loading...')
  KingSortData.Load = true;
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_king_sort(AbiAddressUSDT).call();
    // console.log("getKingSort res", res)
    const reverseRes = deepClone(res)
      .reverse()
      .map((item) => {
        return ArrayKeysToObject(item, kingSortInterface);
      });
    // console.log("getKingSort reverseRes", reverseRes)
    let usList = []; //记录已经被载入的用户地址
    let sortList = reverseRes.filter((item) => {
      // 最多加载十条
      // 由于数据会自动把
      const hadUs = usList.length >= 10 || usList.includes(item._us);
      !hadUs && usList.push(item._us);
      return !hadUs;
    });
    // console.log("getKingSort sortList", sortList)
    KingSortData.List = sortList.map((item) => {
      item.id = item._us;
      item._released = textFromWei(item._released);
      item._us = truncationAddress(item._us);
      return item;
    });
    // console.log("getKingSort withdrawList", KingSortData.List)
    KingSortData.Load = false;
    return res;
  } catch (e) {
    console.error(e);
    KingSortData.Load = false;
  }
}

const timeTamp = ref("");
const timeTampMinutes = computed(() => timeTamp.value / 60 || "*");
async function getTimeTamp() {
  //提现
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.get_time_tamp().call();
    console.log("getTimeTamp", res);
    timeTamp.value = res;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
  }
}
</script>
<style lang="scss" scoped>
// .explore {
//     // min-height: 10000px;
// }
.pc-image {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.color-grey {
  color: #d4cde9;
}
.color-green {
  color: #00ff66;
}
.bg-green {
  background-color: rgba(0, 178, 71, 0.15);
  border: 1px solid rgba(0, 178, 71, 0.72);
  border-radius: 10rem;
}
.model-grid {
  display: grid;
  @media screen and (min-width: 1201px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 120px;
  }
  @media screen and (min-width: 769px) and (max-width: 1200px) {
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 20px;
    align-items: center;
  }
}
.model-title {
  text-align: center;
  font-size: 48px;
  margin-top: 48px;
  margin-bottom: 48px;
}
.cell {
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 769px) {
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
.theme-box-shadow {
  border-radius: 14px;
}
.button {
  padding: 20px 40px;
}
.model-1 {
  padding-top: 50px;
  h3 {
    font-size: 24px;
    margin-bottom: 12px;
  }
  .wallet {
    .balance .info,
    li:not(:first-child) {
      padding: 20px 45px;
      @media screen and (max-width: 768px) {
        padding: 10px 15px;
      }
    }
    li {
      margin-bottom: 20px;
    }
    h3,
    .cell {
      .icon {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
  }
  .balance {
    padding-top: 150px;
    position: relative;
    z-index: 0;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
    .info {
      // margin-top: -50px;
      border-radius: 0 0 14px 14px;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.4);
      .flex {
        justify-content: space-between;
        align-items: center;
        .refresh {
          cursor: pointer;
        }
        .active {
          animation: refresh 1s infinite;
          @keyframes refresh {
            from {
              transform: rotateZ(0);
            }
            to {
              transform: rotateZ(1turn);
            }
          }
        }
      }
      .type {
        font-size: 24px;
        background-color: rgba(0, 178, 71, 0.15);
        border: 1px solid rgba(0, 178, 71, 0.72);
        border-radius: 10rem;
        display: flex;
        align-items: center;
        padding-right: 16px;
        img {
          margin-right: 6px;
          padding: 3px;
        }
      }
      .type + span {
        font-size: 36px;
      }
      .cell {
        margin-top: 10px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.model-2 {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .theme-box-shadow {
    width: 100%;
  }
  .s-1 {
    padding: 20px 45px;
    .cell:first-of-type {
      font-size: 24px;
      margin-bottom: 14px;
    }
    .cell .el-input {
      max-width: 200px;
    }
    .bg-green {
      display: block;
      padding: 12px 40px;
      width: fit-content;
      margin: 10px auto 0;
      text-align: center;
      @media screen and (min-width: 769px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .usdt-num {
          margin: 0 10px;
        }
      }
    }
  }
  .s-2 {
    padding: 25px 45px;
    .cell {
      font-size: 14px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      &.title {
        font-size: 18px;
      }
      span:first-child {
        color: #2ec5ce;
      }
    }
  }
  .ps {
    margin: 22px 0;
    font-size: 12px;
  }
}
.model-3 {
  .proportion {
    padding: 40px 48px;
    font-size: 24px;
    @media screen and (max-width: 768px) {
      padding: 16px 20px;
      font-size: 18px;
    }
    .cell:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  // .qrcode {
  //     margin: 20px 0;
  //     padding: 20px;
  // }
  .invitation {
    // display: flex;
    li {
      // flex: 1;
      text-align: center;
      padding: 10px 0;
      margin-top: 20px;
      // &:not(:last-child) {
      //     margin-right: 20px;
      // }
      p {
        margin-bottom: 4px;
      }
      button {
        padding: 2px 12px;
        font-size: 12px;
      }
    }
  }
}
.model-4 {
  .content {
    padding: 44px 16px;
    .title {
      color: #b2abca;
      margin-bottom: 10px;
    }
    .address-list .cell {
      img {
        margin-right: 10px;
        @media screen and (max-width: 768px) {
          width: 24px;
        }
      }
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
.model-5 {
  padding-bottom: 50px;
  .banner {
    max-width: 100%;
    width: fit-content;
    margin: 0 auto;
    display: block;
  }
  .cell {
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      button {
        margin: 10px 0;
      }
    }
    .icon {
      width: 22px;
      margin-right: 10px;
    }
  }
  :deep(.change-language) {
    font-size: 20px;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
    .icon {
      width: 22px;
      margin-right: 10px;
    }
  }
}
</style>
