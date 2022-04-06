<template>
    <div>
		<el-button @click="upload">测试上传</el-button>
		<el-button @click="getUserFile">获取文件</el-button>
    </div>
</template>

<script setup>
import { UseStoreWeb3js } from "@/stores/web3js"
import { uploadUserBind,getFileUrl } from "@/common/fleekStorage"
import { storeToRefs } from "pinia";
import axios from '@/utils/request'

const storeWeb3js = UseStoreWeb3js()
const { userAddress } = storeToRefs(storeWeb3js)
async function getUserFile() {
	const url = getFileUrl(userAddress.value)
	const res = await axios.get(url)
	console.log('getUserFile',res)
}
async function upload() {
	const data = {
		're': 'address'
	}
	const res = await uploadUserBind(userAddress.value, data)
	console.log('upload',res)
}

</script>
<style lang='scss' scoped>
</style>
