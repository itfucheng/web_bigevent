$(function () {
  getUserInfo()
  let layer = layui.layer
  $('#btnLogout').on('click', function () {
    // console.log('ok');
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      //清空本地存储中的token
      localStorage.removeItem('token')
      //重新跳转到登录界面
      location.href = '/login.html'
      //关闭confirm 询问框
      layer.close(index);
    });
  })
})

function getUserInfo () {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    //headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败!')
      }
      //调用函数renderAvatar 渲染用户的头像
      renderAvatar (res.data)
    },
    //无论成功还是失败都会调用complete回调函数
    // complete: function(res) {
    //   //在complete回调函数中可以使用res.responseJSON拿到服务器响应回来得数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     //强制清空token
    //     localStorage.removeItem('token')
    //     //强制跳转到登录界面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

//渲染用户的头像
function renderAvatar(user) {
  //获取用户的名称
  let name = user.nickname || user.username
  //设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  //按需渲染用户的头像
  if (user.user_pic !== null) {
    //渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    //渲染文本头像
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()

    $('.text-avatar').html(first).show()
  }
}
