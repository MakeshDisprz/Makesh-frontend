/** Appointment component */

import React, { useState } from 'react'
import './Appointment.scss'
import AppointmentDetails from './AppointmentDetails'
import CreateEvent from './CreateEvent'
import PopUp from './PopUp'

export default function Appointment({ appointment, data, setData, content, setContent, conflict, setConflict }) {

    /** state to show and hide appointment details */
    const [showEvent, setShowEvent] = useState(false)

    /** state to show and hide response for delete appointment */
    const [showDelete, setShowDelete] = useState(false)

    /** state to show and hide response for update appointment */
    const [showUpdate, setShowUpdate] = useState(false)

    /** state to show and hide modal to edit appointments */
    const [showEdit, setShowEdit] = useState(false)

    /** computes the height and values to position the appointment in the correct time slot */

    var startTime = new Date(appointment.startTime)
    var endTime = new Date(appointment.endTime)
    var mins = startTime.getMinutes() / 60;
    var top = Math.floor(mins * 51);
    var minsdiff = (endTime - startTime) / 60000;
    var height = Math.floor((minsdiff / 60) * 51)

    return (
        <>
            <div onClick={() => setShowEvent(!showEvent)}
                className='appointment-container'
                style={{ position: "absolute", top: `${top}px`, height: `${height}px` }}
            >
                {appointment.title}
            </div>

            {/* conditionally renders appointment details */}
            {
                showEvent &&
                <AppointmentDetails
                    data={data}
                    setData={setData}
                    appointment={appointment}
                    showEvent={showEvent}
                    setShowEvent={setShowEvent}
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    setContent={setContent}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                />
            }

            {/* conditionally renders edit modal */}
            {
                showEdit &&
                <CreateEvent
                    Id={appointment.id}
                    Title={appointment.title}
                    Start={new Date(appointment.startTime)}
                    End={new Date(appointment.endTime)}
                    showModal={showEdit}
                    setShowModal={setShowEdit}
                    popup={showUpdate}
                    setPopUp={setShowUpdate}
                    setConflict={setConflict}
                    setStatus={setContent}
                />
            }

            {/* conditionally renders response modal for delete appointment */}
            {
                showDelete &&
                <PopUp
                    popup={showDelete}
                    setPopUp={setShowDelete}
                    content={content}
                    setData={setData}
                    GET_DATA={true}
                />
            }

            {/* conditionally renders response modal for update appointment */}
            {
                showUpdate &&
                <PopUp
                    popup={showUpdate}
                    setPopUp={setShowUpdate}
                    content={content}
                    setData={setData}
                    conflict={conflict}
                    setConflict={setConflict}
                    GET_DATA={true}
                />
            }
        </>
    )
}
