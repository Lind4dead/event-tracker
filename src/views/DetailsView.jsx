import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneEvent } from '../store/actions/eventActions'
import moment from 'moment';


const DetailsView = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const { oneEvent: event, loading } = useSelector(state => state.eventReducer)
  const { id } = useParams()
 

  useEffect(() => {
    if(id) {
      dispatch(getOneEvent(id, token))
    }
  },[id, token, dispatch])
  return (
    <div className={`container d-flex  justify-content-center align-items-center mt-5`}>
      {
        loading && <p>Loading...</p>
      }
    {event && (
          
      <div className={`card w-50 p-3 ${ Date.parse(event.timeLeft) < Date.now() ? 'finished-event' : 'pending-event'}`}>
            <div>
              <h2>{event.title}</h2>
              <p className=''>{event.desc}</p>
              <small>{moment(event.timeLeft).fromNow()}</small>
            </div>
          
          </div>
          )
        }
          </div>
  )
}

export default DetailsView