import axios from 'axios'

// 登录
export const login = data => {
  let params = {}
  Object.assign(params, data)
  console.log(params)
  axios.post('http://localhost:3000/questions/num', params)
  .then((response) => {
    let res = response.data
    if (res.status === '1') {
      console.log(res.msg)
    } else {
      console.log('suc!')
    }
  })
}
