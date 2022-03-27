<template>
    <div class="table">
        <img class="b_1" src="@/assets/icons/table-c.png" alt />
        <img class="b_2" src="@/assets/icons/table-c.png" alt />
        <div class="table__centent theme-box-shadow">
            <ul class="head">
                <li class="head__tr" v-for="(item, index) in props.head" :key="index">{{item}}</li>
            </ul>
            <ul class="data__content">
                <li class="data__content-item" v-for="(item, index) in data" :key="index">
                    <!-- <p class="cell font-o font-hide">2022-12-12 24:00:00</p>
                    <p class="cell font-o font-hide">100USDT</p>
                    <p class="cell font-o font-hide">提取</p> -->
                    <slot name="cell" :item="item"></slot>
                </li>
            </ul>
            <el-empty v-show="isEmpty"></el-empty>
        </div>
    </div>
</template>

<script setup>
import {
    toRefs,
    computed,
    defineProps,

} from "vue"
const props = defineProps({
    head: {
        type: Array,
    },
    data: {
        type: Array,
    }
})
const { data } = toRefs(props)
const isEmpty = computed(() => data.value.length <= 0)

</script>
<style lang='scss' scoped>
.table {
    position: relative;
    z-index: 1;
    .b_1,
    .b_2 {
        position: absolute;
        width: 175px;
        height: 188px;
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
    .b_1 {
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        z-index: 1;
    }
    .b_2 {
        left: 0;
        bottom: 0;
        transform: translate(-50%, 50%);
    }
    .table__centent {
        @media screen and (min-width: 769px) {
            padding: 0 60px;
        }
        @media screen and (max-width: 768px) {
            padding: 0 10px;
        }
    }
    .head {
        border-bottom: 1px solid #a5a5a5;
        .head__tr {
            @media screen and (min-width: 769px) {
                line-height: 118px;
                font-size: 22px;
            }
            @media screen and (max-width: 768px) {
                line-height: 36px;
                font-size: 14px;
            }
        }
    }
    .data__content {
        .data__content-item {
            :deep(.cell)  {
                @media screen and (min-width: 769px) {
                    font-size: 18px;
                }
                @media screen and (max-width: 768px) {
                    font-size: 12px;
                }
            }
        }
    }
    .head,
    .data__content .data__content-item {
        display: flex;
    }
    .head .head__tr,
    :deep() .data__content .data__content-item .cell {
        flex: 1;
        text-align: center;
    }
    .data__content,
    .data__content .data__content-item {
        padding: 20px 0;
        @media screen and (max-width: 768px) {
            padding: 8px 0;
        }
    }
}
</style>