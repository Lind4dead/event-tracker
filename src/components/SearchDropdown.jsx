import React from 'react'
import SingleEvent from './SingleEvent'
import { useSelector } from 'react-redux'

const SearchDropdown = () => {
  const { filterEvents } = useSelector(state => state.eventReducer)
  return (
    <div className='card search-dropdown'>
      {
        filterEvents.map(event => <SingleEvent key={event.id} event={event} />)
      }
    </div>
  )
}

export default SearchDropdown