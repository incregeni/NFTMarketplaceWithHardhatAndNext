import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const styles = {
  brand: 'flex items-center justify-center cursor-pointer',
  icon: 'w-[15em] h-[2em]'
}

export const Brand:NextPage = () => {
  return (
    <Link href='/'>
    <div className={styles.brand}>
     <i>
      <svg width="208" height="28" viewBox="0 0 208 28" fill="none" className={styles.icon}>
        <path d="M160.84 0.0898438H160.21V27.9598H160.84V0.0898438Z" fill="#BBBBBB"></path>
        <path d="M173 20.2H175.432V13.08L180.856 20.2H182.952V9H180.52V15.896L175.272 9H173V20.2Z" fill="#BBBBBB"></path>
        <path d="M187.145 20.2H189.609V15.864H194.953V13.624H189.609V11.24H195.673V9H187.145V20.2Z" fill="#BBBBBB"></path>
        <path d="M201.757 20.2H204.221V11.272H207.629V9H198.349V11.272H201.757V20.2Z" fill="#BBBBBB"></path>
        <path d="M12.65 0.0898438L0.580017 7.05984V20.9998L12.65 27.9698L24.72 20.9998V7.05984L12.65 0.0898438ZM23.66 20.3898L12.65 26.7498L1.64002 20.3898V7.67984L12.65 1.31984L23.66 7.67984V20.3898Z" fill="white"></path>
        <path d="M17.38 6.10986H7.89004L6.79004 10.9499H18.52L17.38 6.10986Z" fill="white"></path>
        <path d="M9.58003 17.6001V14.3901L6.77003 12.6001L3.59003 14.9601L7.92003 22.5001H9.65003L11.7 20.6001V19.6401L9.58003 17.6001Z" fill="white"></path>
        <path d="M15.73 11.6797H9.59003L10.62 14.3797L10.31 17.3997H12.65L15.01 17.3897L14.72 14.3797L15.73 11.6797Z" fill="white"></path>
        <path d="M18.54 12.5801L15.76 14.3901V17.6001L13.64 19.6401V20.6001L15.68 22.4801H17.39L21.71 14.9601L18.54 12.5801Z" fill="white"></path>
        <text textAnchor="center" fontFamily="'Noto Sans Mono'" fontSize="24" id="svg_6" y="20" x="34" strokeWidth="0" stroke="#ffffff" fill="#ffffff">poether.com</text>
      </svg>
     </i>
    </div>
    </Link>
  )
}
