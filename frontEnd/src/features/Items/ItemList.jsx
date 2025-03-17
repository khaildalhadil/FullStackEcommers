import { useDispatch, useSelector } from 'react-redux';
import {addCart, removeOne} from '../cart/CartSlice.jsx';
import Cookies from 'universal-cookie';
import { fallMessage, successMessage } from '../../Messages';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ItemList({itemData}) {

  const {_id, itemImg, itemName, itemPrice} = itemData;
  const [showArrows, setShowArrows] = useState(false);

  const dispatch = useDispatch();
  
  function handleDataSendToRedux() {
    
    if (!userName) {
      fallMessage("... لازم تسجل الدخول قبل ");
      return;
    }
    
    dispatch(addCart(itemName, itemPrice, _id, itemImg))
    successMessage(`تمت الاضافة ${itemName}`)
  }
  
  const {cart} = useSelector(store=> store.cart)
  const findcart = cart.find(cart => cart.cartId == _id);
  const userName = useSelector(store=> store.user.userInfo?.userName);

  function handelDeletItemFromRedux(){
    console.log("HI")
    dispatch(removeOne(_id))
  }
  
  // img 
  const [imgNum, setImgNum] = useState(0);

  function increment() {
    if (imgNum === 0) return setImgNum((imgNum) => imgNum = 2);
    setImgNum((imgNum) => imgNum-=1);
    console.log(imgNum)
  }
  function decrement() {
    if (imgNum === 2) return setImgNum((imgNum) => imgNum = 0);
    setImgNum((imgNum) => imgNum+=1);

  }

  const navigate = useNavigate();
  return (
    <li 
      
      className='border p-2 overflow-hidden border-zinc-300 rounded text-center  relative' >
      <i onClick={()=> findcart ? handelDeletItemFromRedux(): handleDataSendToRedux()}
        className={`${findcart ? 'fa-solid fa-heart text-red-600' : 'fa-regular fa-heart'}  absolute top-3 right-3 bg-zinc-100 p-2 rounded cursor-pointer z-1`}></i>
      <div className=' bg-amber-200 relative'
        onMouseLeave={()=> setShowArrows(false)}
        onMouseOver={()=> setShowArrows(true)}
      >
        <img 
          onClick={()=> navigate(`/item/${_id}`)}
          id='img_to_scal' 
          className='w-[100%] h-50 object-cover ' 
          src={`.${itemImg == '/images/imgscroll0.jpg'? `/images/imgscroll${imgNum}.jpg`: itemImg}`} alt={itemData.itemName} 
        />
        {showArrows &&
          <>
            <i
              onClick={increment}
              className="fa-solid fa-angle-left absolute left-0 top-[50%] -translate-y-[50%] bg-stone-200 py-2 rounded-full px-3 opacity-85 mx-2 shadow-md cursor-pointer hover:bg-stone-100 hover:opacity-100"></i>
            <i
              onClick={decrement}
              className="fa-solid fa-angle-right absolute right-0 top-[50%] -translate-y-[50%] bg-stone-200 py-2 rounded-full px-3 opacity-85 mx-2 shadow-md cursor-pointer hover:bg-stone-100 hover:opacity-100"></i>
          </>
        }
      <div className='flex gap-2 absolute bottom-1 left-[50%] -translate-x-[50%] h-3 w-12 items-center' >
        <div className='h-2 w-2 transition-all cursor-pointer hover:h-3 hover:w-3 rounded-full  bg-stone-100 opacity-70 hover:bg-white hover:opacity-100' ></div>
        <div className='h-2 w-2 transition-all cursor-pointer hover:h-3 hover:w-3  rounded-full bg-stone-100 opacity-70 hover:bg-white hover:opacity-100' ></div>
        <div className='h-2 w-2 transition-all cursor-pointer hover:h-3 hover:w-3 rounded-full  bg-stone-100 opacity-70 hover:bg-white hover:opacity-100' ></div>
      </div>
      </div>
      <p className='text-lg font-bold text-zinc-600 p-2' >{itemName}</p>
      <p className='text-lg font-bold text-zinc-600 p-2' >﷼ {itemPrice}</p>
    </li>
  )
}