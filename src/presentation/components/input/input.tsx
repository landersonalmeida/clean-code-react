import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import { FormContext } from '@/presentation/contexts'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name!}Error`]

  return (
    <div
      data-testid={`${props.name!}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        id={`input_${props.name!}`}
        title={error}
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
      <label
        data-testid={`${props.name!}-label`}
        title={error}
        htmlFor={`input_${props.name!}`}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
