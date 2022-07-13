import { NextPage } from 'next'
import React from 'react'
import { Brand } from './Brand'
import { NavMenu } from './NavMenu'
import { NavSearch } from './NavSearch'

const styles = {
  navContainer: 'grid grid-cols-4 items-center justify-center',
}

export const NavBar:NextPage = () => {
  return (
    <nav className={styles.navContainer}>
      <Brand />
      <NavSearch />
      <NavMenu />
  </nav>
  )
}
