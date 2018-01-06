import axios from 'axios'

// 登录
export const login = data => {
  let params = {}
  Object.assign(params, data)
  console.log(params)
  axios.post('http://localhost:3000/admins/create', params)
  .then((response) => {
    let res = response.data
    if (res.status === '1') {
      console.log(res.msg)
    } else {
      console.log('suc!')
    }
  })
}

// 检查用户名重复
export const checkuser = data => {
  let params = {}
  Object.assign(params, data)
  console.log(params)
  let checkcode = ''
  axios.get('http://localhost:3000/admins/checkuser', params)
  .then((response) => {
    let res = response.data
    if (res.status === '1') {
      console.log(res.msg)
    } else {
      this.checkcode = res.result.user_code
    }
  })
  console.log(checkcode)
  return checkcode
}
