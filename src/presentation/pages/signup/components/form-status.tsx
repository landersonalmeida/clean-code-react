import { signupState } from '@/presentation/pages/signup/components'
import { FormStatusBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import React from 'react'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signupState)

  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
