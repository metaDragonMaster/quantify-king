<template>
    <div class="home">
        <section class="banner-1 limit-max-width-media">
            <div class="centent">
                <h1 class="title">
                    {{$t("首页.标题.s1.1")}}
                    <span class="theme-text-shadow-green">{{$t("首页.标题.s1.2")}}</span> {{$t("首页.标题.s1.3")}}
                </h1>
                <p
                    class="ps font-o"
                >{{$t("首页.标题.s1.ps")}}</p>
                
                <Link to="/explore"><button class="theme-button-clip font-o button">Explore ---></button></Link>
            </div>
            <img class="banner" src="@/assets/home/banner-1.png" alt />
        </section>
        <section class="t-list limit-max-width-media">
            <SwiperCard></SwiperCard>
        </section>
        <section class="banner-2 limit-max-width-media">
            <div class="centent">
                <h1 class="title">{{$t("首页.标题.s2.1")}}</h1>
                <p
                    class="ps font-o"
                >{{$t("首页.标题.s2.ps")}}</p>
                <Link to="/explore"><button class="theme-button-clip font-o button">Start ---></button></Link>
            </div>
            <img class="banner" src="@/assets/home/banner-2.png" alt />
        </section>
        <section class="model-4 limit-max-width-media">
            <p class="module-title font-o">{{$t("首页.标题.s3.1")}}</p>
            <ul class="list">
                <li class="theme-box-shadow">
                    <p class="title">{{$t("首页.标题.s3.t1")}}</p>
                    <span
                        class="font-o"
                    >{{$t("首页.标题.s3.p1")}}</span>
                </li>
                <li class="theme-box-shadow">
                    <p class="title">{{$t("首页.标题.s3.t2")}}</p>
                    <span
                        class="font-o"
                    >{{$t("首页.标题.s3.p2")}}</span>
                </li>
                <li class="theme-box-shadow">
                    <p class="title">{{$t("首页.标题.s3.t3")}}</p>
                    <span class="font-o">{{$t("首页.标题.s3.p3")}}</span>
                </li>
                <li class="theme-box-shadow">
                    <p class="title">{{$t("首页.标题.s3.t4")}}</p>
                    <span
                        class="font-o"
                    >{{$t("首页.标题.s3.p4")}}</span>
                </li>
            </ul>
        </section>
        <section class="model-5 limit-max-width-media">
            <p class="module-title font-o">{{$t("首页.标题.s4.1")}}</p>
            <ul class="list">
                <li>
                    <img src="@/assets/home/advantages-t-1.png" alt />
                    <div class="info theme-box-shadow">
                        <p class="title font-o">One-click Start</p>
                        <span
                            class="font-o"
                        >{{$t("首页.标题.s4.p1")}}</span>
                    </div>
                </li>
                <li>
                    <img src="@/assets/home/advantages-t-2.png" alt />
                    <div class="info theme-box-shadow">
                        <p class="title font-o">No-deposit Required</p>
                        <span
                            class="font-o"
                        >{{$t("首页.标题.s4.p2")}}</span>
                    </div>
                </li>
                <li>
                    <img src="@/assets/home/advantages-t-3.png" alt />
                    <div class="info theme-box-shadow">
                        <p class="title font-o">High Liquidity</p>
                        <span class="font-o">{{$t("首页.标题.s4.p3")}}</span>
                    </div>
                </li>
                <li>
                    <img src="@/assets/home/advantages-t-4.png" alt />
                    <div class="info theme-box-shadow">
                        <p class="title font-o">Cost-Efficient</p>
                        <span
                            class="font-o"
                        >{{$t("首页.标题.s4.p4")}}</span>
                    </div>
                </li>
            </ul>
        </section>
        <section class="model-6 limit-max-width-media">
            <div class="content theme-box-shadow">
                <p class="module-title font-o">{{$t("首页.标题.s5.1")}}</p>
                <div class="info">
                    <ul>
                        <li>{{$t("首页.标题.s5.p1")}}</li>
                        <li>{{$t("首页.标题.s5.p2")}}</li>
                        <li>{{$t("首页.标题.s5.p3")}}</li>
                    </ul>
                    <img src="@/assets/home/safety-tools.png" />
                </div>
            </div>
        </section>
        <section class="model-7 limit-max-width-media">
            <p class="module-title font-o">Trusted by</p>
            <img src="@/assets/home/trusted-by.png" alt="">
        </section>
    </div>
</template>

<script setup>
// import TCard from "./tCard"
import SwiperCard from "./swiperCard"
</script>
<style lang='scss' scoped>
.home {
    color: #fff;
    // min-height: 5000px;
    padding: 0 0 50px 0;
}
.banner-1,
.banner-2 {
    display: grid;
    align-items: center;
    .title {
        font-size: 66px;
    }
    .ps {
        margin: 20px 0;
    }
    .button {
        width: 250px;
        height: 64px;
    }
    @media screen and (max-width: 768px) {
        text-align: center;
        .title {
            font-size: 34px;
        }
        .button {
            width: 150px;
            height: 48px;
        }
        .banner {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }
    }
}
.t-list {
    margin: 50px 0;
}
.banner-1 {
    @media screen and (min-width: 769px) {
        grid-template-columns: 1fr 1fr;
    }
}
.banner-2 {
    @media screen and (min-width: 769px) {
        grid-template-columns: 1fr 2fr;
    }
}

.module-title {
        font-size: 24px;
    margin-top: 55px;
    margin-bottom: 55px;
    @media screen and (min-width: 769px) {
        font-size: 36px;
    }
}
.model-4,
.model-5 {
    .list {
        display: grid;
        grid-row-gap: 10px;
        @media screen and (min-width: 769px) {
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 30px;
            grid-row-gap: 25px;
        }
    }
}
.model-4 {
    li {
        border-radius: 6px;
        padding: 36px;
        min-height: 160px;
    }
}
.model-5 {
    margin-bottom: 120px;
    .info {
        padding: 36px;
        min-height: 180px;
        box-shadow: inset 1px 0 0 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 1px 1px rgba(255, 255, 255, 0.2),
            inset -1px 0 0 0 rgba(255, 255, 255, 0.1);
        .title {
            font-size: 36px;
            margin-top: -64px;
            padding: 0 0 36px 0;
        }
    }
}
.model-6 {
    .content {
        border-radius: 6px;
        .module-title {
            padding-left: 40px;
            padding-top: 20px;
        }
        .info {
            display: grid;
            @media screen and (min-width: 769px) {
                padding: 0 40px 60px;
                justify-items: space-between;
                grid-template-columns: 1fr 1fr;
            }
            @media screen and (max-width: 768px) {
                img {
                    max-width: 300px;
                    padding: 20px 0;
                }
                ul {
                    padding: 0 20px;
                }
            }
            img {
                margin: 0 auto;
            }
            ul {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }
            li {
                border-radius: 20px;
                padding: 20px;
                background-color: rgba($color: #000000, $alpha: 0.08);
                min-height: 155px;
                &:not(:last-child) {
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>