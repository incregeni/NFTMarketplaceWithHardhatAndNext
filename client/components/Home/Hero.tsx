import { NextPage } from 'next'
import React from 'react'
import { Carousel } from './Carousel'
import { HeroTitle } from './HeroTitle'
import { NewsLetter } from './NewsLetter'
import { TopCollectibles } from './TopCollectibles'

const styles = {
  container: 'bg-gradient'
}

export const Hero:NextPage = () => {
  return (
    <div className={styles.container}>
      <HeroTitle />
      <Carousel />
      <NewsLetter />
      <TopCollectibles />
    </div>
  )
}
