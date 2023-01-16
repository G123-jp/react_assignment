import { FormEvent, ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { Order } from '@/types'
interface Props {
  children: ReactNode
  onSubmit?: (data: any) => any
}

const ParentForm = ({ children, onSubmit }: Props): JSX.Element => {
  const { handleSubmit } = useForm()
  return <form onSubmit={onSubmit}>{children}</form>
}

export default ParentForm
