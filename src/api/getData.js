import axios from 'axios'

export const addQuestion = axios.post(
  '/questions/add', data
)