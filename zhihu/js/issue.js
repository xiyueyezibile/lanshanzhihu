//进行收藏函数
function startshoucang(sID, aID) {
  let formdata = new FormData()
  formdata.append('favorites_id', sID)
  formdata.append('answer_id', aID)
  fetch('https://gogo.madeindz.work:443/api/collection/addcollection', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      history.go(0)
    })
    .catch((err) => {
      throw new Error(err)
    })
}
//结束收藏函数
function endshoucang(sID, aID) {
  let formdata = new FormData()
  formdata.append('favorites_id', sID)
  formdata.append('answer_id', aID)
  fetch('https://gogo.madeindz.work:443/api/collection/deletecollection', {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      history.go(0)
    })
    .catch((err) => {
      throw new Error(err)
    })
}
//收藏函数
function shoucang(ID, ...fv) {
  issueblack.style.display = 'block'
  issueshoucang.style.display = 'block'
  //渲染收藏界面
  fetch('https://gogo.madeindz.work:443/api/collection/seemyfavorites', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 200) {
        if (res.favorites != null) {
          const issueshoucangULLi = issueshoucangUL.querySelectorAll('li')
          for (let i = 0; i < issueshoucangULLi.length; i++) {
            issueshoucangUL.removeChild(issueshoucangULLi[i])
          }
          for (let i = 0; i < res.favorites.length; i++) {
            let li = document.createElement('li')
            if (fv[i] == res.favorites[i].ID) {
              li.innerHTML = '<div>' + res.favorites[i].favoritesname + '</div><button onclick="endshoucang(' + res.favorites[i].ID + ',' + ID + ')">已收藏</button>'
            } else {
              li.innerHTML = '<div>' + res.favorites[i].favoritesname + '</div><button onclick="startshoucang(' + res.favorites[i].ID + ',' + ID + ')">收藏</button>'
            }
            issueshoucangUL.appendChild(li)
          }
        }
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}
if (localStorage.getItem('ID') != null) {
  let path = (window.location.hash = '#' + localStorage.getItem('ID'))
} else {
  alert('非正常访问')
  window.location.href = 'https://zhihu.madeindz.work/html/home.html'
}
window.addEventListener('hashchange', () => {
  let newpath = window.location.hash.substring(1)
  localStorage.setItem('ID', newpath)
  history.go(0)
})
//存储点赞数数组
let sumanswer = []
let touxiangs = []
//查询点赞数
async function searchpraise(ID, username) {
  let formdata = new FormData()
  formdata.append('id', ID)
  fetch('https://gogo.madeindz.work:443/api/seepraiseanswer', {
    method: 'post',
    body: formdata,
  })
    .then((res) => res.json())
    .then(async (res) => {
      console.log('dianzan', res)
      sumanswer[sumanswer.length] = res.PraiseSum
    })
    .catch((err) => {
      console.log(err)
    })
  let URL = 'https://gogo.madeindz.work:443/api/user/getuserheadphoto?username=' + username
  await fetch(URL, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      touxiangs.push(res.message)
    })
}
//点赞回答
function zantong(ID, i) {
  const zantonganswer = document.querySelectorAll('.zantonganswer')
  const alreadyzantonganswer = document.querySelectorAll('.alreadyzantonganswer')
  let formdata = new FormData()
  formdata.append('id', ID)
  fetch('https://gogo.madeindz.work:443/api/praise/praiseanswer', {
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
        zantonganswer[i].style.display = 'none'
        alreadyzantonganswer[i].style.display = 'inline-block'
        let m = +zantonganswer[i].innerHTML.charAt(3) + 1
        alreadyzantonganswer[i].innerHTML = '已赞同 ' + m
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//取消点赞回答
function hatezantong(ID, i) {
  let formdata = new FormData()
  formdata.append('id', ID)
  const zantonganswer = document.querySelectorAll('.zantonganswer')
  const alreadyzantonganswer = document.querySelectorAll('.alreadyzantonganswer')
  fetch('https://gogo.madeindz.work:443/api/praise/cancelpraiseanswer', {
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
        zantonganswer[i].style.display = 'inline-block'
        alreadyzantonganswer[i].style.display = 'none'
        let m = +alreadyzantonganswer[i].innerHTML.charAt(4) - 1
        zantonganswer[i].innerHTML = '赞同 ' + m
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//查看是否已经点赞
async function checkdianzan(ID, i) {
  const zantonganswer = document.querySelectorAll('.zantonganswer')
  const alreadyzantonganswer = document.querySelectorAll('.alreadyzantonganswer')
  let url = 'https://gogo.madeindz.work:443/api/praise/judgepraiseanswer?id=' + ID
  await fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == 200) {
        zantonganswer[i].style.display = 'none'
        alreadyzantonganswer[i].style.display = 'inline-block'
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//获取顶部三个按钮
const issueTopInnerBottom = document.querySelector('.issueTopInnerBottom')
const issueTopInnerBottombtns = issueTopInnerBottom.querySelectorAll('button')
//获取评论界面
const issueblack = document.querySelector('.issueblack')
const issueblackComments = document.querySelector('.issueblackComments')
const issueblackMyComment_ = document.querySelector('#issueblackMyComment')
const issueblackMySend = document.querySelector('#issueblackMySend')
//获取评论界面退出按钮
const issueblackCancel = document.querySelector('.issueblackCancel')
//获取编辑器
const issuebianjiqi = document.querySelector('.bianjiqi')
//获取渲染样式
const issueTopInnerCenter = document.querySelector('.issueTopInnerCenter')
const issueBottomLeftTopLeft = document.querySelector('.issueBottomLeftTopLeft')
const issueBottomLeftBottomUl = document.querySelector('.issueBottomLeftBottom ul')
const issueblackComment = document.querySelector('.issueblackComment')
const issueblackCommentUl = issueblackComment.querySelector('ul')
const issueblackMyComment = document.querySelector('.issueblackMyComment')
const issueshoucangUL = document.querySelector('.issueshoucangUL')
//获取收藏页面
const issueshoucang = document.querySelector('.issueshoucang')
const issueshoucangreturn = document.querySelector('.issueshoucangreturn')
//获取body页面
const issueBottom = document.querySelector('.issueBottom')
const issueBottomRight = document.querySelector('.issueBottomRight')
//获取评论函数
function startComments(i) {
  issueblack.style.display = 'block'
  issueblackComments.style.display = 'block'
  let url = 'https://gogo.madeindz.work:443/api/qa/seequestioninformation?id=' + localStorage.getItem('ID') + '&secret=123456'
  fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == '200') {
        console.log(res.question.Answers)
        //发布评论
        issueblackMySend.addEventListener('click', (e) => {
          e.preventDefault()
          if (issueblackMyComment_.value.trim() != '') {
            let formdata = new FormData()
            formdata.append('id', res.question.Answers[i].ID)
            formdata.append('message', issueblackMyComment_.value.trim())
            fetch('https://gogo.madeindz.work:443/api/qa/acomment', {
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
                throw new Error(err)
              })
          }
        })
        const ulli = issueblackCommentUl.querySelectorAll('li')
        for (let j = 0; j < ulli.length; j++) {
          issueblackCommentUl.removeChild(ulli[j])
        }
        for (let j = 0; j < res.question.Answers[i].Comments.length; j++) {
          let li = document.createElement('li')
          li.innerHTML = '<div><a href="javascript:;">' + res.question.Answers[i].Comments[j].Commenter + '</a></div>' + res.question.Answers[i].Comments[j].message
          issueblackCommentUl.appendChild(li)
        }
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}
//退出评论界面
issueblackCancel.addEventListener('click', () => {
  issueblack.style.display = 'none'
  issueblackComments.style.display = 'none'
})
let bianjiqidianjiflag = 0
//编辑器点击出现
issueTopInnerBottombtns[1].addEventListener('click', () => {
  issuebianjiqi.style.display = 'block'
  bianjiqidianjiflag = 1000
})
//发表回答
const issuebianjiqiBottom = document.querySelector('.bianjiqiBottom')
const issuebianjiqiTop = issuebianjiqi.querySelector('.bianjiqiTop')
const issuebianjiqiTopbtns = issuebianjiqiTop.querySelectorAll('button')
issuebianjiqiTopbtns[8].addEventListener('click', () => {
  let formdata = new FormData()
  formdata.append('question_id', localStorage.getItem('ID'))
  formdata.append('message', issuebianjiqiBottom.innerHTML)
  fetch('https://gogo.madeindz.work:443/api/qa/acreate', {
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
      throw new Error(err)
    })
})
//渲染页面
window.addEventListener('load', () => {
  //查看问题信息
  let url = 'https://gogo.madeindz.work:443/api/qa/seequestioninformation?id=' + localStorage.getItem('ID') + '&secret=123456'
  fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res.status == '200') {
        //回答为空的情况
        console.log(res)
        if (res.question.Answers == null) {
          issueTopInnerCenter.innerHTML = res.question.title + '<div>' + res.question.message + '</div>'
        } else {
          issueBottomLeftTopLeft.innerHTML = res.question.Answers.length + '个回答'
          issueTopInnerCenter.innerHTML = res.question.title + '<div>' + res.question.message + '</div>'
          for (let i = 0; i < res.question.Answers.length; i++) {
            await searchpraise(res.question.Answers[i].ID, res.question.Answers[i].Answerer)
            console.log(touxiangs)
            let shoucangflag
            //判断是否收藏
            let URl = 'https://gogo.madeindz.work:443/api/collection/judgeanswerinfavorites?id=' + res.question.Answers[i].ID
            fetch(URl, {
              method: 'get',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
              .then((res1) => res1.json())
              .then((res1) => {
                if (res1.status == 200) {
                  shoucangflag = '取消收藏'
                } else if (res1.status == 500) {
                  shoucangflag = '收藏'
                }
                let li = document.createElement('li')
                // setTimeout(() => {
                if (res.question.Answers[i].Comments == null) {
                  li.innerHTML =
                    '<div><a href="javascript:;"><img src="' +
                    touxiangs[i] +
                    '" ><strong>' +
                    res.question.Answers[i].Answerer +
                    '</strong></a></div>' +
                    res.question.Answers[i].message +
                    '<div><button class="zantonganswer" onclick="zantong(' +
                    res.question.Answers[i].ID +
                    ',' +
                    i +
                    ')">赞同 ' +
                    sumanswer[i] +
                    '</button><button class="alreadyzantonganswer" onclick="hatezantong(' +
                    res.question.Answers[i].ID +
                    ',' +
                    i +
                    ')">已赞同 ' +
                    sumanswer[i] +
                    '</button><button onclick="startComments(' +
                    i +
                    ')">0条评论</button><a href="javascript:;" class="issueA" onclick="shoucang(' +
                    res.question.Answers[i].ID +
                    ',' +
                    res1.favorites_id +
                    ')">' +
                    shoucangflag +
                    '</a></div>'
                } else {
                  li.innerHTML =
                    '<div><a href="javascript:;"><img src="' +
                    touxiangs[i] +
                    '" ><strong>' +
                    res.question.Answers[i].Answerer +
                    '</strong></a></div>' +
                    res.question.Answers[i].message +
                    '<div><button class="zantonganswer" onclick="zantong(' +
                    res.question.Answers[i].ID +
                    ',' +
                    i +
                    ')">赞同 ' +
                    sumanswer[i] +
                    '</button><button class="alreadyzantonganswer" onclick="hatezantong(' +
                    res.question.Answers[i].ID +
                    ',' +
                    i +
                    ')">已赞同 ' +
                    sumanswer[i] +
                    '</button><button onclick="startComments(' +
                    i +
                    ')">' +
                    res.question.Answers[i].Comments.length +
                    '条评论</button><a href="javascript:;" class="issueA" onclick="shoucang(' +
                    res.question.Answers[i].ID +
                    ',' +
                    res1.favorites_id +
                    ')">' +
                    shoucangflag +
                    '</a></div>'
                }
                // }, 100)
                issueBottomLeftBottomUl.appendChild(li)
                setTimeout(() => {
                  checkdianzan(res.question.Answers[i].ID, i)
                }, 100)
              })
              .catch((res1) => {
                console.log(res1)
              })
          }
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//退出收藏界面
issueshoucangreturn.addEventListener('click', () => {
  issueblack.style.display = 'none'
  issueshoucang.style.display = 'none'
})
//固定滚动
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop >= 300 + bianjiqidianjiflag) {
    const i = (document.body.offsetWidth - issueBottom.offsetWidth) / 2
    const x = document.body.offsetWidth - i - issueBottomRight.offsetWidth
    issueBottomRight.style.position = 'fixed'
    issueBottomRight.style.left = x + 'px'
    issueBottomRight.style.top = -80 + 'px'
  } else {
    issueBottomRight.style.position = 'relative'
    issueBottomRight.style.left = ''
    issueBottomRight.style.top = ''
  }
})
