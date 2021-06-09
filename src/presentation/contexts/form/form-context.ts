import { createContext } from 'react'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

export default createContext<Partial<StateProps>>({})
