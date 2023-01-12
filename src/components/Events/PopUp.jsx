import React, { useState } from 'react'
import Modal from 'react-modal'
import './PopUp.scss'
Modal.setAppElement('#root');


export default function PopUp({popup, setPopUp, content}) {


    return (
            <Modal
                isOpen={true}
                className="popup-modal"
                overlayClassName="popup-overlay"
            >
                <div className='popup-container'>
                    <div className='popup-top'>{content}</div>
                    <div className='popup-bottom'>
                        <button className='popup-button' onClick={() => setPopUp(!popup)}>Ok</button>
                    </div>
                </div>
            </Modal>
    )
}
