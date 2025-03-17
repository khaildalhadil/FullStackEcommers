import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import { fallMessage, successMessage } from '../../Messages';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {updateItemListComment } from '../../services/apiGetItems';


export default function AddComment({setShowReviewUi, itemId, newCommentAdded}) {

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const {userId} = useSelector(store => store.user.userInfo);

  async function handleSendReview() {
    try {

      if (comment == '') return fallMessage('!!! لازم تكتب تعليق')
      if (userId == '') return fallMessage('!!! لازم تسجل الدخول قبل')
      const newComment = await axios.post('http://127.0.0.1:8000/addComment', {
        comment,
        rating,
        item: itemId,
        user: userId
      })

      const {id} = newComment.data.newComment;
  
      await updateItemListComment(itemId, id);
      newCommentAdded(newComment);
      successMessage('تم اضافة التعليق بنجاح')
    } catch(err) {
      console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)      
    }

    setShowReviewUi(false);
  }

  return (
    <>
      <div className='border border-stone-300 rounded p-5 mb-15'>
        <div>
          <p className='font-bold' >تقييمك</p>
          <select 
            onChange={(e) => setRating(e.target.value)}
            className=' border border-stone-300 rounded  w-40 text-end text-lg my-2 outline outline-blue-400 cursor-pointer' 
            name="" >
            <option className='text-center '  value="1">1</option>
            <option className='text-center '  value="2">2</option>
            <option className='text-center '  value="3">3</option>
            <option className='text-center '  value="4">4</option>
            <option className='text-center '  value="5">5</option>
          </select>
        </div>
        <div>
          <p
          className='font-bold my-2'
          >اضف تعليقك</p>
          <textarea 
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            className='border border-stone-300 rounded w-full h-30 text-end p-2 text-lg outline outline-blue-400'
            name="" id=""></textarea>
        </div>
        <div className=' space-x-5' >
          <button
            onClick={()=> setShowReviewUi(false)}
            className='border border-stone-600 text-stone-700 px-7 mt-5 py-2 font-bold text-lg rounded tracking-wide cursor-pointer'
            >الغاء</button>
          <button 
            onClick={handleSendReview}
            className='bg-blue-600 text-stone-100 px-7 mt-5 py-2 font-bold text-lg rounded tracking-wide cursor-pointer' >ارسل</button>
        </div>
      </div>    
    </>
  )
}
