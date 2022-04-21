<template>
	<div>
		<el-button @click="upload">测试上传</el-button>
		<el-button @click="getUserFile">获取文件</el-button>
		<el-button @click="_deleteAllowanceFile">测试删除</el-button>
		<el-button @click="_getListFiles">测试获取文件</el-button>
	</div>
</template>

<script setup>
import {
	UseStoreWeb3js,
	// UseStoreContracts
} from "@/stores/web3js";
import {
	uploadUserBind,
	getFileUrl,
	deleteAllowanceFile,
	getListFiles,
} from "@/common/fleekStorage";
import { storeToRefs } from "pinia";
import axios from "@/utils/request";

const storeWeb3js = UseStoreWeb3js();
const { userAddress } = storeToRefs(storeWeb3js);
// const storeContracts = UseStoreContracts();
// const { Contracts } = storeToRefs(storeContracts);
async function getUserFile() {
	const url = getFileUrl(userAddress.value);
	const res = await axios.get(url);
	console.log("getUserFile", res);
}
async function upload() {
	const data = {
		re: "address",
	};
	const res = await uploadUserBind(userAddress.value, data);
	console.log("upload", res);
}
async function _deleteAllowanceFile() {
	const res = await deleteAllowanceFile("test");
	console.log("删除文件", res);
}
async function _getListFiles() {
	const res = await getListFiles();
	console.log("获取文件", res);
}
</script>
<style lang="scss" scoped></style>
