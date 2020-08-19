module.exports = {
    devServer: {
        watchOptions: {
            poll: 600
        }
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((opts) => {
            opts[0].filename = './template.html';
            return opts;
        });
    },
}