
import { NextPage } from 'next'
import { NavBar } from './NavBar'

const styles = {
  headerContainer: 'py-[15px] px-[15px] bg-[#0b1426] text-white',
}

export const Header:NextPage = () => {
  return (
    <header className={styles.headerContainer}>
      <NavBar />
    </header>
  )
}
