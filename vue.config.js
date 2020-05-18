module.exports = {
    publicPath: "",
    devServer: {
        proxy: {
            security: {
                target: "https://tpu.yqkkn.com/"
            },
            user: {
                target: "https://tpu.yqkkn.com/"
            },
            pay: {
                target: "https://tpu.yqkkn.com/"
            },
            redpkt: {
                target: "https://tpu.yqkkn.com/"
            },
            im: {
                target: "https://tpu.yqkkn.com/"
            },
            activity: {
                target: "https://tpu.yqkkn.com/"
            },
            wx: {
                target: "https://tpu.yqkkn.com/"
            },
            sendredpkt: {
                target: "https://tpu.yqkkn.com/"
            }
        },
        overlay: {
            warnings: false
            // errors: false
        }
    },
    lintOnSave: false,
    css: {
        sourceMap: true
    },

    // 设置别名↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    configureWebpack: {
        resolve: {
            alias: {
                // 默认 @  ===  /src
                assets: "@/assets",
                components: "@/components",
                views: "@/views"
            }
        }
    }
    // 设置别名↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
};
