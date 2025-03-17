import axios from "axios";

const API_URL = 'http://127.0.0.1:8000';

// update user orderlist

export async function updateOrderListuser(id, orderId, token) {
  try {
    // console.log(id, orderId, token);
    const res = await axios.patch(`${API_URL}/user/addOrderToUser`, {orderId, jwt: token, userId: id})
    console.log(res.data);
    if (!res.status == 200) throw Error("Failed to get the data from databasd");
    // const {message} = await res.json();
  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}

export async function updateItemListComment(itemId, commentId) {
  try {
    const res = await axios.patch(`${API_URL}/item/${itemId}`, {commentId})
    if (!res.status == 200) throw Error("Failed to get the data from databasd");
    // return res.data.user.commentId;
    // const {message} = await res.json();
  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}

export async function getAllItems() {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) throw Error("Failed to get the data from databasd");
  
  const {data} = await res.json();
  return data;
}

export async function getOneItem(id) {
  const res = await fetch(`${API_URL}/item/${id}`)
  if (!res.ok) throw Error("Failed to get the data from databasd");
  // console.log(res);
  const {item} = await res.json();
  return item;
}

// get one order from database
export async function getOneOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`)
  if (!res.ok) throw Error("Failed to get the data from databasd");
  const {order} = await res.json();
  return order;
}

// add order to database
export async function sendOrder(userWithitems) {
  const req = await axios.post(`${API_URL}/order/new`, {userWithitems})
  if (req.statusText !== 'OK') throw Error("Failed to send data to DataBase");
  return req.data.userOrder;
}

export async function getOneUser(token) {
  const res = await axios.post(`${API_URL}/user/portfolio`, {jwt: token})
  const userData = res.data.user;
  return userData;
}