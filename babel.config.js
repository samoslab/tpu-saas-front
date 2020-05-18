module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],

    // vant 需要 babel-plugin-import 插件 的配置
    plugins: [  
        [
            "import",
            {
                libraryName: "vant",
                libraryDirectory: "es",
                style: true
            },
            "vant"
        ]
    ],
};
