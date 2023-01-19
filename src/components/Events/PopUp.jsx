import React, { useContext } from 'react'
import Modal from 'react-modal'
import './PopUp.scss'
import { DayContext } from '../MainBar/MainBar';
import { appointmentService } from '../../apis/AppointmentAPI';
Modal.setAppElement('#root');


export default function PopUp({ popup, setPopUp, content, setData }) {
    const { day } = useContext(DayContext)

    const handleOk = () => {
        setPopUp(!popup)
        appointmentService.getByDay(day)
            .then(resultData => setData(resultData));
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
        // overlay: { zindex: 100, boxshadow: '0 24px 8px 0 rgba(255, 0, 0, 0.2)' },
        overlay: { zindex: 100 },

    };

    return (
        <Modal
            isOpen={true}
            style={customStyles}
        >
            <div className='popup-container'>
                <div className='popup-top'>{content}</div>
                <div className='popup-bottom'>
                    <button className='popup-button' onClick={handleOk}>Ok</button>
                </div>
            </div>
        </Modal>
    )
}
