<template>
	<div class="explore limit-max-width-media">
		<!-- <div>
			{{ moment(userInfo.end_time * 1000).format("yyyy-MM-DD HH:mm:ss") }}
		</div>
		<div>{{ timeTamp }}</div>
		<div>{{ moment(NowTime * 1000).format("yyyy-MM-DD HH:mm:ss") }}</div> -->
		<!-- <div>userBind: {{ userBind }}</div> -->
		<section class="model-1 model-grid">
			<ul class="wallet">
				<li
					class="theme-box-shadow balance"
					v-loading="userInfo.Load"
					element-loading-text="Loading..."
					:element-loading-spinner="LoadSvg"
					:element-loading-svg-view-box="svgViewBox"
					element-loading-background="rgba(0, 0, 0, 0.8)"
				>
					<img class="icon" src="@/assets/explore/m-1-t.png" />
					<div class="info theme-box-shadow">
						<p>{{ _time }}{{ $t("勘察.秒后刷新数据") }}</p>
						<div class="cell">
							<h3>{{ $t("勘察.量化本金") }}</h3>
							<!-- <p class="refresh" @click="join">
								<img :class="{ active: joinActive }" src="@/assets/icons/icon-refresh.png" alt />
								<u>{{ $t("勘察.去提现") }}</u>
							</p>-->
							<p class="cash-out" @click="openCashOut">
								<img
									src="@/assets/icons/icon-cash-out.png"
									alt
								/>
								<u>{{ $t("勘察.去提现") }}</u>
							</p>
							<Mask v-model:show="cashOut.maskShow">
								<div class="cash-out-dialog">
									<p class="title font-o">
										<span class="ps">{{
											$t("勘察.量化本金")
										}}</span>
										<span>{{ weiUserinterest }}</span>
									</p>
									<el-input-number
										v-model="cashOut.amount"
										controls-position="right"
										size="large"
										:min="0"
										:controls="false"
									/>
									<div class="footer">
										<button
											class="submit"
											@click="cashOutSubmit"
										>
											提现
										</button>
										<button
											class="cancel"
											@click="cashOutCancel"
										>
											取消
										</button>
									</div>
								</div>
							</Mask>
						</div>
						<div class="cell">
							<div class="type">
								<img src="@/assets/icons/b-t.png" alt />
								<span class="font-o">USDT</span>
							</div>
							<span class="font-o color-green">{{
								weiUserinterest
							}}</span>
						</div>
						<div class="cell font-o">
							<span class="color-grey">USDT</span>
							<span>≈ ￥{{ weiUserinterest * 6.3 }}</span>
						</div>
					</div>
					<div class="deposit theme-box-shadow">
						<el-input-number
							v-model="joinAmount"
							controls-position="right"
							size="large"
							:min="0"
							:controls="false"
						/>
						<button class="submit" @click="joinSuper">
							{{ $t("勘察.存入") }}
						</button>
					</div>
				</li>
				<li
					class="theme-box-shadow"
					v-loading="earning.Load"
					element-loading-text="Loading..."
					:element-loading-spinner="LoadSvg"
					:element-loading-svg-view-box="svgViewBox"
					element-loading-background="rgba(0, 0, 0, 0.8)"
				>
					<div class="cell">
						<h3>{{ $t("勘察.利息余额") }}</h3>
						<p>
							<img
								class="icon"
								src="@/assets/icons/b-t.png"
								alt
							/>
							<span class="color-green font-o">{{
								earning.interest
							}}</span>
						</p>
					</div>
					<!-- <div>{{ $t("勘察.每*秒产出一次利息", { n: "30" }) }}</div> -->
				</li>
				<li
					class="theme-box-shadow"
					v-loading="earning.Load"
					element-loading-text="Loading..."
					:element-loading-spinner="LoadSvg"
					:element-loading-svg-view-box="svgViewBox"
					element-loading-background="rgba(0, 0, 0, 0.8)"
				>
					<h3 class="cell">
						<span>{{ $t("勘察.利率") }}</span>
						<span class="color-green font-o"
							>{{ earning.interestRate }} %</span
						>
					</h3>
					<div class="cell">
						<p>
							{{
								$t("勘察.每*可以领取", {
									n: timeTampMinutes,
								})
							}}
						</p>
						<!-- <span class="color-grey font-o">~ ￥0.96 （ 0.5% ）</span> -->
						<span class="color-grey font-o"
							>{{ earnEveryTime }} USDT</span
						>
					</div>
				</li>
				<li
					class="theme-box-shadow"
					v-loading="userInfo.Load"
					element-loading-text="Loading..."
					:element-loading-spinner="LoadSvg"
					:element-loading-svg-view-box="svgViewBox"
					element-loading-background="rgba(0, 0, 0, 0.8)"
				>
					<h3 class="cell">
						<span>{{ $t("勘察.累积提取利息") }}</span>
						<span class="color-green font-o"
							>{{ textFromWei(userInfo.quantity) }} USDT</span
						>
					</h3>
					<!-- <div class="cell">
						<span>
							{{
								$t("勘察.共计产出利息")
							}}{{ userInfo.withdraw_times }}{{ $t("勘察.次") }}
						</span>
						<span class="color-grey font-o">
							≈ ￥{{
								textFromWei(userInfo.quantity) * 6.3
							}}
						</span>
					</div>-->
				</li>
			</ul>
			<div class="right">
				<img class="pc-image" src="@/assets/explore/m-1.png" alt />
				<button
					:disabled="Down > 0"
					class="theme-button-clip font-o button"
					@click="withdraw"
				>
					{{ $t("勘察.提息") }} --->
				</button>
				<p color="count-down">CountDown:{{ TimeCountDown }}</p>
			</div>
		</section>
		<section class="model-2">
			<p class="model-title">
				<span class="theme-text-shadow-green">
					{{ $t("勘察.利息") }}
				</span>
				{{ $t("勘察.计算规则") }}
			</p>
			<div class="model-grid">
				<div class="content">
					<div
						class="s-1 theme-box-shadow"
						v-loading="userCalcData.Load"
						element-loading-text="Loading..."
						:element-loading-spinner="LoadSvg"
						:element-loading-svg-view-box="svgViewBox"
						element-loading-background="rgba(0, 0, 0, 0.8)"
					>
						<!-- <p class="cell"> -->
						<!-- <span>{{ $t("勘察.余额达到") }}</span> -->
						<!-- <span>{{ $t("勘察.利息利率") }}</span> -->
						<!-- </p> -->
						<p class="cell font-o">
							<!-- <span>≥ 30 USDT</span> -->
							<el-input
								v-model.number="userCalcData.modelValue"
								@change="userCalc"
							>
								<template #append>USDT</template>
							</el-input>
							<span class="color-green"
								>{{ userCalcData.interestRate }} %</span
							>
						</p>
						<div class="bg-green color-green font-o">
							<p>
								{{
									$t("勘察.每*可以领取", {
										n: timeTampMinutes,
									})
								}}
							</p>
							<p>
								<span class="usdt-num">
									{{ userCalcEveryTime }}
								</span>
								USDT
							</p>
						</div>
					</div>
					<p class="ps">{{ $t("勘察.ps1") }}</p>
					<div
						class="s-2 theme-box-shadow font-o"
						v-loading="userInfo.Load"
						element-loading-text="Loading..."
						:element-loading-spinner="LoadSvg"
						:element-loading-svg-view-box="svgViewBox"
						element-loading-background="rgba(0, 0, 0, 0.8)"
					>
						<p class="cell title">
							<span>USDT {{ $t("勘察.余额") }}</span>
							<span>{{ $t("勘察.利息") }}</span>
						</p>
						<ul>
							<li
								class="cell"
								v-for="item in InterestReveal.ICArray"
								:key="item.id"
							>
								<span>≥ {{ item.conditional }} USDT</span>
								<span>
									{{ item.interest }} % USDT
									{{ $t("勘察.利息") }}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<img class="pc-image" src="@/assets/explore/m-2.png" alt />
				</div>
			</div>
		</section>
		<section class="model-3">
			<p class="model-title">
				<span class="theme-text-shadow-green"
					>{{ $t("勘察.好友") }} {{ $t("勘察.邀请") }}</span
				>
				{{ $t("勘察.规则") }}
			</p>
			<div class="model-grid">
				<div class="content">
					<div
						class="theme-box-shadow proportion"
						v-loading="ReFees.Load"
						element-loading-text="Loading..."
						:element-loading-spinner="LoadSvg"
						:element-loading-svg-view-box="svgViewBox"
						element-loading-background="rgba(0, 0, 0, 0.8)"
					>
						<p class="cell">
							<span>{{ $t("勘察.一级好友的分红比例") }}</span>
							<span class="font-o"
								>{{ ReFees.List[0] / 10 }}%</span
							>
						</p>
						<p class="cell">
							<span>{{ $t("勘察.二级好友的分红比例") }}</span>
							<span class="font-o"
								>{{ ReFees.List[1] / 10 }}%</span
							>
						</p>
						<p class="cell">
							<span>{{ $t("勘察.三级好友的分红比例") }}</span>
							<span class="font-o"
								>{{ ReFees.List[2] / 10 }}%</span
							>
						</p>
					</div>
					<!-- <div class="theme-box-shadow qrcode flex-column">
                        <img src="@/assets/explore/m-3-t.png" alt />
                        <span>登录后可获取您的二维码</span>
					</div>-->
					<ul class="invitation">
						<li class="theme-box-shadow">
							<p>{{ $t("勘察.邀请链接") }}</p>
							<p>{{ slocationLink }}</p>
							<button
								class="bg-green"
								@click="copy(locationLink)"
							>
								{{ $t("勘察.复制") }}
							</button>
						</li>
						<!--
							<li class="theme-box-shadow">
								<p>{{ $t("勘察.邀请码") }}</p>
								<p>{{ truncationAddress(userAddress) }}</p>
								<button class="bg-green" @click="copy(userAddress)">
									{{ $t("勘察.复制") }}
								</button>
							</li>
						-->
					</ul>
				</div>
				<div>
					<img class="pc-image" src="@/assets/explore/m-3.png" alt />
				</div>
			</div>
		</section>
		<section class="model-4">
			<p class="model-title">
				<span class="theme-text-shadow-green">
					{{ $t("勘察.利息收益") }}
				</span>
				{{ $t("勘察.排行榜") }}
			</p>
			<div class="model-grid">
				<div
					class="content theme-box-shadow"
					v-loading="KingSortData.Load"
					element-loading-text="Loading..."
					:element-loading-spinner="LoadSvg"
					:element-loading-svg-view-box="svgViewBox"
					element-loading-background="rgba(0, 0, 0, 0.8)"
				>
					<p class="cell title">
						<span class="font-o">Address</span>
						<span>
							{{ $t("勘察.累积收益") }}{{ $t("勘察.利息") }}
						</span>
					</p>
					<ul class="font-o address-list">
						<li
							class="cell"
							v-for="item in KingSortData.List"
							:key="item.id"
						>
							<p>
								<img src="@/assets/icons/icon-bsc.png" alt />
								<span>{{ item._us }}</span>
							</p>
							<p>{{ item._released }} USDT</p>
						</li>
					</ul>
				</div>
				<div>
					<img class="pc-image" src="@/assets/explore/m-4.png" alt />
				</div>
			</div>
		</section>
		<section class="model-5">
			<p class="model-title">{{ $t("勘察.合作方") }}</p>
			<img class="banner" src="@/assets/explore/m-5.png" alt />
			<div class="cell">
				<div class="color-grey">
					<!-- <p>
            <img src="@/assets/icons/icon-i18n-grey.png" alt />
            <span>{{ $t("语言") }}</span>
					</p>-->
					<changeLanguageVue></changeLanguageVue>
					<p>
						<img
							class="icon"
							src="@/assets/icons/icon-reserved.png"
							alt
						/>
						<span>Quantify king</span>
					</p>
				</div>
				<!-- <Link to="/explore">
          <button class="theme-button-clip font-o button">
            {{ $t("勘察.联系我们") }}
          </button>
				</Link>-->
			</div>
		</section>
	</div>
</template>

<script setup>
import Mask from "@/components/Mask";
import changeLanguageVue from "@/layout/modules/headNav/changeLanguage.vue";
import { ref, watch, reactive, unref, onMounted, computed } from "vue";
import {
	PlusElMessage,
	lockLoadHandler,
	LoadSvg,
	svgViewBox,
} from "@/utils/PlusElement";
import {
	ArrayKeysToObject,
	truncationAddress,
	deepClone,
	copy,
} from "@/utils/tools";
import { useI18n } from "vue-i18n";
import { useSafeInterval } from "@/hooks/useSafeListener";
import { userInfoInterface, kingSortInterface } from "@/abis/interface";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT } from "@/abis/index";
import { debounce } from "lodash";
import { formatTimeDown } from "@/utils/deta";
import moment from "moment";
import { useRoute } from "vue-router";

import {
	uploadUserBind,
	getFileUrl,
	uploadReUsers,
	deleteAllowanceFile,
} from "@/common/fleekStorage";
import axios from "@/utils/request";

const Route = useRoute();
const i18n = useI18n();
const { t } = i18n;
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress, web3 } = storeToRefs(storeWeb3js);
const locationLink = computed(
	() => `${window.location.origin}/#/explore?bind=${userAddress.value}`
);
const slocationLink = computed(() =>
	truncationAddress(unref(locationLink), 4, 8)
);
const NowTime = ref(0);
const constTime = 30;
const _time = ref(constTime);
const _tiemDownLock = ref(false);
useSafeInterval(() => {
	NowTime.value = moment(new Date()).unix();
	if (!_tiemDownLock.value) {
		if (_time.value > 0) {
			_time.value -= 1;
		} else {
			_time.value = constTime;
			init();
		}
	}
});
onMounted(async () => {
	await isBind();
	await init();
});
watch(
	() => userAddress.value,
	async () => {
		userBind.value = "";
		await isBind();
		await init();
	}
);
async function init() {
	_tiemDownLock.value = true;
	await getUserInfo();
	await startEarning();
	await getReFee();
	await startICArray();
	await getKingSort();
	await getTimeTamp();
	_tiemDownLock.value = false;
}
async function isBind() {
	// console.log("init route: ", Route);
	const bind = Route.query.bind;
	console.log("init route bind:", bind);
	const hadRe = await getUserBindRe();
	console.log("hadRe", hadRe);
	if (hadRe) {
		userBind.value = hadRe;
	} else if (bind) {
		await uploadBindUser(bind);
	}
	console.log("getUserBindRe userBind-->>", userBind.value);
}
async function uploadBindUser(bind) {
	const bindIsRe = await isRe(bind);
	const userHadRe = await getRes(userAddress.value);
	console.log("isBind", bindIsRe, userHadRe);
	console.log("isBind", bindIsRe && userHadRe == false);
	if (!bindIsRe) {
		PlusElMessage({
			type: "error",
			message: "Your friend is't a recommender!",
		});
	} else if (userHadRe != false) {
		PlusElMessage({
			type: "error",
			message: "You already had a recommender!",
		});
	} else {
		const res = await upload(bind);
		console.log("getUserBindRe upload-->>");
		if (res) {
			userBind.value = bind;
		} else {
			PlusElMessage({
				type: "error",
				message: "Failed to upload recommender! please try again.",
			});
		}
	}
}

const userBind = ref("");
async function getUserBindRe() {
	try {
		const url = getFileUrl(userAddress.value);
		const res = await axios.get(url);
		if (res) {
			return res.re;
		} else {
			return "";
		}
	} catch (e) {
		console.error(e);
		console.log("getUserBindRe - axios error");
		return;
	}
}
async function upload(bindAddress) {
	try {
		console.log("upload");
		const res = await uploadUserBind(userAddress.value, bindAddress);
		const ReRes = await uploadReUsers(userAddress.value, bindAddress);
		console.log("upload");
		return res && ReRes;
	} catch (e) {
		console.error(e);
		return;
	}
}

async function getRes(userAddress) {
	try {
		const { QKContract } = Contracts.value;
		const reAddress = await QKContract.methods.getRes(userAddress).call();
		const _isRe = await isRe(reAddress);
		if (_isRe) {
			return reAddress;
		} else {
			return false;
		}
	} catch (e) {
		console.error(e);
		return false;
	}
}

async function isRe(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.isRe(address).call();
		return res;
	} catch (e) {
		console.error(e);
		return false;
	}
}

const Down = computed(() => {
	// const eTime = Number(userInfo.end_time) + Number(timeTamp.value);
	// console.log(eTime,NowTime.value)
	return Number(userInfo.end_time) + Number(timeTamp.value) - NowTime.value;
});
const TimeCountDown = computed(() => {
	if (earning.interest <= 0 && Down.value <= 0) {
		return "暂无利息";
	}
	if (Down.value <= 0) {
		return "领取";
	} else {
		const format = formatTimeDown(Down.value);
		const _day = myFormat(format.day);
		const _hour = myFormat(format.hour);
		const _minute = myFormat(format.minute);
		const _second = myFormat(format.second);
		return `${_day}d:${_hour}h:${_minute}m:${_second}s`;
	}
});
function myFormat(num) {
	if (num == "0" || num == 0) {
		return "0";
	} else if (num < 10) {
		return "0" + num;
	} else {
		return "" + num;
	}
}

const timeTamp = ref("0");

// const isZh = computed(()=> LanguageType.value == 'zh')
// function describeTime() {
// 	return
// }
const timeTampMinutes = computed(() => {
	const second = timeTamp.value;
	const minute = second / 60;
	const hour = minute / 60;
	const day = hour / 24;
	// `${_day}d:${_hour}h:${_minute}m:${_second}s`
	let describe = "";
	if (day >= 1) {
		describe = `${day} ${t("时间.天")}`;
	} else if (hour >= 1) {
		describe = `${hour} ${t("时间.小时")}`;
	} else if (minute >= 1) {
		describe = `${minute} ${t("时间.分钟")}`;
	} else {
		describe = `${second} ${t("时间.秒")}`;
	}
	return describe;
});
async function getTimeTamp() {
	//提现
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_time_tamp().call();
		console.log("getTimeTamp", res);
		timeTamp.value = res;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}

function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}
function textToWei(str) {
	return web3.value.utils.toWei(str.toString()) || str;
}
const joinAmount = ref(0);
async function joinSuper() {
	const load = lockLoadHandler("join loading...");
	_tiemDownLock.value = true;
	try {
		//
		if (!userBind.value) {
			PlusElMessage({
				type: "error",
				message: "Please bind friend!",
			});
		} else {
			const weiAmount = textToWei(joinAmount.value);
			const { QKContract, USDTContract } = Contracts.value;
			const balanceOf = await USDTContract.methods
				.balanceOf(userAddress.value)
				.call();
			const fWeiBalanceOf = textFromWei(balanceOf);
			console.log("balanceOf", fWeiBalanceOf);

			// else if (InterestReveal.ICArray[0] && InterestReveal.ICArray[0].conditional > weiAmount) {
			// 	PlusElMessage({
			// 		type: "error",
			// 		message: `least ${InterestReveal.ICArray[0].conditional} USDT!`,
			// 	});
			// }
			if (joinAmount.value <= 0) {
				PlusElMessage({
					type: "error",
					message: "Please enter the correct amount!",
				});
			} else if (Number(fWeiBalanceOf) <= 0) {
				PlusElMessage({
					type: "error",
					message: "Your wallet balance is insufficient!",
				});
			} else {
				console.log(weiAmount, joinAmount.value);
				console.log("userBind", userBind.value);
				const userBindRe = await getRes(userAddress.value);
				console.log("userBindRe", userBindRe);
				const res = await QKContract.methods
					.join_super(
						AbiAddressUSDT,
						// balanceOf,
						weiAmount,
						userBind.value
					)
					.send({
						from: userAddress.value,
					});
				console.log("join-->", res);

				if (res.status) {
					PlusElMessage({
						type: "success",
						message: "join success",
					});
					deleteAllowanceFile(userAddress.value)
					joinAmount.value = 0;
					init();
				} else {
					PlusElMessage({
						type: "error",
						message: "join failed",
					});
				}
			}
		}
		_tiemDownLock.value = false;
		load.close();
	} catch (e) {
		console.error(e);
		_tiemDownLock.value = false;
		load.close();
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}
const cashOut = reactive({
	// Load: false,
	maskShow: false,
	amount: 0,
});

function openCashOut() {
	cashOut.maskShow = true;
}
function closeCashOut() {
	cashOut.maskShow = false;
}
async function cashOutSubmit() {
	const load = lockLoadHandler("Cash out loading...");
	try {
		if (weiUserinterest.value < cashOut.amount) {
			PlusElMessage({
				type: "error",
				message: `You can't exceeding the limit!`,
			});
		} else {
			const { QKContract } = Contracts.value;
			const weiAmount = textToWei(cashOut.amount);
			const res = await QKContract.methods
				.withdraw_super(AbiAddressUSDT, weiAmount)
				.send({
					from: userAddress.value,
				});
			console.log(res);
			cashOutCancel();
			if (res.status) {
				init();
			}
		}

		load.close();
	} catch (err) {
		// PlusElMessageByCatch(err);
		load.close();
	}
}
function cashOutCancel() {
	closeCashOut();
	cashOut.amount = 0;
}

const userInfo = reactive({
	Load: false,
	end_time: "0", //上次提取时间
	f: false, //是否join过
	interest_bearing_principal: "0", //本金
	quantity: "0", //已提取
	withdraw_times: "0", //提取次数
});
const weiUserinterest = computed(
	() => textFromWei(userInfo.interest_bearing_principal) || 0
);

async function getUserInfo() {
	// const load = lockLoadHandler('loading...')
	userInfo.Load = true;
	try {
		const { QKContract } = Contracts.value;
		// console.log(AbiAddresUSDT);
		const res = await QKContract.methods
			.get_user_info(AbiAddressUSDT, userAddress.value)
			.call();
		// console.log(AbiAddressUSDT);
		const _userInfo = ArrayKeysToObject(res, userInfoInterface);
		console.log(res, _userInfo);
		userInfo.end_time = _userInfo.end_time;
		userInfo.f = _userInfo.f;
		userInfo.interest_bearing_principal =
			_userInfo.interest_bearing_principal;
		userInfo.quantity = _userInfo.quantity;
		userInfo.withdraw_times = _userInfo.withdraw_times;
		// console.log(_userInfo)
		// load.close()
		userInfo.Load = false;
	} catch (e) {
		console.error(e);
		// load.close()
		userInfo.Load = false;
	}
}

const earning = reactive({
	Load: false,
	second: "0", //产生利息次数
	interest: "0", //formwei
	interestRate: "0", //利率 15/100 %
});
const earnEveryTime = computed(
	// () => earning.interest / earning.second || "Interest bearing..."
	() => {
		console.log(
			"earnEveryTime-----------",
			earning.interestRate,
			textFromWei(userInfo.interest_bearing_principal)
		);
		return (
			(earning.interestRate *
				10 *
				textFromWei(userInfo.interest_bearing_principal)) /
				1000 || "Interest bearing..."
		);
	}
);

async function startEarning() {
	earning.Load = true;
	try {
		console.log("startEarning -->", userInfo.interest_bearing_principal);
		const res = await calculateEarnings(
			userInfo.interest_bearing_principal,
			userAddress.value
		);
		console.log("startEarning calculateEarnings", res);
		earning.second = res[0];
		earning.interest = textFromWei(res[1]);
		earning.interestRate = (res[2] / 10).toString();
		earning.Load = false;
	} catch (e) {
		console.error(e);
		// load.close()
		earning.Load = false;
	}
}

const userCalcData = reactive({
	Load: false,
	modelValue: "",
	second: "0", //产生利息次数
	interest: "0", //formwei
	interestRate: "0", //利率 15/100 %
});

const userCalcEveryTime = computed(
	() => userCalcData.interest / userCalcData.second || "Interest bearing..."
);
const userCalc = debounce(async () => {
	// userCalcData.Load = true;
	userCalcData.Load = true;
	try {
		// console.log(userCalcData.modelValue)
		if (
			userCalcData.modelValue.toString() == "0" ||
			!userCalcData.modelValue
		) {
			userCalcData.second = "0";
			userCalcData.interest = "0";
			userCalcData.interestRate = "0";
		} else {
			// console.log(textToWei(userCalcData.modelValue))
			const res = await calculateEarnings(
				textToWei(userCalcData.modelValue),
				"0x0000000000000000000000000000000000000000"
			);
			// console.log('userCalc', res)
			userCalcData.second = res[0];
			userCalcData.interest = web3.value.utils.fromWei(res[1]);
			userCalcData.interestRate = (res[2] / 10).toString();
		}

		userCalcData.Load = false;
	} catch (e) {
		console.error(e);
		userCalcData.Load = false;
	}
}, 1000);
async function calculateEarnings(val, address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.calculate_earnings(AbiAddressUSDT, address, val)
			.call();
		console.log("calculateEarnings", res);
		return res;
	} catch (e) {
		console.error(e);
		// load.close()
		// earning.Load = false;
		return [];
	}
}
// earning.modelValue

// const ReFees = ref([0, 0, 0])
const ReFees = reactive({
	Load: false,
	List: [0, 0, 0],
});
async function getReFee() {
	// const load = lockLoadHandler('loading...')
	ReFees.Load = true;
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_Re_fee().call();
		// console.log("getReFee", res)
		ReFees.List = res;
		// load.close()
		ReFees.Load = false;
	} catch (e) {
		console.error(e);
		// load.close()
		ReFees.Load = false;
	}
}

// const ConditionalValue = ref([])
// const Interest = ref([])
// const ICArray = ref([])
const InterestReveal = reactive({
	Load: false,
	ICArray: [],
});

async function startICArray() {
	// const load = lockLoadHandler('loading...')
	InterestReveal.Load = true;
	try {
		const Conditionals = await getConditionalValue();
		const Interests = await getInterest();
		// load.close()
		if (Conditionals.length == Interests.length) {
			let list = [];
			for (let i = 0; i < Conditionals.length; i++) {
				list.push({
					id: i,
					conditional: Conditionals[i],
					interest: (Interests[i] / 10).toString(),
				});
			}
			InterestReveal.ICArray = list;
		}
		InterestReveal.Load = false;
		// console.log(InterestReveal.ICArray)
	} catch (e) {
		console.error(e);
		// load.close()
		InterestReveal.Load = false;
		// PlusElMessage({
		// 	type: "error",
		// 	message: "invalid",
		// });
	}
}
async function getConditionalValue() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_conditional_value().call();
		// console.log("conditionalValue", res)
		return res;
	} catch (e) {
		console.error(e);
	}
}
async function getInterest() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_interest().call();
		// console.log("conditionalValue", res)
		return res;
	} catch (e) {
		console.error(e);
	}
}

async function withdraw() {
	//提现
	const load = lockLoadHandler("loading...");
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.withdraw(
				AbiAddressUSDT,
				userAddress.value,
				userInfo.interest_bearing_principal
			)
			.send({
				from: userAddress.value,
			});
		console.log("withdraw", res);
		if (res.status) {
			init();
		}
		load.close();
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
		load.close();
	}
}

const KingSortData = reactive({
	Load: false,
	List: [],
});
async function getKingSort() {
	// const load = lockLoadHandler('loading...')
	KingSortData.Load = true;
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_king_sort(AbiAddressUSDT)
			.call()
			.then((res) =>
				res.map((item) => ArrayKeysToObject(item, kingSortInterface))
			);
		console.log("getKingSort res", res);
		KingSortData.List = sortKingData(res);
		// console.log("getKingSort withdrawList", KingSortData.List)
		KingSortData.Load = false;
		return res;
	} catch (e) {
		console.error(e);
		KingSortData.Load = false;
	}
}

function sortKingData(data) {
	// let usList = []; //记录已经被载入的用户地址
	// const reverseRes = deepClone(data)
	// 	.filter((item) => {
	// 		// 最多加载十条
	// 		if (
	// 			item._us == "0x0000000000000000000000000000000000000000" ||
	// 			usList.length >= 10
	// 		)
	// 			return false;
	// 		const hadUs = usList.includes(item._us);
	// 		!hadUs && usList.push(item._us);
	// 		return !hadUs;
	// 	});

	const reverseRes = deepClone(data)
		.filter(
			(item) => item._us != "0x0000000000000000000000000000000000000000"
		)
		.map((item) => {
			item.id = item._us;
			item._released = textFromWei(item._released);
			item._us = truncationAddress(item._us);
			return item;
		})
		.sort((p, n) => n._released - p._released);
	console.log("getKingSort reverseRes", reverseRes);
	return reverseRes;
}
</script>
<style lang="scss" scoped>
// .explore {
//     // min-height: 10000px;
// }
.pc-image {
	@media screen and (max-width: 768px) {
		display: none;
	}
}
.color-grey {
	color: #d4cde9;
}
.color-green {
	color: #00ff66;
}
.bg-green {
	background-color: rgba(0, 178, 71, 0.15);
	border: 1px solid rgba(0, 178, 71, 0.72);
	border-radius: 10rem;
}
.model-grid {
	display: grid;
	@media screen and (min-width: 1201px) {
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 120px;
	}
	@media screen and (min-width: 769px) and (max-width: 1200px) {
		grid-template-columns: 2fr 1fr;
		grid-column-gap: 20px;
		align-items: center;
	}
}
.model-title {
	text-align: center;
	font-size: 48px;
	margin-top: 48px;
	margin-bottom: 48px;
}
.cell {
	display: flex;
	justify-content: space-between;

	@media screen and (min-width: 769px) {
		align-items: center;
	}
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
}
.theme-box-shadow {
	border-radius: 14px;
}
// .button {
// 	padding: 20px 40px;
// }

:deep() .wallet .el-input-number,
.cash-out-dialog .el-input-number {
	border-radius: 0;
	width: 100%;
	@media screen and (max-width: 768px) {
		width: fit-content;
	}
	.el-input__inner {
		--el-input-bg-color: transparent;
		--el-input-focus-border-color: #38ef7d;
		--el-input-text-color: #fff;
		--el-text-color-placeholder: #fff;
		--el-border-color-hover: #11998e;
		height: 40px;
		border-radius: 8px;
		// border-radius: 14px;
		// width: fit-content;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0.05) 100%
		);
	}
}

.model-1 {
	padding-top: 50px;
	h3 {
		font-size: 24px;
		margin-bottom: 12px;
	}
	.wallet {
		.balance .deposit,
		.balance .info,
		li:not(:first-child) {
			padding: 20px 45px;
			@media screen and (max-width: 768px) {
				padding: 10px 15px;
			}
		}
		li {
			margin-bottom: 20px;
		}
		h3,
		.cell {
			.icon {
				width: 25px;
				height: 25px;
				margin-right: 10px;
			}
		}
	}
	.balance {
		padding-top: 150px;
		position: relative;
		z-index: 0;
		// overflow: hidden;
		.theme-box-shadow {
			border-radius: 0;
		}
		.theme-box-shadow:last-child {
			border-radius: 0 0 14px 14px;
		}
		.icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: -1;
		}
		.info {
			// margin-top: -50px;
			// border-radius: 0 0 14px 14px;

			background: linear-gradient(
				135deg,
				rgba(255, 255, 255, 0.1) 0%,
				rgba(255, 255, 255, 0.1) 100%
			);
			box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.4);
			.cash-out,
			.refresh {
				cursor: pointer;
			}
			.type {
				font-size: 24px;
				background-color: rgba(0, 178, 71, 0.15);
				border: 1px solid rgba(0, 178, 71, 0.72);
				border-radius: 10rem;
				display: flex;
				align-items: center;
				padding-right: 16px;
				img {
					margin-right: 6px;
					padding: 3px;
				}
			}
			.type + span {
				font-size: 36px;
			}
			.cell {
				margin-top: 10px;
			}
		}
		// .theme-box-shadow {
		//   border-radius: 0;
		// }
		.deposit {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			.submit {
				height: 40px;
				width: 110px;
				margin-left: 40px;
				border-radius: 8px;
				// padding: 10px 15px;
				font-size: 14px;
				background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
			}
		}
	}
	.right {
		display: flex;
		flex-direction: column;
		align-items: center;
		.button {
			padding: 20px 40px;
		}
	}
	.count-down {
		margin-top: 10px;
		font-size: 12px;
		color: #ffffff;
	}
}
.model-2 {
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.theme-box-shadow {
		width: 100%;
	}
	.s-1 {
		padding: 20px 45px;
		.cell:first-of-type {
			font-size: 24px;
			margin-bottom: 14px;
		}
		.cell .el-input {
			max-width: 200px;
		}
		.bg-green {
			display: block;
			padding: 12px 40px;
			width: fit-content;
			margin: 10px auto 0;
			text-align: center;
			@media screen and (min-width: 769px) {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.usdt-num {
					margin: 0 10px;
				}
			}
		}
	}
	.s-2 {
		padding: 25px 45px;
		.cell {
			font-size: 14px;
			&:not(:last-child) {
				margin-bottom: 20px;
			}
			&.title {
				font-size: 18px;
			}
			span:first-child {
				color: #2ec5ce;
			}
		}
	}
	.ps {
		margin: 22px 0;
		font-size: 12px;
	}
}
.model-3 {
	.proportion {
		padding: 40px 48px;
		font-size: 24px;
		@media screen and (max-width: 768px) {
			padding: 16px 20px;
			font-size: 18px;
		}
		.cell:not(:last-child) {
			margin-bottom: 20px;
		}
	}
	// .qrcode {
	//     margin: 20px 0;
	//     padding: 20px;
	// }
	.invitation {
		// display: flex;
		li {
			// flex: 1;
			text-align: center;
			padding: 10px 0;
			margin-top: 20px;
			// &:not(:last-child) {
			//     margin-right: 20px;
			// }
			p {
				margin-bottom: 4px;
			}
			button {
				padding: 2px 12px;
				font-size: 12px;
			}
		}
	}
}
.model-4 {
	.content {
		padding: 44px 16px;
		.title {
			color: #b2abca;
			margin-bottom: 10px;
		}
		.address-list .cell {
			img {
				margin-right: 10px;
				@media screen and (max-width: 768px) {
					width: 24px;
				}
			}
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}
	}
}
.model-5 {
	padding-bottom: 50px;
	.banner {
		max-width: 100%;
		width: fit-content;
		margin: 0 auto;
		display: block;
	}
	.cell {
		@media screen and (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
			button {
				margin: 10px 0;
			}
		}
		.icon {
			width: 22px;
			margin-right: 10px;
		}
	}
	:deep(.change-language) {
		font-size: 20px;
		@media screen and (max-width: 768px) {
			font-size: 16px;
		}
		.icon {
			width: 22px;
			margin-right: 10px;
		}
	}
}
.cash-out-dialog {
	color: #ffffff;
	background-color: #130b32;
	border-radius: 28px;
	max-width: 450px;
	margin: 10vh auto 0;
	text-align: center;
	@media screen and (max-width: 768px) {
		padding: 15px 20px;
		margin: 20vh auto 0;
	}
	@media screen and (min-width: 769px) {
		padding: 25px 60px;
		margin: 10vh auto 0;
	}
	.title {
		margin-bottom: 40px;
		font-size: 20px;
		@media screen and (max-width: 768px) {
			margin-bottom: 20px;
			span {
				display: block;
				margin-bottom: 10px;
			}
		}
		@media screen and (min-width: 769px) {
			.ps::after {
				content: " : ";
			}
		}
	}
	:deep() .el-input-number {
		margin-bottom: 46px;
		@media screen and (max-width: 768px) {
			// width: 100%;
			margin-bottom: 20px;
		}
		.el-input__inner {
			--el-input-bg-color: transparent;
			--el-input-focus-border-color: #38ef7d;
			--el-input-text-color: #fff;
			--el-text-color-placeholder: #fff;
			--el-border-color-hover: #11998e;
			text-align: center;
		}
	}
	.footer {
		display: flex;
		justify-content: space-between;
		button {
			width: 135px;
			height: 44px;
			border-radius: 8px;
		}
		.submit {
			background-image: linear-gradient(
				90deg,
				#ff56f6 0,
				#b936ee 40%,
				#406aff 60%,
				#3bace2 100%
			);
		}
		.cancel {
			background-color: #251b4c;
		}
	}
}
</style>
