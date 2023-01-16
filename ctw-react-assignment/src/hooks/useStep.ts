import { useState, MouseEvent } from 'react'

const MAX_STEP = 3

export const useStep = ({ maxStep = MAX_STEP }) => {
  const [current, setCurrent] = useState<number>(0)

  const prev = (e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault()
    if (current === 0) return
    setCurrent(c => --c)
  }
  const next = (e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault()
    if (current === maxStep - 1) return
    setCurrent(c => ++c)
  }

  const begin = current === 0
  const last = current === MAX_STEP

  return {
    begin,
    last,
    prev,
    next,
    current
  }
}
