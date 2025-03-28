import React from 'react'

export default function Comment({comment}) {
  console.log(comment);
  return (
    <div 
    key={comment._id}
    id={comment._id}
    className='w-[100%] space-y-4 p-4 rounded border border-stone-300 basis-sm' >
    <div className='flex justify-between gap-3 ml-auto'>
      <p>{comment.createAt.split('T')[0]}</p>
      <div className='flex gap-3' >

        <div className='flex flex-col text-end ' >
          <p className='mb-1' >{comment.user.name}</p>
          <div className='flex flex-row-reverse' >
            {Array.from({length: 5}, (_, index)=> 
              index >= comment.rating ? 
                <i key={index} className="fa-regular fa-star "></i> : 
                <i key={index} className="fa-solid fa-star text-blue-500 "></i>
              )
            }
          </div>
        </div>
        <img 
          className='h-13'
          src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="user img" 
        />
      </div>
    </div>
    <p>{comment.comment}</p>
  </div>
  )
}
