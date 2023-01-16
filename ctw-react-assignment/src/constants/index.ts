export const DEFAULT_ITEM = {
  value: '',
  label: '---'
}

export const STEP_OPTIONS = new Array(4).fill(0).map((s, index: number) => ({
  title: `Step ${index + 1}`,
  content: `Step ${index + 1}`
}))
