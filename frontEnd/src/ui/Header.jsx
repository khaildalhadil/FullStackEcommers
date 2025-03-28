import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router';
import Login from '../features/users/Login';
import Register from '../features/users/Register';
import { delet } from '../features/users/userSlice';
import Cookies from 'universal-cookie';
import { removeAllCart } from '../features/cart/CartSlice';

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDetailsAboutUserIcon, setShowDetailsAboutUserIcon] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showAdminDropDown, setShowAdminDropDown] = useState(false);

  const {cart} = useSelector(store=> store.cart);
  // const {userName, userEmail, photo} = useSelector(store=> store.user?.userInfo);
  const userInfo = useSelector(store=> store.user.userInfo);
  function handleSinOut() {
    // const cookie = new Cookies();
    // cookie.remove('e-commerce');
    dispatch(delet());
    setShowDetailsAboutUserIcon((show)=> show = false);
    dispatch(removeAllCart());
  }

  return (
    <header 
      className='w-screen border-b-zinc-200 border relative py-3' >
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {!showLogin && !showRegister}
      <div
          className='flex justify-between items-center px-10 text-zinc-600 max-w-[1400px] m-auto p-2 ' >
        <div>
          <Link to="/">
            <i className="fa-solid fa-bag-shopping text-3xl"></i>
          </Link>
        </div>
        <div className='flex items-center gap-6 text-lg '>
          <div 
            onClick={()=> navigate("/cart")}
            className='relative cursor-pointer' >
            <i className="fa-solid fa-cart-shopping border p-2  border-zinc-300 rounded"></i>
            <div className='absolute w-7 h-7 bg-blue-400 -top-3 -right-3 rounded-full flex justify-center items-center text-white font-bold' >{cart.length} </div>
          </div>
          {/* <i className="fa-solid fa-moon border p-2 w-8   border-zinc-300 rounded"></i> */}
          <div className=' relative' >
            {userInfo?.userName? 
            <div
            onClick={() => {
              setShowDetailsAboutUserIcon(!showDetailsAboutUserIcon)
              setShowAdminDropDown(false);
            }}
            className='flex items-center gap-6 text-2xl border px-5 py-1 rounded cursor-pointer border-zinc-300' >
              <p className='text-lg'> {userInfo.userName}</p>
              <img
              className='h-10 cursor-pointer rounded-full w-10' src={`http://127.0.0.1:8000/${userInfo.photo}`} alt={userInfo.userName} />
            </div>
            :
            <i onClick={() => setShowDetailsAboutUserIcon(!showDetailsAboutUserIcon)}
              className="fa-solid fa-user cursor-pointer border p-2 border-zinc-300 rounded">
            </i>
            }
            {showDetailsAboutUserIcon&&
              <div className='absolute w-48 rounded mt-2 border shadow-md border-zinc-300 box bg-white right-0' >
                <ul className='flex flex-col' >
                  {userInfo?.userName ? 
                  <>
                  <li className='flex gap-2 p-2 border-b border-zinc-200' >
                    <img className='h-10' src={`http://127.0.0.1:8000/${userInfo.photo}`} alt={userInfo.userName} />
                    <div className='flex flex-col' >
                      <p className='text-sm font-bold'  >{userInfo.userName}</p>
                      <p className='text-sm text-zinc-500' >{userInfo.userEmail}</p>
                    </div>
                  </li>
                  <li
                    onClick={()=> {
                      setShowDetailsAboutUserIcon(false);
                      navigate(`/user/profile`)
                    }}
                    className=' flex items-center gap-2 border-b border-zinc-200 p-2 pl-4 cursor-pointer hover:bg-zinc-100'>
                    <i className="fa-regular fa-user"></i>
                    <p>My Profile</p>
                  </li>
                  <li
                    onClick={()=> {
                      navigate(`/user/orders`)
                      setShowDetailsAboutUserIcon(false)
                    }}
                    className=' flex items-center gap-2 border-b border-zinc-200 p-2 pl-4 cursor-pointer hover:bg-zinc-100'>
                    <i className="fa-brands fa-dropbox"></i>
                    <p>all orders</p>
                  </li>
                  <li
                    onClick={handleSinOut}
                    className=' flex items-center gap-2 border-b border-zinc-200 p-2 pl-4 cursor-pointer hover:bg-zinc-100'>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <p>Sign Out</p>
                  </li>
                  </>
                  : 
                  <>
                    <li
                    onClick={()=> {
                      setShowDetailsAboutUserIcon(false)
                      setShowLogin(true)
                    }}
                    className='border-b border-zinc-200 p-2 cursor-pointer hover:bg-zinc-100' >Login</li>
                    <li 
                      onClick={()=> {
                        setShowDetailsAboutUserIcon(false)
                        setShowRegister(true)
                        setShowLogin(false)
                      }}
                    className='border-b border-zinc-200 p-2 cursor-pointer hover:bg-zinc-100' >Register</li>
                  </>
                  }
                  
                </ul>
              </div>
            }
          </div>
          {userInfo?.role === 'admin' &&
            <ul className=' relative' >
              <li
                onClick={() => {
                  setShowAdminDropDown(!showAdminDropDown);
                  setShowDetailsAboutUserIcon(false)
                }}
                className=' list-none  border p-2 px-5 border-zinc-300 rounded cursor-pointer ' >
                <button className=' cursor-pointer' >Admin  <i className="fa-solid fa-caret-down cursor-pointer"></i></button>
              </li>
              {showAdminDropDown && 
                <div className='absolute rounded mt-2 border shadow-md border-zinc-300 box bg-white right-0' >
                  <Link
                  onClick={()=> showAdminDropDown(false)}
                  to='/admin/items' >
                    <li
                      className='flex items-center gap-2 border-b border-zinc-200 p-2 pl-4 cursor-pointer hover:bg-zinc-100 justify-self-center '>
                      <p>المنتجات</p>
                    </li>
                  </Link>
                  <li
                    className=' flex items-center gap-2 border-b border-zinc-200 p-2 pl-4 cursor-pointer hover:bg-zinc-100 justify-self-center'>
                    <p>الطلبات</p>
                  </li>
                  <li
                    onClick={()=> navigate('/admin/view/users')}
                    className=' flex items-center gap-2 border-b border-zinc-200 p-2 pl-4 cursor-pointer hover:bg-zinc-100 justify-self-center'>
                    <p>المستخدمين</p>
                  </li>
                </div>
              }
            </ul>
          }
        </div>
      </div>
    </header>
  )
}
