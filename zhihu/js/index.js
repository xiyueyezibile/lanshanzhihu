//获取验证码登录和密码登录和注册
const change = document.querySelector('.change')
const changediv = change.querySelectorAll('div')
const mimalogin = changediv[1].querySelector('a')
const yanzhengmalogin = changediv[0].querySelector('a')
const register = changediv[2].querySelector('a')
//获取输入框
const ID = document.querySelector('#Id')
const passwords = document.querySelector('#password')
const yanzhengphone = document.querySelector('.yanzhengphone')
const yanzhengphoneinput = document.querySelector('#yanzhengphone')
const yanzhengma = document.querySelector('#yanzhengma')
const registerphone = document.querySelector('.registerphone')
const registerphoneinput = document.querySelector('#registerphone')
const registerma = document.querySelector('#registerma')
const registeremail = document.querySelector('#email')
const username = document.querySelector('.username')
const usernameinput = document.querySelector('#username')
const registerpassword = document.querySelector('#registerpassword')
//获取要更改样式
const kong = document.querySelector('.kong')
const yu = document.querySelector('.yu')
const hai = document.querySelector('.hai')
const wang = document.querySelector('.wang')
const line = document.querySelector('.line')
const otherlogin = document.querySelector('.otherlogin')
const statement = document.querySelector('.statement')
//获取登录按钮
const login = document.querySelector('#login')
const loginOR = document.querySelector('#loginOR')
const registerbtn = document.querySelector('#register')
//获取短信验证码按钮
const duanxin = document.querySelector('.duanxin')
//获取响应更改样式
const alreadyphone = document.querySelector('.alreadyphone')
const falseyanzhengma = document.querySelector('.falseyanzhengma')
const noemail = document.querySelector('.noemail')
const nophone = document.querySelector('.nophone')
const nomima = document.querySelector('.nomima')
const alreadyusername = document.querySelector('.alreadyusername')
let mimaloginflag = [1, 0, 0]
mimalogin.addEventListener('click', () => {
  if (!mimaloginflag[1]) {
    mimaloginflag = [0, 0, 0]
    mimaloginflag[1] = 1
    line.style.display = 'flex'
    otherlogin.style.display = 'block'
    statement.style.display = 'block'
    username.style.display = 'none'
    registerpassword.style.display = 'none'
    registeremail.style.display = 'none'
    registerbtn.style.display = 'none'
    registerma.style.display = 'none'
    registerphone.style.display = 'none'
    kong.style.display = 'none'
    yu.style.display = 'none'
    yanzhengphone.style.display = 'none'
    yanzhengma.style.display = 'none'
    ID.style.display = 'block'
    passwords.style.display = 'block'
    hai.style.display = 'inline-block'
    wang.style.display = 'inline-block'
    loginOR.style.display = 'none'
    login.style.display = 'block'
    yanzhengmalogin.className = ''
    register.className = ''
    mimalogin.className = 'colorblack'
    changediv[0].className = 'yanzhengma'
    changediv[1].className = 'mima bottomborderblue'
    changediv[2].className = 'register'
    duanxin.style.display = 'none'
  }
})
yanzhengmalogin.addEventListener('click', () => {
  if (!mimaloginflag[0]) {
    currentduanxin = 0
    mimaloginflag = [0, 0, 0]
    mimaloginflag[0] = 1
    falseyanzhengma.className = 'falseyanzhengma falseyanzhengmaposition1'
    line.style.display = 'flex'
    otherlogin.style.display = 'block'
    statement.style.display = 'block'
    username.style.display = 'none'
    registerpassword.style.display = 'none'
    registeremail.style.display = 'none'
    registerbtn.style.display = 'none'
    registerma.style.display = 'none'
    registerphone.style.display = 'none'
    kong.style.display = 'inline-block'
    yu.style.display = 'inline-block'
    hai.style.display = 'none'
    wang.style.display = 'none'
    yanzhengphone.style.display = 'flex'
    yanzhengma.style.display = 'inline-block'
    ID.style.display = 'none'
    passwords.style.display = 'none'
    login.style.display = 'none'
    loginOR.style.display = 'block'
    mimalogin.className = ''
    register.className = ''
    yanzhengmalogin.className = 'colorblack'
    changediv[0].className = 'yanzhengma bottomborderblue'
    changediv[1].className = 'mima'
    changediv[2].className = 'register'
    duanxin.style.display = 'block'
    duanxin.className = 'duanxin direction1'
  }
})
register.addEventListener('click', () => {
  if (!mimaloginflag[2]) {
    currentduanxin = 1
    mimaloginflag = [0, 0, 0]
    mimaloginflag[2] = 1
    falseyanzhengma.className = 'falseyanzhengma falseyanzhengmaposition2'
    line.style.display = 'none'
    otherlogin.style.display = 'none'
    statement.style.display = 'none'
    username.style.display = 'block'
    registerpassword.style.display = 'block'
    registeremail.style.display = 'block'
    registerbtn.style.display = 'block'
    registerma.style.display = 'inline-block'
    registerphone.style.display = 'flex'
    kong.style.display = 'none'
    yu.style.display = 'none'
    yanzhengphone.style.display = 'none'
    yanzhengma.style.display = 'none'
    ID.style.display = 'none'
    passwords.style.display = 'none'
    hai.style.display = 'none'
    wang.style.display = 'none'
    loginOR.style.display = 'none'
    login.style.display = 'none'
    yanzhengmalogin.className = ''
    mimalogin.className = ''
    register.className = 'colorblack'
    changediv[0].className = 'yanzhengma'
    changediv[1].className = 'mima'
    changediv[2].className = 'register bottomborderblue'
    duanxin.style.display = 'block'
    duanxin.className = 'duanxin direction2'
  }
})
let currentduanxin = 0
let duanxinflag = 1
//发送验证码
duanxin.addEventListener('click', () => {
  //在验证码登录界面
  if (currentduanxin == 0) {
    if (duanxinflag) {
      const phonenumber = parseInt(yanzhengphoneinput.value.trim())
      duanxinflag = 0
      let timer = 180
      let formdata = new FormData()
      formdata.append('phonenumber', phonenumber)
      fetch('https://gogo.madeindz.work:443/api/getcode', {
        method: 'post',
        body: formdata,
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            setTimeout(function duanxinfn() {
              timer--
              duanxin.innerHTML = timer + '秒后可重发'
              if (timer == 0) {
                duanxin.innerHTML = '发送短信验证码'
                duanxinflag = 1
                return
              }
              setTimeout(duanxinfn, 1000)
            }, 1000)
          } else {
            console.log(res)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    //在注册界面
  } else {
    const phonenumber = parseInt(registerphoneinput.value.trim())
    if (duanxinflag) {
      duanxinflag = 0
      let timer = 180
      let formdata = new FormData()
      formdata.append('phonenumber', phonenumber)
      fetch('https://gogo.madeindz.work:443/api/getcode', {
        method: 'post',
        body: formdata,
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            setTimeout(function duanxinfn() {
              timer--
              duanxin.innerHTML = timer + '秒后可重发'
              if (timer == 0) {
                duanxin.innerHTML = '发送短信验证码'
                duanxinflag = 1
                return
              }
              setTimeout(duanxinfn, 1000)
            }, 1000)
          } else {
          }
        })
        .catch((res) => {
          console.log(err)
        })
    }
  }
})
//注册按钮
registerbtn.addEventListener('click', (e) => {
  e.preventDefault()
  //获取电话号
  const phonenumber = parseInt(registerphoneinput.value.trim())
  //获取用户名
  const username = usernameinput.value.trim()
  //获取邮箱
  const email = registeremail.value.trim()
  //获取密码
  const password = registerpassword.value.trim()
  //获取验证码
  const code = registerma.value
  console.log(phonenumber, username, email, password, code)
  let formdata = new FormData()
  formdata.append('code', code)
  formdata.append('email', email)
  formdata.append('phonenumber', phonenumber)
  formdata.append('username', username)
  formdata.append('password', password)
  fetch('https://gogo.madeindz.work:443/api/register', {
    method: 'post',
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == 200) {
        alert('注册成功')
      } else {
        //手机号已存在
        if (res.message == 'phonenumber already exist~') {
          alreadyphone.style.display = 'block'
          registerphoneinput.addEventListener('focus', () => {
            alreadyphone.style.display = 'none'
          })
        } else if (res.message == 'user already exist~') {
          alreadyusername.style.display = 'block'
          usernameinput.addEventListener('focus', () => {
            alreadyusername.style.display = 'none'
          })
        }
        //验证码错误
        else {
          falseyanzhengma.style.display = 'block'
          registerma.addEventListener('focus', () => {
            falseyanzhengma.style.display = 'none'
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

if (localStorage.getItem('token')) {
  window.location.href = 'https://zhihu.madeindz.work/html/home.html'
} else {
  //电话号验证码登录
  loginOR.addEventListener('click', (e) => {
    e.preventDefault()
    //获取电话号
    const phonenumber = parseInt(yanzhengphoneinput.value.trim())
    //获取验证码
    const code = yanzhengma.value.trim()
    let formdata = new FormData()
    formdata.append('phonenumber', phonenumber)
    formdata.append('code', code)
    fetch('https://gogo.madeindz.work:443/api/phonelogin', {
      method: 'post',
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.username)
          window.location.href = 'https://zhihu.madeindz.work/html/home.html'
        } else {
          falseyanzhengma.style.display = 'block'
          yanzhengma.addEventListener('focus', () => {
            falseyanzhengma.style.display = 'none'
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })

  //手机号或邮箱登录
  login.addEventListener('click', (e) => {
    e.preventDefault()
    // 获取内容
    const Id = ID.value.trim()
    const password = passwords.value.trim()
    let reg = /@qq.com$/
    console.log(reg.test(Id))
    //邮箱
    if (reg.test(Id)) {
      const email = Id
      let formdata = new FormData()
      formdata.append('email', email)
      formdata.append('password', password)
      fetch('https://gogo.madeindz.work:443/api/emaillogin', {
        method: 'post',
        body: formdata,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.username)
            window.location.href = 'https://zhihu.madeindz.work/html/home.html'
          } else {
            if (res.message == "Email doesn't exists") {
              noemail.style.display = 'block'
              ID.addEventListener('focus', () => {
                noemail.style.display = 'none'
              })
            } else {
              nomima.style.display = 'block'
              passwords.addEventListener('focus', () => {
                nomima.style.display = 'none'
              })
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
      //手机号
    } else {
      const phonenumber = parseInt(Id)
      let formdata = new FormData()
      formdata.append('phonenumber', phonenumber)
      formdata.append('password', password)
      fetch('https://gogo.madeindz.work:443/api/phonepasswordlogin', {
        method: 'post',
        body: formdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.username)
            window.location.href = 'https://zhihu.madeindz.work/html/home.html'
          } else {
            if (res.message == "PhoneNumber doesn't exists~") {
              nophone.style.display = 'block'
              ID.addEventListener('focus', () => {
                nophone.style.display = 'none'
              })
            } else {
              nomima.style.display = 'block'
              passwords.addEventListener('focus', () => {
                nomima.style.display = 'none'
              })
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
}
