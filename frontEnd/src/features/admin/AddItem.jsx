import React, { useState } from 'react'
import { Form, redirect, useNavigate } from 'react-router'
import { addItemForAdmin } from '../../services/adminApi';
import { successMessage } from '../../Messages';
import axios from 'axios';

const {token} = JSON.parse(localStorage.getItem('userInfo'));
const API_URL = 'http://127.0.0.1:8000';

export default function AddItem() {

  return (
    <div className='max-w-[1200px] m-auto px-3 sm:px-0'>
      <Form className="max-w-lg mx-auto mt-10 " method='POST'>
        <h1 className='text-2xl my-10' >Create New Sofa</h1>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Sofa Name</label>
          <input type="text" name='sofaName' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>
        <div className="mb-5">
          <div className='grid grid-cols-2 gap-2' >
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Sofa Price</label>
              <input type="number" name='price' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">count</label>
              <select id="countries" name='selectInputCount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          <select id="countries" name='selectInputColor' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 ">Type DESC about Sofa</label>
          <textarea name='desc' id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write DESC about Sofa"></textarea>
        </div>
        <button 
          // onClick={handleClike}
          type='submit'
          className="my-7 text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create new Sofa</button>
      </Form>
    </div>

  )
}

export async function action({request}) {
  try {

    const dataForm = await request.formData();
    let data = Object.fromEntries(dataForm);
    

    data = {
      itemName: data.sofaName,
      jwt: token,
      itemPrice: data.price, 
      itemDis: data.desc,
      itemColor: data.selectInputColor ,
      itemCount: data.selectInputCount,
      itemImg: data.itemImg
    }

    const res = await axios.post(
      `${API_URL}/api/admin/createItem`, data)
    
    // console.log(res);
      
    successMessage('item added success');
    return redirect(`/admin/items`);

  } catch(err) {
    console.log(err, err.message);
  }
}