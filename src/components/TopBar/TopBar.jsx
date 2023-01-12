import React from 'react'
import './TopBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import calendarLogo from '../../images/calendarLogo.jpg'

export default function 
TopBar({showSide, setShowSide}) {

  return (
    <div className='topbar-container'>
      <div className='topbar-left'>
        <div className='topbar-icon' onClick={() => setShowSide(!showSide)}><FontAwesomeIcon icon={faBars}/></div>
        {/* <div className='logo-container'><img src={calendarLogo} alt=''className='logo-image'/></div> */}
        <div className='topbar-title'>Calendar</div>
      </div>
      {/* <div className='topbar-right'>Theme</div> */}
    </div>
  )
}
