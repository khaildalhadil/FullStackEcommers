import { useLoaderData} from "react-router"
import { getOneOrder } from "../../services/apiGetItems";
import { useDispatch, useSelector } from "react-redux";
import { add as addOrder } from "./orderSlice";
import ItemOrder from "./ItemOrder";

export default function Order() {
  const newOrder = useLoaderData();
  const {userName} = useSelector(store => store.user);

  const dispatch = useDispatch();
  dispatch(()=> addOrder(newOrder));
  
  // to days letter
  const date = new Date();
  const twoDays = date.getDate() + 2;

  return(
    <div className=" text-end max-w-7xl m-auto mt-10 bg-white shadow-md inset-shadow-2xs p-12"  >
      <h2 className="font-bold text-2xl">طلبك تم بنجاح</h2>
      <div className="mt-5" >
        <p className="font-bold text-stone-700" >{userName} ,مرحبا </p>
        <p className="text-stone-600 mt-1"> سيتم توصيل طلبيتك بعد يومين بتاريخ  {twoDays}/{date.getMonth()}/{date.getFullYear()}</p>
      </div>
      <div className="flex justify-between mt-8 border border-stone-100 p-4" >
        <div>
          <p className="text-stone-500 mb-2" > العنوان و رقم التواصل</p>
          <p className="font-bold text-stone-600" >{newOrder.phone} / {newOrder.location} </p>
        </div>
        <div>
          <p className="text-stone-500 mb-2" >رقم تتبع المنتج</p>
          <p className="font-bold text-stone-600" >{newOrder._id}</p>
        </div>
        <div>
          <p className="text-stone-500 mb-2" >طريقة الدفع</p>
          <p className="font-bold text-stone-600">عند الاستلام</p>
        </div>
        <div>
          <p className="text-stone-500 mb-2" >وقت التوصيل</p>
          <p className="font-bold text-stone-600 ">{twoDays}/{date.getMonth()}/{date.getFullYear()}</p>
        </div>
      </div>
      <div 
        className="" >
        {newOrder.cart.map((item, i)=> {
          return(<ItemOrder item={item} key={i} />)
        })}
      </div>
      
      <div className="flex flex-col gap-5 mt-4 divide-y divide-stone-200 border-b  border-stone-100">
        <div className="flex justify-between items-center pb-3" >
          <p className="font-bold " >{newOrder.subtotal} ﷼</p>
          <p className="text-stone-500" >المبلغ</p>
        </div>
        <div className="flex justify-between items-center pb-3">
          <p className="font-bold ">{newOrder.delivery} ﷼</p>
          <p  className="text-stone-500">مبلغ التوصيل</p>
        </div>
        <div className="flex justify-between items-center pb-3 mb-3">
          <p className="font-bold">{newOrder.total} ﷼</p>
          <p className="text-stone-500" >المبلغ كامل </p>
        </div>
      </div>
      <div className="my-3 space-y-3">
        <p className="text-stone-600" >سوفاء يتم ارسال لك راساله على الوتساب عند التوصيل </p>
        <p className="text-stone-600" > 🌹❤ شكرا لتسوق معنا </p>
      </div>
    </div>
  )
}

export async function loader({params}) {
  const newOrder = await getOneOrder(params.orderId);
  return newOrder;
}