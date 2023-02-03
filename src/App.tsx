import { useState, useEffect, useRef } from 'react'
import { ConfigProvider, Steps, Button, Space, Divider, Tour, Modal, message } from 'antd'
import type { TourProps } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { SelectMeal, SelectRestaurant, OrderDetails, ConfirmOrder } from './components/StepComponent'
import { GitHubRepoAddress } from './utils/constant'
import enUS from 'antd/locale/en_US'
import './assets/App.less'

function App() {
  const [currentProgress, setCurrentProgress] = useState<number>(0)
  const [openTour, setOpenTour] = useState<boolean>(false)
  const [openTourModal, setOpenTourModal] = useState<boolean>(false)
  const [orderForm, setOrderForm] = useState<Types.OrderForm>({
    meal: 'lunch',
    number: 1,
    restaurant: '',
    dishes: [],
  })

  // tour component ref
  const tourRef1 = useRef(null)
  const tourRef2 = useRef(null)
  const tourRef3 = useRef(null)
  const tourRef4 = useRef(null)

  const steps: TourProps['steps'] = [
    {
      title: 'Order Steps',
      description: 'Please follow the 4 steps to place an order',
      target: () => tourRef1.current,
    },
    {
      title: 'Fill Info',
      description: 'You can fill order info in the area',
      target: () => tourRef2.current,
    },
    {
      title: 'Next, Previous',
      description: 'You can click next or previous button to navigate between steps',
      target: () => tourRef3.current,
    },
    {
      title: 'Source Code',
      description: 'You can click the button to view source code on GitHub',
      target: () => tourRef4.current,
    },
  ]

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

  const handlePreviousClick = () => {
    currentProgress > 0 && setCurrentProgress(currentProgress - 1)
  }

  const handleNextClick = () => {
    localStorage.setItem('orderForm', JSON.stringify(orderForm))
    localStorage.setItem('currentProgress', currentProgress + 1 + '')

    if (currentProgress === 1) {
      if (!orderForm.restaurant) {
        message.warning({
          content: 'Please select a restaurant before proceeding to the next step.',
        })
        return
      }
    } else if (currentProgress === 2) {
      let totalDishes = 0
      for (const item of orderForm.dishes) {
        if (item.dish && item.number) {
          totalDishes += item.number
        }
      }
      if (totalDishes === 0) {
        message.warning({
          content: 'Please select any dishes before proceeding to the next step.',
        })
        return
      } else if (totalDishes < orderForm.number) {
        Modal.warning({
          title: `Not enough dishes for ${orderForm.number} people`,
          content: 'Please select more dishes.',
          okText: 'OK',
        })
        return
      } else if (totalDishes > 10) {
        Modal.warning({
          title: 'Too many dishes',
          content: 'Please select less than 10 dishes.',
          okText: 'OK',
        })
        return
      }
    } else if (currentProgress === progressItems.length - 1) {
      Modal.success({
        title: 'Order Submitted',
        content: 'Your order has been submitted successfully, please wait for serving.',
        okText: 'OK',
      })
      const finalOrderInfo = {
        ...orderForm,
        dishes: orderForm.dishes.filter(item => item.dish && item.number),
      }
      // console log finalOrderInfo object in table format
      console.log('%c--------------------------- Order Info Here ---------------------------', 'color: #1677ff')
      console.table(finalOrderInfo, ['meal', 'number', 'restaurant', 'dishes'])
      console.table(finalOrderInfo.dishes, ['dish', 'number'])
      console.log(JSON.stringify(finalOrderInfo, null, 2))

      localStorage.removeItem('orderForm')
      localStorage.removeItem('currentProgress')
    }

    currentProgress < progressItems.length - 1 && setCurrentProgress(currentProgress + 1)
  }

  const handleTourModalOk = () => {
    // diff device is pc or mobile
    const deviceType = window.innerWidth > 768 ? 'pc' : 'mobile'
    setOpenTourModal(false)
    setOpenTour(deviceType === 'pc')
  }

  useEffect(() => {
    // get order form data
    const orderForm = localStorage.getItem('orderForm')
    orderForm && setOrderForm(JSON.parse(orderForm))

    // get current progress
    const currentProgress = localStorage.getItem('currentProgress')
    currentProgress && setCurrentProgress(parseInt(currentProgress))

    // check is viewed page
    const viewedPage = !!localStorage.getItem('viewedPage')
    console.log('[ viewedPage ]', viewedPage)
    // set open tour modal
    setOpenTourModal(!viewedPage)
    // set viewed page
    localStorage.setItem('viewedPage', 'true')
  }, [])

  return (
    <ConfigProvider locale={enUS}>
      <main className="main-area">
        <section className="top-area">
          <div className="home-bg"></div>
          <h1 className="title">The Best Restaurant Food Order System</h1>
          <Divider className="mobile-divider" />
        </section>
        <section className="content">
          <div ref={tourRef1}>
            <Steps current={currentProgress} items={progressItems} className="step-progress"></Steps>
          </div>
          <div ref={tourRef2} className="step-component">
            {progressItems[currentProgress].component}
          </div>
          <div className="progress-btn">
            <span ref={tourRef3}>
              <Space size="middle">
                {currentProgress === 0 || <Button onClick={handlePreviousClick}>Previous</Button>}
                <Button type="primary" onClick={handleNextClick}>
                  {currentProgress === progressItems.length - 1 ? 'Done' : 'Next'}
                </Button>
              </Space>
            </span>
          </div>
        </section>
        <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
        <Modal
          closable={false}
          centered={true}
          title="Food Order System"
          open={openTourModal}
          footer={[
            <Button type="primary" size="middle" key="ok" onClick={handleTourModalOk}>
              Get It
            </Button>,
          ]}
        >
          <p>
            This is a food ordering system for restaurants. You can choose the number of people, the restaurant, and the dishes you want to order. After you
            finish the order, you can submit it and wait for the restaurant to serve you.
          </p>
        </Modal>
        <GithubOutlined ref={tourRef4} className="github-icon" onClick={() => window.open(GitHubRepoAddress, '_target')} />
      </main>
    </ConfigProvider>
  )
}

export default App
