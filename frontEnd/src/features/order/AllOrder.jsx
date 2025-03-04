import React from 'react'
import { allUserOrder } from '../../services/apiGetItems.js'
import { useLoaderData } from 'react-router'
// import { allUserOrder } from '../../services/apiGetItems'

export default function AllOrder() {
  const allOrders = useLoaderData();
  return (
    <div className='max-w-[1100px] m-auto mt-40 text-2xl' >
      <h1 className='text-3xl mb-6'>Your Orders</h1>
      <ul className='flex justify-between border-t border-stone-200 py-2' >
        <li className='w-[20%] text-start' >prodcuts</li>
        <li className='w-[20%] text-start' >Order Total</li>
        <li className='w-[20%] text-start' >Tax</li>
        <li className='w-[20%] text-start' >Shipping</li>
        <li className='w-[20%] text-start' >Date</li>
      </ul>
      {allOrders.map((order, i) =>
      
        <ul className='flex justify-between  border-t border-stone-200 py-2' >
          <li className='w-[20%] text-start' >{order.cart.length} item</li>
          <li className='w-[20%] text-start' >{order.total} ﷼</li>
          <li className='w-[20%] text-start' >{order.delivery}</li>
          <li className='w-[20%] text-start' >Shipping</li>
          <li className='w-[20%] text-start' >{order.createAt.split('T')[0]}</li>
        </ul>
      )}
    </div>
  )
}

export async function loader({params}) {
  const allOrder = await allUserOrder(params.id)
  return allOrder;
}