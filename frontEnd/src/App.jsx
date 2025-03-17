import {createBrowserRouter, RouterProvider} from 'react-router'
import Home, {loader as itemsLoader}from './ui/Home'
// import ItemComponents,  from './features/Items/ItemComponents'
import Order, {loader as orderLoader} from './features/order/Order'
import Cart from './features/cart/Cart'
import CreateOrder, { action as sendFormOrderAction } from './features/order/CreateOrder'
import AppLayout from './ui/AppLayou'
import Error from './ui/Error'
import Loader from './ui/Loader'
import ViewItemsList from './features/Items/ViewItemsList'
import AllOrder, {loader as getOneUser} from './features/order/AllOrder'
import OneItem, {loader as getOneItem} from './features/Items/OneItem'
import Profile from './features/users/Profile'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: itemsLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: sendFormOrderAction
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />
      },
      {
        path: '/item/all_Itesm',
        element: <ViewItemsList />
      },
      {
        path: '/item/:itemId',
        element: <OneItem />,
        loader: getOneItem,
      },
      {
        path: '/user/orders',
        element: <AllOrder />,
        errorElement: <Error />,
        loader: getOneUser
      },
      {
        path: '/user/profile',
        element: <Profile />,
        errorElement: <Error />,
      }

    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}