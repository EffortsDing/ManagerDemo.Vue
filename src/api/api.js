import axios from 'axios'
import qs from 'qs'
var instance = axios.create({
  baseURL: 'http://localhost:7777',
  dataType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export const requseLogin = params => {
  return axios.post('/api/user', params)
    .then(res => res.data)
}
// 获取user列表
export const getUserListe = params => {
  return axios.post('/api/userList', params).then(res => res.data)
}
export const getUserListPage = params => { return axios.get('/user/listpage', { params: params }) }

export const addUser = params => { return axios.post('/api/addUser', {params: params}) }

export const editUser = params => { return axios.get('/api/editUser', {params: params}) }

export const delUser = params => { return axios.get('/api/delUser', {params: params}) }

export const batchRemoveUser = params => { return axios.get('/api/batchRemoveUser', {params: params}) }

export const setUsesPart = params => { return axios.get('/api/setUsesPart', {params: params}) }

// 用户管理
// 登陆
export const login = params => {
  return instance.post('/api/AccountApi/Login', qs.stringify(params))
}
// 用户列表
export const userIndex = params => {
  return instance.post('/api/AccountApi/UserIndex?' + qs.stringify(params))
  // return instance.pogst('/api/AccountApi/UserIndex?', params)
}
// 用户删除
export const userDelete = params => {
  return instance.get('/api/AccountApi/UserDelete?' + qs.stringify(params))
}

// 用户增加
export const UserCreate = params => {
  return instance.post('/api/AccountApi/UserCreate', qs.stringify(params))
}
// 用户修改
export const UserEdit = params => {
  return instance.post('/api/AccountApi/UserEdit', qs.stringify(params))
}
// 设置权限
export const UserSetRole = params => {
  return instance.post('/api/AccountApi/UserSetRole', qs.stringify(params))
}
