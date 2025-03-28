import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router';
import { getOneItem, updateItemListComment } from '../../services/apiGetItems';
import AddComment from './AddComment';
import Comment from './Comment';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { addCart, removeOne } from '../cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fallMessage, successMessage } from '../../Messages';

export default function OneItem() {

  const [showReviewUi, setShowReviewUi] = useState(false);
  const [allComments, setAllComment] = useState([]);
  const navigate = useNavigate();
  
  const {
    itemName,
    itemDis,
    itemImg,
    itemPrice,
    itemsStars,
    id,
    comments
    } = useLoaderData();
  
  useEffect(()=> {

    setAllComment(()=> [...comments]);

  }, []);

  function newCommentAdded(newComment) {
    console.log(newComment);
    setAllComment((oldComment) => [...oldComment, newComment.data.newComment]);
  } 

  const dispatch = useDispatch();

  const {cart} = useSelector(store=> store.cart);
  const findcart = cart.find(cart => cart.cartId == id);

  function handleDataSendToRedux() {
    try {
      const {token} = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!token) {
        fallMessage("... لازم تسجل الدخول قبل ");
        return;
      }
      
      dispatch(addCart(itemName, itemPrice, id, itemImg))
      successMessage(`تمت الاضافة ${itemName}`)
    } catch(err) {
      fallMessage("سجل الدخول اولا");
      console.log(err.message)
    }
  }

  function handelDeletItemFromRedux(){
    
    dispatch(removeOne(id))
  }

  const userId = useSelector(store => store.user.userInfo?.userId);
  function addCommentFun() {
    if (!userId) return fallMessage("سجل دخول اول");
    setShowReviewUi(true)
  }

  return (
    <div className='flex flex-col max-w-[1300px] m-auto  px-2'>
      <div className='flex flex-col-reverse items-center lg:items-start mt-5  lg:flex lg:flex-row lg:gap-10 mb-6' >
        <div className='flex-1 text-end flex flex-row-reverse justify-between w-full px-15 lg:px-0 lg:flex lg:flex-col' >
          <div className='' >
            <div className='flex justify items-end space-x-3.5 gap-2 justify-self-end mb-2' >
              <i className="fa-regular fa-heart  text-lg border border-stone-400 p-1 rounded cursor-pointer"></i>
              <h1 className='font-bold text-3xl ml-auto text-stone-800' >{itemName}</h1>
            </div>
            <div className='flex items-center gap-2 justify-self-end mb-5 mt-3' >
              <i className="fa-solid fa-star"></i>
              <p>{comments.length/ 2 } ( {comments.length} ) تعليقات</p>
            </div>
          <p
          className='rounded  bg-stone-200 w-fit ml-auto my-3 py-1 px-3 '
          >{itemPrice} ﷼</p>
          </div>
          <div>
            <p 
              className='tracking-wide text-base/7 text-stone-700'
            >{itemDis}</p>
            <button
              onClick={()=> findcart ? handelDeletItemFromRedux(): handleDataSendToRedux()}
              className='bg-green-600 text-stone-100 px-3 py-2 mt-7 font-bold text-lg rounded tracking-wide cursor-pointer'
            >
              {findcart ? 'تم اضافه': 'شراء المنتج'}
              </button>
          </div>
        </div>
        <div className='lg:w-[50%] flex-1' >
          <img 
            className='h-[630px] max-w-[100%] object-cover rounded-2xl'
            src={itemImg} 
            alt={itemName} 
          />
        </div>
      </div>
      <div className='text-end mt-10' >
        <h1 className='font-bold text-3xl text-stone-700' >كل التعليقات</h1>
        <div className='flex flex-wrap flex-row-reverse my-10 gap-6' > 

        {allComments.map((comment, i) => <Comment comment={comment} key={i} />)}

        </div>
        <div className='mb-10 mt-10' >
          <button
            onClick={()=> addCommentFun()}
            className='bg-blue-600 text-stone-100 px-3 py-2 font-bold text-lg rounded tracking-wide cursor-pointer'
          >اضافه تعليق</button>
        </div>
        {showReviewUi && <AddComment 
          setShowReviewUi={setShowReviewUi} 
          itemId={id} 
          newCommentAdded={newCommentAdded}
          />}
      </div>
    </div>
  )
}

export async function loader({params}){
  const item = await getOneItem(params.itemId);
  return item;
}
