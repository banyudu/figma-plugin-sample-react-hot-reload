export const get = async (key: string) => {
  const data = figma.clientStorage.getAsync(key)
  return data
}

export const set = async (params: { name: string; data: any }) => {
  await figma.clientStorage.setAsync(params.name, params.data)
}
