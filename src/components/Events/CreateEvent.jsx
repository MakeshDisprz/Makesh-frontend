import React, { useState } from 'react'
import Modal from 'react-modal'
import './CreateEvent.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import DateTimePicker from 'react-datetime-picker';
import { appointmentService } from '../../apis/AppointmentAPI'

Modal.setAppElement('#root');

export default function CreateEvent({ showModal, setShowModal, day, setDay, GET_DATA, pathname, popup, setPopUp, setStatus }) {

    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const handleSave = () => {
        postData()
        // setDay(day)
        // GET_DATA[pathname]()
        // GET_DATA[pathname]()
    }

    const postData = () => {
        if (!title || !start || !end) alert("Event details cannot be empty")
        else if ((start < day) || (end < day)) alert("can't have past values")
        else {
            appointmentService.post(title, start, end)
                .then(result => {
                    console.log(result)
                    if (result == 201) setStatus("Appointment created successfully")
                    else if (result == 409) setStatus("Appointment not created!!! There is a conflict with existing appointment")
                    else setStatus("Invalid input")
                })
            GET_DATA[pathname]()
            GET_DATA[pathname]()
            setShowModal(!showModal);
            setPopUp(!popup) 
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: { zindex: 100 }
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(!showModal)}
            style={customStyles}
        >
            <div className='modal-container'>
                <div className='modal-top'>
                    <div className='modal-header'> Add new appointment </div>
                    <div className='modal-icon'>
                        <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(!showModal)} /><div className='close-icon'>close</div> </div>

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
                            <DateTimePicker
                                onChange={setStart}
                                value={start}
                                disableClock={true}
                                monthPlaceholder='mm'
                                dayPlaceholder='dd'
                                yearPlaceholder='yyyy'
                                hourPlaceholder='hh'
                                minutePlaceholder='mm'
                            />
                        </div>
                    </div>
                    <div> <p>EndTime</p>
                        <div className='picker-container'>
                            <DateTimePicker
                                onChange={setEnd}
                                value={end}
                                disableClock={true}
                                monthPlaceholder='mm'
                                dayPlaceholder='dd'
                                yearPlaceholder='yyyy'
                                hourPlaceholder='hh'
                                minutePlaceholder='mm'
                            />
                        </div>
                    </div>
                </div>
                <div className='modal-bottom'>
                    <button className='modal-button' onClick={handleSave}>Save</button>
                    <button className='modal-button' onClick={() => setShowModal(!showModal)}>Cancel</button>
                </div>
            </div>

        </Modal>
    )
}
