/** TopBar component */

import React, { useState, useEffect } from 'react'
import './TopBar.scss'
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

export default function TopBar({ showSide, setShowSide }) {

  /** state to store current time */
  const [dateState, setDateState] = useState(new Date());

  /** useEffect to set current time */
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  
  return (
    <div className='topbar-container'>

      <div className='topbar-left'>
        <div className='topbar-icon' onClick={() => setShowSide(!showSide)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className='logo-container'><FontAwesomeIcon icon={faCalendarDays} className='logo-image' /></div>
        <div className='topbar-title'>Calendar</div>
      </div>

      <div className='topbar-right'>
        <div className=' today-button topbar-time'>
          <div>{format(dateState, 'EEE')}</div>
          <div>{format(dateState, 'hh:mm:a')}</div>
        </div>
      </div>

    </div>
  )
}
