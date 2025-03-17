import React, { useEffect, useState } from 'react'
import { getOneUser } from '../../services/apiGetItems';
import { Form, useLoaderData } from 'react-router';
import { fallMessage, successMessage } from '../../Messages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {add as addUser} from './userSlice'

export default function Profile() {
  // const user = useLoaderData();

  const userInfo = useSelector(store=> store.user.userInfo);
  console.log(userInfo);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [file, setFile] = useState('');

  const [edit, setEdit] = useState(false);
  const {token, userId} = JSON.parse(localStorage.getItem('userInfo'));
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  // if (!token) return;
  useEffect(()=> {
    async function getUserData() {
      const user = await getOneUser(token);
      setName(user?.name)
      setEmail(user?.email)
      setAddress(user?.address || user?.orderID[0]?.location)
      setMobile(user?.mobile || user?.orderID[0]?.phone)
      setUser(user);
    }
    getUserData();
  }, [])

  async function sendData() {
    // console.log(file)
    try {
      const res = await axios.patch('http://127.0.0.1:8000/user/updateMe', {
        jwt: token,
        name,
        mobile,
        email,
        address
      })
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      setAddress(res.data.user.address);
      setMobile(res.data.user.mobile);
      successMessage("update successfully")
      dispatch(addUser(res.data.user, token));
    } catch(err) {
      console.log(err.message , err);
      fallMessage(err.response.data.errorMessage || err.message);
    }
  }

  async function uploadFile() {
    
    const formData = new FormData();
    formData.append("photo", file)
    formData.append('userId', userId)

    const res = await axios.post(
      'http://localhost:8000/user/updateMePhoto', 
        formData,
    )
    dispatch(addUser(res.data.user, token));
  }

  return (
    <div className='flex max-w-[1700px] m-auto' >
      <div className=' texce flex-1 text-center mt-20 space-y-6' >
        <div className=' border w-[50%] m-auto p-10 border-stone-300 rounded shadow-lg' >
          <div >
            <img 
              className='h-60 m-auto rounded-full w-60 object-cover'
              src={`http://127.0.0.1:8000/${userInfo?.photo}`} alt="user Pohto" />
            <p className='font-bold text-stone-600 my-1'>{userInfo?.userName}</p>
            <p className='text-stone-500 my-3' >{userInfo?.userEmail}</p>
          </div>
          <div className='flex flex-col items-center gap-1' >
            <input
              className='bg-blue-600 py-2 px-4 rounded-lg cursor-pointer text-stone-50 max-w-[180px]'
              type='file'
              name='file'
              accept='image/*'
              onChange={(e)=> setFile(e.target.files[0])}
            />
            <button
              onClick={uploadFile}
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
              Upload Image
            </button>
          </div>
        </div>
      </div>

      <div className='border border-stone-300 flex-1 p-10 mt-13 rounded shadow-lg' >
        <h1
        className='text-2xl font-bold text-stone-600 mb-5'
        >Profile Settings</h1>  

        <div className='my-2' >
        <p className=' text-stone-600 mb-1' >First Name</p>
        <input 
          disabled={!edit}
          value={name}
          // defaultValue={}
          onChange={(e) => setName(e.target.value)}
          className={`${!edit? 'cursor-not-allowed': 'cursor-pointer'}  border border-stone-300 w-full rounded px-2 py-1 outline-0 text-stone-600`}
          type="text" />
        </div>
        
        <div className='my-2' >
          <p className=' text-stone-600 mb-1' >Email</p>
          <input 
            disabled={!edit}

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${!edit? 'cursor-not-allowed': 'cursor-pointer'}  border border-stone-300 w-full rounded px-2 py-1 outline-0 text-stone-600`}
            type="email" />
        </div>

        <div className='my-2' >
          <p className=' text-stone-600 mb-1' >Mobile</p>
          <input 
            disabled={!edit}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={`${!edit? 'cursor-not-allowed': 'cursor-pointer'}  border border-stone-300 w-full rounded px-2 py-1 outline-0 text-stone-600`}
            type="number" />
        </div>

        <div className='my-2' >
          <p className=' text-stone-600 mb-1' >Address</p>
          <input 
            disabled={!edit}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`${!edit? 'cursor-not-allowed': 'cursor-pointer'}  border border-stone-300 w-full rounded px-2 py-1 outline-0 text-stone-600`}
            type="text" />
        </div>

        <div className='mt-8'>
          <button
           onClick={()=> {
            setEdit(!edit)
            edit && sendData();
          }}
           className={`${edit? 'bg-green-700': 'bg-blue-600'} py-2 px-4 rounded-lg cursor-pointer text-stone-50 text-lg`}
           >{!edit? "Do You Want To Update Profile": "save the update"}</button>
           {edit && <button 
            onClick={() => setEdit(false)}
            className='mx-3 border rounded  px-4 py-1 text-lg border-stone-600 text-stone-600 cursor-pointer' >
              cancel
            </button>}
        </div>
      </div>
    </div>
  )
}