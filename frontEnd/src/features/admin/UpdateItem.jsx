import React from 'react'
import { Form, useLoaderData, useNavigate } from 'react-router'
import { getOneItemForAdmin } from '../../services/adminApi';
import axios from 'axios';
import { successMessage } from '../../Messages';
// import {  } from '../../services/adminApi'

export default function UpdateItem() {

  const item = useLoaderData();
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  async function handleUpdateItem(e){
    e.preventDefault();

    try {
      const form = new FormData(formData);
      const data = Object.fromEntries(form);
      const updateData = {
        ...data, 
        itemCount: +data.itemCount,
        itemPrice: +data.itemPrice,
        itemImg: data.itemImg
      }
      
      const res = await axios.patch('http://127.0.0.1:8000/admin/item/updateItem', {updateData, jwt: token, itemId: item._id})
      console.log(res);
      successMessage(`${res.data.updatedItem.itemName} updata it successfually`);
      navigate('/admin/items')
    } catch(err) {
      console.log(err, err.message)
    }

  }

  return (
    <div className='max-w-[1200px] m-auto px-3 sm:px-0'>
      <form className="max-w-lg mx-auto mt-10 " method="POST" name='formData'>
      <h1 className='text-2xl my-10' >Update Sofa</h1>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Sofa Name</label>
          <input 
            defaultValue={item.itemName}
            type="text" name='itemName' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>
        <div className="mb-5">
          <div className='grid grid-cols-2 gap-2' >
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Sofa Price</label>
              <input 
                defaultValue={item.itemPrice}
                type="number" name='itemPrice' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">count</label>
              <select 
                defaultValue={item.itemCount}
                id="countries" name='itemCount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select Color Of Sofa</label>
          <select 
            defaultValue={item.itemColor}
            id="countries" name='itemColor' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Orange">Orange</option>
          </select>
        </div>

        <div className="mb-5">
          <label  className="block mb-2 text-sm font-medium text-gray-900 ">Enter Itime URL Photo</label>
          <input type="text" name='itemImg' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>

        <div>
          <label 
            htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 ">Type DESC about Sofa</label>
          <textarea 
            defaultValue={item.itemDis}
            name='itemDis' id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write DESC about Sofa"></textarea>
        </div>

        <button 
          onClick={(e) => handleUpdateItem(e)}
          className="my-7 text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update Sofa</button>
      </form>
    </div>
  )
}

export async function loader({params}) {
  const getOneItem = await getOneItemForAdmin(params.id);
  return getOneItem;
}

