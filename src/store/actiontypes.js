const actiontypes = () => {
  return {
    events: {
      setEvents: 'SET_EVENTS',
      setEventsSuccess: 'SET_EVENTS_SUCCESS',
      setEventsFailure: 'SET_EVENTS_FAILURE',
      getOneEventSuccess: 'GET_ONE_EVENT_SUCCESS',
      getOneEventFailure: 'GET_ONE_EVENT_FAILURE',
      addEvent: 'ADD_EVENT',
      addEventSuccess: 'ADD_EVENT_SUCCESS',
      addEventFailure: 'ADD_EVENT_FAILURE',
      filteredEvents: 'FILTERED_EVENTS'
    },
    auth: {
      authLoading: 'AUTH_LOADING',
      authSuccess: 'AUTH_SUCCESS',
      authFailure: 'AUTH_FAILURE',
      logout: 'LOGOUT',
      resetFailure: 'RESET_FAILURE'
    }
  }
}

export default actiontypes