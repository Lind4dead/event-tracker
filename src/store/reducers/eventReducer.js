import actiontypes from "../actiontypes";

const initState = {
  events: [],
  filterEvents: [],
  oneEvent: null,
  loading: false,
  error: null
}


const eventReducer = (state = initState, action) => {
  switch (action.type) {

    case actiontypes().events.setEvents:
      return {
        ...state,
        events: null,
        oneEvent: null,
        loading: true
      }

    case actiontypes().events.setEventsSuccess:
      return {
        ...state,
        loading: false,
        error: null,
        events: action.payload
      }

    case actiontypes().events.setEventsFailure:
      return {
        ...state,
        loading: true,
        error: action.payload
      }

    case actiontypes().events.getOneEventSuccess:
      return {
        ...state,
        oneEvent: action.payload,
        loading: false,
        error: null
      }

    case actiontypes().events.addEvent:
      return {
        ...state,
        loading: true
      }

    case actiontypes().events.addEventSuccess:
      return {
        ...state,
        loading: false,
        error: null,
        events: [...state.events, action.payload]
      }

    case actiontypes().events.addEventFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case actiontypes().events.filteredEvents:
      return {
        ...state,
        filterEvents: action.payload
      }


    default:
      return state
  }



}


export default eventReducer;