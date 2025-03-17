import React, { useEffect, useState } from 'react'
import { getOneUser } from '../../services/apiGetItems.js'
import { useLoaderData } from 'react-router'
import OneOrder from './OneOrder.jsx';
// import { allUserOrder } from '../../services/apiGetItems'

export default function AllOrder() {

  const allOrders = useLoaderData();
  console.log(allOrders);
  
  return (
    <div className='max-w-[1300px] m-auto' >
      {/* header */}

      <h1 className='mb-5 text-end text-4xl mt-10' >🛒 طلباتك</h1>
      <div className='flex flex-col gap-5 mb-10' >
        {allOrders.map((order, i)=> {
          return <OneOrder key={i} order={order} />
        })}
      </div>
    </div>
  )
}

export async function loader() {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const allOrder = await getOneUser(token);
  return allOrder.orderID;
}