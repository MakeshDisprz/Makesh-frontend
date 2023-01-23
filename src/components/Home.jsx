/** Home component */

import React, { useState } from 'react'
import MainBar from './MainBar/MainBar'
import TopBar from './TopBar/TopBar'

export default function Home() {

  /** state to show and hide LeftSideBar */
  const [showSide, setShowSide] = useState(false)

  return (
    <div>
      <TopBar showSide={showSide} setShowSide={setShowSide}/>
      <MainBar showSide={showSide} />
    </div>
  )
}
