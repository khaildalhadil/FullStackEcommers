import React, { useEffect, useState } from 'react'
import { deletItem, getItemsForAdmin } from '../../services/adminApi'
import { useLoaderData, useNavigate } from 'react-router'
import { fallMessage, successMessage } from '../../Messages';

export default function ViewItemsList() {

  const [allItems, setAllItems] = useState([]);
  const allItemFromLoader = useLoaderData();

  useEffect(() => {
    setAllItems(allItemFromLoader)
  }, [allItemFromLoader])

  const navigate = useNavigate();

  async function handleDeleteItem(id){
    const res = await deletItem(id);
    if(res.status) {
      successMessage("ted successfully");
      // allItems = allItems.fiItem delelter(item => item.id !== id);
      const test = allItems.filter(item => item.id !== id);
      setAllItems(test);
    } else {
      fallMessage("somthing went wrong");
    }
  }

  return (
    <div className='max-w-[1300px] m-auto pt-10  px-3' >
      <div className='flex justify-between items-center' >
        <h1 className='text-3xl' >Products</h1>
        <button 
          onClick={() => navigate('/admin/items/addItem')}
          className='flex items-center gap-2 cursor-pointer bg-green-700 text-white py-2 px-3 rounded text-lg tracking-wide' >
          <i className="fa-solid fa-plus"></i>
          <span>create Products</span>
        </button>
      </div>
      <div className='mt-10' >
        <ul className='dark:even:bg-gray-950' >
          <li className='flex justify-between font-bold border-b border-b-stone-200 pb-3 text-stone-700' >
            <p className='flex-3 text-center' >Id</p>
            <p className='flex-3 text-center' >Name</p>
            <p className='flex-3 text-center' >Price</p>
            <p className='flex-3 text-center' >Color</p>
            <p className='flex-3 text-center' >Espace</p>
            <p className='flex-1' >number</p>
            <p className='flex-1 text-center' ></p>
          </li>
          {allItems?.map((item, i)=> {
            // console.log(item);
            return (
            <li className='flex justify-between dark:even:bg-gray-100  border-b border-b-stone-200 py-3' key={i} >
              <p className='flex-3 text-center' >{item.id}</p>
              <p className='flex-3 text-center' >{item.itemName}</p>
              <p className='flex-3 text-center' >{item.itemPrice}</p>
              <p className='flex-3 text-center' >{item.itemColor}</p>
              <p className='flex-3 text-center' >{item.itemCount}</p>
              <p className='flex-1 text-center' >{++i}</p>
              <div className='flex items-center gap-3 flex-1 justify-center' >
                <i
                  onClick={()=> navigate(`/admin/items/${item.id}`)} 
                  className="fa-solid cursor-pointer fa-pen-to-square  bg-green-700 text-white p-1 rounded text-sm"></i>
                <i 
                  onClick={() => handleDeleteItem(item.id)}
                  className="fa-solid cursor-pointer fa-trash bg-red-600 text-white p-1 rounded text-sm"></i>
              </div>
            </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export async function loader() {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const getAllItem = await getItemsForAdmin(token)
  return getAllItem;
}