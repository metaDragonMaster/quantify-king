<template>
    <!-- 团队收益记录 -->
    <div
        class="team"
        v-loading="tableLoad"
        element-loading-text="Loading..."
        :element-loading-spinner="LoadSvg"
        :element-loading-svg-view-box="svgViewBox"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <p class="view-title font-o">
            <span class="color-green">团队累计收益</span>999USDT
        </p>
        <Table :head="tableHead" :data="tableData">
            <template v-slot:cell="{ item }">
                <p class="cell font-o font-hide">{{ item.time }}</p>
                <p class="cell font-o font-hide">{{ item.value }}</p>
                <p class="cell font-o font-hide">{{ item.static }}</p>
            </template>
        </Table>
    </div>
</template>

<script setup>
import Table from "@/components/Table"
import {
    ref,
    // computed,
    // reactive,
    onMounted
} from "vue"
import {
    // PlusElMessage,
    // lockLoadHandler,
    LoadSvg,
    svgViewBox,
} from "@/utils/PlusElement"
import {
    UseStoreContracts,
    UseStoreWeb3js
} from "@/stores/web3js"
import { storeToRefs } from "pinia";
// import { AbiAddressUSDT } from "@/abis/index"

const storeContracts = UseStoreContracts()
const storeWeb3js = UseStoreWeb3js()
const { Contracts } = storeToRefs(storeContracts)
const { userAddress } = storeToRefs(storeWeb3js)

const tableHead = [
    '时间',
    '数量',
    '备注',
]
onMounted(() => {
    init()
})
function init() {
    getReLogInfo()
}
const tableData = ref([])
const tableLoad = ref(false);

async function getReLogInfo() {
    try {
        const { QKContract } = Contracts.value
        const res = await QKContract.methods.get_re_log_info(
            userAddress.value,
        ).call();
        /*
            _income: "0" 可领取
            _released: "0" 已领取
        */
        console.log("getReLogInfo", res)
    } catch (e) {
        console.error(e)
    }
}
</script>
<style lang='scss' scoped>
.view-title {
    text-align: center;
    font-size: 24px;
    padding-bottom: 30px;
    span {
        margin-right: 18px;
    }
}
.color-green {
    color: #8eff84;
}
</style>