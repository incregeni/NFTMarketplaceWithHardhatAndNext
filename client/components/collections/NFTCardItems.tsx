import { IItem } from '../../interfaces'
import { NFTCard } from './NFTCard'

export const NFTCardItems = (props:{items:IItem[]}) => {
  const {items} = props;

  return (
    <div className='bg-gradient grid grid-cols-3 gap-12 py-8'>
      { items.length > 0 ? ( items.map((item:IItem) => (
       <div key={item.tokenId}>
         <NFTCard {...item} />
       </div>
      )) ) :
      (
      <div>
         <h3 className='text-white text-center'>You don't have nft</h3>
      </div>
      )
      }
    </div>
  )
}
