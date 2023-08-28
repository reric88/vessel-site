import React from 'react'

type Props = {
    isScrolled: boolean
}

export const Header = (props: Props) => {
  return (
    <header className={!props.isScrolled ? 'header-large' : 'header-small'}>
            <h1 className={!props.isScrolled ? 'vessel-large' : 'vessel-small'}>VESSEL</h1>
    </header>
  )
}
