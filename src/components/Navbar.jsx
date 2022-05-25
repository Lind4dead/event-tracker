import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'
import SearchDropdown from './SearchDropdown'
import { filterEvents } from '../store/actions/eventActions'
import jwt_decode from 'jwt-decode'


const Navbar = () => {
  const dispatch = useDispatch()
  const { token: isAuth, name }  = useSelector(state => state.auth)
  const { events } = useSelector(state => state.eventReducer)

  const [searchInput, setSearchInput] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  
  const handleFocus = e => {
    // e.stopPropagation()
    if(showDropdown) {
        setShowDropdown(false)
    }
    else {
      setShowDropdown(true)
    }
  }

  useEffect(() => {
    if(events) {
      let myEvents = events.filter(event => event.userId === jwt_decode(isAuth).sub)
      const filteredEvents = myEvents.filter(event => event.title.match(searchInput))
      dispatch(filterEvents(filteredEvents))
    }
  }, [dispatch, events, searchInput])

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container">
        <Link to={'/'} className="navbar-brand" href="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className="nav-link" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${isAuth ? '/' : '/login'}`} className={`nav-link`} aria-current="page" onClick={() => isAuth ? dispatch(logout()) : ''}>
                { isAuth ? 'Logout' : 'Login'}
              </NavLink>
            </li>
          </ul>
          {
            isAuth && <h5 className='text-white m-0 ms-5 fw-light'>Hello {name}</h5>
          }
        </div>
        <form className="d-flex search-form col-12 col-lg-4 py-2" role="search" >
          <input className="form-control me-2" id='searchInput' type="search" placeholder="Search" onBlur={handleFocus} onFocus={handleFocus} value={searchInput} onChange={e => setSearchInput(e.target.value)} aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
            {
              showDropdown && <SearchDropdown />
            }
        </form>
      </div>
    </nav>
  )
}

export default Navbar