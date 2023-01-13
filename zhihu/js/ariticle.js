if (localStorage.getItem('wenzhangID') != null) {
  let path = (window.location.hash = '#' + localStorage.getItem('wenzhangID'))
} else {
  alert('非正常访问')
  window.location.href = 'https://zhihu.madeindz.work/html/home.html'
}
window.addEventListener('hashchange', () => {
  let newpath = window.location.hash.substring(1)
  localStorage.setItem('wenzhangID', newpath)
  history.go(0)
})
let touxiangs = []
//获取图片
async function ariticletouxiang(username) {
  let url = 'https://gogo.madeindz.work:443/api/user/getuserheadphoto?username=' + username
  await fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      touxiangs.push(res.message)
    })
    .catch((err) => {
      console.log(err)
    })
}
let sumarticle
//查询点赞数
async function searchpraise(ID) {
  let formdata = new FormData()
  formdata.append('id', ID)
  await fetch('https://gogo.madeindz.work:443/api/seepraisearticle', {
    method: 'post',
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      sumarticle = res.PraiseSum
    })
    .catch((err) => {
      console.log(err)
    })
}
//点赞文章
function zantongarticle(ID) {
  const zantong = document.querySelector('.zantong')
  const alreadyzantong = document.querySelector('.alreadyzantong')
  let formdata = new FormData()
  formdata.append('id', ID)
  fetch('https://gogo.madeindz.work:443/api/praise/praisearticle', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 200) {
        zantong.style.display = 'none'
        alreadyzantong.style.display = 'inline-block'
        let m = +zantong.innerHTML.charAt(3) + 1
        alreadyzantong.innerHTML = '已赞同 ' + m
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//取消点赞文章
function hatezantong(ID) {
  let formdata = new FormData()
  formdata.append('id', ID)
  const zantong = document.querySelector('.zantong')
  const alreadyzantong = document.querySelector('.alreadyzantong')
  fetch('https://gogo.madeindz.work:443/api/praise/cancelpraisearticle', {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 200) {
        zantong.style.display = 'inline-block'
        alreadyzantong.style.display = 'none'
        let m = +alreadyzantong.innerHTML.charAt(4) - 1
        zantong.innerHTML = '赞同 ' + m
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//查看是否已经点赞
function checkdianzan(ID) {
  const zantong = document.querySelector('.zantong')
  const alreadyzantong = document.querySelector('.alreadyzantong')
  let url = 'https://gogo.madeindz.work:443/api/praise/judgepraisearticle?id=' + ID
  fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 200) {
        zantong.style.display = 'none'
        alreadyzantong.style.display = 'inline-block'
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//渲染头像
const ariticleimg = document.querySelector('.ariticleimg')
//获取渲染区域
const ariticleBodyTitle = document.querySelector('.ariticleBodyTitle')
const ariticleBodyCenter = document.querySelector('.ariticleBodyCenter')
const ariticleBodyMain = document.querySelector('.ariticleBodyMain')
const ariticleBodyBottom = document.querySelector('.ariticleBodyBottom')
const ariticleBodyBottombtn = ariticleBodyBottom.querySelector('button')
const ariticleBodyBottomComent = document.querySelector('#ariticleBodyBottomComent')
const ariticleBodyFinal = document.querySelector('.ariticleBodyFinal')
const ariticleBodyFinalUl = ariticleBodyFinal.querySelector('ul')
const ariticleBodyFinalFirstLi = ariticleBodyFinalUl.querySelectorAll('li')[0]
//获取收藏页面
const ariticleshoucang = document.querySelector('.ariticleshoucang')
const ariticleshoucangUL = document.querySelector('.ariticleshoucangUL')
const ariticleshoucangreturn = document.querySelector('.ariticleshoucangreturn')
const ariticleblack = document.querySelector('.ariticleblack')
//渲染
window.addEventListener('load', () => {
  //查看文章信息
  let ariticleURL = 'https://gogo.madeindz.work:443/api/article/seearticleinformation?id=' + localStorage.getItem('wenzhangID') + '&secret=123456'
  fetch(ariticleURL, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res.status == '200') {
        ariticleBodyTitle.innerHTML = res.question.title
        ariticleBodyCenter.innerHTML = '<a href="javascript:;">' + res.question.Articler + '</a>'
        //判断是否被收藏
        let Url = 'https://gogo.madeindz.work:443/api/collection/judgearticleinfavorites?id=' + localStorage.getItem('wenzhangID')
        fetch(Url, {
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res1) => res1.json())
          .then(async (res1) => {
            await searchpraise(localStorage.getItem('wenzhangID'))
            if (res1.status == 200) {
              ariticleBodyMain.innerHTML = res.question.message + '<div class="ariticleBodyMainBottom"><button class="zantong" onclick="zantongarticle(' + localStorage.getItem('wenzhangID') + ')">赞同 ' + sumarticle + '</button><button class="alreadyzantong" onclick="hatezantong(' + localStorage.getItem('wenzhangID') + ')">已赞同 ' + sumarticle + '</button><button onclick="openshoucang(' + localStorage.getItem('wenzhangID') + ',' + res1.article_id + ')">取消收藏</button></div>'
            } else {
              ariticleBodyMain.innerHTML = res.question.message + '<div class="ariticleBodyMainBottom"><button class="zantong" onclick="zantongarticle(' + localStorage.getItem('wenzhangID') + ')">赞同 ' + sumarticle + '</button><button class="alreadyzantong" onclick="hatezantong(' + localStorage.getItem('wenzhangID') + ')">已赞同 ' + sumarticle + '</button><button onclick="openshoucang(' + localStorage.getItem('wenzhangID') + ',' + res1.article_id + ')">收藏</button></div>'
            }
            checkdianzan(localStorage.getItem('wenzhangID'))
          })
          .catch((err) => {
            console.log(err)
          })
        if (res.question.Comments == null) {
          ariticleBodyFinalFirstLi.innerHTML = '0条评论'
        } else {
          ariticleBodyFinalFirstLi.innerHTML = res.question.Comments.length + '条评论'
          for (let i = 0; i < res.question.Comments.length; i++) {
            await ariticletouxiang(res.question.Comments[i].Commenter)
            let li = document.createElement('li')
            li.innerHTML = '<div><a href="javascript:;"><img src="' + touxiangs[i] + '" >' + res.question.Comments[i].Commenter + '</a></div>' + res.question.Comments[i].message
            ariticleBodyFinalUl.appendChild(li)
          }
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
  //发表评论
  ariticleBodyBottombtn.addEventListener('click', () => {
    if (ariticleBodyBottomComent.value.trim() == '') {
      alert('请输入内容')
    } else {
      let formdata = new FormData()
      formdata.append('id', localStorage.getItem('wenzhangID'))
      formdata.append('message', ariticleBodyBottomComent.value.trim())
      fetch('https://gogo.madeindz.work:443/api/article/createarticlecomment', {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: formdata,
      })
        .then((res) => res.json())
        .then((res) => {
          history.go(0)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
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
        ariticleimg.src = res.information.headphoto
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

//打开收藏页面
function openshoucang(ID, ...fv) {
  ariticleblack.style.display = 'block'
  ariticleshoucang.style.display = 'block'
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
          const ariticleshoucangULLi = ariticleshoucangUL.querySelectorAll('li')
          for (let i = 0; i < ariticleshoucangULLi.length; i++) {
            ariticleshoucangUL.removeChild(ariticleshoucangULLi[i])
          }
          for (let i = 0; i < res.favorites.length; i++) {
            let li = document.createElement('li')
            if (fv[i] == res.favorites[i].ID) {
              li.innerHTML = '<div>' + res.favorites[i].favoritesname + '</div><button onclick="endshoucang(' + res.favorites[i].ID + ',' + ID + ')">已收藏</button>'
            } else {
              li.innerHTML = '<div>' + res.favorites[i].favoritesname + '</div><button onclick="startshoucang(' + res.favorites[i].ID + ',' + ID + ')">收藏</button>'
            }
            ariticleshoucangUL.appendChild(li)
          }
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//退出收藏界面
ariticleshoucangreturn.addEventListener('click', () => {
  ariticleblack.style.display = 'none'
  ariticleshoucang.style.display = 'none'
})
//进行收藏函数
function startshoucang(sID, aID) {
  let formdata = new FormData()
  formdata.append('favorites_id', sID)
  formdata.append('article_id', aID)
  fetch('https://gogo.madeindz.work:443/api/collection/addarticle', {
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
      console.log(err)
    })
}
//结束收藏函数
function endshoucang(sID, aID) {
  let formdata = new FormData()
  formdata.append('favorites_id', sID)
  formdata.append('article_id', aID)
  fetch('https://gogo.madeindz.work:443/api/collection/deletearticle', {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
}
