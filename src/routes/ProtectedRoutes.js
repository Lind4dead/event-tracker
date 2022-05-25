import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoutes = (props) => {

  const isAuth = useSelector(state => state.auth.token)
  const location = useLocation()
  
  return isAuth
  ? props.children
  : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
