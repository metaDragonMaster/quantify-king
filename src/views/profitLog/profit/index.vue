<template>
    <!-- 利息提取记录 -->
    <Table :head="tableHead" :data="tableData">
        <template v-slot:cell="{ item }">
            <p class="cell font-o font-hide">{{item.time}}</p>
            <p class="cell font-o font-hide">{{item.value}}</p>
            <p class="cell font-o font-hide">{{item.static}}</p>
        </template>
    </Table>
</template>

<script setup>
import Table from "@/components/Table"
const tableHead = [
    '时间',
    '数量',
    '备注',
]
const tableData = [
    {
        time: "2022-12-12 24:00:00",
        value: "100USDT",
        static: "提取"
    }
]
</script>
<style lang='scss' scoped>
</style>