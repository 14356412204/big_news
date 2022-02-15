$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1-6个字符之间!'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 重置表单数据
    $('#btn_reset').on('click',function(e){
        // 阻止表单默认提交行为
        e.preventDefault()
        initUserInfo()
    })
    // 更新用户信息
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改成功')
                // initUserInfo()
                //调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
                // form.val('formUserInfo',res.data)
            }
        })
    })
})