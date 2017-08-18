# 共三个页面

> 登陆页面

* http://localhost:9999/login

访问当前页面，首先会请求登陆接口获得token。然后将之保存在localstorage里。

> 登陆接口 

* http://localhost:9999/api/login

> 测试接口 http://localhost:9999/api/test

* 没有token时

http://localhost:9999/api/test

```

{
"sta": "error",
"msg": "Please request with token."
}

```

* token错误时

http://localhost:9999/api/test?token=ey

```

{
"sta": "error",
"msg": "Tooken is invaild"
}

```

* token正确时

http://localhost:9999/api/test?token=ey...

```

{
"foo": "bar",
"iat": 1503047894
}

```