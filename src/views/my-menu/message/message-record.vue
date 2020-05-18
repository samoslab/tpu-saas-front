<template>
    <div class="bindSiteInfo c-content">


        <van-nav-bar
            @click-left="onClickLeft"
            @click-right="onClickRight"
            :left-arrow="true"
            :title="'我的消息'"
            class="c-nav-bar"
        >
            <van-icon name="wap-home-o" slot="right"/>
        </van-nav-bar>


        <div class="lists">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-collapse v-model="str" accordion>
                    <van-cell v-for="item in list" :key="item.create_at">
                        <van-collapse-item :name="item.create_at">
                            <div slot="title" class="deliteInfo">
                                <div class="images">
                                    <img :src="item.avatar" alt>
                                </div>
                                <div class="conten">
                                    <p>{{item.username}}</p>
                                    <p>{{item.create_at}}</p>
                                </div>
                            </div>
                            {{item.msg}}
                        </van-collapse-item>
                    </van-cell>
                </van-collapse>
            </van-list>
        </div>


        
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "bindSite",
    data() {
        return {
            str: "",
            list: [],
            loading: false,
            finished: false,
            message: ""
        };
    },
    mounted() {
        this.$post2("im/index/recevied", {}).then(res => {
            this.list = res;
        });
    },
    methods: {
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                //   for (let i = 0; i < 10; i++) {
                //     this.list.push(this.list.length + 1);
                //   }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                //   if (this.list.length >= 40) {}
                this.finished = true;
            }, 2000);
        },

        onClickRight() {
            this.$router.push({ path: "/my" });
        },
        bind() {
            if (this.message === "") {
                this.$dialog.alert({
                    message: "反馈内容不能为空"
                });
            } else {
                this.$post2("im/index/feedback", {
                    msg: this.message
                })
                    .then(res => {
                        console.log(res);
                        this.$toast("反馈成功");
                        this.$router.go(-1);
                    })
                    .catch(err => {
                        this.$toast(err);
                    });
            }
        },
        onClickLeft() {
            this.$router.go(-1);
        }
    }
};
</script>

<style  lang='less'>
.bindSiteInfo {
    font-size: 18px;
    width: 100%;
    height: 100%;
    .bindSite_cen {
        width: 100%;
        // height: 100%;
    }
    .lists {
        padding-top: 46px;
        padding-bottom: 50px;
        .van-cell {
            padding: 5px 10px;
            .van-cell__value {
                background: red;
            }
            .van-icon {
                line-height: 47px;
            }
        }
        .van-hairline--top::after {
            border-top-width: 0px;
        }
        .van-cell:not(:last-child)::after {
            left: 0;
        }

        .deliteInfo {
            display: flex;
            .images {
                width: 50px;
                height: 50px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .conten {
                flex: 1;
                padding-left: 20px;
            }
            .van-collapse-item__content {
                text-indent: 2em;
            }
        }
    }
    .btn {
        border: none;
        background: #00c0ed;
        color: white;
        position: fixed;
        bottom: 0;
    }
    .sign {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
        color: green;
    }

    .c-nav-bar {
        position: fixed !important;
        width: 100%;
        span,
        i {
            font-size: 24px !important;
        }
    }
    .ptitle {
        color: #999;
        text-align: center;
        line-height: 1rem;
        font-size: 0.25rem;
    }
    .images {
        border: 0px solid #444;
        border-radius: 30%;
        margin: 0px auto;
        box-shadow: 0 0 10px #444;
        vertical-align: top;
    }
}
</style>
