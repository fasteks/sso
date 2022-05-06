import Cookies from 'universal-cookie'
import { history } from '../index'

const cookies = new Cookies()

const UPDATE_EMAIL = '@sso/auth/UPDATE_EMAIL'
const UPDATE_PASSWORD = '@sso/auth/UPDATE_PASSWORD'
const LOGIN = '@sso/auth/LOGIN'

const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_EMAIL: {
      return {
        ...state,
        email: action.email
      }
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case LOGIN: {
      return {
        ...state,
        token: action.token,
        user: action.user,
        password: action.password
      }
    }
    default:
      return state
  }
}

export function updateEmailField(email) {
  return { type: UPDATE_EMAIL, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function signIn() {
  return async (dispatch, getState) => {
    const { email, password } = getState().auth
    await fetch('/api/v1/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user, password: '' })
        history.push('/dummy')
      })
  }
}

export function trySignIn() {
  return async (dispatch, getState) => {
    const { pathname } = getState().router.location
    await fetch('/api/v1/auth')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user, password: '' })
        if (data.status === 'ok' && pathname !== '/admin') {
          history.push('/dummy')
        }
      })
  }
}
