const initalState = {
  userId: '',
  userName: '',
  userEmail: '',
  photo: '',
}

export default function userReduce(state = initalState, action) {
  switch(action.type) {
    case 'user/add':
      // console.log(initalState, action)
      return ({...state, 
        userId: action.payload.id,
        userName: action.payload.name,
        userEmail: action.payload.email,
        photo: action.payload.photo,
      })
      
    case 'user/delet':
      return({
        ...state, userId: '', userName: '', userEmail: '', photo: '', 
      })
      
    default:
      return state;
  }
}

export function add(userData) {
  const {useId, name, email, photo} = userData;

  return {type: 'user/add', payload: {id: useId, name, email, photo}}
}

export function delet() {
  return {type: 'user/delet'}
}