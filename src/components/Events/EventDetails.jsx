/** EventDetails component */

import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import './EventDetails.scss'
import { appointmentService } from '../../apis/AppointmentAPI';

export default function EventDetails({ showEvent, setShowEvent, showDelete, setShowDelete, showUpdate, setShowUpdate, id, title, startTime, endTime, setContent, setConflict }) {


    /** states to enable and disable update */
    const [disable, setDisable] = useState(true)
    const [update, setUpdate] = useState(false)

    /**
     * states to store updated title , startTime, endTime
     */
    const [updatedTitle, setupdatedTitle] = useState(title)
    const [updatedStart, setupdatedStart] = useState(new Date(startTime))
    const [updatedEnd, setupdatedEnd] = useState(new Date(endTime))

    /** function to delete an appointment */
    const handleDelete = () => {
        appointmentService.deleteAppointment(id)
            .then(result => {
                if (result == 204) {
                    setContent("Appointment deleted successfully")
                }
                else {
                    setContent("Appointment not found")
                }
            })
        setShowEvent(!showEvent)
        setShowDelete(!showDelete)
    }

    /** function to update an appointment */
    const handleUpdate = () => {
        appointmentService.put(id, updatedTitle, new Date(updatedStart), new Date(updatedEnd))
            .then(result => {
                setContent(result.message)
                setConflict(result.conflictAppointments)
            }
            )
        setShowEvent(!showEvent)
        setShowUpdate(!showUpdate)

    }

    return (
        <>
            <Modal
                isOpen={true}
                onRequestClose={() => setShowEvent(!showEvent)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className='event-container'>
                    <div className='event-top'>
                        <div className='event-header'>Appointment Details</div>
                        <div className='event-icons'>
                            <div onClick={() => { setDisable(!disable); setUpdate(true) }} className='event-icon'>
                                <FontAwesomeIcon icon={faPencil} /> <div className='edit-icon'>Edit</div> </div>
                            <div onClick={handleDelete} className='event-icon'>
                                <FontAwesomeIcon icon={faTrash} /> <div className='delete-icon'>Delete</div> </div>
                            <div onClick={() => setShowEvent(!showEvent)} className='event-icon'>
                                <FontAwesomeIcon icon={faXmark} /> <div className='close-icon'>Close</div> </div>
                        </div>
                    </div>
                    <div className='event-center'>
                        <div> <p>Title</p>
                            <input
                                autoFocus
                                className='event-input'
                                disabled={disable}
                                value={updatedTitle}
                                onChange={(e) => setupdatedTitle(e.target.value)}
                            />
                        </div>
                        <div> <p>StartTime</p>
                            <input type="datetime-local" name="" id="" value={updatedStart} onChange={(e) => setupdatedStart(e.target.value)} className='time-input' />

                            {/* <DateTimePicker onChange={setupdatedStart} value={updatedStart} disabled={disable} disableClock={true} />  */}
                        </div>
                        <div> <p>EndTime</p>
                            <input type="datetime-local" name="" id="" value={updatedEnd} onChange={(e) => setupdatedEnd(e.target.value)} className='time-input' />
                            {/* <DateTimePicker onChange={setupdatedEnd} value={updatedEnd} disabled={disable} disableClock={true} /> */}
                        </div>
                    </div>
                    {
                        update &&
                        <div className='event-bottom'>
                            <button className='event-button' onClick={handleUpdate}>Update</button>
                            <button className='event-button' onClick={() => setShowEvent(!showEvent)}>Cancel</button>
                        </div>
                    }
                </div>
            </Modal>
        </>
    )
}
