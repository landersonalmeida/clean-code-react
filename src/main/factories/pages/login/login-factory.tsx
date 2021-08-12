import React from 'react'
import { makeLoginValidation } from '@/main/factories/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
