/**
 * UI 初始化
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import App from 'pages'
import EventEmitter from './utils/event'

// 渲染
const container = document.getElementById('my-plugin')!
const root = createRoot(container)
root.render(<App />)

// 通过 event emitter 处理消息，需要访问来自figma的消息时，通过如下方式
// import EventEmitter from 'utils/event'
// event.on('xxx', (payload) => {})

onmessage = (evt) => {
  const pluginMessage = evt.data.pluginMessage ?? {}
  const { type, payload } = pluginMessage
  if (type) {
    // 上传
    EventEmitter.emit(type, payload)
  }
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./pages', () => {
    // Re-render the app when pages change
    root.render(<App />)
  })
}
