import {configureStore} from '@reduxjs/toolkit';

import cartReducer from './features/cart/CartSlice.jsx';
import userReduce from './features/users/userSlice.jsx';
import orderReducer from './features/order/orderSlice.jsx';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReduce,
    order: orderReducer,
  }
})

export default store;