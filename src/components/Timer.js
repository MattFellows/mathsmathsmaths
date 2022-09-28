import React, { useState, useEffect } from 'react'

const Timer = ({endTime}) => {
    const [ refreshTime, setRefreshTime ] = useState(new Date());

    useEffect(() => {
        setTimeout(() => {
            setRefreshTime(new Date())
        }, 1000)
    }, [refreshTime])

    const getSecondsRemaining = () => {
        const seconds = Math.floor((endTime.getTime() - new Date().getTime()) / 1000)
        return seconds > 0 ? seconds : ""
    }
    return (endTime && <div className={'timer'}>{getSecondsRemaining()}</div>)
}

export default Timer