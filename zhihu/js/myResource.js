//获取用户信息
fetch('https://gogo.madeindz.work:443/api/user/getuserinformation', {
  method: 'get',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((res) => res.json())
  .then((res) => {
    if (res.code == '2005') {
      alert('登录过期')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href = 'https://zhihu.madeindz.work'
    }
    if (res.information.headphoto != '') {
      myResourceBodyTopdivimg.src = res.information.headphoto
    }
    if (res.information.gender == '男') {
      myResourceGender.innerHTML = '男'
      myResourceGendermale.checked = true
    } else if (res.information.gender == '女') {
      myResourceGender.innerHTML = '女'
      myResourceGenderfemale.checked = true
    }
    myResourcejianjie.innerHTML = res.information.sign
  })
//获取头像区域
const myResourceBodyTop = document.querySelector('.myResourceBodyTop')
const myResourceBodyTopdivs = myResourceBodyTop.querySelectorAll('div')
const myResourceBodyTopdivimg = myResourceBodyTopdivs[1].querySelector('img')
//获取文件输入
const myResourceimg = document.querySelector('#myResourceimg')
//获取要加载的样式
const myResourceUsername = document.querySelector('.myResourceUsername')
const myResourceGender = document.querySelector('.myResourceGender')
const myResourcejianjie = document.querySelector('.myResourcejianjie')
const myResourceGendermale = document.querySelector('#myResourceGendermale')
const myResourceGenderfemale = document.querySelector('#myResourceGenderfemale')
//获取要更改的样式
const myResourceUsernameHidden = document.querySelector('.myResourceUsernameHidden')
const myResourceChanges = document.querySelectorAll('.myResourceChange')
const myResourceGenderForm = document.querySelector('.myResourceGenderForm')
const myResourcejianjieForm = document.querySelector('.myResourcejianjieForm')
const myResourcemimaForm = document.querySelector('.myResourcemimaForm')
const myResourcemima = document.querySelector('.myResourcemima')
const myResourceBodyBotton = document.querySelector('.myResourceBodyBotton')
const myResourceli = myResourceBodyBotton.querySelector('ul').querySelectorAll('li')[3]
//获取点击事件样式
const myResourceProtects = document.querySelectorAll('.myResourceProtect')
//获取输入框
const myResourceUsername_ = document.querySelector('#myResourceUsername')
const myResourcejianjie_ = document.querySelector('#myResourcejianjie')
const myResourcepassword_ = document.querySelector('#myResourcepassword')
const myResourcenewpassword_ = document.querySelector('#myResourcenewpassword')
const myResourceCode_ = document.querySelector('#myResourceCode')
//获取获取短信验证码按钮
const myResourceGetcode = document.querySelector('#myResourceGetcode')
//修改为当前用户用户名
myResourceUsername.innerHTML = localStorage.getItem('username')
myResourceUsername_.value = localStorage.getItem('username')

//第一个表单逻辑
myResourceChanges[0].addEventListener('click', () => {
  myResourceChanges[0].style.display = 'none'
  myResourceUsername.style.display = 'none'
  myResourceUsernameHidden.style.display = 'flex'
})
myResourceProtects[0].addEventListener('click', (e) => {
  e.preventDefault()
  if (!myResourceUsername_.value.trim()) {
    return
  }
  let formdata = new FormData()
  formdata.append('username', myResourceUsername_.value.trim())
  fetch('https://gogo.madeindz.work:443/api/user/informationmodify', {
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      console.log(res.status)
      if (res.status == '200') {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        window.location.href = 'https://zhihu.madeindz.work/'
        history.go(0)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//第二个表单逻辑
myResourceChanges[1].addEventListener('click', () => {
  myResourceChanges[1].style.display = 'none'
  myResourceGender.style.display = 'none'
  myResourceGenderForm.style.display = 'inline-block'
})
myResourceProtects[1].addEventListener('click', (e) => {
  e.preventDefault()
  let gender = ''
  if (myResourceGendermale.checked) {
    gender = myResourceGendermale.value
  } else {
    gender = myResourceGenderfemale.value
  }
  let formdata = new FormData()
  formdata.append('gender', gender)
  fetch('https://gogo.madeindz.work:443/api/user/informationmodify', {
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == '200') {
        history.go(0)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//第三个表单逻辑
myResourceChanges[2].addEventListener('click', () => {
  myResourceChanges[2].style.display = 'none'
  myResourcejianjie.style.display = 'none'
  myResourcejianjieForm.style.display = 'inline-block'
})
myResourceProtects[2].addEventListener('click', (e) => {
  e.preventDefault()
  let formdata = new FormData()
  formdata.append('sign', myResourcejianjie_.value)
  fetch('https://gogo.madeindz.work:443/api/user/informationmodify', {
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == '200') {
        history.go(0)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
// 第四个表单逻辑
myResourceChanges[3].addEventListener('click', () => {
  myResourceChanges[3].style.display = 'none'
  myResourcemima.style.display = 'none'
  myResourcemimaForm.style.display = 'inline-block'
  myResourceBodyBotton.style.height = '800px'
  myResourceli.style.height = '200px'
})
myResourceProtects[3].addEventListener('click', (e) => {
  if (myResourcepassword_.value == '' || myResourcenewpassword_.value == '' || myResourceCode_.value == '') {
  } else {
    e.preventDefault()
    let formdata = new FormData()
    formdata.append('newpassword', myResourcepassword_.value)
    formdata.append('confirm', myResourcenewpassword_.value)
    formdata.append('code', myResourceCode_.value)
    fetch('https://gogo.madeindz.work:443/api/user/changepassword', {
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == '200') {
          alert('修改成功')
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
})
//获取验证码
myResourceGetcode.addEventListener('click', (e) => {
  e.preventDefault()
  fetch('https://gogo.madeindz.work:443/api/user/getcode', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == '200') {
        let flag = 300
        setTimeout(function fn() {
          myResourceGetcode.innerHTML = flag + '后可重新发送'
          flag--
          if (flag == 0) {
            myResourceGetcode.innerHTML = '可发送验证码'
            return
          }
          setTimeout(fn, 1000)
        }, 1000)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
let myResourceBodyTopdivsflag = 1
myResourceBodyTopdivimg.addEventListener('mouseover', () => {
  if (myResourceBodyTopdivsflag) {
    myResourceBodyTopdivsflag = 0
    myResourceBodyTopdivs[0].style.display = 'block'
  }
})
myResourceBodyTopdivs[0].addEventListener('mouseout', () => {
  if (!myResourceBodyTopdivsflag) {
    myResourceBodyTopdivsflag = 1
    myResourceBodyTopdivs[0].style.display = 'none'
  }
})
//更改图片信息
myResourceBodyTopdivimg.addEventListener('click', () => {
  myResourceimg.click()
})
myResourceimg.addEventListener('change', () => {
  //获取文件对象
  let file = myResourceimg.files[0]
  if (!file) return
  console.log(file.type)
  //限制文件上传
  if (!/webp|png|jpg|jpeg/i.test(file.type)) {
    alert('上传的文件只能是webp或png或jpg或jpeg格式的')
    return
  }
  //限制文件上传大小
  if (file.size > 2 * 1024 * 1024) {
    alert('上传的文件不能超过两兆')
    return
  }
  let fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = (ev) => {
    let formdata = new FormData()
    console.log(ev.target.result)
    formdata.append('headphoto', ev.target.result)
    console.log(ev.target.result)
    fetch('https://gogo.madeindz.work:443/api/user/informationmodify', {
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          history.go(0)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
