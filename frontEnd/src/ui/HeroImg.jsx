import React from 'react'
import { useSelector } from 'react-redux'

export default function HeroImg() {

  return (
    <div className="w-[55%] relative" >
      <i           
      className="fa-solid fa-arrow-right absolute -right-10 cursor-pointer top-[47%] translate-y-[-50%]
      border p-2 rounded-full border-zinc-400"></i>
      <img 
        className="max-h-[100%] p-2 border border-zinc-200 rounded"
        src="./images/hero1.jpg" alt="img icon" />
      <i className="fa-solid fa-arrow-left absolute -left-10 cursor-pointer top-[47%] translate-y-[-50%]
      border p-2 rounded-full border-zinc-400"></i>
      <div>
        <ul>
          {/* <li className='lists_of_dote '>
            <span></span>
            <div className='flex items-center p-2 h-20 w-32 border border-zinc-400 bg-white absolute right-10 -top-5 shadow-md  ' >
              <div className='mr-2' >
                <p className='font-bold text-center' >طاوله</p>
                <p className='font-bold text-center' >﷼ 50.00 </p>
              </div>

              <div className='border-l  h-full border-zinc-300 flex items-center p-1' >
                <p className='text-2xl' >&rarr;</p>
              </div>
              
            </div>
          </li> */}
          
        </ul>
      </div>
    </div>
  )
}
