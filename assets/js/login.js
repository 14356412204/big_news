$(function(){
    // 点击切换注册和登录界面
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 自定义验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   校验两次输入密码是否一致
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        var username = $('.reg-box [name=userName]').val()
        var password = $('.reg-box [name=password]').val()
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax post请求
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{username:username,password:password},
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！', {icon: 6});
                // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    })
    // 监听登录表单的提交事件
    $('#form_log').on('submit',function(e){
        var username = $('.login-box [name=userName]').val()
        var password = $('.login-box [name=password]').val()
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax post请求
        $.ajax({
            type:'post',
            url:'/api/login',
            data:{username:username,password:password},
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('登录成功', {icon: 6});
                // 将登录成功得到的token字符串保存到localstorage中，方便之后的取用
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})