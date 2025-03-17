import React from 'react'

export default function OneOrder({order}) {
  const {cart, _id, location, name, phone, total, createAt } = order;
  return (
    <div className=' border border-stone-300 rounded p-4' >
    <div className='' >
      <div className='flex justify-evenly text-center mb-4 border-b border-stone-200 pb-4' > 
        <div className='border-r pr-27 border-stone-300' >
          <p className='font-bold text-stone-500 text-lg ' >رقم الطلب</p>
          <p className='font-bold text-stone-700 ' >{_id}</p>
        </div>
        <div className='border-r pr-27 border-stone-300' >
          <p className='font-bold text-stone-500 text-lg '>تاريخ الطلب</p>
          <p className='font-bold text-stone-700 '>{createAt.split('T')[0]}</p>
        </div>
        <div className='border-r pr-27 border-stone-300' >
          <p className='font-bold text-stone-500 text-lg '>تاريخ التوصيل</p>
          <p className='font-bold text-stone-700 '>{createAt.split('T')[0]}</p>
        </div>
        <div >
          <p className='font-bold text-stone-500 text-lg '>الموقع</p>
          <p className='font-bold text-stone-700 '>{location}</p>
        </div>
      </div>
    </div>
    {/* item loop */}

    <div className='flex flex-col gap-5' >
      {cart.map((item, i) => {
        const {cartCount, cartPrice, cartName, totalPrice, itemImg } = item;
        return (
        <div key={i} className='flex justify-between' >
          <p className='font-bold'>ريال {totalPrice}</p>
          <div className='flex gap-6' >
            <div className=' space-y-4' >
              <p className='font-bold text-end' >اسم المنتج :  {cartName}</p>
              <p className='text-end' >السعر للحبه : {cartPrice}</p>
              <p className='text-end'>العدد :  {cartCount}</p>
            </div>
            <img  
            className='h-40 w-40  object-cover rounded' 
            src={`${itemImg[0]}`} alt="img" />
          </div>
        </div>)
      })}

      {/* not in loop */}
      <div className='flex gap-2 justify-end border-t border-stone-300 pt-3' >
        <p className='font-bold text-stone-800' >ريال {total} :</p>
        <p className=''> الحساب كامل</p>
      </div>
    </div>
  </div>
        
  )
}
