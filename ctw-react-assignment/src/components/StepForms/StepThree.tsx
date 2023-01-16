import { useFieldArray } from 'react-hook-form'

import { useAppContext } from '@/context'
import { Order } from '@/types'

const StepThree = (): JSX.Element => {
  const { dishOptions, control, register, errors, getValues } = useAppContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dishes'
  })

  const onAdd = () => {
    append({
      count: 1,
      item: ''
    })
  }

  // const validateDishItems = (formValues: Order): boolean => {
  //   const { dishes } = formValues
  //   if (!dishes.length) return false
  //   const items = dishes.map(d => d.item)
  //   const itemTotalCount = dishes.reduce((acc, cur) => acc + Number(cur.count), 0)
  //   if (items.length !== [...new Set(items)].length) return false
  //   if (itemTotalCount < getValues().peopleCount) return false
  //   return true
  // }

  // const renderErrorMsg = (index: number) => {
  //   const hasError = !!Object.keys(errors).length
  //   if (!hasError) return null
  //   if (errors.dishes[index]?.type) {
  //     return 'This field is required'
  //   } else if (errors.dishes[index]?.item) {
  //     return 'duplicate dish'
  //   } else if (errors.dishes[index]?.count) {
  //     return `no less than peopleCount ${getValues().peopleCount}`
  //   }
  // }

  return (
    <div>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <div>
                <label>Please Select a dish</label>
                <select
                  name='dish'
                  id='dish'
                  {...register(`dishes.${index}.item`, {
                    required: true
                    // validate: (value: string, formValues: Order) => {
                    //   return validateDishItems(formValues)
                    // }
                  })}
                >
                  {dishOptions.map(d => (
                    <option value={d.value} key={d.label}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <div>
                  {/* {errors.dishes && <span style={{ color: 'red' }}>{renderErrorMsg(index)}</span>} */}
                </div>
              </div>

              <div>
                <label>Please Enter no. of servings</label>
                <input
                  type='number'
                  min={1}
                  max={10}
                  {...register(`dishes.${index}.count`, {
                    required: true
                    // validate: (value: string, formValues: Order) => {
                    //   return validateDishItems(formValues)
                    // }
                  })}
                />
              </div>

              <button type='button' onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
      <button type='button' onClick={onAdd}>
        +Add
      </button>
    </div>
  )
}

export default StepThree
