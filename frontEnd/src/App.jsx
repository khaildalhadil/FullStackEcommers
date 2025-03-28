import {createBrowserRouter, RouterProvider} from 'react-router'
import Home, {loader as itemsLoader}from './ui/Home'
// import ItemComponents,  from './features/Items/ItemComponents'
import Order, {loader as orderLoader} from './features/order/Order'
import Cart from './features/cart/Cart'
import CreateOrder, { action as sendFormOrderAction } from './features/order/CreateOrder'
import AppLayout from './ui/AppLayou'
import Error from './ui/Error'
import Loader from './ui/Loader'
import ViewItemsList, {loader as getAllItemForAdmin} from './features/admin/ViewItemsList'
import AllOrder, {loader as getOneUser} from './features/order/AllOrder'
import OneItem, {loader as getOneItem} from './features/Items/OneItem'
import Profile from './features/users/Profile'
import AddItem, {action as sendNewSofaAdmin} from './features/admin/AddItem'
import UpdateItem, {loader as updateItem} from './features/admin/UpdateItem'
import AllUsers, {loader as allUserForAdmin} from './features/admin/AllUsers'


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
        path: '/admin/items',
        element: <ViewItemsList />,
        loader: getAllItemForAdmin,
        errorElement: <Error />,

      },
      {
        path: '/admin/items/addItem',
        element: <AddItem />,
        errorElement: <Error />,
        action: sendNewSofaAdmin
      },
      {
        path: '/admin/items/:id',
        element: <UpdateItem />,
        errorElement: <Error />,
        loader: updateItem,
      },
      {
        path: '/admin/view/users',
        element: <AllUsers />,
        errorElement: <Error />,
        loader: allUserForAdmin
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