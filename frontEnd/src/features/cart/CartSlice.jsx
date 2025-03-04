
const initalState = {
  cart: [],
}

export default function cartReducer(state = initalState, action) {
  switch (action.type) {
    case 'cart/addCart':
      return {
        ...state, 
        cart: [...state.cart, {
          cartId: action.payload._id,
          cartName: action.payload.itemName,
          cartPrice: action.payload.itemPrice,
          cartCount: 1,
          totalPrice: action.payload.itemPrice,
          itemImg: action.payload.itemImg
        }]
      }
    case 'cart/addCount':
      return {
       ...state,
       cart: state.cart.map(
        (cart)=> cart.cartId == action.payload.id ? {
          ...cart, 
          cartCount: cart.cartCount + 1,
          totalPrice: (cart.cartCount + 1) * cart.cartPrice, 
        }: cart)
      }
    case 'cart/subCount':
      return {
        ...state,
        cart: state.cart.map((cart)=> cart.cartId == action.payload.id ? 
          {
            ...cart, 
            cartCount: cart.cartCount - 1,
            totalPrice: (cart.cartCount - 1) * cart.cartPrice, 
          }: cart)
      }

    case 'cart/removeOne':
      return {
        ...state,
        cart: state.cart.filter(
          (cart)=> cart.cartId !== action.payload.id)
      }

    case 'cart/removeAllCart':
      return {...state, cart: []}
    default:
      return state
  }
}

export function addCart(itemName, itemPrice, _id, itemImg) {
  return {type: 'cart/addCart', payload: {itemPrice, itemName, _id, itemImg}}
}

export function addOne(id) {
  return {type: 'cart/addCount', payload: {id}}
}

export function subOne(id) {
  return {type: 'cart/subCount', payload: {id}}
}

export function removeOne(id) {
  return {type: 'cart/removeOne', payload: {id}}
}

export function removeAllCart() {
  return {type: 'cart/removeAllCart'}
}