import { useCountdown } from '../hooks/useCountdown'
import moment from 'moment';
import { Link } from 'react-router-dom';


const SingleEvent = ({ event, token }) => {

  
 
  return (
    <Link to={`/details/${event.id}`}>
    <div className={`list-group-item list-group-item-action ${useCountdown(event.timeLeft) === null ? 'finished-event' : 'pending-event'}`} aria-current="true">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{event.title}</h5>
      <small>{moment(event.timeLeft).fromNow()}</small>
    </div>
    <p className="mb-1">{event.desc.slice(0, 50)}...</p>
    
  </div>
  </Link>
  )
}

export default SingleEvent