// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router'

// export default function CartOverview() {

//   const {order} = useSelector(store=> store.order);
//   const totlaPill = order.map(item => item.totalPrice)
//     .reduce((curr, next) => curr + next, 0);

//   return (
//     <div className=' fixed bottom-0 w-screen flex justify-between p-4 text-white bg-black' >
//       <div>
//         <p className='text-lg font-bold'>{order.length} items ﷼{totlaPill}</p>
//       </div>
//       <Link to="/cart">
//         <button className='text-lg cursor-pointer mr-4'>OPEN CARD &rarr; </button>
//       </Link>
//     </div>
//   )
// }
