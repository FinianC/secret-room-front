# 一个社交类的微信小程序
这是一个微信小程序，密室组队
#### 大致功能：
1.发布动态：可以发文字，图片
#### 截图：
#### 使用代码的方法：
1.首先你要在项目的project.config.json配置文件下填入自己的小程序appid
```
"appid": "your app id",
```
2.然后此项目的后台服务使用的是leancloud，你需要去  
https://leancloud.cn/  
注册账号，并创建自己的一个项目，然后按照上面  
https://leancloud.cn/docs/weapp.html#hash650323347  
的文档配置好

3.配置完后把leancloud上的appid和appkey填入项目的app.js里
```
AV.init({
  appId: 'you leancloud app id',
  appKey: 'you leancloud app key',
});
```

###### 希望大家给我star...
