import Header from './Header';
import { Outlet, useNavigation } from 'react-router'
import Loader from './Loader';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { add as addUser } from '../features/users/userSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {

  const navigation = useNavigation();
  const isLoadding = navigation.state === "loading";
  
  return(
    <div className='overflow-hidden relative'> 
    {isLoadding && <Loader />}
      <Header />
      <main >
        <ToastContainer />
        <Outlet />
      </main>

      {/* <CartOverview /> */}
    </div>
  )
}