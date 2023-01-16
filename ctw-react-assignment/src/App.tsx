import axios from 'axios'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import Review from './components/StepForms/Review'
import StepOne from './components/StepForms/StepOne'
import StepThree from './components/StepForms/StepThree'
import StepTwo from './components/StepForms/StepTwo'
import Steps from './components/Steps'
import { STEP_OPTIONS } from './constants'
import { AppContext, DEFAULT_ORDER } from './context'
import { useOptions } from './hooks/useOptions'
import { useStep } from './hooks/useStep'
import { DishJsonItem, Order } from './types'

const App = (): JSX.Element => {
  const [dishData, setDishData] = useState<DishJsonItem[]>([])

  const progress = [StepOne, StepTwo, StepThree, Review]

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    control
  } = useForm<Order>({
    defaultValues: DEFAULT_ORDER
  })

  const { meal, dishes, restaurant, peopleCount } = getValues()

  const { last, begin, next, prev, current } = useStep({ maxStep: 4 })
  const { mealOptions, restaurantOptions, dishOptions } = useOptions({
    order: {
      meal,
      dishes,
      restaurant,
      peopleCount
    },
    dishData
  })

  useEffect(() => {
    axios.get('./data/dishes.json').then(res => {
      setDishData(res.data.dishes)
    })
  }, [])

  const submit = (data: Partial<Order>) => {
    if (!last) return next()
    alert('order success')
    console.log({ data })
  }

  const CurrentStepForm = useMemo(() => {
    const Cmp = progress[current]
    return <Cmp />
  }, [current])

  const renderStepButtons = () => {
    if (begin) {
      return <button type='submit'>Next</button>
    }
    if (last) {
      return (
        <>
          <button onClick={prev}>Previous</button>
          <button type='submit'>Submit</button>
        </>
      )
    }
    return (
      <>
        <button onClick={prev}>Previous</button>
        <button type='submit'>next</button>
      </>
    )
  }

  return (
    <AppContext.Provider
      value={{
        mealOptions,
        restaurantOptions,
        dishOptions,
        register,
        control,
        errors,
        getValues
      }}
    >
      <section>
        <h1>Welcome</h1>
        <Steps current={current} options={STEP_OPTIONS} />
        <form onSubmit={handleSubmit(submit)}>
          {CurrentStepForm}
          {renderStepButtons()}
        </form>
      </section>
    </AppContext.Provider>
  )
}

export default App
