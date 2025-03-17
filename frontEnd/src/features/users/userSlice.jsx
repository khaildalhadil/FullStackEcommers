const initalState = {
  userInfo: localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo')):
  null,
}

export default function userReduce(state = initalState, action) {
  switch(action.type) {
    case 'user/add':
      // console.log(initalState, action)
      return ({...state, 
        userInfo: action.payload
      })
      
    case 'user/delet':
      return({
        ...state, userInfo: [], 
      })
      
    default:
      return state;
  }
}

export function add(allUserData, token) {
  const userData = {
    userId: allUserData._id,
    userName: allUserData.name, 
    userEmail: allUserData.email, 
    photo: allUserData.photo,
    token
  }
  localStorage.setItem('userInfo', JSON.stringify(userData));
  return {type: 'user/add', payload: userData};
}

export function delet() {
  localStorage.removeItem('userInfo');
  return {type: 'user/delet'};
}