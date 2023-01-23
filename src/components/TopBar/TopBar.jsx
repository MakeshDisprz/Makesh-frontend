/** TopBar component */

import React, { useState, useEffect } from 'react'
import './TopBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import blu from '../../images/blu.jpg'

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
        <div className='logo-container'><img src={blu} alt='' className='logo-image' /></div>
        <div className='topbar-title'>Calendar</div>
      </div>

      <div className='topbar-right'>
        <div className='topbar-time'>
          {dateState.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
      </div>

    </div>
  )
}
