/** Popup component */

import React, { useContext } from 'react'
import Modal from 'react-modal'
import { DayContext } from '../MainBar/MainBar';
import { appointmentService } from '../../apis/AppointmentAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Conflict from './Conflict';
import './PopUp.scss'


export default function PopUp({ popup, setPopUp, content, setData, conflict, GET_DATA }) {

    /** using day variable from DayContext */
    const { day } = useContext(DayContext)

    /** function to close the modal */
    const handleOk = () => {
        
        setPopUp(!popup)
        GET_DATA ?
        appointmentService.getByDay(day)
            .then(resultData => setData(resultData))
        :
        appointmentService.getByMonth(day)
            .then(resultData => setData(resultData));
    }

    return (
        <Modal
            isOpen={popup}
            onRequestClose={handleOk}
            className="Modal-popup"
            overlayClassName="Overlay-popup"
        >
            <div className='popup-container'>

                <div className='popup-top'>{content}</div>
                <div onClick={handleOk} className='close-container'> <FontAwesomeIcon icon={faXmark} /></div>

                {
                    (conflict != null) && (conflict.length > 0) &&
                    <div className='popup-center'>
                        {
                            conflict.map(
                                (item) =>
                                    <Conflict title={item.title} startTime={item.startTime} endTime={item.endTime} />
                            )
                        }
                    </div>
                }

            </div>
        </Modal>
    )
}
