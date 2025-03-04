import React from 'react'
import { Link } from 'react-router'

export default function MTCart() {
  return (
    <div className="rounded h-40 justify-items-end mt-30" >
      <div className="w-full text-center">
      <i  className="fa-solid fa-cart-shopping text-zinc-400 text-6xl"></i>
      <p className="font-bold text-3xl my-3" >السله فاضية</p>
      <p className="text-zinc-600 ">ضيف اشياء في السله</p>
      <Link to="/">
        <button className="px-5 bg-blue-500 text-white py-2 rounded-2xl my-5 cursor-pointer font-bold">رجوع لتسوق</button>
      </Link>
      </div>
    </div>
  )
}
