import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes.js';
import {
	UseStoreWeb3js,
	// UseStoreContracts
} from '@/stores/web3js';
// import { storeToRefs } from "pinia";
const router = createRouter({
	routes,
	history: createWebHashHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				top: 0,
				left: 0,
				behavior: 'smooth',
			};
		}
	},
});
const whiteRathPathList = ['/', '/homepage','/demo'];
// const whiteRePathList = ["/", "/homepage", "/bindFriends"];

router.beforeEach(async (to, from, next) => {
	const storeWeb3 = UseStoreWeb3js();
	const {
		startWeb3,
		haveAuth,
		// haveRe,
		// userAddress,
	} = storeWeb3;

	console.log('router beforeEach---');
	// console.log(to);
	// console.log("router beforeEach haveAuth", haveAuth, "haveRe", haveRe);
	//验证是否被赋予权限
	if (!haveAuth && !whiteRathPathList.includes(to.path)) {
		//没有就去请求
		try {
			console.log('router beforeEach--- 没有就去请求');
			const queryWeb3 = await startWeb3();
			if (queryWeb3) {
				console.log('router beforeEach--- queryWeb3');
				next();
			} else {
				next('/homepage');
			}
		} catch (error) {
			console.error(error);
			next('/homepage');
		}
	}
	//    else if (!haveRe && !whiteRePathList.includes(to.path)) {
	//     // console.log("没有推荐人", haveRe);
	//     const res = await getRes(userAddress);
	//     console.log("router haveRe---");
	//     if (res) {
	//       console.log("router haveRe--- yes");
	//       next(to.path);
	//     } else {
	//       console.log("router haveRe--- false");
	//       next({
	//         query: to.query,
	//         params: to.params,
	//         path: "/bindFriends",
	//       });
	//     }
	//   }
	else {
		next();
	}
});
router.afterEach((to) => {
	document.title = `${to.meta.title} - quantify king`;
});

// async function getRes(userAddress) {
//   try {
//     const storeCountracts = UseStoreContracts();
//     const storeWeb3 = UseStoreWeb3js();
//     const { setRe } = storeWeb3;
//     const { Contracts } = storeToRefs(storeCountracts);
//     const { QKContract } = Contracts.value;
//     const reAddress = await QKContract.methods.getRes(userAddress).call();
//     // console.log(res);
//     const _isRe = await isRe(reAddress);
//     if (_isRe) {
//       setRe(reAddress);
//     }
//     return _isRe;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
// }

// async function isRe(address) {
//   try {
//     const storeCountracts = UseStoreContracts();
//     const { Contracts } = storeToRefs(storeCountracts);
//     const { QKContract } = Contracts.value;
//     const res = await QKContract.methods.isRe(address).call();
//     // console.log(res);
//     return res;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
// }

export default router;
