import { useNavigate, useRouteError } from "react-router"

export default function Error() {

  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error.message)
  
  return (
    <div className="w-4/6 m-auto mt-10 flex flex-col gap-5 text-center" >
      {error.message.includes('JSON.parse') ? <div>
        <h1 className="text-4xl text-red-500" > you need to login or reigster First !!</h1>
      </div>: <>
        <h1 className="text-4xl ">Something went wrong. 💔</h1>
  
        <p
        className="text-2xl "
        >{error?.response?.data?.message || error?.data || error?.message} {error?.status}</p>
  
        <button onClick={()=> navigate(-1) }
        className='bg-zinc-700  text-zinc-50 px-4 py-1 rounded-full cursor-pointer '
        >⬅ back</button>
      </>
      }
    </div>
  )
}
