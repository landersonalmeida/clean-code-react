import { signupState } from '@/presentation/pages/signup/components'
import { SubmitButtonBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(signupState)

  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default SubmitButton
