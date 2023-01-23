/** Popup component */

import React, { useContext } from 'react'
import Modal from 'react-modal'
import { DayContext } from '../MainBar/MainBar';
import { appointmentService } from '../../apis/AppointmentAPI';
import Conflict from './Conflict';
import './PopUp.scss'
Modal.setAppElement('#root');


export default function PopUp({ popup, setPopUp, content, setData, conflict }) {

    /** using day variable from DayContext */
    const { day } = useContext(DayContext)

    /** function to close the modal */
    const handleOk = () => {
        setPopUp(!popup)
        setData([])
        appointmentService.getByDay(day)
            .then(result => appointmentService.mapAppointments(result))
            .then(resultData => setData(resultData));
    }

    return (
        <Modal
            isOpen={true}
            className="Modal-popup"
            overlayClassName="Overlay-popup"
        >
            <div className='popup-container'>

                <div className='popup-top'>{content}</div>

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

                <div className='popup-bottom'>
                    <button className='popup-button' onClick={handleOk}>Ok</button>
                </div>

            </div>
        </Modal>
    )
}
