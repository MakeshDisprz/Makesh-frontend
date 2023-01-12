import React, { useState } from 'react'
import EventDetails from './EventDetails'
import './MonthEvent.scss'

export default function MonthEvent({ monthevent }) {

    const [showMonthEvent, setShowMonthEvent] = useState(false)
    return (

        <>
            <div
                className='monthevent-container'
                onClick={() => setShowMonthEvent(!showMonthEvent)}
            >
                {monthevent.title}
            </div>
            {
                showMonthEvent &&
                <EventDetails
                    showEvent={showMonthEvent}
                    setShowEvent={setShowMonthEvent}
                    id={monthevent.id}
                    title={monthevent.title}
                    startTime={monthevent.startTime}
                    endTime={monthevent.endTime}
                />
            }
        </>
    )
}
