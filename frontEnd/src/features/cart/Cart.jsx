import { useDispatch, useSelector } from "react-redux";
// import { addOne, removeOne } from "../cart/CartSlice";
import SingleCard from "./singleCard";
import { Link } from "react-router";
import MTCart from "./MTCart";

export default function Cart() {
  const {cart} = useSelector(store=> store.cart);
  const totlaPill = cart.map(item => item.totalPrice)
    .reduce((curr, next) => curr + next, 0);
  return(
    
    <div className="max-w-[1500px] h-screen m-auto px-10">
      {!cart.length <= 0 && <h1 className="text-3xl font-bold text-end mt-26" >
        اغراضك
      </h1>}
      
      <div className=" flex flex-col-reverse items-center lg:flex lg:justify-between lg:flex-row gap-5 mt-10">
      {totlaPill !== 0 && 
        <div className=" w-[100%] lg:w-[30%] h-52 rounded border border-zinc-200 p-4">
          <div className="flex justify-between border-b border-b-zinc-300 py-3 " >
            <p>{totlaPill} ريال</p>
            <p>مجموع المبلغ</p>
          </div>
          <div className="flex justify-between border-b border-b-zinc-300 py-3 " >
            <p>3 ريال</p>
            <p>مبلغ التوصيل </p>
          </div>
          <div className="flex justify-between border-b border-b-zinc-300 py-3 " >
            <p className="font-bold" >{totlaPill + 3} ريال</p>
            <p className="font-bold" >مجموع المبلغ الكلي</p>
          </div>
          <Link to='/order/new' >
            <button 
              className="bg-green-500 cursor-pointer text-white font-bold w-full rounded p-2">الدفع
            </button>
          </Link>
        </div>
      }

          
        <ul className={`${cart.length <= 0 ? 'w-screen mt-30' :'lg:w-[70%] w-[100%]'} flex flex-col gap-4 `} >
          {cart.length <= 0 ? <MTCart />: 
          cart.map((oneCart, i)=> <SingleCard item={oneCart} key={i} />)
          }
        </ul>


        
      </div>
    </div>
  )
}

