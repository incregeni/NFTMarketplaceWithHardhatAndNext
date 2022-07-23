import { FC } from "react"
import Image from "next/image"
import { IItem } from "../../interfaces"

export const NFTCard:FC<IItem> = (item) => {
  const {image, price, name} = item
  return (
    <div className='bg-white h-[600px] w-[350px] flex flex-col rounded-2xl'>
      <div className='w-[350px] h-[350px]'>
        <Image
          unoptimized
          src={image}
          alt="Picture of the author"
          className="rounded-t-2xl mt-4"
          layout="responsive"
          width={350}
          height={350}
        />
      </div>
      <div className='text-[#444] h-[250px] w-[350px]'>
        <h4>{name}</h4>
        <h4>{price} eth</h4>
      </div>
    </div>
  )
}
