import axios from 'axios'
import actiontypes from '../actiontypes'




export const getEvents = (token) => {
  return async dispatch => {
    
    
    dispatch({
      type: actiontypes().events.setEvents
    })
    try {
      const res = await axios.get('http://localhost:8080/events/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      
      if(res.status === 200) {
        res.data.sort((a, b) => {  
          
          return new Date(a.timeLeft) - new Date(b.timeLeft)
        })
        dispatch(getEventsSuccess(res.data))
      }
      else {
        if(res.status === 401) {
          throw new Error('Sorry, you have to be logged in to get the events.')
        }
        else if(res.status === 403) {
          throw new Error('You do not have any events registered! Start by adding new events!')
        }
        else {
          throw new Error('Could not get the events')
        }
      }
    } catch (err) {
      
      if(err.response.status === 403) {
        let errMsg = 'You do not have any events registered! Start by adding new events!'
        dispatch(getEventsFailure(errMsg))
      }
      else {
        dispatch(getEventsFailure(err.response.data))
      }
    }
  }
}

export const getOneEvent = (id, token) => {
  return async dispatch => {
    dispatch({
      type: actiontypes().events.setEvents
    })
    try {
      const res = await axios.get('http://localhost:8080/660/events/' + id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(res.status === 200) {
       
        dispatch(getSingleEvent(res.data))
      }
    } catch (err) {
      
    }
  }
}

export const addEvent = (_event, token) => {
return async dispatch => {
  dispatch({
    type: actiontypes().events.addEvent
  })
  try {
    const res = await axios.post('http://localhost:8080/660/events/', _event, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if(res.status === 201) {
      dispatch(addEventSuccess(res.data))
    }
    else {
      throw new Error('Could not add event')
    }
  } catch (err) {
    
    dispatch(addEventFailure(err.message))
  }
}
}

export const filterEvents = (events) => {
  if(events) {

    return {
      type: actiontypes().events.filteredEvents,
      payload: events
    }
  } else if(!events) {
    return {
      type: actiontypes().events.filteredEvents,
      payload: []
    }
  }
}



const getEventsSuccess = (events) => {
  return {
    type: actiontypes().events.setEventsSuccess,
    payload: events
  }
}

const getEventsFailure = (err) => {
  return {
    type: actiontypes().events.setEventsFailure,
    payload: err
  }
}

const getSingleEvent = (event) => {
  return {
    type: actiontypes().events.getOneEventSuccess,
    payload: event
  }
}

const addEventSuccess = (_event) => {
  return {
    type: actiontypes().events.addEventSuccess,
    payload: _event
  }
}

const addEventFailure = (err) => {
  return {
    type: actiontypes().events.addEventFailure,
    payload: err
  }
}
