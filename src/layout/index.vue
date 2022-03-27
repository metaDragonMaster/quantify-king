<template>
	<div id="layout">
		<HeadNav></HeadNav>
		<div id="main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script setup>
import {
} from "vue"
import HeadNav from "./modules/headNav";
import { PlusElMessage, lockLoadHandler } from "@/utils/PlusElement"
import {
	useWindowResize,
	// useWindowScroll 
} from "@/hooks/useWindow"
import Decimal from "decimal.js";
import { UseStoreResize } from "@/stores/window"
import {
	storeToRefs
} from "pinia"
import {
	UseStoreWeb3js,
	UseStoreContracts
} from "@/stores/web3js"
import baseAddress from "@/abis/contracts"
const {
	AbiAddressQK,
	addedValue,
} = baseAddress;
const { setClientWidth } = UseStoreResize()
useWindowResize(() => {
	setClientWidth()
})
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { startWeb3, setRe } = storeWeb3js;
const { haveAuth, userAddress } = storeToRefs(storeWeb3js)
const { Contracts } = storeToRefs(storeContracts);

init()
async function init() {
	if (!haveAuth.value) {
		console.log('获取web3')
		await startWeb3();
		// ()=> allowance()
	}
	const _isRe = await isRe(userAddress.value)
	console.log("_isRe", _isRe)

	if (!_isRe) {
		await allowance()
	} else {
		await getRes()
	}
}

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
		const { QKContract } = Contracts.value
		const res = await QKContract.methods.getRes(userAddress.value).call();
		console.log("getRes", res)
		const _isRe = await isRe(res)
		if (_isRe) {
			setRe(res)
		}
		return res
	} catch (e) {
		console.error(e)
		return ;
	}
}

async function allowance() {
	try {
		const { USDTContract } = Contracts.value;
		const res_allowance = await USDTContract.methods.allowance(userAddress.value, AbiAddressQK).call();
		const v = new Decimal(res_allowance)
		// console.log('是否有授权',v);
		if (v <= 0) {
			// setUserAddress('')
			increaseAllowance()
		}
	} catch (e) {
		// setUserAddress('')
		console.error(e);
	}
}

async function increaseAllowance() {
	const load = lockLoadHandler('Sign in loading...')
	try {
		const { USDTContract } = Contracts.value;
		const res = await USDTContract.methods.increaseAllowance(AbiAddressQK, addedValue).send({
			from: userAddress.value
		});
		console.log(res)
		load.close()
	} catch (e) {
		console.error(e);
		PlusElMessage({
			type: 'error',
			message: e.message
		})
		load.close()
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
