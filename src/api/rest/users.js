import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = '/photo-web'

export default {
  login (user) {
    return Vue.http.post('member/login.do', {memberDto: user}).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  logout () {
    return Vue.http.post('member/logout.do', {}).then(function (resp) {
      // TODO
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  current () {
    return Vue.http.get('member/getMemberInfomaction.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberInfomationDto
    })
  },
  price () {
    return Vue.http.get('member/getPrice.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.priceDto.price
    })
  },
  register (user) {
    return Vue.http.post('member/register.do', {memberDto: user}).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  fetch () {
    return Vue.http.get('member/getAllMember.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDtoList
    })
  },
  verifyAccount (mailOrTel) {
    return Vue.http.post('member/verifyAccount.do', {mailOrTel: mailOrTel}, {
      emulateJSON: true
    }).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto // TODO
    })
  },
  sendVerifyCode (mailOrTel, code) {
    return Vue.http.post('member/sendVerifyCode.do', {mailOrTel: mailOrTel}, {
      emulateJSON: true
    }).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto // TODO
    })
  },
  verifyCode (mailOrTel, code) {
    return Vue.http.post('member/verifyCode.do', {mailOrTel: mailOrTel, code: code}, {
      emulateJSON: true
    }).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.token
    })
  },
  resetPassword (mailOrTel, tokenName, password) {
    return Vue.http.post('member/resetPassword.do', {mailOrTel, tokenName, password}, {
      emulateJSON: true
    }).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto // TODO
    })
  },

  findRecordsConsumption () {
    return Vue.http.get('order/findRecordsConsumption.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.orderDtoList
    })
  }

}
