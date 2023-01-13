// 跳转收藏页面函数
function runshoucang(ID) {
  localStorage.setItem('shoucangID', ID)
}
//跳转问题界面函数
function tiaozhuan(ID) {
  localStorage.setItem('ID', ID)
}
//跳转文章页面函数
function tiaozhuanwenzhang(ID) {
  localStorage.setItem('wenzhangID', ID)
}
//删除收藏夹函数
function removeshoucang(ID) {
  let formdata = new FormData()
  formdata.append('id', ID)
  fetch('https://gogo.madeindz.work:443/api/collection/deletefavorites', {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == '200') {
        history.go(0)
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

//获取头像
const myIndexImg = document.querySelector('.myIndexImg')
//获取隐藏收藏界面
const myIndexblack = document.querySelector('.myIndexblack')
const hiddenshoucang = document.querySelector('.hiddenshoucang')
const hiddenshoucangForm = document.querySelector('.hiddenshoucangForm')
const hiddenshoucangFormbtns = hiddenshoucangForm.querySelectorAll('button')
const hiddenshoucangTitle = document.querySelector('#hiddenshoucangTitle')
const hiddenshoucangMessage = document.querySelector('#hiddenshoucangMessage')
const hiddenpubulic = document.querySelector('#hiddenpubulic')
const hiddenprivate = document.querySelector('#hiddenprivate')
//获取页面布局
const myIndexBottom = document.querySelector('.myIndexBottom')
const myIndexBottomRight = document.querySelector('.myIndexBottomRight')
//获取收藏按钮
const createshoucang = document.querySelector('.createshoucang')
//获取更改用户名样式
const myIndexUsername = document.querySelector('.myIndexUsername')
//我的系列
const myIndexBottomLeftdongtai = document.querySelector('.myIndexBottomLeftdongtai')
const myIndexBottomLefthuida = document.querySelector('.myIndexBottomLefthuida')
const myIndexBottomLeftshiping = document.querySelector('.myIndexBottomLeftshiping')
const myIndexBottomLefttiwen = document.querySelector('.myIndexBottomLefttiwen')
const myIndexBottomLeftwenzhang = document.querySelector('.myIndexBottomLeftwenzhang')
const myIndexBottomLeftzhuanlan = document.querySelector('.myIndexBottomLeftzhuanlan')
const myIndexBottomLeftxiangfa = document.querySelector('.myIndexBottomLeftxiangfa')
const myIndexBottomLeftshoucang = document.querySelector('.myIndexBottomLeftshoucang')
const myIndexBottomLeftguanzhu = document.querySelector('.myIndexBottomLeftguanzhu')
//获取头部
const myIndexBottomLeft = document.querySelector('.myIndexBottomLeft')
const myIndexBottomLeftTop = document.querySelector('.myIndexBottomLeftTop')
const myIndexBottomLeftTopLi = myIndexBottomLeftTop.querySelectorAll('li')
//实时更改用户名
myIndexUsername.innerHTML = localStorage.getItem('username')
//获取渲染样式
const myIndexMessage = document.querySelector('.myIndexMessage')
//获取跳转编辑个人信息页面按钮
const changeMyResourcebtn = document.querySelector('.myIndexxiala').querySelectorAll('button')[1]
changeMyResourcebtn.addEventListener('click', () => {
  window.location.href = 'https://zhihu.madeindz.work/html/myResource.html'
})
//出现创建收藏夹界面
createshoucang.addEventListener('click', () => {
  myIndexblack.style.display = 'block'
  hiddenshoucang.style.display = 'block'
})
//关闭创建收藏夹界面
hiddenshoucangFormbtns[0].addEventListener('click', (e) => {
  e.preventDefault()
  myIndexblack.style.display = 'none'
  hiddenshoucang.style.display = 'none'
})
//创建收藏夹
hiddenshoucangFormbtns[1].addEventListener('click', (e) => {
  e.preventDefault()
  if (hiddenshoucangTitle.value.trim() == '') {
    alert('标题不能为空')
  } else {
    let private
    console.log(hiddenpubulic.checked)
    if (hiddenpubulic.checked) {
      private = 0
    } else {
      private = 1
    }
    let formdata = new FormData()
    formdata.append('favoritesname', hiddenshoucangTitle.value.trim())
    formdata.append('describe', hiddenshoucangMessage.value.trim())
    formdata.append('private', private)
    fetch('https://gogo.madeindz.work:443/api/collection/addfavorites', {
      method: 'post',
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
window.addEventListener('load', () => {
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
        myIndexImg.src = res.information.headphoto
      }
    })
  //渲染个人信息
  fetch('https://gogo.madeindz.work:443/api/user/getuserinformation', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.information.gender == '男') {
        myIndexMessage.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="Zi Zi--Male" fill="#949eb1"><path fill-rule="evenodd" d="M13.88 4.395a.75.75 0 0 1 .75-.75h4.97a.75.75 0 0 1 .75.75v4.982a.75.75 0 1 1-1.5 0V6.211l-3.968 3.968a6.375 6.375 0 1 1-1.06-1.06l3.973-3.974H14.63a.75.75 0 0 1-.75-.75ZM9.876 9.25a4.875 4.875 0 1 0 0 9.75 4.875 4.875 0 0 0 0-9.75Z" clip-rule="evenodd"></path></svg>'
      } else if (res.information.gender == '女') {
        myIndexMessage.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="Zi Zi--Female" fill="#949eb1"><path fill-rule="evenodd" d="M12 4.001a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm-6.25 4.75a6.25 6.25 0 1 1 7 6.206v1.748h2.75a.75.75 0 1 1 0 1.5h-2.75v2.544a.75.75 0 0 1-1.5 0v-2.544H8.5a.75.75 0 0 1 0-1.5h2.75v-1.748a6.251 6.251 0 0 1-5.5-6.206Z" clip-rule="evenodd"></path></svg>'
      }
    })
    .catch((err) => {
      console.log(err)
    })
  //渲染提问页面
  fetch('https://gogo.madeindz.work:443/api/qa/qsubmited', {
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
      console.log(res)
      myIndexBottomLeftTopLi[3].innerHTML = '提问 ' + res.message.length
    })
    .catch((err) => {
      console.log(err)
    })
  //渲染文章页面
  fetch('https://gogo.madeindz.work:443/api/article/articlesubmited', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == '200') {
        myIndexBottomLeftTopLi[4].innerHTML = '文章 ' + res.message.length
      }
    })
    .catch((err) => {
      console.log(err)
    })
  //渲染收藏页面
  fetch('https://gogo.madeindz.work:443/api/collection/seemyfavorites', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == '200') {
        if (res.favorites == null) {
          myIndexBottomLeftTopLi[7].innerHTML = '收藏 0'
        } else {
          myIndexBottomLeftTopLi[7].innerHTML = '收藏 ' + res.favorites.length
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
let myIndexBottomLefttiwenflag = 1
let myIndexBottomLeftwenzhangflag = 1
let myIndexBottomLeftshoucangflag = 1
for (let i = 0; i < myIndexBottomLeftTopLi.length; i++) {
  //统一绑定事件
  myIndexBottomLeftTopLi[i].addEventListener('click', () => {
    myIndexBottomLeft.style.height = '100px'
    myIndexBottomLeftdongtai.style.display = 'none'
    myIndexBottomLefthuida.style.display = 'none'
    myIndexBottomLeftshiping.style.display = 'none'
    myIndexBottomLefttiwen.style.display = 'none'
    myIndexBottomLeftwenzhang.style.display = 'none'
    myIndexBottomLeftzhuanlan.style.display = 'none'
    myIndexBottomLeftxiangfa.style.display = 'none'
    myIndexBottomLeftshoucang.style.display = 'none'
    myIndexBottomLeftguanzhu.style.display = 'none'
    for (let j = 0; j < myIndexBottomLeftTopLi.length; j++) {
      myIndexBottomLeftTopLi[j].className = ''
    }

    myIndexBottomLeftTopLi[i].className = 'strongcu'
    if (i == 0) {
      myIndexBottomLeftdongtai.style.display = 'block'
    } else if (i == 1) {
      myIndexBottomLefthuida.style.display = 'block'
    } else if (i == 2) {
      myIndexBottomLeftshiping.style.display = 'block'
    } else if (i == 3) {
      myIndexBottomLefttiwen.style.display = 'block'
      //查看自己发布的问题
      fetch('https://gogo.madeindz.work:443/api/qa/qsubmited', {
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
          if (myIndexBottomLefttiwenflag) {
            myIndexBottomLefttiwenflag = 0
            if (res.message == null) {
            } else {
              myIndexBottomLeft.style.height = 100 + 80 * res.message.length + 'px'
              const ul = myIndexBottomLefttiwen.querySelector('ul')
              for (let i = 0; i < res.message.length; i++) {
                let li = document.createElement('li')
                li.innerHTML = '<div><a href="http://zhihu.madeindz.work/html/issue.html" onclick="tiaozhuan(' + res.message[i].ID + ')">' + res.message[i].title + '</a></div>' + '<div>' + res.message[i].CreatedAt + '</div>'
                ul.appendChild(li)
              }
            }
          } else {
            if (res.message == null) {
              myIndexBottomLeft.style.height = 100 + 'px'
            } else {
              myIndexBottomLeft.style.height = 100 + 80 * res.message.length + 'px'
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (i == 4) {
      myIndexBottomLeftwenzhang.style.display = 'block'
      //查自己发布的文章
      fetch('https://gogo.madeindz.work:443/api/article/articlesubmited', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == '200') {
            if (myIndexBottomLeftwenzhangflag) {
              myIndexBottomLeftwenzhangflag = 0
              if (res.message == null) {
              } else {
                myIndexBottomLeft.style.height = 100 + 80 * res.message.length + 'px'
                const ul = myIndexBottomLeftwenzhang.querySelector('ul')
                for (let i = 0; i < res.message.length; i++) {
                  let li = document.createElement('li')
                  li.innerHTML = '<div><a href="https://zhihu.madeindz.work/html/ariticle.html" onclick="tiaozhuanwenzhang(' + res.message[i].ID + ')">' + res.message[i].title + '</a></div>' + '<div>' + res.message[i].CreatedAt + '</div>'
                  ul.appendChild(li)
                }
              }
            } else {
              if (res.message == null) {
                myIndexBottomLeft.style.height = 100 + 'px'
              } else {
                myIndexBottomLeft.style.height = 100 + 80 * res.message.length + 'px'
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (i == 5) {
      myIndexBottomLeftzhuanlan.style.display = 'block'
    } else if (i == 6) {
      myIndexBottomLeftxiangfa.style.display = 'block'
    } else if (i == 7) {
      myIndexBottomLeftshoucang.style.display = 'block'
      //查自己的收藏夹
      fetch('https://gogo.madeindz.work:443/api/collection/seemyfavorites', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == '200') {
            if (myIndexBottomLeftshoucangflag) {
              myIndexBottomLeftshoucangflag = 0
              if (res.favorites == null) {
              } else {
                myIndexBottomLeft.style.height = 100 + 80 * res.favorites.length + 'px'
                const ul = myIndexBottomLeftshoucang.querySelector('ul')
                for (let i = 0; i < res.favorites.length; i++) {
                  let li = document.createElement('li')
                  li.innerHTML = '<div><a href="https://zhihu.madeindz.work/html/shoucang.html" onclick="runshoucang(' + res.favorites[i].ID + ')">' + res.favorites[i].favoritesname + '</a></div>' + res.favorites[i].describe + '<div><a href="javascript:;" id="myIndexremoveshoucang" onclick="removeshoucang(' + res.favorites[i].ID + ')">删除</a></div>'
                  ul.appendChild(li)
                }
              }
            } else {
              if (res.favorites == null) {
                myIndexBottomLeft.style.height = 100 + 'px'
              } else {
                myIndexBottomLeft.style.height = 100 + 80 * res.favorites.length + 'px'
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (i == 8) {
      myIndexBottomLeftguanzhu.style.display = 'block'
    }
  })
}
//固定滚动
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop >= 630) {
    const i = (document.body.offsetWidth - myIndexBottom.offsetWidth) / 2
    const x = document.body.offsetWidth - i - myIndexBottomRight.offsetWidth
    myIndexBottomRight.style.position = 'fixed'
    if (x < 739) {
      myIndexBottomRight.style.left = 739 + 'px'
    } else {
      myIndexBottomRight.style.left = x + 'px'
    }
    myIndexBottomRight.style.top = -280 + 'px'
  } else {
    myIndexBottomRight.style.position = 'relative'
    myIndexBottomRight.style.left = ''
    myIndexBottomRight.style.top = ''
  }
})
