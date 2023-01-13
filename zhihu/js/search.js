//跳转问题界面函数
function goissue(ID) {
  localStorage.setItem('ID', ID)
}
//获取页面
const searchBody = document.querySelector('.searchBody')
const searchRight = document.querySelector('.searchRight')
let searchinner = localStorage.getItem('search').split('')
//获取渲染内容
const searchLeft = document.querySelector('.searchLeft')
const searchLeftBottom = document.querySelector('.searchLeftBottom')
const searchLeftBottomUL = searchLeftBottom.querySelector('ul')
window.addEventListener('load', () => {
  let url = 'https://gogo.madeindz.work:443/api/search/searchall?message=' + localStorage.getItem('search')
  fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      let long = 50
      if (res.status == 200) {
        if (res.questions != null) {
          long += res.questions.length * 100
          searchLeft.style.height = long + 'px'
          for (let i = 0; i < res.questions.length; i++) {
            //高亮
            let li = document.createElement('li')
            let qmessage = res.questions[i].message.split('')
            let qtitle = res.questions[i].title.split('')
            let newtitle = ''
            let newmessage = ''
            for (let j = 0; j < searchinner.length; j++) {
              if (j != 0) {
                qtitle = newtitle
                newtitle = ''
              }
              for (let k = 0; k < qtitle.length; k++) {
                if (searchinner[j] == qtitle[k]) {
                  newtitle += '<span class="red">' + qtitle[k] + '</span>'
                } else {
                  newtitle += qtitle[k]
                }
              }
            }
            for (let j = 0; j < searchinner.length; j++) {
              if (j != 0) {
                qmessage = newmessage
                newmessage = ''
              }
              for (let k = 0; k < qmessage.length; k++) {
                if (searchinner[j] == qmessage[k]) {
                  newmessage += '<span class="red">' + qmessage[k] + '</span>'
                } else {
                  newmessage += qmessage[k]
                }
              }
            }

            li.innerHTML = '<div><a href="http://zhihu.madeindz.work/html/issue.html" onclick="goissue(' + res.questions[i].ID + ')">' + newtitle + '</a></div><div><a href="http://zhihu.madeindz.work/html/issue.html" onclick="goissue(' + res.questions[i].ID + ')">' + newmessage + '</a></div>'
            searchLeftBottomUL.appendChild(li)
          }
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//固定滚动
window.addEventListener('scroll', () => {
  const i = (document.body.offsetWidth - searchBody.offsetWidth) / 2
  const x = document.body.offsetWidth - i - searchRight.offsetWidth
  searchRight.style.position = 'fixed'
  searchRight.style.left = x + 'px'
  searchRight.style.top = 60 + 'px'
})
