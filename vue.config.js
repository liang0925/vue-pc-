const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //基本路径
  publicPath: './',//默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  devServer: {
    open: true,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    proxy: {
      '/api': {
        // 目标路径（真实要访问的后端服务路径）
        target: '',
        // 输出文件目录
        outputDir: 'dist',
        assetsDir: 'static',
        indexPath: 'index.html',
        // eslint-loader 是否在保存的时候检查
        lintOnSave: true,
        ws: true,
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions:{
    'style-resources-loader':{
        preProcessor:'scss',
        patterns:[]
    }
  }
})
