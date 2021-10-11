/**
 * UI 初始化
 */

import React from 'react'
import { render } from 'react-dom'
import App from 'pages'
import EventEmitter from './utils/event'

// 渲染
render(<App />, document.getElementById('my-plugin'))

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
  module.hot.accept('./ui.tsx', () => {
    render(<App />, document.getElementById('my-plugin'))
  })
}
