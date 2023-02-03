import { useState, useEffect, useRef } from 'react'
import { ConfigProvider, Button, Space, Divider, Modal, message } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { OrderSteps } from './components/StepComponent'
import { WelcomeModal, WelcomeTour } from './components/HomePageComponent'
import { GITHUB_REPO_ADDRESS, STEP_LENGTH, MAX_NUMBER_OF_DISHES } from './utils/constant'
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

  const handlePreviousClick = () => {
    currentProgress > 0 && setCurrentProgress(currentProgress - 1)
  }

  const handleNextClick = () => {
    localStorage.setItem('orderForm', JSON.stringify(orderForm))
    localStorage.setItem('currentProgress', currentProgress + 1 + '')

    // optimize: use specific words to replace 1, 2 progress
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
      } else if (totalDishes > MAX_NUMBER_OF_DISHES) {
        Modal.warning({
          title: 'Too many dishes',
          content: 'Please select less than 10 dishes.',
          okText: 'OK',
        })
        return
      }
    } else if (currentProgress === STEP_LENGTH) {
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

    currentProgress < STEP_LENGTH && setCurrentProgress(currentProgress + 1)
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
          <OrderSteps currentProgress={currentProgress} orderForm={orderForm} setOrderForm={setOrderForm} tourRef1={tourRef1} tourRef2={tourRef2} />
          <div className="progress-btn">
            <span ref={tourRef3}>
              <Space size="middle">
                {currentProgress === 0 || <Button onClick={handlePreviousClick}>Previous</Button>}
                <Button type="primary" onClick={handleNextClick}>
                  {currentProgress === STEP_LENGTH ? 'Done' : 'Next'}
                </Button>
              </Space>
            </span>
          </div>
        </section>
        <WelcomeModal openTourModal={openTourModal} handleTourModalOk={handleTourModalOk} />
        <WelcomeTour openTour={openTour} setOpenTour={setOpenTour} tourRef1={tourRef1} tourRef2={tourRef2} tourRef3={tourRef3} tourRef4={tourRef4} />
        <GithubOutlined ref={tourRef4} className="github-icon" onClick={() => window.open(GITHUB_REPO_ADDRESS, '_target')} />
      </main>
    </ConfigProvider>
  )
}

export default App
