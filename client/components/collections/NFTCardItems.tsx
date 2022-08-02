import { IItem } from '../../interfaces'
import { NFTCard } from './NFTCard'

export const NFTCardItems = (props: { items: IItem[], message?: string, isLoading?: boolean }) => {
  const {items, message = "NFT's not found", isLoading = false }  = props;

  return (
    <div className='bg-gradient grid grid-cols-3 gap-12 py-8'>
      { items.length > 0 ? ( items.map((item:IItem) => (
       <div key={item.tokenId}>
         <NFTCard {...item} />
       </div>
      )) ) :
      (
      !isLoading && <div>
        <h3 className='text-white text-center text-2xl'>{message}</h3>
      </div>
      )
      }
    </div>
  )
}
