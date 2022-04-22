<template>
	<div>
		<el-button @click="upload">测试上传</el-button>
		<el-button @click="getUserFile">获取文件</el-button>
		<el-button @click="_deleteAllowanceFile">测试删除</el-button>
		<el-button @click="_getListFiles">测试获取文件</el-button>
		<el-button @click="_uploadRelationRe">测试上传上级关系文件</el-button>
		<el-button @click="_getRelationReFileUrl"
			>测试获取上级关系文件</el-button
		>
		<el-button @click="_uploadRelationChild"
			>测试上传子集关系文件</el-button
		>
		<el-button @click="_getRelationChildFileUrl"
			>测试获取子集关系文件</el-button
		>
<el-button @click="_getRelationChildLvListFileUrl"
			>测试获取子集关系等级文件</el-button
		>

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
	uploadRelationRe,
	uploadRelationChild,
	getRelationReFileUrl,
	getRelationChildFileUrl,
	getRelationChildLvListFileUrl,
} from "@/common/fleekStorage";
import { storeToRefs } from "pinia";
import axios from "@/utils/request";
import $axios from "axios";

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

const defaultReAddress = "0x0000000000000000000000000000000000000000";
async function _uploadRelationRe() {
	const res = await uploadRelationRe(
		"0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3",
		{
			re1: "0xc058FD311a22a369EF6fE178f7233c30B812f8A9",
			re2: defaultReAddress,
			re3: defaultReAddress,
		}
	);
	console.log("上传的上级文件", res);
}

async function _uploadRelationChild() {
	const res = await uploadRelationChild(
		"0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3",
		"0xc058FD311a22a369EF6fE178f7233c30B812f8A9",
		"re1"
	);
	console.log("上传的子集文件", res);
}
async function _getRelationReFileUrl() {
	const url = getRelationReFileUrl(
		"0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3"
	);
	console.log("_getRelationReFileUrl url", url);

	const res = await axios.get(url);
	// const res = await $axios.get(url)
	console.log("_getRelationReFileUrl 获取到的上级文件", res);
}

async function _getRelationChildFileUrl() {
	const url = getRelationChildFileUrl(
		"0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3",
		"0xc058FD311a22a369EF6fE178f7233c30B812f8A9",
		"re1"
	);
	console.log("_getRelationChildFileUrl url", url);

	// const res = await axios.get(url)
	const res = await $axios.get(url);
	console.log("_getRelationChildFileUrl 获取到的上级文件", res);
}

async function _getRelationChildLvListFileUrl() {
	const files = await getRelationChildLvListFileUrl(
		"0xc058FD311a22a369EF6fE178f7233c30B812f8A9",
		"re1"
	);
	console.log("_getRelationChildLvListFileUrl files", files);
}

// "https://storageapi2.fleek.co/0fdd4305-c758-4bda-97be-de16e5307de4-bucket/version-6/RelationReTest/0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3.json"
// "https://storageapi2.fleek.co/0fdd4305-c758-4bda-97be-de16e5307de4-bucket/version-6/RelationReTest/0x5c2571f4AaBc057a100bDfc058264EEE9C65C3D3.json"
</script>
<style lang="scss" scoped></style>
