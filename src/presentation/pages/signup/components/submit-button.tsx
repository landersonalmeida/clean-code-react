import { signupState } from '@/presentation/pages/signup/components'
import { SubmitButtonBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import React from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(signupState)

  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default SubmitButton
