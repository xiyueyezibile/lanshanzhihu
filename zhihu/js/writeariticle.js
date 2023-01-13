//获取编辑器按钮
const writeariticlebianjiqiTop = document.querySelector('.bianjiqiTop')
const writeariticlebianjiqiTopbtns = writeariticlebianjiqiTop.querySelectorAll('button')
const writeariticlebianjiqiCenter = document.querySelector('#writeariticlebianjiqiCenter')
const writeariticlebianjiqiBottom = document.querySelector('.bianjiqiBottom')
console.log(writeariticlebianjiqiBottom)
writeariticlebianjiqiTopbtns[8].addEventListener('click', () => {
  console.log(writeariticlebianjiqiCenter.value)
  console.log(writeariticlebianjiqiBottom.innerHTML)
  if (writeariticlebianjiqiCenter.value.trim() == '') {
    alert('标题不能为空')
  } else if (writeariticlebianjiqiBottom.innerHTML == '') {
    alert('文章不能为空')
  } else {
    let formdata = new FormData()
    formdata.append('title', writeariticlebianjiqiCenter.value)
    formdata.append('message', writeariticlebianjiqiBottom.innerHTML)
    fetch('https://gogo.madeindz.work:443/api/article/createarticle', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == '200') {
          alert('发布成功')
          history.go(0)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
