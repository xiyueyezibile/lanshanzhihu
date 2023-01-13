if (localStorage.getItem('shoucangID') != null) {
  let path = (window.location.hash = '#' + localStorage.getItem('shoucangID'))
} else {
  alert('非正常访问')
  window.location.href = 'https://zhihu.madeindz.work/html/home.html'
}
window.addEventListener('hashchange', () => {
  let newpath = window.location.hash.substring(1)
  localStorage.setItem('shoucangID', newpath)
  history.go(0)
})
//转换收藏夹函数
function changeshoucang(ID) {
  localStorage.setItem('shoucangID', ID)
  history.go(0)
}
//跳转文章页面函数
function goarticle(ID) {
  localStorage.setItem('wenzhangID', ID)
}
//跳转问题函数
function goissue(ID) {
  localStorage.setItem('ID', ID)
}
//获取渲染样式
const shoucangTitle = document.querySelector('.shoucangTitle')
const shoucangMessage = document.querySelector('.shoucangMessage')
//获取左侧渲染
const shoucangBodyLeftBottomTop = document.querySelector('.shoucangBodyLeftBottomTop')
const shoucangBodyLeftBottomBottom = document.querySelector('.shoucangBodyLeftBottomBottom')
const shoucangBodyLeftBottomBottomUl = shoucangBodyLeftBottomBottom.querySelector('ul')
//获取右侧渲染
const shoucangBodyRight = document.querySelector('.shoucangBodyRight')
const shoucangBodyRightBottom = document.querySelector('.shoucangBodyRightBottom')
const shoucangBodyRightBottomUl = shoucangBodyRightBottom.querySelector('ul')
// 获取渲染信息
fetch('https://gogo.madeindz.work:443/api/collection/seemyfavorites', {
  method: 'get',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
    if (res.status == '200') {
      shoucangBodyRight.style.height = 50 + 50 * res.favorites.length + 'px'
      for (let i = 0; i < res.favorites.length; i++) {
        let li = document.createElement('li')
        li.innerHTML = '<a href="javascript:;" onclick="changeshoucang(' + res.favorites[i].ID + ')">' + res.favorites[i].favoritesname + '</a>'
        shoucangBodyRightBottomUl.appendChild(li)
        if (res.favorites[i].ID == localStorage.getItem('shoucangID')) {
          shoucangTitle.innerHTML = res.favorites[i].favoritesname
          shoucangMessage.innerHTML = res.favorites[i].describe
        }
      }
    }
  })
//获取收藏内容
window.addEventListener('load', () => {
  let url = 'https://gogo.madeindz.work:443/api/collection/seefavorites?id=' + localStorage.getItem('shoucangID')
  fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status == '200') {
        if (res.collections == null) {
          shoucangBodyLeftBottomTop.innerHTML = '0个内容'
        } else {
          shoucangBodyLeftBottomTop.innerHTML = res.collections.length + '个内容'
          for (let i = 0; i < res.collections.length; i++) {
            shoucangBodyLeftBottomBottom.style.height = res.collections.length * 100 + 'px'
            //是问题
            console.log(res.collections[i].article_id)
            if (!res.collections[i].article_id) {
              console.log('id', res.collections[i].answer_id)
              let URl = 'https://gogo.madeindz.work/api/qa/getquestionfromanswer?id=' + res.collections[i].answer_id
              fetch(URl, {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              })
                .then((res1) => res1.json())
                .then((res1) => {
                  let li = document.createElement('li')
                  li.innerHTML = '<div><a href="http://zhihu.madeindz.work/html/issue.html" onclick="goissue(' + res1.question.ID + ')">' + res1.question.title + '</a></div>' + res1.question.message
                  shoucangBodyLeftBottomBottomUl.appendChild(li)
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              let URL = 'https://gogo.madeindz.work:443/api/article/seearticleinformation?id=' + res.collections[i].article_id + '&secret=123456'
              fetch(URL, {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              })
                .then((res1) => res1.json())
                .then((res1) => {
                  let li = document.createElement('li')
                  li.innerHTML = '<div><a href="http://zhihu.madeindz.work/html/ariticle.html" onclick="goarticle(' + res1.question.ID + ')">' + res1.question.title + '</a></div>'
                  shoucangBodyLeftBottomBottomUl.appendChild(li)
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }
        }
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
})
