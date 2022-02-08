// 在每次发起ajax请求之前都会先调用ajaxprefilter函数
$.ajaxPrefilter(function(options){
    // 在发起ajax请求之前统一拼接url
    options.url = 'http://www.liulongbin.top:3007'+options.url
})