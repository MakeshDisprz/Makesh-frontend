/** AppointmentDetails component */

import React from 'react'
import Modal from 'react-modal'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { appointmentService } from '../../apis/AppointmentAPI'
import './AppointmentDetails.scss'

export default function AppointmentDetails({ data, setData, appointment, showEvent, setShowEvent, showDelete, setShowDelete, setContent, showEdit, setShowEdit }) {

    /** function to delete an appointment */
    const handleDelete = () => {
        appointmentService.deleteAppointment(appointment.id)
            .then(result => {
                if (result === 204) {
                    setContent("Appointment deleted successfully")
                }
                else {
                    setContent("Appointment not found")
                }
            })
        setShowEvent(!showEvent)
        setShowDelete(!showDelete)
    }

    return (
        <Modal
            isOpen={showEvent}
            onRequestClose={() => setShowEvent(!showEvent)}
            className="Modal"
            overlayClassName="Overlay"
        >
            <div className='details-container'>

                <div className='details-top'>

                    <div className='details-header'>Appointment Details</div>

                    <div className='details-icons'>
                        <div className='details-icon'>
                            <FontAwesomeIcon icon={faPencil} onClick={() => { setShowEvent(!showEvent); setShowEdit(!showEdit) }} />
                            <div className='edit-icon'>Edit</div>
                        </div>
                        <div className='details-icon' onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                            <div className='delete-icon'>Delete</div>
                        </div>
                        <div className='details-icon' onClick={() => setShowEvent(!showEvent)}>
                            <FontAwesomeIcon icon={faXmark} />
                            <div className='close-icon'>Close</div>
                        </div>
                    </div>

                </div>

                <div className='details-bottom'>
                    <div className='appointment-field'>
                        <div className='field-text'>Title:</div>
                        <div>{appointment.title}</div>
                    </div>
                    <div className='appointment-field'>
                        <div className='field-text'>Date:</div>
                        <div>{format(new Date(appointment.startTime), 'do MMM yyyy')}</div>
                    </div>
                    <div className='appointment-field'>
                        <div className='field-text'>Time:</div>
                        <div>{format(new Date(appointment.startTime), 'hh:mm a')} - {format(new Date(appointment.endTime), 'hh:mm a')}</div>
                    </div>
                </div>

            </div>
        </Modal>
    )
}
