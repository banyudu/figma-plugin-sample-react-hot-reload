interface ExportOptions {
  id: string
  settings?: ExportSettings
}

export const exportNode = async ({
  id,
  settings,
}: ExportOptions): Promise<Uint8Array> => {
  const node = figma.getNodeById(id) as FrameNode
  return node.exportAsync(settings)
}
