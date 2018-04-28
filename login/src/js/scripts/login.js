/*
 * @Author: TimLie
 * @Date: 2018-04-26 15:31:31
 * @Last Modified by: TimLie
 * @Last Modified time: 2018-04-27 18:35:24
 */
require(['./src/js/config/login-config.js'], (config) => {
  // 导入配置文件
  requirejs.config(config)
  require(['myjquery', 'utils/login'], (jq, login) => {
    login({
      containter: '#js_login_user',
      switchTab: '.js_login_tab',
      switchPannel: '.js_login_pannel',
      complete: () => {

      }
    })
  })
})
