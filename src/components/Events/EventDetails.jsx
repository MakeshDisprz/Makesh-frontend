import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import './EventDetails.scss'
import { DayContext } from '../../components/MainBar/MainBar';
import { appointmentService } from '../../apis/AppointmentAPI';
import PopUp from './PopUp';

export default function EventDetails({ showEvent, setShowEvent, showDelete, setShowDelete, showUpdate, setShowUpdate, id, title, startTime, endTime, setData, setContent }) {

    const { day } = useContext(DayContext)
    const [disable, setDisable] = useState(true)
    const [updatedTitle, setupdatedTitle] = useState(title)
    const [updatedStart, setupdatedStart] = useState(new Date(startTime))
    const [updatedEnd, setupdatedEnd] = useState(new Date(endTime))

    const getData = () => {
        appointmentService.getByDay(day)
            .then(resultData => setData(resultData));
    }

    const handleDelete = () => {
        appointmentService.deleteAppointment(id)
            .then(result => {
                console.log(result)
                if(result == 204) setContent("Appointment deleted successfully")
                else setContent("Appointment not found")
            })

        setShowEvent(!showEvent)
        getData()
        getData()
        setShowDelete(!showDelete)
    }

    const handleUpdate = () => {
        appointmentService.put(id, updatedTitle, updatedStart, updatedEnd)
            .then(result => {
                console.log(result);
                if (result == 201) setContent("Appointment updated successfully")
                else if(result == 409) setContent(`Update failed!!! There is a conflict with existing appointment`)
                else setContent("bad request")
            }
            )

        setShowEvent(!showEvent)
        getData()
        getData()
        setShowUpdate(!showUpdate)

    }

    return (
        <>
            <Modal
                isOpen={true}
                onRequestClose={() => setShowEvent(!showEvent)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className='event-container'>
                    <div className='event-top'>
                        <div className='event-header'>Appointment Details</div>
                        <div className='event-icons'>
                            <div onClick={() => setDisable(!disable)} className='event-icon'>
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
                                className='event-input'
                                disabled={disable}
                                value={updatedTitle}
                                onChange={(e) => setupdatedTitle(e.target.value)}
                            />
                        </div>
                        <div> <p>StartTime</p>
                            <DateTimePicker onChange={setupdatedStart} value={updatedStart} disabled={disable} disableClock={true} /> </div>
                        <div> <p>EndTime</p>
                            <DateTimePicker onChange={setupdatedEnd} value={updatedEnd} disabled={disable} disableClock={true} /> </div>
                    </div>
                    <div className='event-bottom'>
                        <button className='event-button' onClick={handleUpdate}>Update</button>
                        <button className='event-button' onClick={() => setShowEvent(!showEvent)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
