// 在每次发起ajax请求之前都会先调用ajaxprefilter函数
$.ajaxPrefilter(function(options){
    // 在发起ajax请求之前统一拼接url
    options.url = 'http://www.liulongbin.top:3007'+options.url
    // 统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }
    options.complete = function(res){
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})