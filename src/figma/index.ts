import * as storage from './storage'
import * as page from './page'
import { FigmaMessageHandler, FigmaMessageParams } from 'types'

// 如果添加了新的文件，需要在上面导入，并在actions中加上相应的变量名
const actions: Record<string, Record<string, FigmaMessageHandler>> = {
  storage,
  page,
}

figma.ui.onmessage = async ({ id, type, payload = {} }: FigmaMessageParams) => {
  // type 是 x.y 形式的，x 是引入的文件，如 storage，而 y 是其内的方法，如 get 等。示例: storage.get
  if (type && typeof type !== 'string') {
    console.error('不合法的figma message type!')
    return
  }
  const [fileName, funcName] = type?.split('.')
  const handler: FigmaMessageHandler = actions[fileName]?.[funcName]
  if (!handler) {
    console.warn(`找不到${type}对应的handler`)
    return
  }
  // 执行相应的handler，并获取其返回值
  let result
  let error
  try {
    result = await handler(payload)
  } catch (err) {
    error = err
  }
  if (id) {
    // 如果有id，需要再用 postMessage 的方式将消息体传回 ui。ui窗口中会根据 id 值找到相应的message，并执行其callback
    figma.ui.postMessage({
      type: 'callback',
      payload: { id, result, error },
    })
  }
}
