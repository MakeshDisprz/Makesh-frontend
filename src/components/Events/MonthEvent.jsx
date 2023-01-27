/** MonthEvent component */

import React, { useState } from 'react'
import AppointmentDetails from './AppointmentDetails'
import CreateEvent from './CreateEvent'
import './MonthEvent.scss'
import PopUp from './PopUp'

export default function MonthEvent({ monthevent, eventsModal, setEventsModal, flag, setData, text, setText, conflict, setConflict }) {

    /** state to show and hide event details */
    const [showMonthEvent, setShowMonthEvent] = useState(false)

    /** state to show and hide edit modal */
    const [monthEdit, setMonthEdit] = useState(false)

    const [monthDelete, setMonthDelete] = useState(false)

    const [monthUpdate, setMonthUpdate] = useState(false)

    return (

        <>
            <div
                className='monthevent-container'
                onClick={() => flag ? setEventsModal(!eventsModal) : setShowMonthEvent(!showMonthEvent)}
            >
                {monthevent.title}
            </div>

            {/* conditionally renders event details */}
            {
                showMonthEvent &&
                <AppointmentDetails
                    appointment={monthevent}
                    showEvent={showMonthEvent}
                    showEdit={monthEdit}
                    setShowEvent={setShowMonthEvent}
                    setShowEdit={setMonthEdit}
                    showDelete={monthDelete}
                    setShowDelete={setMonthDelete}
                    setContent={setText}
                />
            }

            {/* conditionally renders edit modal */}
            {
                monthEdit &&
                <CreateEvent
                    Id={monthevent.id}
                    Title={monthevent.title}
                    Start={new Date(monthevent.startTime)}
                    End={new Date(monthevent.endTime)}
                    showModal={monthEdit}
                    setShowModal={setMonthEdit}
                    popup={monthUpdate}
                    setPopUp={setMonthUpdate}
                    setStatus={setText}
                    setConflict={setConflict}
                />
            }

            {monthDelete &&
                <PopUp
                    popup={monthDelete}
                    setPopUp={setMonthDelete}
                    setData={setData}
                    content={text}
                />
            }


            {monthUpdate &&
                <PopUp
                    popup={monthUpdate}
                    setPopUp={setMonthUpdate}
                    setData={setData}
                    content={text}
                />
            }
        </>
    )
}
