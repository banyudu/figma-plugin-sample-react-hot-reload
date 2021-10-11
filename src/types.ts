// figma 中的 message handler，用来处理 ui 中发来的消息
export type FigmaMessageHandler = (
  payload?: any,
  data?: any,
) => any | Promise<any>
export interface FigmaMessageParams {
  id?: string // 唯一ID，用于实现 callback 机制
  type: string // 消息type
  payload?: any // 数据体
}

export type FigmaMessageCallback = (payload: any) => any | Promise<any>
export interface CallbackPayload {
  id: string
  result: any
  error: any
}
