import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name!}Error`]

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        id={`input_${props.name!}`}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={event => { event.target.readOnly = false }}
        onChange={event => {
          setState({
            ...state,
            [event.target.name]: event.target.value
          })
        }}
      />
      <label htmlFor={`input_${props.name!}`}>{props.placeholder}</label>
      <span
        data-testid={`${props.name!}-status`}
        title={error || 'Tudo certo'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
