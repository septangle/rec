import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = '/photo-web'

export default {
  fetch () {
    return Vue.http.get('order/getCurrMemberScan.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.sceneDtoList
    }).then(function (items) {
      items = items || []
      return items.map((item) => {
        return {
          'id': item.orderId,
          'reviewId': item.benacoScanId,
          'title': item.description,
          'thumbnail': (item.thumbImagePath && encodeURI('/thumb_image/' + item.thumbImagePath)) || '/static/demo-data/paris.jpeg',
          'status': item.status,
          'createTime': item.createTime
        }
      })
    })
  },
  add (data) {
    return Vue.http.post('engine/addPhotos.do', data).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.panoramaEngineDto
    })
  },
  addPhotos (data) {
    return Vue.http.post('engine/addStitchedPhotos.do', data).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.panoramaEngineDto
    })
  },
  remove (id) {
    return Vue.http.post('order/removeOrderById.do', {orderDto: {id}}).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.orderDto
    })
  }
}
