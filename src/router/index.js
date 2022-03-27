import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes.js";
import { UseStoreWeb3js } from "@/stores/web3js.js";
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
        behavior: "smooth",
      };
    }
  },
});
const whiteRathPathList = ["/", "/homepage"];
const whiteRePathList = ["/", "/homepage","/bindFriends"];

router.beforeEach(async (to, from, next) => {
  const storeWeb3 = UseStoreWeb3js();
  const { startWeb3, haveAuth, haveRe } = storeWeb3;
  console.log("router beforeEach", to.path);
  console.log("router beforeEach haveAuth", haveAuth,'haveRe', haveRe );
  //验证是否被赋予权限
  if (!haveAuth && !whiteRathPathList.includes(to.path)) {
    //没有就去请求
    try {
      const queryWeb3 = await startWeb3(() => {
        console.log("log router");
      });
      if (queryWeb3) {
        next(to.path);
      } else {
        next("/homepage");
      }
    } catch (error) {
      console.error(error);
      next("/homepage");
    }
  } else if (!haveRe && !whiteRePathList.includes(to.path)) {
	console.log("没有推荐人",haveRe)
    next("/bindFriends");
  } else {
    next();
  }
});
router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
