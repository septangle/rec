/* eslint-disable no-useless-escape */
export default {
  required: (value) => {
    return !(value === null || value === '') || '请输入'
  },
  email: (value) => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '请输入正确的邮箱地址'
  },
  number: (value) => {
    return /^\d*$/.test(value) || '请输入数字'
  },
  phone: (value) => {
    return /^\d{11}$/.test(value) || '请输入正确的手机号码'
  },
  mailOrTel: (value) => {
    const pattern = /^(^\d{11}$)|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '请输入正确的邮箱地址或者手机号码'
  }
}
