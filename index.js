$(function () {
    new ClipboardJS('.btn');
    $('#getToken').click(function () {
        let strSsoServer = $('#ssoServer').val();
        let strUserName = $('#userName').val();
        let strPassWord = $('#passWord').val();

        if (strSsoServer && strUserName && strPassWord) {
            //获取验证码
            let strCode = '';
            $.ajax({
                type: 'get',
                url: strSsoServer + '/getCode',
                async: false,
                success: function (data) {
                    strCode = data.message;
                }
            });

            //请求数据
            let strServerToken = '';
            $.ajax({
                type: 'get',
                url: strSsoServer + '/login',
                data: {
                    username: strUserName,
                    password: strPassWord,
                    code: strCode,
                    service: 'http://192.168.5.99:3000',
                    appKey: 'mainApp'
                },
                async: false,
                success: function (result) {
                    if (result && result.success === true && result.data != null) {
                        //登录成功
                        strServerToken = result.data.gmsso_ser_ec_key;
                    } else {
                        alert('获取token失败，请检查参数！');
                    }
                }
            });

            $.ajax({
                type: 'get',
                url: strSsoServer + '/login',
                data: {
                    'GMSSO_SERVER_EC': strServerToken,
                    service: 'http://192.168.5.99:3000',
                    appKey: 'mainApp'
                },
                async: false,
                success: function (result) {
                    if (result && result.success === true && result.data != null) {
                        //登录成功
                        $('#tokenText').val(result.data.gmsso_cli_ec_key);
                    } else {
                        alert('获取token失败，请检查参数！');
                    }
                }
            });
        } else {
            alert('请完善参数！');
        }
    });

    $('#copyToken').click(function () {
    });
});
