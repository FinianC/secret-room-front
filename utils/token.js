const app_token = 'Swrh_token'
const app_user = "Swrh_user"
const app_key = "Swrh_key"
const getAppToken = () => {
  return wx.getStorageSync(app_token)
}
const setAppToken = (data) => {
  return wx.setStorageSync(app_token, data)
}
const removeAppToken = () => {
  return wx.removeStorageSync(app_token)
}
const getAppUser = () => {
  return wx.getStorageSync(app_user)
}
const setAppUser = (userInfo) => {
  return wx.setStorageSync(app_user, userInfo)
}
const removeAppUser = () => {
  return wx.removeStorageSync(app_user)
}
const getAppKey = () => {
  return wx.getStorageSync(app_key)
}
const setAppKey = (key) => {
  return wx.setStorageSync(app_key, key)
}
const removeAppKey = () => {
  return wx.removeStorageSync(app_key)
}
module.exports = {
  getAppToken,
  setAppToken,
  removeAppToken,
  getAppUser,
  setAppUser,
  removeAppUser,
  getAppKey,
  setAppKey,
  removeAppKey
}