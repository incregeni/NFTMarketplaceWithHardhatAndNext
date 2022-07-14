import { NextPage } from 'next'
import Image from 'next/image';
import React, { useState } from 'react'
import subscribe from '../../assets/subscribe-v2.webp';

const styles = {
  container: 'relative w-[100%] h-[50vh] mb-[80px] bg-gradient text-white',
  subscribeContainer: 'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-[75%] items-center justify-center',
  title: 'text-[50px] leading-[65px]',
  subTitle: 'mb-[25px] text-[28px]',
  inputField: 'p-3 w-[85%] rounded-md',
  button: 'bg-gradient-to-r from-[#1199fa] to-[#11d0fa] p-3 rounded-r-md cursor-pointer w-[15%] -ml-2',
  privacy: 'my-[25px] mx-auto w-[85%]',
  accept: 'flex flex-row w-[80%] my-0 mx-auto'
}
export const NewsLetter:NextPage = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.container}>
      <Image src={subscribe} alt="subscribe" layout='fill' objectFit='cover'/>
      <div className={styles.subscribeContainer}>
          <div className='text-center'>
            <h2 className={styles.title}>Never miss a drop</h2>
            <div className={styles.subTitle}>Subscribe for the latest news, drops & collectibles</div>
          </div>
          <div className='w-[60%]'>
            <input type='email' placeholder='enail' className={styles.inputField}/>
            <button className={styles.button}>Subscribe</button>
            <div className={styles.privacy}>
              After reading the <span className='text-blue-500'>Privacy Notice</span>, you may subscribe for our newsletter to get special offers and occasional surveys delivered to your inbox. Unsubscribe at any time by clicking on the link in the email.
            </div>
            <div className={styles.accept}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer" onClick={() => setChecked( prev => !prev)}>
                <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" stroke="#E3E3E3"></rect>
                { checked && <path d="M6.5 13L10 16.5L18.5 8" stroke="black"></path>}
              </svg>
              <div className='ml-2 text-[14px]'>
                By entering my email and subscribing I confirm and agree to the above.
              </div>
            </div>
          </div>
      </div> 
    </div>
  )
}
