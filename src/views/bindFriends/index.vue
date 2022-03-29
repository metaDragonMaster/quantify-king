<template>
  <div class="bind-friends font-o limit-max-width-media">
    <p class="model-title">
      <span class="theme-text-shadow-green">{{$t("绑定好友.绑定好友",1)}}</span>{{$t("绑定好友.绑定好友",2)}}
    </p>
    <div class="from theme-box-shadow">
      <p class="ps">{{$t("绑定好友.邀请码一旦填写不可更改，请认真填写",1)}}</p>
      <p class="ps">{{$t("绑定好友.邀请码一旦填写不可更改，请认真填写",2)}}</p>
      <input
        v-if="!haveRe"
        class="bind-input"
        placeholder="Please enter the invitation code"
        type="text"
        v-model="userModel"
      />
      <p v-else class="bind-input font-hide">
        <span>{{ userReAddress }}</span>
      </p>
      <!-- <Link ></Link> -->
      <button
        v-if="!haveRe"
        class="theme-button-clip font-o"
        @click="beforeAddre"
      >
        Determino
      </button>
      <Link v-else to="/explore"
        ><button class="theme-button-clip font-o">to explore</button></Link
      >
    </div>
  </div>
</template>

<script setup>
// getRes
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import Decimal from "decimal.js";
import { truncationAddress } from "@/utils/tools";
import { PlusElMessage, lockLoadHandler } from "@/utils/PlusElement";
import { storeToRefs } from "pinia";
import { UseStoreWeb3js, UseStoreContracts } from "@/stores/web3js";
import baseAddress from "@/abis/contracts";
const { AbiAddressQK, addedValue } = baseAddress;
const storeWeb3js = UseStoreWeb3js();
const { setRe } = storeWeb3js;
const { userAddress } = storeToRefs(storeWeb3js);
const storeCountracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeCountracts);

const userModel = ref(""); //0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3
const userReAddress = computed(() =>
  haveRe.value ? truncationAddress(userModel.value,8,8) : ""
);
const haveRe = ref(false);
const Route = useRoute()
init();
async function init() {
  const load = lockLoadHandler("loading...");
  console.log("Route.query.bind",Route.query)
  haveRe.value = await isRe(userAddress.value);
  load.close();
  if (haveRe.value) {
    userModel.value = await getRes();
  } else if(Route.query.bind){
    userModel.value = Route.query.bind
  }
}

async function isRe(address) {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.isRe(address).call();
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function getRes() {
  const load = lockLoadHandler("get address, wait loading...");
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.getRes(userAddress.value).call();
    console.log(res);
    load.close();
    return res;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: "invalid find address",
    });
    load.close();
    return "";
  }
}

async function addRe() {
  const load = lockLoadHandler("add address, wait loading...");
  try {
    const { QKContract } = Contracts.value;
    const _isRe = await isRe(userModel.value);
    if (_isRe) {
      const res = await QKContract.methods.add_re(userModel.value).send({
        from: userAddress.value,
      });
      if (res) {
        setRe(userModel.value);
      }
      init();
      console.log("addRe", res);
    } else {
      PlusElMessage({
        type: "error",
        message: "invalid address",
      });
    }
    load.close();
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: "add failed",
    });
    load.close();
  }
}

async function beforeAddre() {
  const v_res = await allowance();
  const v = new Decimal(v_res);
  console.log("是否授权过", v);
  if (v <= 0) {
    const iAll = await increaseAllowance();
    console.log("是否授权了", iAll);
    if (iAll) {
      addRe();
    }
  } else {
    addRe(); //0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3
  }
}

async function allowance() {
  try {
    const { USDTContract } = Contracts.value;
    const res_allowance = await USDTContract.methods
      .allowance(userAddress.value, AbiAddressQK)
      .call();
    return res_allowance;
  } catch (e) {
    // setUserAddress('')
    console.error(e);
  }
}

async function increaseAllowance() {
  const load = lockLoadHandler("Sign in loading...");
  try {
    const { USDTContract } = Contracts.value;
    const res = await USDTContract.methods
      .increaseAllowance(AbiAddressQK, addedValue)
      .send({
        from: userAddress.value,
      });
    console.log(res);
    load.close();
    return res;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
    load.close();
    return false;
  }
}
</script>
<style lang="scss" scoped>
.model-title {
  text-align: center;
  font-size: 48px;
  margin-top: 48px;
  margin-bottom: 48px;
}
.theme-button-clip {
  padding: 15px 40px;
}
.theme-box-shadow {
  border-radius: 14px;
}
.from {
  max-width: 1218px;
  margin: 0 auto;
  text-align: center;
  padding: 180px 0 120px;
  @media screen and (max-width: 768px) {
    padding: 40px 0 40px;
  }
  .bind-input {
    background-color: transparent;
    background-image: url("~@/assets/bg/bg-bind-friends-input.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    padding: 15px 40px;
    // font-size: 20px;
    color: #fff;
    height: 50px;
    text-align: center;
    display: block;
    width: 90%;
    max-width: 650px;
    margin: 65px auto 150px;
    @media screen and (max-width: 768px) {
      margin: 25px auto 40px;
      padding: 15px 10px;
    }
    &::placeholder {
      color: #ffffff;
    }
  }
}
</style>
