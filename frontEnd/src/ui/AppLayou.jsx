import Header from './Header';
import { Outlet, useNavigation } from 'react-router'
import Loader from './Loader';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { add as addUser } from '../features/users/userSlice';

export default function AppLayout() {

  const dispatch = useDispatch();

  const cookies = new Cookies();
  const checkIfLogin = cookies.get('e-commerce')
  if (checkIfLogin) {
    const decoded = jwtDecode(checkIfLogin);
    dispatch(addUser(decoded));
  }

  const navigation = useNavigation();
  const isLoadding = navigation.state === "loading";
  
  return(
    <div className='overflow-hidden relative'> 
    {isLoadding && <Loader />}
      <Header />

      <main >
        <Outlet />
      </main>

      {/* <CartOverview /> */}
    </div>
  )
}