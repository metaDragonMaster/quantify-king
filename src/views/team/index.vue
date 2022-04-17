<template>
    <div class="view limit-max-width-media">
        <Link v-for="item in nav" :key="item.path" :to="item.path">
            <button
                :class="['router-link', item.path == currentPath ? 'theme-shadow-border-green' : 'theme-shadow-border-black']"
            >{{ item.title }}</button>
        </Link>
        <div class="children-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import {
    computed
} from "vue"
import {
    useRoute
} from "vue-router"
import {
    useI18n
} from "vue-i18n"
const { t } = useI18n()
const Route = useRoute()
const currentPath = computed(() => Route.path)
const nav = computed(() => [
    {
        path: '/team/myTeam',
        title: t('导航.我的团队')
    },
    // {
    //     path: '/team/teamLogs',
    //     title: t('导航.团队收益记录')
    // },
])
</script>
<style lang='scss' scoped>
.view {
    padding-top: 50px;
    padding-bottom: 50px;
    overflow: hidden;
}
.router-link {
    width: 220px;
    height: 64px;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
    @media screen and (max-width: 768px) {
        width: 110px;
        height: 32px;
        font-size: 14px;
    }
}
.children-view {
    padding-top: 20px;
}
</style>
