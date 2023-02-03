import { useState, useEffect } from 'react'
import { Button, Form, Radio, Select, Input, InputNumber, Tooltip, Descriptions, Tag, Steps } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { getRestaurantsByMeal, getAvailableDishByRestaurant, generateRandomID } from '../utils'
import { dishes } from '../../data/dishes.json'
import SelectMealImg from '../assets/image/select-meal-img.jpg'
import SelectResImg from '../assets/image/home-bg-mobile.png'

/**
 * order step component
 * @param props order step component props
 */
export function OrderSteps(props: {
  currentProgress: number
  orderForm: Types.OrderForm
  setOrderForm: React.Dispatch<React.SetStateAction<Types.OrderForm>>
  tourRef1: React.MutableRefObject<null>
  tourRef2: React.MutableRefObject<null>
}) {
  const { currentProgress, orderForm, setOrderForm, tourRef1, tourRef2 } = props

  const progressItems: Types.ProgressItem[] = [
    {
      title: 'Select Meal',
      component: <SelectMeal orderForm={orderForm} setOrderForm={setOrderForm} />,
    },
    {
      title: 'Select Restaurant',
      component: <SelectRestaurant orderForm={orderForm} setOrderForm={setOrderForm} />,
    },
    {
      title: 'Order Details',
      component: <OrderDetails orderForm={orderForm} setOrderForm={setOrderForm} />,
    },
    {
      title: 'Confirm Order',
      component: <ConfirmOrder orderForm={orderForm} setOrderForm={setOrderForm} />,
    },
  ]

  return (
    <>
      <div ref={tourRef1}>
        <Steps current={currentProgress} items={progressItems} className="step-progress"></Steps>
      </div>
      <div ref={tourRef2} className="step-component">
        {progressItems[currentProgress].component}
      </div>
    </>
  )
}

/**
 * Step 1: Select Meal
 * @param props step component props
 */
export function SelectMeal(props: Types.StepComponentProps) {
  const { orderForm, setOrderForm } = props
  const [form] = Form.useForm()

  const handleValuesChange = (changedValues: { meal: Types.Meal } | { number: number }, allValues: { meal: Types.Meal; number: number }) => {
    // update form after select meal or number
    setOrderForm(preVal => {
      return {
        ...preVal,
        ...allValues,
      }
    })
    // reset restaurant after select meal
    if (Reflect.has(changedValues, 'meal')) {
      setOrderForm(preVal => {
        return {
          ...preVal,
          restaurant: '',
        }
      })
    }
  }

  useEffect(() => {
    form.setFieldValue('meal', orderForm.meal)
    form.setFieldValue('number', orderForm.number)
  }, [])

  return (
    <>
      <div className="select-meal">
        <img src={SelectMealImg} alt="select meal img" />
        <Form
          form={form}
          initialValues={{ meal: 'lunch', number: 1 }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="select-meal-form"
          layout="vertical"
          name="selectMealForm"
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="meal" label="Please Select A Meal" required>
            <Radio.Group>
              <Radio.Button value="breakfast">Breakfast</Radio.Button>
              <Radio.Button value="lunch">Lunch</Radio.Button>
              <Radio.Button value="dinner">Dinner</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="number" label="Please Select Number of People" tooltip="Up to 10 people" required>
            <Radio.Group>
              {Array.from({ length: 10 }, (v, k) => k + 1).map(item => (
                <Radio.Button key={item} value={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

/**
 * Step 2: Select Restaurant
 * @param props step component props
 */
export function SelectRestaurant(props: Types.StepComponentProps) {
  const { orderForm, setOrderForm } = props
  const [form] = Form.useForm()
  const [restaurantOption, setRestaurantOption] = useState<Types.SelectOption[]>([])

  const handleValuesChange = (changedValues: { restaurant: string }, allValues: { restaurant: string }) => {
    // update dishes form after select restaurant
    setOrderForm(preVal => {
      return {
        ...preVal,
        ...allValues,
      }
    })
  }

  useEffect(() => {
    // set restaurant select option
    form.setFieldValue('restaurant', orderForm.restaurant || null)
    // get available restaurant by meal
    setRestaurantOption(
      getRestaurantsByMeal(dishes, orderForm.meal).map(item => {
        return {
          value: item,
          label: item,
        }
      })
    )
  }, [])

  return (
    <>
      <div className="select-res">
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="select-res-form"
          layout="vertical"
          name="selectResForm"
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="restaurant" label="Please Select A Restaurant" required>
            <Select showSearch allowClear placeholder="Select A Restaurant" style={{ width: 320 }} options={restaurantOption}></Select>
          </Form.Item>
        </Form>
        <img src={SelectResImg} alt="select restaurant img" />
      </div>
    </>
  )
}

/**
 * Step 3: Order Details
 * @param props step component props
 */
export function OrderDetails(props: Types.StepComponentProps) {
  const { orderForm, setOrderForm } = props
  const [dishesOption, setDishesOption] = useState<Types.SelectOption[]>([])
  const [curSelectedDish, setCurSelectedDish] = useState<string[]>([])
  const [form] = Form.useForm()

  const handleAddDish = () => {
    // update dishes form after add new dish
    setOrderForm(preVal => {
      return {
        ...preVal,
        dishes: [...preVal.dishes, { dish: '', number: 1 }],
      }
    })
    // set new added dish and number form
    form.setFieldsValue({
      ['dish_' + orderForm.dishes.length]: null,
      ['number_' + orderForm.dishes.length]: 1,
    })
  }

  const handleRemoveDish = (data: Types.DishForm, index: number) => {
    if (orderForm.dishes.length === 1) return

    if (data.dish) {
      // remove selected dish from select option
      setCurSelectedDish(preVal => {
        return preVal.filter(item => item !== data.dish)
      })
    }
    // get current remove form data
    let curForm = orderForm.dishes.filter((item, i) => i !== index)
    // reset form data after remove
    for (let i = 0; i < curForm.length; i++) {
      form.setFieldsValue({
        ['dish_' + i]: curForm[i].dish || null,
        ['number_' + i]: curForm[i].number || 1,
      })
    }
    // update orderForm data after remove
    setOrderForm(preVal => {
      return {
        ...preVal,
        dishes: curForm,
      }
    })
  }

  const handleValuesChange = (changedValues: { [key: string]: string }, allValues: { [key: string]: string | number }) => {
    let tempSelectedDish: string[] = [],
      tempSelectedDishWithNumber: Types.DishForm[] = []

    for (let i = 0; i < dishesOption.length; i++) {
      // handle new selected dish data
      if (allValues['dish_' + i]) {
        tempSelectedDish.push(allValues['dish_' + i] as string)
      }
      // handle old orderForm dish data
      if (orderForm.dishes[i]) {
        tempSelectedDishWithNumber.push({
          dish: allValues['dish_' + i] as string,
          number: allValues['number_' + i] as number,
        })
      }
    }

    // update selected dish data
    setCurSelectedDish(tempSelectedDish)
    // update orderForm data
    setOrderForm(preVal => {
      return {
        ...preVal,
        dishes: tempSelectedDishWithNumber,
      }
    })
  }

  useEffect(() => {
    // get dishes option
    setDishesOption(
      getAvailableDishByRestaurant(dishes, orderForm.meal, orderForm.restaurant).map(item => {
        return {
          value: item,
          label: item,
        }
      })
    )

    // display selected dish data
    setCurSelectedDish(orderForm.dishes.map(item => item.dish))
    // generate dish form in the first time
    if (orderForm.dishes.length === 0) {
      setOrderForm((preVal: Types.OrderForm) => {
        return {
          ...preVal,
          dishes: [
            {
              dish: '',
              number: 1,
            },
          ],
        }
      })
      form.setFieldsValue({
        ['dish_0']: null,
        ['number_0']: 1,
      })
    }
    // set form value by orderForm data
    for (let i = 0; i < orderForm.dishes.length; i++) {
      form.setFieldsValue({
        ['dish_' + i]: orderForm.dishes[i].dish || null,
        ['number_' + i]: orderForm.dishes[i].number || 1,
      })
    }
  }, [])

  return (
    <>
      <div className="select-dish">
        <div className="number-tag">
          <Tooltip title="The total number of dishes (i.e Number of dishes * respective serving) should be greater or equal to the number of people selected in Step 1 and a maximum of 10 is allowed.">
            <Tag color="blue">{`Current Meal: ${orderForm.meal}, Number: ${orderForm.number}`}</Tag>
          </Tooltip>
        </div>
        <Form form={form} layout="inline" name="selectDishForm" onValuesChange={handleValuesChange}>
          {orderForm.dishes.map((item, index) => {
            return (
              <Form.Item key={generateRandomID()} label="Please Select A Dish And No. of Servings" required>
                <Input.Group compact>
                  <Form.Item name={'dish_' + index} noStyle>
                    <Select
                      showSearch
                      placeholder="Select A Dish"
                      style={{ width: 270 }}
                      options={dishesOption.map(item => {
                        return { ...item, disabled: curSelectedDish.includes(item.value) }
                      })}
                    ></Select>
                  </Form.Item>
                  <Form.Item name={'number_' + index} noStyle>
                    <InputNumber min={1} max={10} placeholder="No. of servings" style={{ width: 70 }} />
                  </Form.Item>
                  <Tooltip title="Remove This Dish">
                    <Button icon={<MinusCircleOutlined />} disabled={orderForm.dishes.length === 1} onClick={() => handleRemoveDish(item, index)} />
                  </Tooltip>
                </Input.Group>
              </Form.Item>
            )
          })}
          <Button icon={<PlusCircleOutlined />} disabled={orderForm.dishes.length >= dishesOption.length} onClick={handleAddDish}>
            Add
          </Button>
        </Form>
      </div>
    </>
  )
}

/**
 * Step 4: Confirm Order
 * @param props step component props
 */
export function ConfirmOrder(props: Types.StepComponentProps) {
  const { orderForm } = props

  return (
    <>
      <div className="confirm-order">
        <Descriptions column={1} size="middle" bordered title="Preview Order Info" style={{ width: '800px' }}>
          <Descriptions.Item label="Meal">{orderForm.meal}</Descriptions.Item>
          <Descriptions.Item label="Number of People">{orderForm.number}</Descriptions.Item>
          <Descriptions.Item label="Restaurant">{orderForm.restaurant}</Descriptions.Item>
          <Descriptions.Item label="Dishes">
            {orderForm.dishes.map(item => {
              return (
                item.dish &&
                item.number && (
                  <div key={generateRandomID()}>
                    <span>{item.dish}</span>
                    <span> - </span>
                    <span>{item.number}</span>
                  </div>
                )
              )
            })}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  )
}
