import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getError = (): string => {
    return props.type === 'email' ? state.emailError : state?.passwordError
  }

  const getTitle = (): string => {
    return getError() || 'Tudo certo'
  }

  const getStatus = (): string => {
    return getError() ? '🔴' : '🟢'
  }

  const getTestIdSpan = (): string => {
    return props.type === 'email' ? 'email-status' : 'password-status'
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={props.name} {...props} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={getTestIdSpan()} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
