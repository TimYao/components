/*
 * @Author: TimLie
 * @email: yaolx.csdn.net
 * @github: https://github.com/TimYao
 * @Date: 2018-04-26 14:38:04
 * @Last Modified by: TimLie
 * @Last Modified time: 2018-04-27 18:13:46
 *
 * I need say Welcome to exchange
 *
 * @description 定义功能函数
 * @notice 请配合babel 编译
 *
 */
((_root, factory) => {
  if(typeof define === 'function' && define.amd){
    define(factory);
  } else if(typeof module === 'object' && module.exports){
    module.exports = factory;
  } else {
    // _root.csdn ? (_root = _root.csdn) : (_root = _root.csdn = {});
    _root.userLoginFeature = factory;
  }
})(this, () => {
  const userLoginFeature = (() => {
    const _$ = jq ? jq : jQuery;
    const feature = {

      /**
       * @function define
       * @description define checking validate function to return error message to users
       * @param {string} errText
       */
      errorMsg(errText){
        console.log('This is error message:', errText);
        return false;
      },

      /**
       * @function define
       * @description define feature function to check modifinty object
       * @param {object} params                  -- 同其他参数相同
       */
      getObject(params = {}){
        let objs = {}, reg = /^([#\.])[a-zA-Z]+/, msg = '', switchTab, switchPannel;

        if(params.containter === ''){
          msg = '请指定容器，例如: .js_containter_box';
        }
        if(msg){
          errorMsg(msg);
          return {code:-1};
        }
        if(typeof params.containter === 'string'){
          let p = params.containter.match(reg);
          if(p && p[1]){
            objs.containter = _$(params.containter)
          }
        }
        if(typeof params.containter === 'object'){
          objs.containter = params.containter;
        }

        if(objs.containter){
          switchTab = objs.containter.data('switchTab') || params.switchTab;
          switchPannel = objs.containter.data('switchPannel') || params.switchPannel;
        }
        if(switchTab && switchPannel){
          let reSwitchTab = switchTab.match(reg);
          let reSwitchPannel = switchPannel.match(reg);
          if(reSwitchTab && reSwitchTab[1] && reSwitchPannel && reSwitchPannel[1]){
            objs.switchTab = _$(switchTab, objs.containter);
            objs.switchPannel = _$(switchPannel, objs.containter);
          }
        } else {
          msg = '请指定切换tab标识和切换pannel标识';
          errorMsg(msg);
          return {code:-1};
        }
        return objs;
      }
    };
    return feature;
  })();

  return userLoginFeature;
})



