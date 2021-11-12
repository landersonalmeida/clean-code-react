import { signupState } from '@/presentation/pages/signup/components'
import { FormStatusBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import React from 'react'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signupState)

  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
