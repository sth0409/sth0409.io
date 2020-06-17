/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/04/27 21:19
 */
import $ from '../../dom-class/index'

export function selectPictureBtn() {
  const _this = this
  const options = this.options
  /**
   * *******************************************
   * select picture
   * image file handler
   * *******************************************
   */
    // select picture
  let $selectPictureLabel = $('<label class="toolbar-icon-pic" style="position:absolute;top:0;left:0;width:100%;height:100%;"></label>')
  let $selectPictrueInput = $('<input type="file" accept="image/*" style="display:none">')
  $selectPictureLabel.append($selectPictrueInput)
  let input = $selectPictrueInput[0]

  // register selectPictureInputClick
  this.$eventHandlers['selectPictureInputClick'] = {
    $target: $selectPictrueInput,
    type: 'click',
    handler() {
      input.value = ''
    },
    capture: false
  }

  // image section template
  let imageSectionTemplate = /^<\w+\b.*<\/\w+>$/.test(options.imageSectionTemp) ? options.imageSectionTemp : `<section><img src="{url}"></section>`

  // register selectPictureInputChange
  let imageOptions = Object.assign({}, _this.options, {
    width: options.imageMaxWidth
  })
  this.$eventHandlers['selectPictureInputChange'] = {
    $target: $selectPictrueInput,
    type: 'change',
    handler(e) {
      let file = input.files[0]
      _this.emit('selectPictureInputChange', file, e, _this)

      // customize Picture Handler
      if (options.customPictureHandler) return

      // handler picture

      // console.log(res)
      let fd = new FormData()
      let ciId = '1248190932898238465'
      fd.append("files", file)
      // fd.append("ciId","")
      let xhr = new XMLHttpRequest();
      xhr.setRequestHeader('Content-Type', 'multipart/form-data')
      xhr.setRequestHeader('AccessToken', ciId)
      xhr.open('post', "http://110.249.209.202:46979/customer-myself/store-file/upload-pic?ciId=" + ciId, true);

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          let percentage = (e.loaded / e.total) * 100;
        }
      };

      // xhr.onerror = function(e) {
      //   console.error('An error occurred while submitting the form. Maybe your file is too big');
      //   layer.msg('An error occurred while submitting the form. Maybe your file is too big',{time:1500});
      //   return;
      // };

      xhr.onload = function () {
        if (xhr.status === 200) {
          let obj = JSON.parse(xhr.responseText);
          if (obj.code == '0000') {

            let $el = $(imageSectionTemplate.replace('{url}', obj.data.url))
            $el.find('img').attr({
              id: 'zxEditor_img_' + (+new Date()),
              alt: file.name
            })
            // insert to $content
            _this.insertElm($el)
          } else {

          }
          //showImage(obj.files[0]);
        } else {
          console.error('Something went terribly wrong...');
        }
      };
      xhr.send(fd);


    },
    capture: false
  }

  this.toolbar.addButton({
    name: 'select-picture',
    el: $selectPictureLabel
  })

  //多图上传
  export function upImgs(data, ciId, header) {
    return request({
      url: '/customer-myself/store-file/batch-upload-pic' + '?ciId=' + ciId,
      method: 'post',
      data,
      header
    })
  }
}
