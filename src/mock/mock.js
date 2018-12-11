import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  LoginUsers,
  Users
} from './user'
import {
  userList
} from './data/users'

let _userList = userList

export default {
  init () {
    let mock = new MockAdapter(axios)

    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })
    mock.onPost('/api/userList').reply(config => {
      debugger
      let {
        page,
        USER_NAME
      } = JSON.parse(config.data)
      // 判断模拟的假数据是否有和传过来条件匹配的数据
      let mockUsers = _userList.filter(user => {
        if (USER_NAME && user.USER_NAME.indexOf(USER_NAME) === -1) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            user: mockUsers
          }])
        }, 1000)
      })
    })

    // 获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {
        page,
        USER_NAME
      } = config.params
      let mockUsers = _userList.filter(user => {
        if (USER_NAME && user.USER_NAME.indexOf(USER_NAME) === -1) return false
        return true
      })
      let total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }])
        }, 1000)
      })
    })
    mock.onPost('/api/user').reply(config => {
      // 解析axios传过来的数据
      let {
        username,
        password
      } = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        // 先创建一个用户为空对象
        let user = null
        setTimeout(() => {
          // 判断模拟的假数据中是否有和传过来的数据匹配的
          let hasUser = LoginUsers.some(person => {
            // 如果存在这样的数据
            if (person.username === username && person.password === password) {
              user = JSON.parse(JSON.stringify(person))
              user.password = undefined
              return true
            } else {
              // 如果没有这个person
              return false
            }
          })
          // 如果有那么一个人
          if (hasUser) {
            resolve([200, {
              code: 200,
              msg: '登录成功',
              user
            }])
          } else {
            // 如果没有这么一个人
            resolve([200, {
              code: 500,
              msg: '账号错误'
            }])
          }
        }, 500)
      })
    })

    mock.onPost('/api/addUser').reply(config => {
      debugger
      // 接收新增的数据
      let params = JSON.parse(config.data)
      _userList.push({
        ID: params.params.USER_ID,
        USER_NAME: params.params.USER_NAME,
        PASSWORD: params.params.PASSWORD,
        CREATE_TIME: params.params.CREATE_TIME
      })
      debugger
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }])
        }, 500)
      })
    })

    mock.onGet('/api/delUser').reply(config => {
      let params = config.params
      _userList = _userList.filter(u => u.ID !== params.ID)
      debugger
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功  '
          }])
        }, 500)
      })
    })
    // 批量删除
    mock.onGet('/api/batchRemoveUser').reply(config => {
      let id = config.params.ID
      _userList = _userList.filter(u => !id.includes(u.ID))
      debugger
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功  '
          }])
        }, 500)
      })
    })
    // 修改用户
    mock.onGet('/api/editUser').reply(config => {
      let params = config.params
      debugger
      _userList.some(u => {
        debugger
        if (u.ID === params.ID) {
          u.ID = params.ID
          u.USER_NAME = params.USER_NAME
          u.PASSWORD = params.PASSWORD
          u.CREATE_TIME = params.CREATE_TIME
          u.USER_ID = params.USER_ID
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '修改成功'
          }])
        }, 500)
      })
    })
    // 设置用户角色
    mock.onGet('/api/setUsesPart').reply(config => {
      // 接收参数
      debugger
      let params = config.params
      _userList.some(u => {
        if (u.ID === params.ID) {
          u.USER_ID = params.USER_ID
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '修改成功'
          }])
        }, 500);
      })
    })
  }
}
