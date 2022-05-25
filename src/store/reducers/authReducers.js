import actiontypes from "../actiontypes";

const initState = {
  token: null,
  name: null,
  loading: false,
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {

    case actiontypes().auth.authLoading:
      return {
        ...state,
        token: null,
        name: null,
        loading: true,
        error: null
      }

    case actiontypes().auth.authSuccess:
      localStorage.setItem('token', action.payload.token)
      console.log(action.payload)
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        loading: false,
        error: null
      }

    case actiontypes().auth.authFailure:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actiontypes().auth.logout:
      localStorage.removeItem('token')
      return {
        ...initState
      }

    case actiontypes().auth.resetFailure:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export default authReducer