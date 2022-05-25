import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SingleEvent from './SingleEvent'
import { getEvents } from '../store/actions/eventActions'
import jwt_decode from 'jwt-decode'

const EventList = () => {

  const dispatch = useDispatch()
  const { events, loading, error } = useSelector(state => state.eventReducer)
  const { token } = useSelector(state => state.auth)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])

  console.log(error)


  useEffect(() => {
    if (events) {
      setUpcomingEvents([])
      setPastEvents([])

      let myEvents = events.filter(event => event.userId === jwt_decode(token).sub)
      let sortedEvts = myEvents.sort((a, b) => {
        return Date.parse(a.timeLeft) - Date.parse(b.timeLeft)
      })

      sortedEvts.map(evt => {
        if (Date.parse(evt.timeLeft) > Date.now()) {
          setUpcomingEvents(state => ([
            ...state,
            evt
          ]))
        } else {
          setPastEvents(state => ([
            ...state,
            evt
          ]))
        }
      })
    }
  }, [events, token])

  useEffect(() => {
    dispatch(getEvents(token))
  }, [dispatch])
  if(events)
  {
    return (events &&
      <div className="list-group">
        {loading && <p>Loading...</p>}
        {
          error && <h6>{error}</h6>
        }
        <div className='mb-2'>
          <h1>Upcoming events</h1>
  
        </div>
        {
          !upcomingEvents.length && <h5>No upcoming events registered</h5>
        }
        {
          upcomingEvents && upcomingEvents.map(event => <SingleEvent key={event.id} event={event} token={token} />)
        }
        <div className='mt-3 mb-2'>
  
          <h1>Past</h1>
        </div>
        {
          pastEvents && pastEvents.map(event => <SingleEvent key={event.id} event={event} token={token} />)
        }
  
      </div>
    )
  }
  else {
    return <h6>{error}</h6>
  }
  


}

export default EventList