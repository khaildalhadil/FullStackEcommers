import { useNavigate, useRouteError } from "react-router"

export default function Error() {

  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error)

  return (
    <div className="w-4/6 m-auto mt-10 flex flex-col gap-5 text-center" >

      <h1 className="text-4xl ">Something went wrong. 💔</h1>

      <p
      className="text-2xl "
      >{error.data || error.message} {error.status}</p>

      <button onClick={()=> navigate(-1) }
      className='bg-zinc-700  text-zinc-50 px-4 py-1 rounded-full cursor-pointer '
      >⬅ back</button>
    </div>
  )
}
