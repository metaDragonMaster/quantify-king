<template>
    <!-- 我的团队 -->
    <div
        class="team-grid"
        v-loading="tableLoad"
        element-loading-text="Loading..."
        :element-loading-spinner="LoadSvg"
        :element-loading-svg-view-box="svgViewBox"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <ul class="team-select-lv">
            <li v-for="item in teamLV" :key="item.id" @click="selectLV(item)">
                <button
                    :class="['select-lv-button', actionLv == item.id ? 'theme-shadow-border' : 'theme-shadow-border-black']"
                >
                    {{
                        item.title
                    }}
                </button>
            </li>
        </ul>
        <div class="table-content">
            <p class="title font-o">
                团队累计本金 :
                <span class="color-green">
                    {{ userAllReBalance.principal }}
                    USDT
                </span>
            </p>
            <p class="title font-o">
                团队已收益 :
                <span class="color-green">
                    {{ userAllReBalance.profit }}
                    USDT
                </span>
            </p>
            <p class="title font-o my">
                我的收益 ：
                <span class="color-green">{{ myInterests }} USDT</span>
            </p>
            <!-- <div class="table-title font-o">
            </div>-->
            <div class="title receive">
                <div class="theme-bg-shadow receive-button">
                    <button class="theme-bg-shadow-green do" @click="reWithdraw">可领取</button>
                    <div class="theme-bg-shadow-black can">
                        <span class="color-green">{{ reInterests._income }} USDT</span>
                    </div>
                </div>
            </div>
            <Table :head="tableHead" :data="tableData">
                <template v-slot:cell="{ item }">
                    <p class="cell font-o font-hide">{{ truncation(item) }}</p>
                    <!-- <p class="cell font-o font-hide">{{ item.ps }}</p> -->
                </template>
            </Table>
        </div>
    </div>
</template>

<script setup>
import Table from "@/components/Table"
import {
    ref,
    computed,
    reactive,
    onMounted
} from "vue"
import {
    // PlusElMessage,
    lockLoadHandler,
    LoadSvg,
    svgViewBox,
} from "@/utils/PlusElement"
import { ArrayKeysToObject, truncationAddress } from "@/utils/tools"
import { reInterestsInterface } from "@/abis/interface"
import {
    UseStoreContracts,
    UseStoreWeb3js
} from "@/stores/web3js"
import { storeToRefs } from "pinia";
import { UseStoreResize } from "@/stores/window"
import { AbiAddressUSDT } from "@/abis/index"
const storeContracts = UseStoreContracts()
const storeWeb3js = UseStoreWeb3js()
const { Contracts } = storeToRefs(storeContracts)
const { userAddress, web3 } = storeToRefs(storeWeb3js)
function textFromWei(str) {
    return web3.value.utils.fromWei(str) || str
}
// function textToWei(str) {
//     return web3.value.utils.toWei(str.toString()) || str
// }
const storeResize = UseStoreResize()
const { isPc } = storeToRefs(storeResize)
function truncation(address) {
    return isPc.value ? address : truncationAddress(address, 8, 8)
}
// function 
const teamLV = [
    { id: 0, title: '一级团队', func: 'getResChildS1' },
    { id: 1, title: '二级团队', func: 'getResChildS2' },
    { id: 2, title: '三级团队', func: 'getResChildS3' },
]
const actionLv = ref('1')
function selectLV(item) {
    actionLv.value = item.id
    getResChild(item.id, item.func)
    getUserAllReBalanceOf(item.id)
}
// init()
async function init() {
    const load = lockLoadHandler('loading');
    try {
        await selectLV(teamLV[0])
        await getReInterests()
        load.close()
    } catch (e) {
        console.error(e);
        load.close()
    }
}
onMounted(() => init())

const tableHead = computed(() => {
    return [
        `团队地址(${tableData.value.length})`,
    ]
})
const tableLoad = ref(false);
const tableData = ref([])
// console.log(tableLoad.value);
async function getResChild(id, func) {
    console.log(tableData.value);
    tableLoad.value = true;
    try {
        const { QKContract } = Contracts.value
        const res = await QKContract.methods[func](
            userAddress.value,
        ).call();
        console.log(res)
        tableData.value = res;
        tableLoad.value = false;
    } catch (e) {
        console.error(e)
        tableLoad.value = false;
    }
}

const reInterests = reactive({
    _income: '0',
    _released: "0"
})
const myInterests = computed(() => Number(reInterests._income) + Number(reInterests._released))
async function getReInterests() {
    try {
        const { QKContract } = Contracts.value
        const res = await QKContract.methods.get_re_interests(
            AbiAddressUSDT,
            userAddress.value,
        ).call();
        /*
            _income: "0" 可领取
            _released: "0" 已领取
        */
        const _reInterests = ArrayKeysToObject(res, reInterestsInterface)
        reInterests._income = _reInterests._income
        reInterests._released = _reInterests._released
        console.log("getReInterests", res)
    } catch (e) {
        console.error(e)
    }
}


const userAllReBalance = reactive({
    principal: '0', //总本金
    profit: '0',//已领取
})
async function getUserAllReBalanceOf(id) {
    console.log(tableData.value);
    // tableLoad.value = true;
    try {
        const { QKContract } = Contracts.value
        const res = await QKContract.methods.get_user_All_re_BalanceOf(
            AbiAddressUSDT,
            userAddress.value,
            id
        ).call();
        console.log(res)
        userAllReBalance.principal = textFromWei(res[0])
        userAllReBalance.profit = textFromWei(res[1])
        // tableLoad.value = false;
    } catch (e) {
        console.error(e)
        // tableLoad.value = false;
    }
}



async function reWithdraw() {
    try {
        const { QKContract } = Contracts.value
        const res = await QKContract.methods.re_withdraw(
            AbiAddressUSDT,
        ).send({
            from: userAddress.value
        });
        if (res.status) {
            init()
        }
        console.log(res)
    } catch (e) {
        console.error(e)
    }
}
</script>
<style lang='scss' scoped>
.color-green {
    color: #00ff66;
}
.team-grid {
    display: flex;
    .team-select-lv {
        li {
            .select-lv-button {
                width: 100%;
                height: 100%;
            }
        }
    }
    @media screen and (min-width: 769px) {
        .team-select-lv {
            width: 150px;
            margin-right: 15px;
            li {
                width: 135px;
                height: 50px;
                margin-bottom: 10px;
            }
        }
        .table-content {
            width: calc(100% - 150px);
        }
    }
    @media screen and (max-width: 768px) {
        flex-direction: column;
        .team-select-lv {
            // width: 150px;
            display: flex;
            padding-bottom: 10px;
            li {
                margin-right: 10px;
                .select-lv-button {
                    padding: 4px 16px;
                }
            }
        }
        .table-content {
            width: 100%;
        }
    }
    .title {
        margin-bottom: 10px;
    }
    .table-content {
        .receive-button {
            display: flex;
            width: fit-content;
            padding: 4px;
            &,
            [class^="theme-bg"] {
                border-radius: 4px;
            }
            .can {
                margin-left: 4px;
                padding: 10px 30px;
            }
            .do {
                padding: 10px 20px;
            }
            // @media screen and (min-width: 769px) {
            //     margin-left: auto;
            // }
            @media screen and (max-width: 768px) {
                .can {
                    margin-right: 4px;
                    padding: 4px 10px;
                }
                .do {
                    padding: 4px 10px;
                }
            }
        }
    }
}
</style>