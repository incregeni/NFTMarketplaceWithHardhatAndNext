import { NextPage } from 'next'
import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

const styles = {
  searchContainer: 'self-center relative w-full rounded-2xl p-1 bg-white',
  icon: 'w-6 h-6 fill-blue-500 absolute top-1',
  inputField: 'text-black ml-6 w-[90%] outline-none'
}

export const NavSearch:NextPage = () => {
  return (
      <div className={styles.searchContainer}>
       <SearchIcon className={styles.icon} />
       <input type='search' placeholder='Search collectibles and collections' className={styles.inputField}/>
      </div>
  )
}
