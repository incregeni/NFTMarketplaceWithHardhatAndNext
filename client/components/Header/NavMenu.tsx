import { NextPage } from 'next'
import React from 'react'

const styles = {
  menu: 'col-[4] flex items-center justify-around',
  menuItem: 'bg-gradient-to-r from-[#1199fa] to-[#11d0fa] p-2 rounded-md cursor-pointer'
}

export const NavMenu:NextPage = () => {
  return (
    <ul className={styles.menu}>
      <li><a className='cursor-pointer'>Marketplace</a></li>
      <li><a className={styles.menuItem}>Create</a></li>
    </ul>
  )
}
