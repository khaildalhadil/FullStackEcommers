const intialState = {
  order: []
}

export default function orderReducer(state = intialState, action) {
  switch(action.type) {
    case 'order/add':
      return {...state, order: action.payload}
    default: 
      return state;
  }
}


export function add(payload) {
  return {type: 'order/add', payload}
}