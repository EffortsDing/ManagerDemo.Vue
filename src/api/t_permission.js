import axios from 'axios'
import qs from 'qs'
var instance = axios.create({
  baseURL: 'http://localhost:7777',
  dataType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// table
export const RightIndex = params => {
  return instance.post('/api/AccountApi/RightIndex?' + qs.stringify(params))
}

// 获取权限类型
export const rightType = params => {
  return instance.get('/api/AccountApi/GetRightType')
}

// 获取权限类型的所属权限
export const rightParent = params => {
  return instance.get('/api/AccountApi/GetRightList/' + params)
}

// 权限添加
export const rightCreate = params => {
  return instance.post('/api/AccountApi/RightCreate', qs.stringify(params))
}
