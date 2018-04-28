/*
 * @Author: TimLie
 * @Date: 2018-04-26 15:31:31
 * @Last Modified by: TimLie
 * @Last Modified time: 2018-04-27 18:11:00
 *
 */

define(() => {
  const loginConfig = {
    baseUrl: './src/js/',
    paths: {
        scripts: './scripts',
        libs: './libs',
        utils: './utils',
        myjquery: ['//csdnimg.cn/release/passport/history/js/libs/jquery.js?v=1.3.2', 'libs/jquery'],
        userLoginFeature: 'utils/utils'
    },
    shim: {
      myjquery: {
        init: function() {
            console.log('jquery is rename jq init');
            let jq = this.jQuery.noConflict(true);
            jq.support.cors = true; // 浏览器是否支持跨域监测
            this.jq = jq;
            return jq;
        }
      },
      'utils/login' : {
        deps: ['myjquery', 'userLoginFeature'],
        exports: ['jq', 'userLoginFeature']
      },
      userLoginFeature: {
        deps: ['myjquery'],
        exports: 'userLoginFeature'
      }
    }
  }
  return loginConfig;
})