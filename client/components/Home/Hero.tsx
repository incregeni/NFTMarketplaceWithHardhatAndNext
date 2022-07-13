import { NextPage } from 'next'
import React from 'react'
import { Carousel } from './Carousel'
import { HeroTitle } from './HeroTitle'

const styles = {
  container: 'bg-gradient'
}

export const Hero:NextPage = () => {
  return (
    <div className='bg-gradient'>
      <HeroTitle />
      <Carousel />
    </div>
  )
}
