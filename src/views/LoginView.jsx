import React, { useState, useEffect } from 'react'
import Login from '../components/RegisterNLogin/Login'
import Register from '../components/RegisterNLogin/Register'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { resetFailure } from '../store/actions/authActions'

const LoginView = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [showLogin, setShowLogin] = useState(true)
  const auth = useSelector(state => state.auth.token)

  const handleChange = (e) => {
    dispatch(resetFailure())
    if(e.target.innerText === 'Login') {
      setShowLogin(true)
    } else {
      setShowLogin(false)
    }

  }

  useEffect(() => {
    if(auth) {
      try {navigate(state.from)} 
      catch {navigate("/")}
    }
  },[auth, navigate])
  return (
    <div className='container'>
      <div className='btn-group d-flex justify-content-center align-items-center row mt-5'>
        <button onClick={handleChange} className={`btn ${showLogin ? 'btn-light' : 'btn-outline-light'} col-3`}>Login</button>
        <button onClick={handleChange} className={`btn ${!showLogin ? 'btn-light' : 'btn-outline-light'} col-3`}>Register</button>
      </div>
      {
        showLogin ? <Login /> : <Register />
      }
    </div>
  )
}

export default LoginView