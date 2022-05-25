import React, { useState } from 'react'
import { registerUser } from '../../store/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {

  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rptPw: ''
  })

  const onChange = e => {

    setUserInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))

  }
 
  const onSub = (e) => {
    e.preventDefault()

    if(userInfo.password.trim() === userInfo.rptPw.trim()) {
      dispatch(registerUser(userInfo))
    }
    
  }


  return (
    <div className='card mt-5 p-5'>
      <div className='text-center py-3'>
        <h1>Register</h1>
      </div>
      <form onSubmit={onSub} className='d-flex gap-4 flex-column'>
        <div className='input-group'>
          <input type="text" className='form-control' name='firstName' placeholder='First Name' value={userInfo.firstName} onChange={onChange} />
          <input type="text" className='form-control' name='lastName' placeholder='Last Name' value={userInfo.lastName} onChange={onChange} />
        </div>
        <div>
        <input type="email" className='form-control' name='email' placeholder='Email...' value={userInfo.email} onChange={onChange} />

        </div>
      <div className='input-group'>
        <input type="password" className='form-control' name='password' placeholder='Password...' value={userInfo.password} onChange={onChange} />
        <input type="password" className='form-control' name='rptPw' placeholder='Repeat Password...' value={userInfo.rptPw} onChange={onChange} />
      </div>
      {
        error && <h6 className='text-danger'>{error}</h6>
      }
        <button className='btn btn-outline-dark fw-bold'>REGISTER</button>
      </form>
    </div>
  )
}

export default Register