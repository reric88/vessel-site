import React, { useState } from 'react'

type Props = {
  handleSetNavClicked: ()=>void,
  navButtonClicked: boolean,
}

export const NavButton = (props: Props) => {


const handleNavClick = () => {
  props.handleSetNavClicked()
}

  return (
    <>
    <div className="nav-button">
    <button onClick={handleNavClick} className="n"><i className={!props.navButtonClicked ? 'fa-solid fa-bars' : 'fa-solid fa-bars'}></i><span>{!props.navButtonClicked ? 'MENU' : 'CLOSE'}</span></button>
    </div>
    </>
  )
}
