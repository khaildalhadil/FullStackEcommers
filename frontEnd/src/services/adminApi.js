import axios from "axios";

const API_URL = 'http://127.0.0.1:8000';

const {token} = JSON.parse(localStorage.getItem('userInfo')) || "";
// if (!token) alert('Login First');

export async function getItemsForAdmin() {
  // if (!token) alert("login First");
  try {
    const res = await axios.post(`${API_URL}/api/admin/item`, {jwt: token});
    return res.data.data;
  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}
export async function addItemForAdmin(item) {

  try {

    const res = await axios.post(`${API_URL}/api/admin/createItem`, {
      
    })

    console.log(res);

  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}

export async function deletItem(id) {
  console.log(id, token);
  try {
    const res = await axios.post(`${API_URL}/api/admin/deleteItem`, {id, jwt: token})
    return res
  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}

export async function getOneItemForAdmin(id) {
  try{ 
    const res = await axios.post(`${API_URL}/admin/item/getOneItem`, {jwt: token, id})
    return res.data.getOneItem
  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}

export async function getAllUsers() {
  try {
    const res = await axios.post(`${API_URL}/admin/view/users`, {jwt: token});
    return res.data;
  } catch(err) {
    console.log(`message Error: ${err.message} \nAll Eroor: ${err}`)
  }
}