# Figma Plugin Sample React Hot Reload

支持 React（部分）热更新的 Figma 插件 demo

## 功能介绍

这个 Demo 用于开发 Figma 插件，支持了如下的功能：

- [x] React
- [x] Webpack
- [x] WebpackDevServer
- [x] React Hot Reload
- [x] React Router
- [x] React Hooks
- [x] 便捷的消息通信机制

更多关于此仓库的介绍，请移步到我的博客文章 [Figma 插件开发浅浅谈](https://banyudu.com/posts/figma-plugin-development-intro.f7472f?v=OKGW6q)。

## 使用说明

### 安装依赖

```bash
npm install
```

### 启动调试

```bash
npm run dev
```

### 功能开发

#### 目录约定

功能开发主要需要修改两处位置。

- src/figma: 存储 Figma 沙箱中运行的代码，不可以使用 window / fetch 等各种 api，但是可以访问 figma 文档结构。
- src/pages: React 开发的页面，和 create-react-app 创建的项目差别不大，可以正常使用 react-router (只能是 memory router) 和 antd 组件库等常用库。

#### 内部通信

当 pages 和 figma 中需要通信时，需要用到 postMessage 在两个窗口间通信，比较繁琐。

我提取了一个帮助工具 `emitToFigma`，可以用于在 pages 中发消息给 figma，并获得其响应。

使用方法:

首先，在 src/figma 中定义 actions，参见 `src/figma/index.ts`

```typescript
// 如果添加了新的文件，需要在上面导入，并在actions中加上相应的变量名
const actions: Record<string, Record<string, FigmaMessageHandler>> = {
  storage,
  page,
}
```

然后在相应的文件，如 `src/figma/storage` 中定义方法，如 `get`

之后在 `src/pages` 中的任何位置，可以通过 `await emitToFigma('storage.get', params)` 的方式调用此方法并获取响应值。

### 打包发布

执行命令

```bash
npm run pack
```

它会在 `dist` 目录中生成一个可供生产环境使用的 `ui.html`、`ui.js`、`code.js` 文件。

然后将 `manifest.json` 等必要的文件与 `dist` 目录一起打包成 `figma-plugin.zip` 文件。

之后可以内部分享 `figma-plugin.zip` 文件给其他人（无需发布到市场，但需要用开发者模式导入），或者直接发布到 Figma 插件市场。

## 避坑指南

Figma 插件，受限于其运行时环境，和普通的前端开发略有不同。

主要的区别是有些 API 或者库不再可用，列举如下：

### 沙箱环境中的代码可以访问 Figma，不能访问 window 等全局变量和 api

`src/figma` 中的代码，运行在沙箱环境中，基本上只能用 Figma 的 api，无法使用大部分的 window / fetch 等 api.

### Iframe 中的代码，可以访问 window / fetch 等常见的前端全局变量和 API，但略有不同

`src/pages` 中的代码，运行在 iframe 之中，但是它的 src 并不是一个远程地址(也没有 localhost 地址可用)，而是一段 dataurl，形如 `data:text/html;base64,` 这样的地址。

这就导致它不能正常使用 `BrowserRouter` 中的前进后退等能力，无法使用 `<a>` 标签进行页面导航，而只能使用 `MemoryRouter` 和 `history.push` 这样的内存路由进行页面导航。

同时也会导致它不能正常使用 `localStorage` 等存储类的 api，而必须借助 `src/figma` 中的 `figma.clientStorage.getAsync` 和 `figma.clientStorage.setAsync` 等方法进行数据持久化存储。

更多原理介绍，请移步到我的博客文章 [Figma 插件开发浅浅谈](https://banyudu.com/posts/figma-plugin-development-intro.f7472f?v=OKGW6q)。
