import HeaderHome from "./HeaderHome";
import { useLoaderData } from "react-router";
import {getAllItems} from "./../services/apiGetItems"
import ItemList from "../features/Items/ItemList";

export default function Home() {
  
  const items = useLoaderData();

  return(
    <div className="max-w-[1400px] m-auto " >
      <HeaderHome />
      <div className="px-10 my-20 " >
        <div className="" >
        <p className="text-4xl text-end text-zinc-600 border-b pb-10 border-b-zinc-300 font-bold " >🌹 كل المنتجات هنا</p>
        
        <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-10" >
          {items.map((item, i) => <ItemList key={i} itemData={item} num={i}/>)}
        </ul>
        </div>
      </div>
    </div>
  )
}

export async function loader() {
  const items = await getAllItems();
  return items;
}