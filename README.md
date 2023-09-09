项目名
蓝山双人考核 - 仿知乎

前言
​ 和后端小伙伴做了这个项目之后，感觉自己还是有很多的不足，同时从这次考核中也学到了不少新知识。（做到后面简直想把前面写的代码都重构一遍，什么答辩💩） 进入项目记得先ctrl+shift+del清除缓冲，不然不确定是不是最新版本

参与成员
前端 - 潘麒麟
后端 - 邓卓
前端项目部署服务器地址
后端部署地址
[前端Github仓库地址](lanshanzhihu/zhihu at master · xiyueyezibile/lanshanzhihu (github.com))
后端Github仓库地址
接口文档地址
项目上线时间
​ 2023年1月1日

技术栈😳
html5

css

javascript

实现功能
基础功能（全部实现）😁
用户注册
用户登录（手机号/邮箱登录以及验证码登录）
发布问题
回答问题
发布文章
评论回答和评论文章
我的个人信息栏
用户信息更改（头像，密码，用户名，性别，个人简介）
我的收藏（增加，删除，查询）
亮点(～￣▽￣)～
保持登录状态
通过本地存储token保持，如果token过期则返回登录界面

还原知乎导航栏动态效果
下拉上滑会展示不一样的导航栏

回到顶部按钮
下拉一定距离会出现回到顶部按钮，点击即可回到顶部

搜索功能
搜索时，会出现下拉框，包含关键词联想内容；搜索结果关键词高亮；在前端保存搜索历史记录。

问题和文章的点赞功能
将后端写的点赞功能部署页面

回答用户显示头像，用户可更改头像
回答的用户会显示头像

问题、文章、收藏夹界面可通过更改网址#后面的数字跳转不同问题、文章、收藏夹
对头部和底部模块以及编辑器模块单独写css和js，方便复用
难点😣
搜索框失去焦点事件导致搜索结果的点击事件没有触发
对搜索框添加定时器，延后触发

实时获取搜索框内容并显示搜索结果
通过定时器轮询的方式发送请求，拥有一定延迟，当搜索框无内容时不会开启定时器或已开启的定时器失效

搜索结果关键词高亮
依次比对关键词和搜索结果并添加span标签

给渲染后的元素添加事件
没有选择事件委托，而是行内添加事件并通过函数调用的方式

获取用户头像和点赞数时遇到异步问题
当渲染回答时，出现头像和点赞数请求获取速度比渲染速度慢导致未能把头像和点赞数渲染上而出现undefined的情况，通过异步处理解决

设置multipart/form-data请求头发送formdata数据请求失败
通过查找资料，不设置该请求头由浏览器自动优化即可

优化用户上传头像处理
通过点击头像触发隐藏的file表单，并对文件大小和样式进行了限制

导航栏overflow隐藏和显示的设置
导航栏外元素较多，当点击搜索框或提问或头像时，需要隐藏不相关元素并且点击提问按钮时需要禁止滑动。

不足┭┮﹏┭┮
搜索功能有延迟且不美观
头部导航栏不是不同页面下拉不同样式
文本编辑器未手动封装，没有实现上传图片功能
对复用性较高的代码没有进行封装
命名不规范，代码可读性较差
用户点击部分事件后如果需要重新渲染需要刷新页面不能实时更改
没有使用Typescript进行开发
没有实现页面下滑懒加载
文本编辑器没有自己封装
1月17日 add:修复了首页点赞功能有时失效问题，修复了我的主页界面样式错误问题
