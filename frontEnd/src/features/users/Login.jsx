import React, { useEffect, useRef, useState } from 'react'
import axiso from 'axios';
import {jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { add as addUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { fallMessage, successMessage } from '../../Messages';
import { getOneUser } from '../../services/apiGetItems';

export default function Login({setShowLogin}) {

  const cookies = new Cookies();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  })

  function hadnleOnBlur(type) {
    setDidEdit((didEdit)=> ({...didEdit, [type]: true}))
  }
  const inValidEmail = didEdit.email && !email.includes('@');
  const inValidPassword = didEdit.password && password.length < 8;

  async function handleAddEmail() {

    if (inValidEmail || inValidPassword) return;
    try {
      
      const res = await axiso.post('http://127.0.0.1:8000/login', 
        {email, password},
      )
      dispatch(addUser(res.data.data.user, res.data.token));
      successMessage('تسجيل الدخول بنجاح')
      setShowLogin(false);
    } catch(err) {
      console.log(`message Error: ${err.meesage} `+err);
      fallMessage('الايميل او الباسورد غلط')
    }
  }

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  // useEffect(()=> {

  //   emailInput.current.focus();
  //   function callBack(e) {
  //     if (e.key === 'Enter') {
  //       passwordInput.current.focus();
  //     }
  //   }
  //   document.addEventListener('keydown', callBack);
  // }, [])

  return (
    <>
      <div className='absolute top-30 left-[50%] -translate-x-[50%] max-w-96 bg-white text-zinc-600 z-3 
        text-lg text-center w-96 rounded p-5' >
        <i onClick={()=> setShowLogin(false)} className="fa-solid fa-x absolute top-3 hover:bg-zinc-200 cursor-pointer h-6 rounded-full right-3 text-sm text-zinc-700 px-2  py-1 "></i>
          <div>
            <h2 className='text-2xl font-bold mt-3'>تسجيل الدخول في المتجر </h2>
            <p className='text-zinc-500 text-sm mt-1'> اهلا بك في المتجر تسجيل الدخول</p>
            
          </div>
          <div className='flex h-10 gap-5 justify-center my-6  ' >
            <div className='flex cursor-pointer items-center gap-4 border border-zinc-200 rounded px-5' >
              <i className="fa-brands fa-github"></i>
              <p>GitHub</p>
            </div>
            <div className='flex cursor-pointer items-center gap-4 border border-zinc-200 rounded px-5'>
              <i className="fa-brands fa-google"></i>
              <p>Google</p>
            </div>
          </div>
          <p className='border-b border-zinc-200'>or</p>
          <div className='py-5' >
             {/* ادخل الايميل */}
            <p className='text-end mb-1 ' > الدخل الايميل</p>
            <input 
              ref={emailInput}
              value={email}
              onBlur={()=> hadnleOnBlur('email')}
              onChange={(e) => {
                setDidEdit(did => ({...did, email: false}))
                setEmail(e.target.value)
              }}
              className={`${inValidEmail ? 'border-red-400': 'border-zinc-400'} border-2 outline-0 px-2 rounded w-full ' type="email`} />
              {inValidEmail && <p className='text-red-400 text-start' >Invalid Email</p>}
          </div>
          <div className='relative mb-5' >
            <p className='text-end mb-1 ' >ادخل الرمز</p>
            <input 
              type='password'
              ref={passwordInput}
              value={password}
              onBlur={()=> hadnleOnBlur('password')}
              onChange={(e) => {
                setDidEdit(did => ({...did, password: false}))
                setPassword(e.target.value)
              }}
              className={`${inValidPassword ? 'border-red-400' : 'border-zinc-400'} border-2 outline-0 px-2  rounded w-full ' type="password`} />
              {inValidPassword && <p className='text-red-400 text-start' >الرمز غير صالح</p>}
              <button className='font-bold ml-auto underline block' >هل نسيت الباسور ؟</button>
          </div>
          <button 
            onClick={handleAddEmail}
            className='w-full bg-zinc-700 text-zinc-50 p-1 rounded font-bold cursor-pointer mb-7' >&larr; تسجيل الدخول</button>
          <p className='border-t border-zinc-300 pt-4 text-zinc-600' >
            <button 
              onClick={()=> setShowLogin(false)}
              className='text-zinc-800 font-bold cursor-pointer' > تسجيل كجديد 
            </button> 
            اذا ليس لديك حساب ؟
          </p>
        
      </div>
      <div onClick={()=> setShowLogin(false)} className='bg-zinc-900 w-screen h-screen absolute z-2 opacity-50' ></div>
    </>
  )
}

