import { useState, useEffect } from 'react'
import { ConfigProvider, Steps, Button, Space, Form, Radio, Select, Input, InputNumber, Tooltip, Descriptions, Divider, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined, TranslationOutlined } from '@ant-design/icons'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// import jaJP from 'antd/locale/ja_JP'
import './App.less'
import { dishes } from '../data/dishes.json'
import SelectMealImg from './assets/select-meal-img.jpg'
import SelectResImg from './assets/home-bg-mobile.png'

// antd default language is English, set it to Chinese
dayjs.locale('zh-cn')

function SelectMeal() {
  const [form] = Form.useForm()
  return (
    <>
      <div className="select-meal">
        <img src={SelectMealImg} alt="select meal img" />
        <Form
          form={form}
          initialValues={{ meal: 'lunch', numbers: 1 }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="select-meal-form"
          layout="vertical"
          name="selectMealForm"
        >
          <Form.Item name="meal" label="Please Select A Meal" required>
            <Radio.Group>
              <Radio.Button value="breakfast">Breakfast</Radio.Button>
              <Radio.Button value="lunch">Lunch</Radio.Button>
              <Radio.Button value="dinner">Dinner</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="numbers" label="Please Select Number of People" tooltip="Up to 10 people" required>
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

function SelectRestaurant() {
  const [form] = Form.useForm()

  const restaurantOption = [
    {
      value: 'restaurant1',
      label: 'Restaurant 1',
    },
    {
      value: 'restaurant2',
      label: 'Restaurant 2',
    },
    {
      value: 'restaurant3',
      label: 'Restaurant 3',
    },
  ]

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <div className="select-res">
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="select-res-form" layout="vertical" name="selectResForm">
          <Form.Item name="restaurant" label="Please Select A Restaurant" required>
            <Select showSearch placeholder="Select A Restaurant" style={{ width: 320 }} onChange={handleChange} options={restaurantOption}></Select>
          </Form.Item>
        </Form>
        <img src={SelectResImg} alt="select restaurant img" />
      </div>
    </>
  )
}

function OrderDetails() {
  const [form] = Form.useForm()

  const dishOption = [
    {
      value: 'dish1',
      label: 'dish 1',
    },
    {
      value: 'dish2',
      label: 'dish 2',
    },
    {
      value: 'dish3',
      label: 'dish 3',
    },
  ]

  const [dishFormArr, setDishForm] = useState<Types.DishForm[]>([
    {
      dish: '',
      number: 1,
    },
  ])

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const handleAddDish = () => {
    setDishForm([
      ...dishFormArr,
      {
        dish: '',
        number: 1,
      },
    ])
  }

  const handleRemoveDish = (index: number) => {
    if (dishFormArr.length === 1) return
    const newDishFormArr = [...dishFormArr]
    newDishFormArr.splice(index, 1)
    setDishForm(newDishFormArr)
  }

  return (
    <>
      <div className="select-dish">
        <Form form={form} layout="inline" name="selectDishForm">
          {dishFormArr.map((item, index) => {
            return (
              <Form.Item name={item.dish + index} key={index} label="Please Select A Dish And No. of Servings" required>
                <Input.Group compact>
                  <Select showSearch placeholder="Select A Dish" style={{ width: 270 }} onChange={handleChange} options={dishOption}></Select>
                  <Tooltip title="No. of Servings">
                    <InputNumber defaultValue={1} min={1} max={10} placeholder="No. of servings" style={{ width: 70 }} />
                  </Tooltip>
                  <Tooltip title="Remove This Dish">
                    <Button icon={<MinusCircleOutlined />} disabled={dishFormArr.length === 1} onClick={() => handleRemoveDish(index)} />
                  </Tooltip>
                </Input.Group>
              </Form.Item>
            )
          })}
          <Button icon={<PlusCircleOutlined />} disabled={dishFormArr.length >= dishOption.length} onClick={handleAddDish}>
            Add
          </Button>
        </Form>
      </div>
    </>
  )
}

function ConfirmOrder() {
  return (
    <>
      <div className="confirm-order">
        <Descriptions column={1} size="middle" bordered title="Preview Order Info" style={{ width: '800px' }}>
          <Descriptions.Item label="Meal">Lunch</Descriptions.Item>
          <Descriptions.Item label="Number of People">2</Descriptions.Item>
          <Descriptions.Item label="Restaurant">Restaurant 1</Descriptions.Item>
          <Descriptions.Item label="Dishes">
            <div>
              <span>Dish 1</span>
              <span> - </span>
              <span>2</span>
            </div>
            <div>
              <span>Dish 2</span>
              <span> - </span>
              <span>1</span>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  )
}

function App() {
  const [currentProgress, setCurrentProgress] = useState<number>(0)
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')

  const progressItems: Types.ProgressItem[] = [
    {
      title: 'Select Meal',
      component: <SelectMeal />,
    },
    {
      title: 'Select Restaurant',
      component: <SelectRestaurant />,
    },
    {
      title: 'Order Details',
      component: <OrderDetails />,
    },
    {
      title: 'Confirm Order',
      component: <ConfirmOrder />,
    },
  ]

  const handlePreviousClick = () => {
    currentProgress > 0 && setCurrentProgress(currentProgress - 1)
  }

  const handleNextClick = () => {
    currentProgress < progressItems.length - 1 && setCurrentProgress(currentProgress + 1)
  }

  useEffect(() => {
    console.log(dishes)
  }, [])

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'zh',
      label: '中文',
    },
    {
      key: 'jp',
      label: '日本語',
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    currentLanguage !== key && setCurrentLanguage(key)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <main className="main-area">
        <section className="top-area">
          <div className="home-bg"></div>
          {/* <Divider className="title">The Best Restaurant Food Order System</Divider> */}
          <h1 className="title">The Best Restaurant Food Order System</h1>
          <Divider className="mobile-divider" />
        </section>
        <section className="content">
          <Steps current={currentProgress} items={progressItems} className="step-progress"></Steps>
          <div className="step-component">{progressItems[currentProgress].component}</div>
          <div className="progress-btn">
            <Space size="middle">
              {currentProgress === 0 ? '' : <Button onClick={handlePreviousClick}>Previous</Button>}
              <Button type="primary" onClick={handleNextClick}>
                {currentProgress === progressItems.length - 1 ? 'Done' : 'Next'}
              </Button>
            </Space>
          </div>
        </section>
        <Dropdown menu={{ items, onClick }}>
          <Button icon={<TranslationOutlined />} className="lang-btn">
            {currentLanguage === 'en' ? 'English' : currentLanguage === 'zh' ? '中文' : '日本語'}
          </Button>
        </Dropdown>
      </main>
    </ConfigProvider>
  )
}

export default App
