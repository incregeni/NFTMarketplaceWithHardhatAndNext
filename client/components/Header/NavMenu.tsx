import { NextPage } from 'next'
import React, { useContext } from 'react'
import { MarketContext } from '../../context'
import { shortenAddress } from '../../utils'

const styles = {
  menu: 'col-[4] flex items-center justify-around',
  menuItem: 'bg-gradient-to-r from-[#1199fa] to-[#11d0fa] p-2 rounded-md cursor-pointer'
}

export const NavMenu:NextPage = () => {
  const { signer, isConnected, connectWallet } = useContext(MarketContext);
  return (
    <ul className={styles.menu}>
      <li><a className='cursor-pointer'>Marketplace</a></li>
      <li><a className={styles.menuItem}>Create</a></li>
      <li><a className='cursor-pointer'>|</a></li>
      <li>
        { !isConnected ? <a className={styles.menuItem} onClick={connectWallet}>Connect</a> :
          <a>{shortenAddress(signer!)}</a>
        }
      </li>
    </ul>
  )
}
