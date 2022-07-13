import { NextPage } from 'next'
import Image from 'next/image';
import React from 'react'
import subscribe from '../../assets/subscribe-v2.webp';

export const NewsLetter:NextPage = () => {
  return (
    <div className='relative w-[100vw] h-[50vh] mb-[100px] bg-gradient'>
      <Image src={subscribe} alt="subscribe" layout='fill' objectFit='cover'/>
    </div>
  )
}
