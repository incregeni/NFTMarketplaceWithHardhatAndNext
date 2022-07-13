import { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import imageOne from '../../assets/carousel-1.jpeg'
import imageTwo from '../../assets/carousel-2.jpeg'
import imageThree from '../../assets/carousel-3.jpeg'
import imageFour from '../../assets/carousel-4.jpeg'
import imageFive from '../../assets/carousel-5.jpeg'

const styles = {
  container: 'relative w-[100%]',
  gradient: 'w-[75%] my-0 mx-auto h-[55vh] bg-gradient-crousel',
  imageContainer: 'box-border block overflow-hidden w-[75%] h-[initial] bg-none opacity-1 p-0 my-0 mx-auto absolute top-0 left-0 bottom-0 right-0 rounded-[20px]'
}

export const Carousel:NextPage = () => {
  const [images] = useState([imageOne, imageTwo, imageThree, imageFour, imageFive]);
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
      const timer = setInterval(() => {
        setCurrentImage((prevCount) => (prevCount + 1) % images.length);
      }, 4000);
      return () => clearInterval(timer);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.gradient}></div>
      <div className={styles.imageContainer}>
        <Image src={images[currentImage]}  width="82%" height="100%" layout="fill" objectFit="none" alt="image"  />
      </div>
    </div>

  )
}
