import { NextPage } from 'next'
import React from 'react'
import { Carousel, HeroTitle, NewsLetter, TopCollectibles } from '../../components'
import { Footer } from '../footer/Footer'

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
      <Footer />
    </div>
  )
}
