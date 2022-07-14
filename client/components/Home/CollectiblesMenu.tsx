import { NextPage } from 'next'
import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export const CollectiblesMenu:NextPage = () => {
  const [dayItems, setDayItems] = useState([
    { id: 'day-item-1', title: 'Today', active: false },
    { id: 'day-item-2', title: 'Last 7 Days', active: true },
    { id: 'day-item-3', title: 'Last 30 Days', active: false },
    { id: 'day-item-4', title: 'All Time', active: false },
  ]);
  const [sortItems, setSortItems] = useState([
    { id: 'sort-item-1', title: 'Sales Volume', pos: 0 },
    { id: 'sort-item-2', title: 'Most Likes', pos: 1 },
    { id: 'sort-item-3', title: 'Most Views', pos: 2 },
  ]);

  const [currentSortItem, setCurrentSortIem] = useState(0);

  return (
    <div className='flex flex-row items-center justify-between text-white'>
      <div className='flex flex-row items-center justify-evenly bold'>
        <div>Sort By</div>
        <div className='ml-3 relative'>
          <button style={{padding: '5px 25px 5px 8px'}} className=' border-2 border-blue-500 rounded-3xl'>{sortItems[currentSortItem].title}</button>
          <ChevronDownIcon className='w-6 h-6 absolute top-2 right-1' />
        </div>
      </div>
      <div className=''>
        {dayItems.map(item =>(
          <button key={item.id}>{item.title}</button>
        ))}
      </div>
    </div>
  )
}
