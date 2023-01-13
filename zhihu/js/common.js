//点击历史
function putsearch(i) {
  let putsearchID = 'searchID' + i
  search.value = localStorage.getItem(putsearchID)
}
// 跳转问题界面函数
let historysearch = 0
let historysearchflag = 0
let searchID = 'searchID' + historysearch
while (localStorage.getItem(searchID)) {
  historysearch++
  searchID = 'searchID' + historysearch
}
function runissue(ID) {
  localStorage.setItem('ID', ID)
  let flag
  for (let i = 0; i < historysearch; i++) {
    flag = 'searchID' + i
    if (localStorage.getItem(flag) == search.value.trim()) {
      historysearchflag = 1
    }
  }
  if (historysearchflag) {
  } else {
    localStorage.setItem(searchID, search.value.trim())
  }
}
//获取渲染样式
const commonimg = document.querySelector('.commonimg')
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
      commonimg.src = res.information.headphoto
    }
  })
// 获取隐藏样式
const sanjiao = document.querySelector('.sanjiao')
const shezhi = document.querySelector('.shezhi')
//获取退出链接
const tuichu = shezhi.querySelectorAll('a')[4]
//获取我的主页链接
const myIndex = shezhi.querySelectorAll('a')[0]
//获取头像
const userimg = document.querySelector('.headimg img')
//获取提问按钮
const tiwen = document.querySelector('.tiwen')
const headBottomtiwen = document.querySelector('.headBottomtiwen')
//获取关闭提问界面样式
const cancel = document.querySelector('#cancel')
//获取要更改的样式
const head = document.querySelector('.head')
const headtiwen = document.querySelector('.headtiwen')
const headback = document.querySelector('.headback')
//获取提问输入框
const headtiwentop = document.querySelector('#headtiwentop')
const headtiwenbottom = document.querySelector('#headtiwenbottom')
//获取发布提问按钮
const sendIssue = document.querySelector('#sendIssue')
//获取回到顶部按钮
const returnTop = document.querySelector('.returnTop')
//获取滚动nav
const headerinner = document.querySelector('.headerinner')
const headerinnerBottom = document.querySelector('.headerinnerBottom')
//获取搜索框
const headBottomsearch = document.querySelector('#headBottomsearch')
const searchul = document.querySelector('.searchul')
const searchUl = searchul.querySelector('ul')
const searchOl = searchul.querySelector('ol')
const search = document.querySelector('#search')
const searchbtn = document.querySelector('.search button')
//头像点击事件判断数
let userimgflag = 0
//头像点击事件
userimg.addEventListener('click', (e) => {
  e.stopPropagation()
  if (!userimgflag) {
    head.style.overflow = 'visible'
    sanjiao.style.display = 'block'
    shezhi.style.display = 'block'
    userimgflag = 1
  } else {
    head.style.overflow = 'hidden'
    sanjiao.style.display = 'none'
    shezhi.style.display = 'none'
    userimgflag = 0
  }
})
//对头像点击事件的优化
document.body.addEventListener('click', () => {
  if (userimgflag) {
    head.style.overflow = 'hidden'
    sanjiao.style.display = 'none'
    shezhi.style.display = 'none'
    userimgflag = 0
  }
})
//退出事件
tuichu.addEventListener('click', () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  window.location.href = 'https://zhihu.madeindz.work/'
})
//跳转主页事件
myIndex.addEventListener('click', () => {
  window.location.href = 'https://zhihu.madeindz.work/html/myIndex.html'
})
//打开提问界面
tiwen.addEventListener('click', () => {
  searchul.style.display = 'none'
  document.body.style.overflow = 'hidden'
  head.style.overflow = 'visible'
  headtiwen.style.display = 'flex'
  headback.style.display = 'block'
})
headBottomtiwen.addEventListener('click', () => {
  //禁止滚动
  document.body.style.overflow = 'hidden'
  searchul.style.display = 'none'
  headtiwen.style.display = 'flex'
  headback.style.display = 'block'
  head.style.overflow = 'visible'
})
//关闭提问界面
cancel.addEventListener('click', () => {
  document.body.style.overflow = 'visible'
  headerinnerBottom.style.display = 'flex'
  head.style.overflow = 'hidden'
  headtiwen.style.display = 'none'
  headback.style.display = 'none'
})
//发布问题
sendIssue.addEventListener('click', () => {
  let reg = headtiwentop.value.trim()
  let arrreg = reg.split('')
  if (reg.charAt(reg.length - 1) == '?' || reg.charAt(reg.length - 1) == '？') {
    let formdata = new FormData()
    formdata.append('title', headtiwentop.value.trim())
    formdata.append('message', headtiwenbottom.value.trim())
    fetch('https://gogo.madeindz.work:443/api/qa/qcreate', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.status == '200') {
          alert('发布成功')
          history.go(0)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    alert('问题还没有带问号')
  }
})
// 回到顶部
if (returnTop) {
  returnTop.addEventListener('click', () => {
    setTimeout(function fn() {
      document.documentElement.scrollTop -= 50
      if (document.documentElement.scrollTop <= 0) {
        return
      }
      setTimeout(fn, 10)
    }, 10)
  })
}

//滚动顶部导航栏
let scrollnav = 0
let scrollnavflag = 0
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop - scrollnav >= 20 && scrollnavflag == 0) {
    headerinnerBottom.style.display = 'flex'
    head.style.overflow = 'hidden'
    scrollnavflag = 1
    scrollnav = document.documentElement.scrollTop
    let flag = 0
    setTimeout(function fn() {
      headerinner.style.top = headerinner.offsetTop - 4 + 'px'
      headerinnerBottom.style.top = headerinnerBottom.offsetTop - 4 + 'px'
      flag += 4
      if (flag == 52) {
        return
      }
      setTimeout(fn, 5)
    }, 5)
  } else if (document.documentElement.scrollTop - scrollnav <= -20 && scrollnavflag == 1) {
    scrollnav = document.documentElement.scrollTop
    scrollnavflag = 0
    let flag = 0
    setTimeout(function fn() {
      headerinner.style.top = headerinner.offsetTop + 4 + 'px'
      headerinnerBottom.style.top = headerinnerBottom.offsetTop + 4 + 'px'
      flag += 4
      if (flag == 52) {
        headerinnerBottom.style.display = 'none'
        return
      }
      setTimeout(fn, 5)
    }, 5)
  }
  if (document.documentElement.scrollTop - scrollnav >= 20 || document.documentElement.scrollTop - scrollnav <= -20) {
    scrollnav = document.documentElement.scrollTop
  }
})
let searchset
//搜索问题
search.addEventListener('focus', () => {
  searchul.style.display = 'block'
  headerinnerBottom.style.display = 'none'
  head.style.overflow = 'visible'
  searchul.style.top = 7 + 'vh'
  searchul.style.left = 43 + 'vw'
  let changeflag = 1
  searchset = setInterval(() => {
    //搜索历史
    const searchUlLi = searchUl.querySelectorAll('li')
    for (let i = 0; i < searchUlLi.length; i++) {
      searchUl.removeChild(searchUlLi[i])
    }
    for (let i = 0; i < historysearch; i++) {
      let searchID = 'searchID' + i
      let li = document.createElement('li')
      li.innerHTML = '<a href="javascript:;" onclick="putsearch(' + i + ')">' + localStorage.getItem(searchID) + '</a>'
      searchUl.appendChild(li)
    }
    let long = historysearch / 5
    if (historysearch % 5) {
      long++
    }
    if (changeflag) {
      searchul.style.height = 50 + 30 * long + 'px'
    }
    if (search.value.trim() != '') {
      let url = 'https://gogo.madeindz.work:443/api/search/searchtitle?message=' + search.value.trim()
      fetch(url, {
        method: 'get',
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            const searchOlLi = searchOl.querySelectorAll('li')
            for (let i = 0; i < searchOlLi.length; i++) {
              searchOl.removeChild(searchOlLi[i])
            }
            if (res.questions != null) {
              changeflag = 0
              searchul.style.height = 50 + 30 * long + 50 * res.questions.length + 'px'
              for (let i = 0; i < res.questions.length; i++) {
                let li = document.createElement('li')
                li.innerHTML = '<a href="https://zhihu.madeindz.work/html/issue.html" onclick="runissue(' + res.questions[i].ID + ')">' + res.questions[i].title + '</a>'
                searchOl.appendChild(li)
              }
            } else {
              searchul.style.height = 50 + 30 * long + 'px'
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const searchOlLi = searchOl.querySelectorAll('li')
      for (let i = 0; i < searchOlLi.length; i++) {
        searchOl.removeChild(searchOlLi[i])
      }
    }
  }, 500)
})
//点击跳转搜索界面
searchbtn.addEventListener('click', () => {
  if (search.value.trim() != '') {
    localStorage.setItem('search', search.value.trim())
    window.location.href = 'https://zhihu.madeindz.work/html/search.html'
  }
})
//关闭搜索
search.addEventListener('blur', (e) => {
  setTimeout(() => {
    searchul.style.display = 'none'
    clearInterval(searchset)
  }, 500)
})
