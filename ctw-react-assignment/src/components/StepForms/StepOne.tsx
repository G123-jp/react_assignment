import React from 'react'

import { useAppContext } from '@/context'

const StepOne = (): JSX.Element => {
  const { mealOptions, register, errors } = useAppContext()
  return (
    <>
      <div>
        <label>Please Select a Meal</label>
        <select autoFocus {...register('meal', { required: true })}>
          {mealOptions.map(m => (
            <option value={m.value} key={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>enter number of people</label>
        <input type='number' min='1' max='10' {...register('peopleCount', { required: true })} />
      </div>
    </>
  )
}

export default StepOne
