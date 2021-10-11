import EventEmitter from 'eventemitter3'
import { v4 as uuid } from 'uuid'
import type { CallbackPayload, FigmaMessageCallback } from 'types'

const ee = new EventEmitter()

// 处理回调，下游与下面的 emitToFigma 中的 emit.once 对应，上游对应于 src/figma/index.ts 中的 figma.ui.postMessage
ee.on('callback', ({ id, result, error }: CallbackPayload) => {
  ee.emit(`callback:${id}`, { result, error })
})

export default ee

/**
 * 向figma发送消息，获取执行结果并执行回调，或返回 promise
 * @example emitToFigma('storage.get', 'token', (token) => { console.log(token )})
 * @example const token = await emitToFigma('storage.get', 'token')
 * @param string type: 要发给 figma 的消息类型
 * @param any payload: 要发给 figma 的消息体
 * @param callback 要执行的回调函数，也可以不用回调，选择使用 promise 形式。
 * @returns
 */
export const emitToFigma = async (
  type: string,
  payload?: any,
  callback?: FigmaMessageCallback,
): Promise<any> => {
  // 生成一个 id 用来匹配回调
  const id = uuid()
  return new Promise((resolve, reject) => {
    ee.once(`callback:${id}`, ({ result, error }) => {
      if (callback) {
        callback(result) // 有 callback 就调用callback
      }
      // 同时结束promise
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })

    // 发送消息
    parent.postMessage({ pluginMessage: { id, type, payload } }, '*')
  })
}
