import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  }
})
