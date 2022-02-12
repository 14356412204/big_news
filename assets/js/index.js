$(function(){
    getUserInfo()
    layui.use(['element', 'layer', 'util'], function () {
        var element = layui.element
            , layer = layui.layer
            , util = layui.util
            , $ = layui.$;
    
        //头部事件
        util.event('lay-header-event', {
            //左侧菜单事件
            menuLeft: function (othis) {
                layer.msg('展开左侧菜单的操作', { icon: 0 });
            }
        });
    
    });
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 跳转到登录界面
            location.href = '/login.html'
            layer.close(index);
          });
    })
})
// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            if(res.status!=0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        // 无论成功失败都会调用complete回调函数
        //可以使用res.responseJSON拿到服务器响应回来的数据

    })
}
// 渲染用户的头像
function renderAvatar(user){
    // 获取用户的名称
    var name = user.nickname||user.username
    $('#welcome').html('欢迎'+name)
    // 按需渲染用户的头像
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
