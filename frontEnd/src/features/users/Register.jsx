import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { fallMessage, successMessage } from '../../Messages';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {add as addUser} from './userSlice';
import Cookies from 'universal-cookie';
export default function Register({setShowRegister}) {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();
  const cookies = new Cookies();

  const inValidEmail = email.includes('@');
  const inValidPassword = password.length > 7;

  async function handleAddNewUser() {

    if (!inValidEmail || !inValidPassword) return fallMessage('email and password are required...');
    if (password !== passwordConfirm) return fallMessage('password and password confirm should be seem !!!')

    try {
      const res = await axios.post('http://127.0.0.1:8000/signup', {name: userName, email, password, passwordConfirm})
      dispatch(addUser(res.data.data.user, res.data.token));
      successMessage('تسجيل الدخول بنجاح')
      setShowRegister(false);
    } catch(err) {
      fallMessage(err.response.data.message || 'في مشكله')
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className='absolute top-30 left-[50%] -translate-x-[50%] max-w-96 bg-white text-zinc-600 z-3 
        text-lg text-center w-96 rounded p-5' >
        <i 
          onClick={()=> setShowRegister(false)} 
          className="fa-solid fa-x absolute top-3 hover:bg-zinc-200 cursor-pointer h-6 rounded-full right-3 text-sm text-zinc-700 px-2  py-1 "></i>
          <div>
            <h2 className='text-2xl font-bold mt-3'>تسجيل حساب جديد </h2>
            <p className='text-zinc-500 text-sm mt-1'> اهلا بك في المتجر تسجيل حساب جديد</p>
          </div>

          <div className='pt-5' >
             {/* ادخل الايميل */}
            <p className='text-end mb-1 ' >اسم المستخدم</p>
            <input 
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
              className={`border-2 outline-0 px-2 rounded w-full border-zinc-400`} />

          </div>
          
          <div className='py-5' >
             {/* ادخل الايميل */}
            <p className='text-end mb-1 ' >دخل الايميل</p>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-zinc-400 border-2 outline-0 px-2 rounded w-full type="email`} />
          </div>
          <div className='relative mb-5' >
            <p className='text-end mb-1 ' >ادخل الرمز</p>
            <input 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border-zinc-400 border-2 outline-0 px-2  rounded w-full type="password`} />
          </div>
          <div className='relative mb-5' >
            <p className='text-end mb-1 ' >ادخل الرمز مره ثانية</p>
            <input 
              type='password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={`border-zinc-400 border-2 outline-0 px-2  rounded w-full type="password`} />
          </div>
          <button 
            onClick={handleAddNewUser}
            className='w-full bg-zinc-700 text-zinc-50 p-1 rounded font-bold cursor-pointer mb-7' >&larr; تسجيل حساب جديد</button>
          <p className='border-t border-zinc-300 pt-4 text-zinc-600 space-x-2' >
            <button 
              onClick={()=> setShowRegister(false)}
              className='text-zinc-800 font-bold cursor-pointer' >  تسجيل الدخول
            </button> 
            <span>اذا لديك حساب </span>
          </p>
        
      </div>
      <div onClick={()=> setShowRegister(false)} className='bg-zinc-900 w-screen h-screen absolute z-2 opacity-50' ></div>
    </>
  )
}
