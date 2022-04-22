import Layout from "@/layout/index.vue";
const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/homepage",
    children: [
      {
        path: "/homepage",
        name: "homepage",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/homepage/index.vue"),
      },
      // {
      //   path: "/demo",
      //   name: "demo",
      //   meta: {
      //     title: "测试",
      //   },
      //   component: () => import("@/views/demo/index.vue"),
      // },
      {
        path: "/explore",
        name: "explore",
        meta: {
          title: "explore",
        },
        component: () => import("@/views/explore/index.vue"),
      },
    //   {
    //     path: "/bindFriends",
    //     name: "bindFriends",
    //     meta: {
    //       title: "绑定好友",
    //     },
    //     component: () => import("@/views/bindFriends/index.vue"),
    //   },
      // {
      //   path: "/profitLog",
      //   name: "profitLog",
      //   component: () => import("@/views/profitLog/index.vue"),
      //   meta: {
      //     title: "利息记录",
      //   },
      //   redirect: "/profitLog/extract",
      //   children: [
      //     {
      //       path: "extract",
      //       name: "extract",
      //       component: () => import("@/views/profitLog/extract/index.vue"),
      //       meta: {
      //         title: "利息提取记录",
      //       },
      //     },
      //     {
      //       path: "profit",
      //       name: "profit",
      //       component: () => import("@/views/profitLog/profit/index.vue"),
      //       meta: {
      //         title: "利息收益记录",
      //       },
      //     },
      //   ],
      // },
      {
        path: "/team",
        name: "team",
        component: () => import("@/views/team/index.vue"),
        meta: {
          title: "团队记录",
        },
        redirect: "/team/myTeam",
        children: [
          {
            path: "myTeam",
            name: "myTeam",
            component: () => import("@/views/team/myTeam/index.vue"),
            meta: {
              title: "我的团队",
            },
          },
          // {
          //   path: "teamLogs",
          //   name: "teamLogs",
          //   component: () => import("@/views/team/teamLogs/index.vue"),
          //   meta: {
          //     title: "团队收益记录",
          //   },
          // },
        ],
      },
    ],
  },
  {
    path: "/error/404",
    name: "error404",
    meta: {
      title: "错误页面-找不到资源",
    },
    component: () => import("@/views/errorPage/404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/error/404",
  },
];
export default routes;
