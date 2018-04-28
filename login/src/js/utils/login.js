/*
 * @Author: TimLie
 * @email: yaolx.csdn.net
 * @github: https://github.com/TimYao
 * @Date: 2018-04-26 14:38:04
 * @Last Modified by: TimLie
 * @Last Modified time: 2018-04-27 18:49:53
 *
 * I need say Welcome to exchange
 *
 * @description 支持es6 amd commonjs 全局模式
 * @notice 请配合babel 编译
 *
 * 固定class js_validate_input
 *
 */
// import {featureFun} from './utils';
;((_root, factory, deps) => {
  if(typeof define === 'function' && define.amd){
    define(deps?deps:[],factory);
  } else if(typeof module === 'object' && module.exports) {
    module.exports = factory(require(deps[0]));
  } else {
    _root.csdn ? (_root = _root.csdn) : (_root = _root.csdn = {});
    _root.userLogin = factory(_root.deps[0]);
  }
})(this, (featureFun) => {
  let _$, errText;

  /**
   * feature function define
   */
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
      if(params.validateInput){
        objs.validateInput = _$(params.validateInput, objs.containter);
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

  /**
   * @function define
   * @description define export module interface
   * @param params{object}
   *        @containter{object|string}        -- 主容器ID OR CLASS MODINFINY 必定义
   *
   */
  let Login = (params = {containter = ''} = {}) => {
    let opts, depsFun;
    // 验证是否引入jquery
    _$ = jq ? jq : jQuery;
    if(!_$){
      errText = '插件依赖于jquery,请引入jquery';
    }
    if(errText){
      return feature.errorMsg(errText);
    }
    params['validateInput'] = '[validate]';
    // 判断标识存在否
    opts = feature.getObject(params);
    if('code' in opts && opts.code === -1){
      return false;
    }
    // 创建login module
    return new CreateLogin(opts);
  };


  /**
   * @class define
   * @description define login main feature module
   * @param options{object}
   *        @containter{object|string}        -- 主容器ID OR CLASS MODINFINY
   *        @switchTab{object|string}         -- tab 切换标识
   *        @switchPannel{object|string}      -- pannel切换标识
   *        @init{function}
   */
  class CreateLogin {
    constructor(options){
      $ = this;
      $.containter = options.containter;
      $.tabLink = options.switchTab;
      $.pannel = options.switchPannel;
      $.validateInput = options.validateInput;
      // init block
      $.init();
    }
    // init
    init(){

      if($.tabLink && $.pannel){
         $.startTab();
      }
      if($.validateInput){
         $.validate();
      }
    }
    // tab切换
    startTab(){
      $.tabLink.on('click', (event) => {
        let index = _$(event.currentTarget).index();
        $.pannel.not($.pannel.eq(index)).addClass('hide').end().eq(index).removeClass('hide');
        return false;
      });
    }
    // validateForm
    validate(){
      //$.validateInput.on('')
    }
  }


  // exports
  return Login
})//['userLoginFeature']

