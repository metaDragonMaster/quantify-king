<template>
    <div class="change-language">
        <button class="font-orbitron" @click="openDialog">
            <img class="icon" src="@/assets/icons/icon-i18n.png" />
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-dd9c9540=""><path fill="currentColor" d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"></path></svg>
            <!-- <span>{{ $t('语言') }}</span> -->
        </button>
        <el-dialog
            title="change language"
            v-model="dialogHandler"
            width="300px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <ul class="language-list">
                <li
                    v-for="(item, index) in languageList"
                    :key="index"
                    @click="currentLanguage = item.id"
                >
                    <!-- <img :src="item.icon" alt /> -->
                    <span :class="{
                        'theme-text-shadow-green': currentLanguage == item.id,
                    }">{{ item.title }}</span>
                </li>
            </ul>
            <template v-slot:footer>
                <el-button @click="dialogHandler = false">No</el-button>
                <el-button type="primary" @click="changeLanguage()">Yes</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useLanguage } from '@/hooks/useLanguage.js'
import { UseStoreLanguage } from "@/stores/language"
import { storeToRefs } from "pinia";
const stroeLanguage = UseStoreLanguage()
const { LanguageType } = storeToRefs(stroeLanguage)
const Language = useLanguage()
const { change } = Language;
const dialogHandler = ref(false)
function openDialog() {
    currentLanguage.value = LanguageType.value
    dialogHandler.value = true
}
function changeLanguage() {
    change(currentLanguage.value)
    dialogHandler.value = false
}
const currentLanguage = ref('zh')
const languageList = [
    {
        id: 'zh',
        // icon: require("@/assets/languagelogo/zh.png"),
        title: '中文',
    },
    {
        id: 'en',
        // icon: require("@/assets/languagelogo/en.png"),
        title: 'English',
    },
    {
        id: 'ja',
        // icon: require("@/assets/languagelogo/ja.png"),
        title: '日本語',
    },
    {
        id: 'kr',
        // icon: require("@/assets/languagelogo/kr.png"),
        title: '한국어',
    },
]


</script>
<style lang='scss' scoped>
:deep(.el-dialog) {
    background: #333;
    color: #fff;
    .el-dialog__title {
        color: inherit;
    }
}
.font-orbitron {
    display: flex;
    align-items: center;
}
.language-list {
    display: flex;
    flex-direction: column;
    color: #fff;
    li {
        // display: flex;
        // align-items: center;
        // justify-content: flex-start;
        margin-bottom: 20px;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
        // img {
        //     width: 50px;
        //     margin-right: 20px;
        // }
    }
}
</style>
