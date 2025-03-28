import { useSelector } from "react-redux"
import { Form, redirect, useActionData, useNavigation } from "react-router"
import { sendOrder, updateOrderListuser } from "../../services/apiGetItems";
import { useEffect, useRef } from "react";
import MTCart from "../cart/MTCart";
import Cookies from "universal-cookie";

export default function CreateOrder() {
  // for form 
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const {userName} = useSelector(store => store.user);

  // get error from action down if we have err
  const formErrors = useActionData();

  const {cart} = useSelector(store => store.cart);
  const {userId} = useSelector(store => store.user.userInfo);

  const totlaPill = cart.map(item => item.totalPrice)
    .reduce((curr, next) => curr + next, 0);

    const nameInput = useRef(null);
  
    useEffect(()=> {
      nameInput.current?.focus();
    }, [])

  return(
    <>
    
    {cart.length <= 0 ? <MTCart />: 
      <div className="" >
        <div className="lg:flex w-4/5 m-auto mt-10 background_div relative h-screen " >
          <div className="text-center  hidden xl:block " >
            <div className="h-[30%]">
            </div>
            <img  
            className="h-100"
            src="/images/log.svg" alt="paymanet img" />
          </div>
          <Form method="POST" id="myForm" 
          className=" mt-0 md-0 md:mt-40 md:ml-80 relative text-end border border-blue-300 h-fit p-10 rounded  lg:w-[50%] 2xl:w-[30%]" >
            <p className="text-3xl font-bold text-center text-zinc-600" >مستعد لطلب ؟ </p>
            <div className="flex flex-col text-2xl my-4"   >
              <label className="mb-1 text-lg" htmlFor="">ادخل الاسم</label>
              <input defaultValue={userName} ref={nameInput} name="name" className="bg-zinc-200 text-end text-zinc-800 w-full h-10 rounded p-2 text-lg outline-0"  type="text" required />
            </div>
            <div className="flex flex-col text-2xl my-4" >
              <label className='mb-1 text-lg' htmlFor="">ادخل الرقم</label>
              <input name="phone" className={`${formErrors?.phone &&  ' border border-red-100'} bg-zinc-200  text-end text-zinc-800 w-full h-10 rounded p-2 text-lg outline-0`}  type="number" required />
              {formErrors?.phone && <p className="text-sm text-red-700 bg-red-100 rounded p-2">{formErrors.phone}</p>}
            </div>
            <div className="flex flex-col text-2xl my-4" >
              <label className="mb-1 text-lg" htmlFor="">ادخل موقعك</label>
              <input name="location" className="bg-zinc-200 text-end text-zinc-800 w-full h-10 rounded p-2 text-lg outline-0"  type="text" required />
            </div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)}  />
            <input type="hidden" name="userId" value={JSON.stringify(userId)} />
            <input type="hidden" name="priceing" value={totlaPill} />
            <button 
              disabled={isSubmitting}
              className="bg-blue-500 cursor-pointer text-white font-bold text-lg px-6 py-2 w-full rounded mt-5" >
                {isSubmitting ? 'تم الطلب ': 'اطلب'}
                
                </button>
          </Form>
        </div>
      </div>
    }
    </>
  )
}

export async function action({request}) {

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const cart = {
    ...data, 
    subtotal: data.priceing,
    total: +data.priceing + 3,
    delivery: 3,
    cart: JSON.parse(data.cart), 
    user: JSON.parse(data.userId)
  }

  // validation err for form 
  const errors = {};
  if (cart.phone < 8) {
    errors.phone = "دخل الرقم الصحيح لانه بنتواصل معك به"
  }

  if (Object.keys(errors).length > 0) return errors;

  const userOrder = await sendOrder(cart);

  const userId = userOrder.user;
  const orderId = userOrder._id
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  await updateOrderListuser(userId, orderId, token);
  
  return redirect(`/order/${userOrder._id}`);
}