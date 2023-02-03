import { Modal, Button, Tour } from 'antd'
import type { TourProps } from 'antd'

/**
 * Welcome Modal
 * @param props Welcome Modal Props
 */
export function WelcomeModal(props: { openTourModal: boolean; handleTourModalOk: () => void }) {
  const { openTourModal, handleTourModalOk } = props
  return (
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
        This is a food ordering system for restaurants. You can choose the number of people, the restaurant, and the dishes you want to order. After you finish
        the order, you can submit it and wait for the restaurant to serve you.
      </p>
    </Modal>
  )
}

/**
 * Welcome Tour
 * @param props Welcome Tour Props
 */
export function WelcomeTour(props: {
  openTour: boolean
  setOpenTour: (openTour: boolean) => void
  tourRef1: React.MutableRefObject<null>
  tourRef2: React.MutableRefObject<null>
  tourRef3: React.MutableRefObject<null>
  tourRef4: React.MutableRefObject<null>
}) {
  const { openTour, setOpenTour, tourRef1, tourRef2, tourRef3, tourRef4 } = props

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

  return <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
}
