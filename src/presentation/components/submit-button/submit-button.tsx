import React, { useContext } from 'react'
import { FormContext } from '@/presentation/contexts'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)

  return (
    <button disabled={state.isFormInvalid} type="submit" role="submit">{text}</button>
  )
}

export default SubmitButton
