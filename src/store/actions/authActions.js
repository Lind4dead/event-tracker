import axios from 'axios'
import actiontypes from '../actiontypes'

const apiCall = async (url, user, dispatch) => {
  try {
    const res = await axios.post(url, user)
    console.log(res.data)
    if(res.status === 200 || res.status === 201) {
      const _user = {
        name: res.data.user.firstName,
        token: res.data.accessToken
      }
      dispatch(authSuccess(_user))
    }
    else {
      throw new Error('Something went wrong!')
    }
  } catch (err) {
    dispatch(authFailure(err.response.data))
    console.log(err.response.data)
  }
}

export const registerUser = (user) => {
  return async dispatch => {
    dispatch({
      type: actiontypes().auth.authLoading
    })
    apiCall('http://localhost:8080/register', user, dispatch)
  }
}

export const login = (user) => {
  return async dispatch => {
    dispatch({
      type: actiontypes().auth.authLoading
    })
    apiCall('http://localhost:8080/login', user, dispatch)
  }
}

export const logout = () => {
  return {
    type: actiontypes().auth.logout
  }
}

const authSuccess = (_user) => {
  return {
    type: actiontypes().auth.authSuccess,
    payload: _user
  }
}

const authFailure = (err) => {
  return  {
    type: actiontypes().auth.authFailure,
    payload: err
  }
}

export const resetFailure = () => {
  return {
    type: actiontypes().auth.resetFailure
  }
}