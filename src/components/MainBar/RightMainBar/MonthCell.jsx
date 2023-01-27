/** MonthCell component */

import React from 'react'
import './MonthCell.scss'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import MonthEvent from '../../Events/MonthEvent'
import { useState } from 'react'
import Conflict from '../../Events/Conflict';

export default function MonthCell({ className, isCurrentDate, isActive, content, monthEvents, setData, text, setText, conflict, setConflict }) {

    /** state to show and hide events */
    const [eventsModal, setEventsModal] = useState(false);

    return (
        <div
            className={`${className} month-cell`}
            id={`${isActive && !isCurrentDate ? 'active' : 'inactive'}`}
        >
            <div className={`${isCurrentDate ? 'today-month' : 'nottoday-month'}`}>{content}</div>
            <div className='eventname-container'>
                
                {
                    monthEvents && monthEvents.length >0 &&
                    <>
                        <MonthEvent monthevent={{ title: ` ${monthEvents.length} appointments` }}
                            eventsModal={eventsModal}
                            setEventsModal={setEventsModal}
                            setData={setData}
                            flag={true}
                            text={text}
                            setText={setText}
                        />
                    </>
                }
            </div>

            {/* conditionally renders modal that lists appointments */}
            {eventsModal &&
                <Modal
                    isOpen={true}
                    onRequestClose={() => setEventsModal(!eventsModal)}
                    className='events-modal'
                    overlayClassName='events-overlay'
                >
                    <div className='events-container'>
                        <div onClick={() => setEventsModal(!eventsModal)} className='close-container'> <FontAwesomeIcon icon={faXmark} /></div>
                        <div className='month-events'>
                            {
                                monthEvents &&
                                monthEvents.map(
                                    (item) =>
                                        <Conflict
                                            title={item.title}
                                            startTime={item.startTime}
                                            endTime={item.endTime}
                                        />
                                )
                            }
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}
