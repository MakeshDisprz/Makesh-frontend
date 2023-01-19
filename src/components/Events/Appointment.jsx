import React, { useState } from 'react'
import './Appointment.scss'
import EventDetails from './EventDetails'
import PopUp from './PopUp'

export default function Appointment({ appointment, setData, content, setContent }) {

    const [showEvent, setShowEvent] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    // const [content, setContent] = useState("")

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
            {
                showEvent &&
                <EventDetails
                    showEvent={showEvent}
                    setShowEvent={setShowEvent}
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    showUpdate={showUpdate}
                    setShowUpdate={setShowUpdate}
                    id={appointment.id}
                    title={appointment.title}
                    startTime={appointment.startTime}
                    endTime={appointment.endTime}
                    setData={setData}
                    setContent={setContent}
                />
            }

            {
                showDelete &&
                <PopUp popup={showDelete} setPopUp={setShowDelete} content={content} setData={setData}/>
            }
            {
                showUpdate &&
                <PopUp popup={showUpdate} setPopUp={setShowUpdate} content={content} setData={setData}/>
            }
        </>
    )
}
