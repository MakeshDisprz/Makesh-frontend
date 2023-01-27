/** CreateEvent component */

import React, { useState } from 'react'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { appointmentService } from '../../apis/AppointmentAPI'
import PopUp from './PopUp'
import './CreateEvent.scss'
import './EventDetails.scss'
import { format } from 'date-fns';
Modal.setAppElement('#root');

export default function CreateEvent({ data, setData, Id, Title, Start, End, showModal, setShowModal, day, popup, setPopUp, setStatus, setConflict }) {

    /** state to store the appointment title */
    const [title, setTitle] = useState(Title)

    /** state to store appointment startTime */
    const [start, setStart] = useState(format(Start, 'yyyy-MM-dd HH:mm'))

    /** state to store appointment endTime */
    const [end, setEnd] = useState(format(End, 'yyyy-MM-dd HH:mm'))

    /** state to show and hide warning modal */
    const [showWarn, setShowWarn] = useState(false)

    /** state to store warning message */
    const [warn, setWarn] = useState("")


    /** function to create appointment */
    const handleCreate = () => {
        if (!title || !start || !end) { setWarn("Appointment details cannot be empty"); setShowWarn(!showWarn) }
        else if ((start < day) || (end < day)) { setWarn("Cannot have past values"); setShowWarn(!showWarn) }
        else {
            appointmentService.post(title, new Date(start), new Date(end))
                .then(result => {
                    setStatus(result.message);
                    setConflict(result.conflictAppointments)
                })
            setShowModal(!showModal);
            setPopUp(!popup)
        }
    }

    /** function to update appointment */
    const handleUpdate = () => {
        appointmentService.put(Id, title, new Date(start), new Date(end))
            .then(result => {
                setStatus(result.message)
                setConflict(result.conflictAppointments)
            }
            )
        setShowModal(!showModal);
        setPopUp(!popup)

    }

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(!showModal)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className='modal-container'>

                    <div className='modal-top'>
                        <div className='modal-header'> {Id ? "Update appointment" : "Add appointment"} </div>
                        <div className='modal-icon'>
                            <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(!showModal)} /><div className='close-text'>close</div> </div>
                    </div>

                    <div className='modal-center'>
                        <div className='event-title'> <p>Title</p>
                            <input
                                autoFocus
                                className='create-event-input'
                                placeholder='Add title'
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div> <p>StartTime</p>
                            <div className='picker-container'>
                                <input type="datetime-local" name="" id="" value={start} onChange={(e) => setStart(e.target.value)} className='time-input' />
                            </div>
                        </div>
                        <div> <p>EndTime</p>
                            <div className='picker-container'>
                                <input type="datetime-local" name="" id="" value={end} onChange={(e) => setEnd(e.target.value)} className='time-input' />
                            </div>
                        </div>
                    </div>

                    <div className='modal-bottom'>
                        <button className='modal-button' onClick={Id ? handleUpdate : handleCreate}>{Id ? "Update" : "Save"}</button>
                        <button className='modal-button' onClick={() => setShowModal(!showModal)}>Cancel</button>
                    </div>

                </div>
            </Modal>

            {/* conditionally renders warning modal */}
            {
                showWarn &&
                <PopUp
                    popup={showWarn}
                    setPopUp={setShowWarn}
                    content={warn}
                />
            }
        </>
    )
}
