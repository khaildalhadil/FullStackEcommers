import React from 'react'

export default function ItemOrder({item}) {
  // console.log(item);
  return (
  <div className="flex justify-between my-4 py-2 items-center border-b border-stone-200" >
    <p className="font-bold" >  {item.totalPrice} ﷼</p>
    <div className="flex items-center" >
      <div className="m-3 space-y-3" >
        <p className="font-bold text-stone-600" >{item.cartName}</p>
        <p className="font-bold" >{item.cartCount} : <span className="text-stone-400" >العدد</span></p>
      </div>
      <img 
        className="h-32 w-44 object-cover  rounded"
        src={item.itemImg} alt="" />
    </div>
  </div>
  )
}
