import { NextPage } from 'next'
import { NFTCard } from './NFTCard'

export const NFTCardItems:NextPage = () => {

  return (
    <div className='bg-gradient grid grid-cols-3 gap-12 py-8'>
      <NFTCard />

    </div>
  )
}
