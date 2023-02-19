var env = 'FT';  // SIT-测试环境    PRO-生产    FT-开发
var baseUrl = '';
switch (env) {
  case 'FT': baseUrl = 'http://192.168.74.1:9096/secret'; break;
  case 'PRO': baseUrl = 'https://secretescape.mynatapp.cc/secret'; break;
  case 'SIT': baseUrl = 'https://www.shanghaimudong.com:1443/ps-api'; break;
  default: baseUrl = ''; break;
}
const ipConfig = {
  env,
  baseUrl
}
module.exports = ipConfig