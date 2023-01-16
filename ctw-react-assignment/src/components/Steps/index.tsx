import classnames from 'classnames'
import { ReactNode } from 'react'

import styles from './index.module.less'

interface StepOptionItem {
  title: string
  content: ReactNode
}

interface Props {
  current: number
  options: StepOptionItem[]
}

const Steps = ({ current = 0, options = [] }: Props): JSX.Element => {
  return (
    <div className={styles.steps}>
      {options.map((s, index) => {
        return (
          <div
            className={classnames(styles.steps__item, {
              [styles.steps__item_active]: current === index
            })}
            key={index}
          >
            {s.title}
          </div>
        )
      })}
    </div>
  )
}

export default Steps
