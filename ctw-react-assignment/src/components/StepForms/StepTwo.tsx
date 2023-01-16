import React from 'react'

import { useAppContext } from '@/context'

const StepTwo = (): JSX.Element => {
  const { restaurantOptions, register, errors } = useAppContext()
  return (
    <>
      <label htmlFor='restaurant'>Please Select a Restaurant</label>
      <select
        name='restaurant'
        id='restaurant'
        autoFocus
        {...register('restaurant', { required: true })}
      >
        {restaurantOptions.map(r => (
          <option value={r.value} key={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <div>{errors.restaurant && <span style={{ color: 'red' }}>This field is required</span>}</div>
    </>
  )
}

export default StepTwo
