import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router'
import { getAllUsers } from '../../services/adminApi';
import axios from 'axios';

const {token} = JSON.parse(localStorage.getItem('userInfo')) || "";
const API_URL = 'http://127.0.0.1:8000';

export default function AllUsers() {

  const [allUser, setAllUser] = useState([]);

  const [query, setQuery] = useSearchParams();
  const page =  query.get('page') || 1;
  
  const data = useLoaderData();

  useEffect(()=> {
    function getUser() {
      setAllUser(data.allUser)
    }
    getUser();
  } , [])

  const navigate = useNavigate();

  async function handelGetData(index) {
    // const allUser = await getAllUsers();
    navigate(`/admin/view/users?page=${index}&limit=${data.limit}`);
    const getUser = await axios.post(`${API_URL}/admin/view/users?page=${index}&limit=${data.limit}`, {jwt: token})
    setAllUser(getUser.data.allUser);
  }

  return (
      <div className='max-w-[1300px] m-auto pt-10 px-3' >
        <div className='flex justify-between items-center' >
          <h1 className='text-3xl' >All Users</h1>
        </div>
        <div className='mt-10' >
          <ul className='dark:even:bg-gray-950' >
            <li className='flex justify-between font-bold border-b border-b-stone-200 pb-3 text-stone-700' >
              <p className='flex-1 text-center' >Id</p>
              <p className='flex-1 text-center' >Name</p>
              <p className='flex-1 text-center' >Email</p>
              <p className='flex-1 text-center' >Address</p>
              <p className='flex-1 text-center' >Phone</p>
              <p className='flex-1 text-center' >role</p>
              <p className='flex-1 text-center' >number</p>
            </li>
            {allUser?.map((d, i)=> {
              return (
              <li className='flex justify-between dark:even:bg-gray-100  border-b border-b-stone-200 py-3' key={i} >
                <p className='flex-1 text-center' >{d._id}</p>
                <p className='flex-1 text-center' >{d.name}</p>
                <p className='flex-1 text-center' >{d.email}</p>
                <p className='flex-1 text-center' >{d.address}</p>
                <p className='flex-1 text-center' >{d.mobile}</p>
                <p className={`flex-1 text-center`} >
                  <span className={` ${ d.role == 'user'? 'bg-blue-600': 'bg-red-600'} w-3 p-2 rounded text-white font-bold`}>{d.role}</span>
                  </p>
                <p className='flex-1 text-center' >{++i}</p>
              </li>)
            })}
          </ul>
        </div>
        
        <nav aria-label="Page navigation example " className='mt-4' >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor"  d="M5 1 1 5l4 4"/>
                </svg>
              </a>
            </li>
            {Array.apply(null, {length: data.pages}).map((i, index) => {
              return (
              <li
              key={index}
              onClick={()=> handelGetData(index)}
              className={`cursor-pointer`}
              >
                {/* {console.log('page ' + 'index ' + index)} */}
                <a 
                  // href="#" 
                  className={`flex items-center  justify-center px-3 h-8 leading-tight ${ (page - 1) == index ? 'bg-green-700 text-white dark:hover:text-white ': 'bg-white  text-gray-500 dark:text-gray-400 '}  border border-gray-300   dark:hover:bg-green-700  `}>{++index}</a>
              </li>
            )})}
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor"    d="m1 9 4-4-4-4"/>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

export async function loader() {
  const allUser = await getAllUsers();
  return allUser;
}
