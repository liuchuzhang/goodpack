# Goodpack

> WIP

- [x] appConfig.js 暴露可配置项目 
- [ ] 支持 vue3/vue2/react
- [ ] 创建组件/页面
- [ ] eslint 代码检查
- [ ] vite 支持

## Config

package.json 配置启动端口、框架

```js
{
  // ...,
  "goodpack": {
    "port": number,
    // default vue
    "framework": 'vue' | 'vue3' | 'react'
  },
  // ...
}
```

## appConfig

暴露在根目录下的 appConfig.js 配置可配置项

```js
module.exports = {
  // 本地代理地址
  target: '',

  // 本地代理配置
  proxy: {
    '/proxy/*': {
      target: this.target,
      pathRewrite: {
        '^/proxy/': '/',
      },
      changeOrigin: true,
      secure: false,
    },
  },

  // html 的标题
  title: 'goodpack',

  // 自定义 webpack 配置
  webpackConfig: (webpackConfig) => webpackConfig,

  // 自定义 tsconConfig 路径，默认 tsconfig.json
  tsConfigPath: 'tsconfig.json',

  // ...
}
