import Styles from './input-styles.scss'
import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
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
