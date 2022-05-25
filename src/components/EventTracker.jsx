import { useEffect, useRef, useState } from 'react'
import EventList from './EventList'
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, eventFinished } from '../store/actions/eventActions';
import jwt_decode from 'jwt-decode'


const EventTracker = () => {

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const [event, setEvent] = useState({
    title: '',
    desc: ''
  })
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    desc: '',
    date: ''
  })

  const titleField = useRef(event.title)
  const form = useRef(null)
  const eventDetails = (e) => {
    setEvent(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validateFields = (input) => {
  
    
    for (let i = 0; i < 3; i++) {

      switch (true) {

        case input.name === 'title':
          if(input.value.trim() === '') {
            setErrors(state => ({
              ...state,
              title: 'Field cannot be empty'
            }))
            titleField.current.focus()
            return false
          }
          else {
            setErrors(state => ({
              ...state,
              title: ''
            }))
            return true
          }
          
          case input.name === 'desc':
            if(input.value.trim() === '') {
              setErrors(state => ({
                ...state,
                desc: 'Field cannot be empty',
            }))
            return false
          }
          else {
            setErrors(state => ({
              ...state,
              desc: ''
            }))
            return true
          }
          
          case input.name === 'date':
            if(Date.parse(date) < Date.now()) {
              setErrors(state => ({
                ...state,
                date: 'Chosen date and time cannot already have past current date and time'
            }))
            return false
          }
          else if (date === null) {
            setErrors(state => ({
              ...state,
              date: 'You need to choose a date and time'
          }))
          return false
          }
          else {
            setErrors(state => ({
              ...state,
              date: ''
            }))
            return true
          }
        default:
          break;
      }
    }
  }


  const onSub = (e) => {
    e.preventDefault()
    console.log(date)
    let err = []
    const payload = {
      title: event.title,
      desc: event.desc,
      timeLeft: date,
      userId: jwt_decode(token).sub
    }
    setErrors(state => ({
      ...state,
      title: '',
      desc: '',
      date: ''
    }))
    for (let i = 0; i < 3; i++) {
      err[i] = validateFields(form.current[i])
      
    }
   
    if (!err.includes(false)) {
      dispatch(addEvent(payload, token))
    }
  }

  return (
    <div className='card d-flex justify-content-center align-items-center'>
      <h1 className='d-block py-3'>Event Tracker</h1>
      <form onSubmit={onSub} ref={form} className='d-flex flex-column gap-3 w-50'>
        <div className='w-100'>
          <input type="text" name='title' onChange={eventDetails} value={event.title} ref={titleField} placeholder='Event title...' className='form-control' />
          {
            errors.title && <p className='mb-2 text-danger'>{errors.title}</p>
          }
          <input type="text" name='desc' onChange={eventDetails} value={event.desc} placeholder='Event description...' className='form-control mt-3' />
          {
            errors.desc && <p className='mb-2 text-danger'>{errors.desc}</p>
          }
        </div>
        <div className='w-50'>


          <input type="datetime-local" className='form-control' name='date' value={date} onChange={e => setDate(e.target.value)} />
          {
            errors.date && <p className='mb-2 text-danger'>{errors.date}</p>
          }
        </div>
        <button className='btn btn-info fw-bold'>ADD EVENT</button>
      </form>
      <div className='w-50 my-5'>
        {

          token ? <EventList /> : <div className='text-center'><h3>Login to begin using the Event Tracker!</h3></div>
        }
      </div>
    </div>
  )
}

export default EventTracker