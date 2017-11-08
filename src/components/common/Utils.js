import ImageTools from './ImageTools'

export default {
  readAsDataURL (file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return new Promise((resolve, reject) => {
        ImageTools.resize(file, {
          width: 800,
          height: 400
        }, function (blob, didItResize) {
          resolve(window.URL.createObjectURL(blob))
        })
      })
    }
  }
}
