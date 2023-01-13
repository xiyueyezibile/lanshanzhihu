const bianjiqiTop = document.querySelector('.bianjiqiTop')
const bianjiqibtns = bianjiqiTop.querySelectorAll('button')
//加粗
bianjiqibtns[0].addEventListener('click', () => {
  document.execCommand('bold', false)
})
//斜体
bianjiqibtns[1].addEventListener('click', () => {
  document.execCommand('italic', false)
})
//下划线
bianjiqibtns[2].addEventListener('click', () => {
  document.execCommand('underline', false)
})
//左对齐
bianjiqibtns[3].addEventListener('click', () => {
  document.execCommand('justifyLeft', false)
})

//文字居中
bianjiqibtns[4].addEventListener('click', () => {
  document.execCommand('justifyCenter', false)
})
//右对齐
bianjiqibtns[5].addEventListener('click', () => {
  document.execCommand('justifyRight', false)
})
//有序列表
bianjiqibtns[6].addEventListener('click', () => {
  document.execCommand('insertOrderedList', false)
})
//无序列表
bianjiqibtns[7].addEventListener('click', () => {
  document.execCommand('insertUnorderedList', false)
})
