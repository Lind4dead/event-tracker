import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  
    
  }, [countDownDate])

  return getReturnValues(countDown)
  
}

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 *24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  
  
  switch(true) {
    case days > 0:{
      const timeleft = days + ' days'
      return timeleft
    }
      case hours > 0:{
        const timeleft = hours + ' hours'
        return timeleft
}
      case minutes > 0:{
        const timeleft = minutes + ' minutes'
        return timeleft
}
      case seconds > 0:{
        const timeleft = seconds + ' seconds'
        return timeleft
}
      default:{
        const timeleft = null
        return timeleft
      }
  }
    
 
  
}

export { useCountdown }