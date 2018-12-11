import axios from 'axios'
import qs from 'qs'
var instance = axios.create({
  baseURL: 'http://localhost:7777',
  dataType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 角色table
export const RoleIndex = params => {
  return instance.post('/api/AccountApi/RoleIndex?' + qs.stringify(params))
}

// 角色table
export const RoleCreate = params => {
  return instance.post('/api/AccountApi/RoleCreate', qs.stringify(params))
}

// 角色table
export const RoleEdit = params => {
  return instance.post('/api/AccountApi/RoleEdit', qs.stringify(params))
}

export const RoleDel = params => {
  console.log(params)
  debugger
  return instance.get('/api/AccountApi/RoleDelete/' + params.ID)
}
