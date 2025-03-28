import React from 'react'
import { addOne, removeOne, subOne } from '../cart/CartSlice';
import { useDispatch } from 'react-redux';

export default function SingleCard({item}) {

  const {cartId, cartName, cartPrice, cartCount, totalPrice, itemImg} = item;
  const dispatch = useDispatch();

  function handelDeletOne(id) {
    if (cartCount == 1) {
      dispatch(removeOne(id))
      return;
    }
    dispatch(subOne(id))
  }

  function handelAddOneInCount(id) {
    dispatch(addOne(id))
  }
  
  function handelDeletItemFromRedux(id){
    dispatch(removeOne(id))
  }

  return (
    <li className="flex justify-between border border-zinc-200 rounded p-3 " >

      <p className="md:font-bold text-sm md:text-lg"  > {totalPrice} ريال  </p>

      <div className="flex flex-col items-center gap-3">
        <p className="font-bold  text-sm md:text-lg" >السعر</p>
        <div className="flex md:gap-5 gap-2" >
          <button 
          onClick={()=>handelDeletOne(cartId)}
          className="bg-red-500 cursor-pointer px-1 md:px-2 font-bold text-white flex rounded">-</button>
          <p className="font-bold">{cartCount}</p>
          <button
          onClick={()=>handelAddOneInCount(cartId)}
          className="bg-green-600 cursor-pointer px-1 md:px-2 font-bold text-white flex rounded">+</button>
        </div>
        <button
        onClick={()=> handelDeletItemFromRedux(cartId)}
        className="bg-red-500 cursor-pointer text-zinc-50 px-3 font-bold rounded  text-sm md:text-lg"
        >حذف</button>
      </div>

      <div className="flex text-end " >
        <div className="mr-4 " >
          <h1 className=" text-sm md:text-lg font-bold">{cartName}</h1>
          <p
          className='text-zinc-400  text-sm md:text-lg'
          >السعر للحبه {cartPrice}</p>
        </div>
        <img  
        className="h-28 rounded w-40"
        src={itemImg} alt="img" />
      </div>

    </li>
  )
}
