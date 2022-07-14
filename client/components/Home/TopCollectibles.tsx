import React from 'react'
import { CollectiblesMenu } from './CollectiblesMenu'

export const TopCollectibles = () => {
  return (
    <div className='relative w-[75%] h-[100%] bg-gradient my-0 mx-auto'>
      <h2 className='text-white text-center text-[50px] mb-5'>Top Collectibles</h2>
      <CollectiblesMenu/>
    </div>
  )
}
