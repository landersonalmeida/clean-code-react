import React from 'react'

type Props = {
  text: string
  state: any
}

const SubmitButton: React.FC<Props> = ({ state, text }: Props) => {
  return (
    <button disabled={state.isFormInvalid} type="submit" role="submit">{text}</button>
  )
}

export default SubmitButton
