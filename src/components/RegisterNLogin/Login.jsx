import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/authActions'

const Login = () => {

  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const onChange = e => {
    setLoginInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const onSub = e => {
    e.preventDefault()
    dispatch(login(loginInfo))
  }

  return (
    <div className='card mt-5 p-5'>
      <div className='text-center py-3'>
        <h1>Login</h1>
      </div>
      <form onSubmit={onSub} className='d-flex gap-4 flex-column'>
        <div>
          <input type="email" className='form-control' name='email' placeholder='Email...' value={loginInfo.email} onChange={onChange} />
        </div>
        <div>
          <input type="password" className='form-control' name='password' placeholder='Password...' value={loginInfo.password} onChange={onChange} />
        </div>
        {
        error && <h6 className='text-danger'>{error}</h6>
      }
        <button className='btn btn-outline-dark fw-bold'>LOGIN</button>
      </form>
    </div>
  )
}

export default Login