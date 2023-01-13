// 跳转调用函数
function localID(ID) {
  localStorage.setItem('ID', ID)
}
//点赞问题
function praisewenti(ID, i) {
  const zantong = document.querySelectorAll('.zantong')
  const alreadyzantong = document.querySelectorAll('.alreadyzantong')
  let formdata = new FormData()
  console.log(ID)
  formdata.append('id', ID)
  fetch('https://gogo.madeindz.work:443/api/praise/praisequestion', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == 200) {
        zantong[i].style.display = 'none'
        alreadyzantong[i].style.display = 'inline-block'
        let m = +zantong[i].innerHTML.charAt(3) + 1
        alreadyzantong[i].innerHTML = '已赞同 ' + m
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//取消点赞
function hatewenti(ID, i) {
  let formdata = new FormData()
  console.log(ID)
  formdata.append('id', ID)
  const zantong = document.querySelectorAll('.zantong')
  const alreadyzantong = document.querySelectorAll('.alreadyzantong')
  fetch('https://gogo.madeindz.work:443/api/praise/cancelpraisequestion', {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == 200) {
        zantong[i].style.display = 'inline-block'
        alreadyzantong[i].style.display = 'none'
        let m = +alreadyzantong[i].innerHTML.charAt(4) - 1
        zantong[i].innerHTML = '赞同 ' + m
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//存储点赞数数组
let sum = []
//查询点赞数
async function searchpraise(ID) {
  let formdata = new FormData()
  formdata.append('id', ID)
  await fetch('https://gogo.madeindz.work:443/api/seepraisequestion', {
    method: 'post',
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('id', ID, 'dianzanshu', res.PraiseSum)
      sum.push(res.PraiseSum)
    })
    .catch((err) => {
      console.log(err)
    })
}
//查看是否已经点赞
function checkdianzan(ID, i) {
  console.log('id', ID)
  const zantong = document.querySelectorAll('.zantong')
  const alreadyzantong = document.querySelectorAll('.alreadyzantong')
  let url = 'https://gogo.madeindz.work:443/api/praise/judgepraisequestion?id=' + ID
  fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('dianzan', ID, res)
      if (res.status == 200) {
        zantong[i].style.display = 'none'
        alreadyzantong[i].style.display = 'inline-block'
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
if (localStorage.getItem('token')) {
  //获取写文章按钮
  const rightBodyCenterwenzhang = document.querySelector('.rightBodyCenterwenzhang')
  //获取渲染样式
  const indexLeftBodyBottomUl = document.querySelector('.indexLeftBodyBottom ul')
  console.log(indexLeftBodyBottomUl)
  //获取整个body区域
  const indexBody = document.querySelector('.indexBody')
  //获取左侧body区域
  const indexLeftBody = document.querySelector('.indexLeftBody')
  //获取右侧body区域
  const indexRightBody = document.querySelector('.indexRightBody')
  //固定滚动
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop >= 1080) {
      const i = (document.body.offsetWidth - indexBody.offsetWidth) / 2
      const x = document.body.offsetWidth - i - indexRightBody.offsetWidth
      indexRightBody.style.position = 'fixed'
      indexRightBody.style.left = x + 'px'
      indexRightBody.style.top = -1023 + 'px'
    } else {
      indexRightBody.style.position = 'relative'
      indexRightBody.style.left = ''
      indexRightBody.style.top = ''
    }
  })
  //渲染界面
  window.addEventListener('load', () => {
    //随机问题
    fetch('https://gogo.madeindz.work:443/api/qa/randquestions', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res)
        if (res.status == '200') {
          indexLeftBody.style.height = 59 + 100 * res.random.length + 'px'
          for (let i = 0; i < res.random.length; i++) {
            await searchpraise(res.random[i].ID)
            let li = document.createElement('li')
            li.innerHTML = '<a href="http://zhihu.madeindz.work/html/issue.html" onclick="localID(' + res.random[i].ID + ')">' + res.random[i].title + '</a><div><button class="zantong" onclick="praisewenti(' + res.random[i].ID + ',' + i + ')">赞同 ' + sum[i] + '</button><button class="alreadyzantong" onclick="hatewenti(' + res.random[i].ID + ',' + i + ')" >已赞同 ' + sum[i] + '</button></div>'
            indexLeftBodyBottomUl.appendChild(li)
            checkdianzan(res.random[i].ID, i)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
  //跳转写文章界面
  rightBodyCenterwenzhang.addEventListener('click', () => {
    window.location.href = 'http://zhihu.madeindz.work/html/writeariticle.html'
  })
} else {
  alert('登录过期')
  window.location.href = 'http://zhihu.madeindz.work/'
}
