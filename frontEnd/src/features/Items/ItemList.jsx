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
          src={`${itemImg}`} alt={itemData.itemName} 
        />
      </div>
      <p className='text-lg font-bold text-zinc-600 p-2' >{itemName}</p>
      <p className='text-lg font-bold text-zinc-600 p-2' >﷼ {itemPrice}</p>
    </li>
  )
}