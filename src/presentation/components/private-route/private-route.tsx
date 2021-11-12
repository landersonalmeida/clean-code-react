import { currentAccountState } from '@/presentation/components'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import React from 'react'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()?.accessToken
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />} />
}

export default PrivateRoute
